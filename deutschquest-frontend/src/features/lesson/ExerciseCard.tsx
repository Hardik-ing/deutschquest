import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Mic } from 'lucide-react';
import { Exercise } from '../../../../deutschquest-backend/types/database.types';
import { playFeedbackSound } from '../../../../deutschquest-backend/services/soundService';
import { AudioButton } from '../../components/AudioButton';

interface ExerciseCardProps {
  exercise: Exercise;
  soundEnabled: boolean;
  onNext: (isCorrect: boolean) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, soundEnabled, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!exercise) return;

    setHasChecked(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setIsRecording(false);

    if (exercise.options && exercise.options.length > 0) {
      const optionsCopy = [...exercise.options];
      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }
      setShuffledOptions(optionsCopy);
    } else {
      setShuffledOptions([]);
    }
  }, [exercise]);

  const handleCheck = () => {
    if (exercise.type === 'speaking') {
      setIsCorrect(true);
      setHasChecked(true);
      playFeedbackSound(true, soundEnabled);
      return;
    }

    if (!selectedOption) return;

    const correct = selectedOption === exercise.correct_answer;
    setIsCorrect(correct);
    setHasChecked(true);

    playFeedbackSound(correct, soundEnabled);
  };

  const determineLanguage = (text: string): 'en-US' | 'de-DE' => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('translate') || lowerText.includes('to have')) return 'en-US';
    return 'de-DE';
  };

  const getCleanEnglishMeaning = () => {
    if (exercise.type === 'translation') {
      return exercise.question_text.replace(/\[.*?\]/g, '').replace('Translate:', '').trim();
    }

    const enrichedExercise = exercise as Exercise & {
      english_translation?: string;
      english_meaning?: string;
    };

    return enrichedExercise.english_translation || enrichedExercise.english_meaning || 'Translate the context phrase structure.';
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 text-slate-100">
      {/* Challenge Header */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-black tracking-widest text-indigo-400 block">
            {exercise.type}_challenge
          </span>
          <h2 className="text-lg font-bold mt-1 text-slate-200">
            {exercise.question_text}
          </h2>
        </div>
        {exercise.question_text && (
          <AudioButton text={exercise.question_text} lang={determineLanguage(exercise.question_text)} />
        )}
      </div>

      {exercise.type === 'speaking' ? (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-4">
          <p className="text-sm font-semibold text-slate-400">GERMAN SPEAKING PRACTICE</p>
          <p className="text-xl font-black text-indigo-300 italic">"{exercise.correct_answer}"</p>

          <button
            type="button"
            disabled={hasChecked}
            onClick={() => setIsRecording(!isRecording)}
            className={`p-5 rounded-full transition-all ${
              isRecording ? 'bg-rose-600 animate-ping text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
            }`}
          >
            <Mic className="w-6 h-6" />
          </button>
          <p className="text-xs text-slate-500">{isRecording ? 'Listening...' : 'Tap mic to practice pronunciation'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {shuffledOptions.map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={idx}
                disabled={hasChecked}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all text-sm flex justify-between items-center ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-400'
                    : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{option}</span>
                <span className="text-xs text-slate-600">Option {idx + 1}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {hasChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 rounded-2xl border text-sm ${
              isCorrect ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400' : 'bg-rose-950/30 border-rose-500/50 text-rose-400'
            }`}
          >
            <h4 className="font-extrabold">
              {isCorrect ? (
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Correct!</span>
              ) : (
                <span className="inline-flex items-center gap-2"><XCircle className="w-4 h-4" /> Nice Try!</span>
              )}
            </h4>
            <p className="text-xs mt-0.5">Correct Solution: <span className="font-bold underline">{exercise.correct_answer}</span></p>

            <div className="mt-3 pt-2 border-t border-slate-700/50 text-xs">
              <span className="font-black text-[10px] uppercase tracking-wider text-slate-500 block">ENGLISH MEANING:</span>
              <p className="italic font-medium text-slate-300 mt-0.5">
                "{getCleanEnglishMeaning()}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        disabled={!selectedOption && exercise.type !== 'speaking'}
        onClick={!hasChecked ? handleCheck : () => onNext(isCorrect)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 py-3.5 text-white font-black rounded-xl shadow-lg transition-all tracking-wide text-sm"
      >
        {!hasChecked ? 'Verify Selection' : 'Advance Challenge ->'}
      </button>
    </div>
  );
};
