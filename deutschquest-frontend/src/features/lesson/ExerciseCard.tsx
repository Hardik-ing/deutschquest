import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
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

  useEffect(() => {
    if (exercise?.options) {
      const optionsCopy = [...exercise.options];

      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }

      setShuffledOptions(optionsCopy);
      setSelectedOption(null);
      setHasChecked(false);
    }
  }, [exercise]);

  const handleCheck = () => {
    if (!selectedOption) return;

    const correct = selectedOption === exercise.correct_answer;
    setIsCorrect(correct);
    setHasChecked(true);

    playFeedbackSound(correct, soundEnabled);
  };

  const determineLanguage = (text: string): 'en-US' | 'de-DE' => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('translate') || lowerText.includes('book the')) return 'en-US';
    return 'de-DE';
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl space-y-6">
      {/* Header Block */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-500">{exercise.type} challenge</span>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{exercise.question_text}</h2>
        </div>
        {exercise.question_text && (
          <AudioButton text={exercise.question_text} lang={determineLanguage(exercise.question_text)} />
        )}
      </div>

      {/* Options Grid Layout */}
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
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{option}</span>
              <span className="text-xs text-slate-400 font-medium">Option {idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Banner Feedback Panel */}
      {hasChecked && (
        <div className={`p-4 rounded-2xl border font-bold text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-rose-50 border-rose-400 text-rose-800'}`}>
          {isCorrect ? (
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Correct Solution!</span>
          ) : (
            <span className="inline-flex items-center gap-2"><XCircle className="w-4 h-4" /> Nice attempt! Keep improving.</span>
          )}
          <p className="text-xs font-medium mt-1 text-slate-500">Target: {exercise.correct_answer}</p>
        </div>
      )}

      {/* Control Action Button */}
      <button
        disabled={!selectedOption}
        onClick={!hasChecked ? handleCheck : () => onNext(isCorrect)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 py-3.5 text-white font-extrabold rounded-xl shadow-lg transition-all"
      >
        {!hasChecked ? 'Verify Selection' : 'Advance Challenge'}
      </button>
    </div>
  );
};
