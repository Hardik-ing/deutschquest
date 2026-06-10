import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Zap, Coins } from 'lucide-react';
import { Exercise } from '../types/database.types';
import { ExerciseCard } from '../components/ui/ExerciseCard';
import { ConfettiCelebration } from '../components/ui/ConfettiCelebration';

interface LessonEngineProps {
  questId: number;
  mode: 'normal' | 'replay' | 'challenge' | 'review';
  exercises: Exercise[];
  soundEnabled: boolean;
  onClose: (xpEarned: number, coinsEarned: number) => void;
}

// 📦 BACKUP VOCABULARY BANK: Injects clean questions into the lesson if a user chooses to skip a mistake
const backupQuestionsPool: Exercise[] = [
  { id: 701, lesson_id: 1, type: 'translation', question_text: 'Translate: Thank you very much', german_audio_text: 'Vielen Dank', correct_answer: 'Vielen Dank', options: ['Vielen Dank', 'Bitte schön', 'Guten Tag'] },
  { id: 702, lesson_id: 1, type: 'translation', question_text: 'Translate: See you later!', german_audio_text: 'Bis später', correct_answer: 'Bis später', options: ['Bis später', 'Auf Wiedersehen', 'Hallo'] },
  { id: 703, lesson_id: 1, type: 'fill_blank', question_text: 'Wie geht es _____?', german_audio_text: 'Wie geht es dir?', correct_answer: 'dir', options: ['dir', 'ihnen', 'mein'] },
  { id: 704, lesson_id: 1, type: 'translation', question_text: 'Translate: You are welcome', german_audio_text: 'Bitte schön', correct_answer: 'Bitte schön', options: ['Bitte schön', 'Hallo', 'Tschüss'] }
];

export const LessonEngine: React.FC<LessonEngineProps> = ({ questId, mode, exercises, soundEnabled, onClose }) => {
  // Store lesson exercises array in active state to allow dynamic fallback changes
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [poolIndex, setPoolIndex] = useState(0);

  // Initialize exercises on mount
  useEffect(() => {
    setActiveExercises(exercises.length > 0 ? [...exercises] : [
      { id: 999, lesson_id: 1, type: 'translation', question_text: 'Translate: Hello', german_audio_text: 'Hallo', correct_answer: 'Hallo', options: ['Hallo', 'Tschüss', 'Bitte'] }
    ]);
  }, [exercises]);

  const currentExercise = activeExercises[currentIndex];
  const progressPercent = activeExercises.length > 0 ? Math.round((currentIndex / activeExercises.length) * 100) : 0;

  // Question Speech Reader hook
  useEffect(() => {
    if (showSummary || !soundEnabled || !currentExercise || !('speechSynthesis' in window)) return;
    const textToSpeak = currentExercise.german_audio_text || currentExercise.question_text;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = currentExercise.german_audio_text ? 'de-DE' : 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn(err);
    }
  }, [currentIndex, showSummary, soundEnabled, activeExercises]);

  const handleNextExercise = (isCorrect: boolean, skipAndReplace?: boolean) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    if (skipAndReplace) {
      // 🔄 EXTRACT NEW BACKUP QUESTION
      const newQuestionBlueprint = backupQuestionsPool[poolIndex % backupQuestionsPool.length];
      setPoolIndex(prev => prev + 1);

      // Create unique runtime identification token to avoid key collisions
      const freshExercise: Exercise = {
        ...newQuestionBlueprint,
        id: Date.now() + poolIndex
      };

      // Swap out the current question with the backup question
      const modifiedQueue = [...activeExercises];
      modifiedQueue[currentIndex] = freshExercise;
      setActiveExercises(modifiedQueue);
      
      // Keep user on the same index so the freshly loaded backup question displays immediately
      return;
    }

    // Advance index forward or complete the lesson
    if (currentIndex + 1 < activeExercises.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const xpReward = (correctCount * 10) + 10;
  const coinsReward = (correctCount * 2);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      <ConfettiCelebration active={showSummary} />

      <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 max-w-3xl w-full mx-auto">
        <button onClick={() => onClose(0, 0)} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
        </div>
        <span className="text-xs font-black text-slate-400">{currentIndex + 1} / {activeExercises.length}</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!showSummary && currentExercise ? (
            <motion.div key={currentExercise.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="w-full">
              <ExerciseCard exercise={currentExercise} soundEnabled={soundEnabled} onNext={handleNextExercise} />
            </motion.div>
          ) : showSummary ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto text-center glassmorphism rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 animate-bounce inline-block">
                <Award className="w-12 h-12" />
              </div>
              <h1 className="text-2xl font-black">🏆 Quest Complete!</h1>
              <p className="text-xs text-slate-400">Your custom learning paths have adjusted successfully.</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-xl"><Zap className="w-5 h-5 mx-auto fill-current" /><span>+{xpReward} XP</span></div>
                <div className="p-4 bg-yellow-500/10 text-yellow-500 rounded-xl"><Coins className="w-5 h-5 mx-auto fill-current" /><span>+{coinsReward} Coins</span></div>
              </div>
              <button onClick={() => onClose(xpReward, coinsReward)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3 rounded-xl">Continue</button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
};
