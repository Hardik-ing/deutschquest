import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Star, Award, ShieldAlert, Sparkles, Coins, Zap } from 'lucide-react';
import { Exercise } from '../../types/database.types';
import { ExerciseCard } from './ExerciseCard';
import { ConfettiCelebration } from './ConfettiCelebration';

interface LessonEngineProps {
  questId: number;
  mode: 'normal' | 'replay' | 'challenge' | 'review';
  exercises: Exercise[];
  soundEnabled: boolean;
  onClose: (xpEarned: number, coinsEarned: number) => void;
}

export const LessonEngine: React.FC<LessonEngineProps> = ({ questId, mode, exercises, soundEnabled, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const safeExercises = exercises.length > 0 ? exercises : [
    {
      id: 999,
      lesson_id: 1,
      type: 'translation' as const,
      question_text: 'Translate: Hello (Fallback Sandbox Context)',
      german_audio_text: 'Hallo',
      correct_answer: 'Hallo',
      options: ['Hallo', 'Tschüss', 'Bitte', 'Danke']
    }
  ];

  const currentExercise = safeExercises[currentIndex];
  const progressPercent = Math.round((currentIndex / safeExercises.length) * 100);

  const handleNextExercise = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);

    if (currentIndex + 1 < safeExercises.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const xpReward = mode === 'challenge' ? (correctCount * 15) + 30 : (correctCount * 10) + 10;
  const coinsReward = (correctCount * 2);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      <ConfettiCelebration active={showSummary} />

      <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 max-w-3xl w-full mx-auto">
        <button onClick={() => onClose(0, 0)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>
        <span className="text-xs font-black text-slate-400 tracking-wider uppercase">{currentIndex + 1} / {safeExercises.length}</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!showSummary ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="w-full"
            >
              <div className="text-center mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  Arena Context: Mode ({mode})
                </span>
              </div>
              <ExerciseCard exercise={currentExercise} soundEnabled={soundEnabled} onNext={handleNextExercise} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md mx-auto text-center glassmorphism rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 animate-bounce">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">🏆 Quest Completed!</h1>
                <p className="text-xs text-slate-400 font-medium mt-1">Excellent comprehension accuracy. German mastery updated.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-black">
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-center">
                  <Zap className="w-5 h-5 mx-auto mb-1 fill-current" />
                  <span className="text-lg block">+{xpReward}</span>
                  <span className="text-[10px] uppercase text-slate-400 font-bold">XP Earned</span>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-center">
                  <Coins className="w-5 h-5 mx-auto mb-1 fill-current" />
                  <span className="text-lg block">+{coinsReward}</span>
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Coins Distributed</span>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 font-bold flex justify-between items-center">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> New Mastery level achieved</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider">Expert</span>
              </div>

              <button
                onClick={() => onClose(xpReward, coinsReward)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3 rounded-xl shadow-lg transition-all active:scale-95 text-sm tracking-wide"
              >
                Claim Rewards & Return
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-4 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
        DeutschQuest Secure Sandbox Engine Runtime
      </footer>
    </div>
  );
};
