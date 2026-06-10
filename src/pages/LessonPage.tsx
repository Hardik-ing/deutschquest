import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { lessons, questList } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type { ProgressState } from '../types';

interface LessonPageProps {
  progress: ProgressState;
  updateProgress: (update: Partial<ProgressState>) => void;
  awardToast: (message: string) => void;
}

export function LessonPage({ progress, updateProgress, awardToast }: LessonPageProps) {
  const params = useParams();
  const currentLesson = useMemo(() => lessons.find(lesson => lesson.id === params.lessonId) ?? lessons[0], [params.lessonId]);
  const { speak, stop } = useSpeech();
  const { transcript, isListening, error, start, stop: stopListening } = useSpeechRecognition();
  const [selected, setSelected] = useState('');
  const [completed, setCompleted] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const exercise = currentLesson.exercises[exerciseIndex];

  const masteryStars = Array.from({ length: 5 }, (_, index) => index < (progress.mastery[currentLesson.id] ?? 1));

  const handleAnswer = () => {
    if (!exercise) return;
    const correct = selected.trim().toLowerCase() === exercise.answer.trim().toLowerCase();
    if (correct) {
      awardToast('+10 XP! Great job.');
      updateProgress({ xp: progress.xp + 10, coins: progress.coins + 3 });
      if (!progress.completedLessons.includes(currentLesson.id)) {
        updateProgress({ completedLessons: [...progress.completedLessons, currentLesson.id], lastLessonId: currentLesson.id });
      }
      setCompleted(true);
      setTimeout(() => setCompleted(false), 1000);
    } else {
      awardToast('Try again and focus on pronunciation.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Lesson</p>
            <h2 className="text-3xl font-semibold text-white">{currentLesson.title}</h2>
            <p className="mt-2 text-slate-400">{currentLesson.description}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Mastery</p>
            <div className="mt-3 flex gap-2 text-amber-300">
              {masteryStars.map((active, idx) => (
                <span key={idx}>{active ? '⭐' : '☆'}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="rounded-[36px] p-8">
          <div className="grid gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Words to practice</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {currentLesson.words.map(word => (
                  <div key={word.word} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xl font-semibold text-white">{word.word}</p>
                        <p className="text-sm text-slate-400">{word.translation}</p>
                      </div>
                      <button type="button" onClick={() => speak(word.word)} className="rounded-full bg-sky-500/20 px-3 py-2 text-sm text-sky-300">Play</button>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{word.example}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Pronunciation: {word.pronunciation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Exercise</p>
                <Badge>{exercise.type}</Badge>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">{exercise.prompt}</p>
              {exercise.audio ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={() => speak(exercise.answer)}>
                    Play Audio
                  </Button>
                  <Button variant="ghost" onClick={stop}>
                    Pause
                  </Button>
                </div>
              ) : null}
              <div className="mt-6 grid gap-3">
                {exercise.options.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected(option)}
                    className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${selected === option ? 'border-sky-400 bg-sky-500/10 text-white' : 'border-slate-700 bg-slate-950/70 text-slate-200 hover:border-slate-500'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button variant="primary" onClick={handleAnswer}>Submit Answer</Button>
                <Button variant="secondary" onClick={() => start()}>Start Pronunciation</Button>
                <button type="button" className="text-sm text-slate-400 underline" onClick={() => setSelected('')}>Reset</button>
              </div>
              <p className="mt-4 text-sm text-slate-400">Voice transcript: {transcript || 'Speak now...'}</p>
              {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
            </div>
          </div>
        </Card>

        <Card className="rounded-[36px] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Lesson summary</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Review & Replay</h3>
            </div>
            <div className="grid gap-4">
              {['Replay Quest', 'Practice Again', 'Challenge Mode', 'Review Mistakes'].map(label => (
                <button key={label} type="button" className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-sky-400/30 hover:bg-slate-800/90">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-1 text-slate-400 text-sm">Verbessere deine Mastery mit wiederholten Übungen.</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
