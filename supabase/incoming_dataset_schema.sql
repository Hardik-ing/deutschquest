-- Unified structural layout for incoming dataset records.
-- Run this in the Supabase SQL Editor before importing Tatoeba,
-- Wiktionary, or Mozilla Common Voice derived records.

-- Enable UUID extension if not present.
create extension if not exists "uuid-ossp";

-- 1. Tatoeba Sentences & Translations Mapping
create table public.exercises (
    id uuid default uuid_generate_v4() primary key,
    type text not null, -- 'translation', 'listening', 'speaking'
    question_text text not null, -- English Sentence
    correct_answer text not null, -- German Sentence (Tatoeba pairing)
    options text[] not null, -- Array of distracting German choices
    level_id integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Wiktionary Dictionary Lookups
create table public.dictionary (
    id uuid default uuid_generate_v4() primary key,
    word text not null unique,
    part_of_speech text, -- Noun, Verb, Adjective
    gender text, -- Masculine, Feminine, Neuter (Extracted from Wiktionary)
    english_definition text not null,
    example_sentence text
);

-- 3. Mozilla Common Voice Native Audio Tracking
create table public.audio_assets (
    id uuid default uuid_generate_v4() primary key,
    text_content text not null, -- The exact German sentence spoken
    audio_url text not null, -- Public link to your Supabase Storage bucket .mp3 file
    accent text, -- e.g., 'Germany', 'Austria', 'Switzerland'
    exercise_id uuid references public.exercises(id) on delete cascade
);

-- Index critical search points for lightning-fast lookups.
create index idx_exercises_level on public.exercises(level_id);
create index idx_dictionary_word on public.dictionary(word);
