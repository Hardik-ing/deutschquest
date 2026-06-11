import argparse
import csv
import json
import os
from typing import Any, Iterable

from supabase import Client, create_client


BATCH_SIZE_TATOEBA = 1000
BATCH_SIZE_DICTIONARY = 500


def get_supabase_client() -> Client:
    """Initialize backend Supabase administrative client securely."""
    url = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not url:
        raise RuntimeError("Missing SUPABASE_URL or VITE_SUPABASE_URL environment variable.")
    if not key:
        raise RuntimeError("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.")

    return create_client(url, key)


def upload_batch(supabase: Client, table_name: str, batch: list[dict[str, Any]]) -> None:
    if batch:
        supabase.table(table_name).insert(batch).execute()


def clean_text(value: Any) -> str:
    return str(value or "").strip()


def iter_tatoeba_rows(tsv_filepath: str) -> Iterable[dict[str, Any]]:
    """
    Parses Tatoeba DE-EN sentence alignment pairs and yields exercise rows.

    Expected TSV shape from the provided importer:
    row[1] = English sentence
    row[3] = matching German sentence translation
    """
    with open(tsv_filepath, mode="r", encoding="utf-8", newline="") as file:
        reader = csv.reader(file, delimiter="\t")

        for row in reader:
            if len(row) < 4:
                continue

            english_sentence = clean_text(row[1])
            german_sentence = clean_text(row[3])
            if not english_sentence or not german_sentence:
                continue

            yield {
                "type": "translation",
                "question_text": f"Translate this sentence: {english_sentence}",
                "correct_answer": german_sentence,
                "options": [
                    german_sentence,
                    "Das ist ein falsches Beispiel.",
                    "Ich trinke kalten Kaffee.",
                    "Guten Tag allerseits.",
                ],
                "level_id": 1,
            }


def ingest_tatoeba_sentences(tsv_filepath: str) -> None:
    """Batch-upload Tatoeba DE-EN sentence alignment pairs into exercises."""
    supabase = get_supabase_client()
    print("Initializing Tatoeba data stream...")

    batch: list[dict[str, Any]] = []
    total_inserted = 0

    for exercise_data in iter_tatoeba_rows(tsv_filepath):
        batch.append(exercise_data)

        if len(batch) >= BATCH_SIZE_TATOEBA:
            upload_batch(supabase, "exercises", batch)
            total_inserted += len(batch)
            batch = []
            print(f"{total_inserted} Tatoeba elements synced successfully.")

    if batch:
        upload_batch(supabase, "exercises", batch)
        total_inserted += len(batch)

    print(f"Tatoeba ingestion complete. Inserted {total_inserted} exercises.")


def ingest_wiktionary_dump(json_filepath: str) -> None:
    """Parse stripped Wiktionary dictionary dumps into the dictionary table."""
    supabase = get_supabase_client()
    print("Extracting Wiktionary definitions data matrix...")

    with open(json_filepath, mode="r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Wiktionary JSON must be a list of dictionary entries.")

    batch: list[dict[str, Any]] = []
    total_inserted = 0

    for entry in data:
        if not isinstance(entry, dict):
            continue

        word = clean_text(entry.get("word"))
        english_definition = clean_text(entry.get("def") or entry.get("english_definition"))
        if not word or not english_definition:
            continue

        batch.append(
            {
                "word": word,
                "part_of_speech": clean_text(entry.get("pos") or entry.get("part_of_speech")) or None,
                "gender": clean_text(entry.get("gender")) or "N/A",
                "english_definition": english_definition,
                "example_sentence": clean_text(entry.get("example_sentence")) or None,
            }
        )

        if len(batch) >= BATCH_SIZE_DICTIONARY:
            upload_batch(supabase, "dictionary", batch)
            total_inserted += len(batch)
            batch = []
            print(f"{total_inserted} dictionary entries synced successfully.")

    if batch:
        upload_batch(supabase, "dictionary", batch)
        total_inserted += len(batch)

    print(f"Dictionary mapping complete. Inserted {total_inserted} entries.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest language datasets into Supabase.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    tatoeba = subparsers.add_parser("tatoeba", help="Ingest Tatoeba TSV sentence pairs.")
    tatoeba.add_argument("path", help="Path to the Tatoeba TSV file.")

    wiktionary = subparsers.add_parser("wiktionary", help="Ingest stripped Wiktionary JSON.")
    wiktionary.add_argument("path", help="Path to the Wiktionary JSON file.")

    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.command == "tatoeba":
        ingest_tatoeba_sentences(args.path)
    elif args.command == "wiktionary":
        ingest_wiktionary_dump(args.path)


if __name__ == "__main__":
    main()
