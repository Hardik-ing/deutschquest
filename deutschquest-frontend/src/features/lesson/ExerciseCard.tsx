import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
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

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = selectedOption === exercise.correct_answer;
    setIsCorrect(correct);
    setHasChecked(true);
    
    // 🟢 Triggers our backend sound service cleanly!
    playFeedbackSound(correct, soundEnabled);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-500">
            {exercise.type} challenge
          </span>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            {exercise.question_text}
          </h2>
        </div>

        {/* Fixed audio trigger: passes the exact question text to be spoken. */}
        {exercise.question_text && (
          <AudioButton
            text={exercise.question_text}
            lang={
              exercise.question_text.toLowerCase().includes('translate:') ||
              exercise.question_text.toLowerCase().includes('book the')
                ? 'en-US'
                : 'de-DE'
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            disabled={hasChecked}
            onClick={() => setSelectedOption(option)}
            className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
              selectedOption === option ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {hasChecked && (
        <div className={`p-4 rounded-2xl border font-bold text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-rose-50 border-rose-400 text-rose-800'}`}>
          {isCorrect ? '🎉 Correct!' : '⚠️ Nice try!'}
        </div>
      )}

      <button
        disabled={!selectedOption}
        onClick={!hasChecked ? handleCheck : () => onNext(isCorrect)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-3.5 text-white font-extrabold rounded-xl shadow-lg transition-all"
      >
        {!hasChecked ? 'Verify Answer' : 'Continue'}
      </button>
    </div>
  );
};
