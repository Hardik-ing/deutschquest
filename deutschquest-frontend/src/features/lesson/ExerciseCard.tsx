// BUILD_VERSION: 1.0.2-FORCE_REFRESH
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Mic, RefreshCw } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);

  // 🟢 CRITICAL TRACKING FIX 1: Reset question-state strings every single time the main ID updates
  useEffect(() => {
    setHasChecked(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setIsRecording(false);
  }, [exercise?.id]); // 🌟 Binds strictly to the question ID tracker to wipe out past states

  // 🟢 CRITICAL TRACKING FIX 2: Compute a true random layout instantly before rendering using useMemo
  const shuffledOptions = useMemo(() => {
    if (!exercise || !exercise.options || exercise.options.length === 0) return [];
    
    const optionsCopy = [...exercise.options];
    // Fisher-Yates shuffle algorithm execution
    for (let i = optionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
    }
    return optionsCopy;
  }, [exercise?.id, exercise?.options]); // Only recalculates when a brand new question loads

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

  const handleRetry = () => {
    setHasChecked(false);
    setSelectedOption(null);
    setIsCorrect(false);
  };

  const determineLanguage = (text: string): 'en-US' | 'de-DE' => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('translate') || lowerText.includes('fill-in')) return 'en-US';
    return 'de-DE';
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 text-slate-100">
      
      {/* Challenge Header Layout */}
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

      {/* Main Content Interface Area */}
      {exercise.type === 'speaking' ? (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-4">
          <p className="text-sm font-semibold text-slate-400">GERMAN SPEAKING PRACTICE</p>
          <p className="text-xl font-black text-indigo-300 italic">"{exercise.correct_answer}"</p>
          <button
            type="button"
            disabled={hasChecked}
            onClick={() => setIsRecording(!isRecording)}
            className={`p-5 rounded-full transition-all ${isRecording ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white shadow-lg'}`}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {shuffledOptions.map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={`${exercise.id}-option-${idx}`} // Unique key matching prevents DOM tree caching bugs
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

      {/* State Validation Banner */}
      <AnimatePresence>
        {hasChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border text-sm ${
              isCorrect ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400' : 'bg-rose-950/30 border-rose-500/50 text-rose-400'
            }`}
          >
            <h4 className="font-extrabold">{isCorrect ? '🎉 Correct!' : '⚠️ Nice Try!'}</h4>
            <p className="text-xs mt-0.5">
              {isCorrect ? 'Great job! You ready to move forward.' : 'That choice is incorrect. Try finding the right answer to proceed.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  ANTI-CHEAT MASTER FOOTER CONTROLLER */}
      <div className="w-full pt-2">
        {!hasChecked ? (
          // State 1: User hasn't clicked verify yet
          <button
            type="button"
            disabled={!selectedOption && exercise.type !== 'speaking'}
            onClick={handleCheck}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 py-4 text-white font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider"
          >
            Verify Selection
          </button>
        ) : isCorrect ? (
          // State 2: Answer is verified and CORRECT -> User can go to next level
          <button
            type="button"
            onClick={() => onNext(isCorrect)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 text-white font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Advance Challenge ➔
          </button>
        ) : (
          // State 3: Answer is verified and WRONG -> Strictly show RETRY option only
          <button
            type="button"
            onClick={handleRetry}
            className="w-full bg-amber-600 hover:bg-amber-500 py-4 text-white font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Retry Challenge
          </button>
        )}
      </div>

    </div>
  );
};
