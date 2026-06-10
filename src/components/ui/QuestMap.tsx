import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Play, Star, RotateCcw, ShieldAlert, Award } from 'lucide-react';
import { Quest } from '../../types/database.types';

interface QuestMapProps {
  quests: Quest[];
  onSelectQuest: (questId: number, mode: 'normal' | 'replay' | 'challenge' | 'review') => void;
}

export const QuestMap: React.FC<QuestMapProps> = ({ quests, onSelectQuest }) => {
  return (
    <div className="relative flex flex-col items-center py-12 max-w-xl mx-auto space-y-16">
      <div className="absolute top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full -z-10" />
      
      {quests.map((quest, index) => {
        const isCompleted = quest.completed ?? false;
        const isLocked = index > 0 && !quests[index - 1].completed && !quest.completed;
        const isActive = !isCompleted && !isLocked;

        return (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex flex-col items-center"
          >
            <button
              disabled={isLocked}
              onClick={() => !isLocked && onSelectQuest(quest.id, 'normal')}
              className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
                isCompleted 
                  ? 'bg-emerald-500 border-emerald-300 text-white' 
                  : isActive 
                  ? 'bg-amber-500 border-amber-300 text-white animate-pulse ring-4 ring-amber-400/40' 
                  : 'bg-slate-300 dark:bg-slate-800 border-slate-400 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-10 h-10" />
              ) : isLocked ? (
                <Lock className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10 fill-current ml-1" />
              )}
            </button>

            <div className="mt-4 text-center glassmorphism px-5 py-2.5 rounded-2xl max-w-xs">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Quest {index + 1}</span>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{quest.title}</h4>
              <div className="flex justify-center items-center gap-3 mt-1.5 text-xs font-semibold text-amber-500">
                <span>⚡ +{quest.xp_reward} XP</span>
                <span>🪙 +{quest.coins_reward} Coins</span>
              </div>
            </div>

            {isCompleted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => onSelectQuest(quest.id, 'replay')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay Quest
                </button>
                <button
                  onClick={() => onSelectQuest(quest.id, 'challenge')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-lg transition-colors"
                >
                  <Star className="w-3.5 h-3.5" /> Challenge Mode
                </button>
                <button
                  onClick={() => onSelectQuest(quest.id, 'review')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Review Mistakes
                </button>
                <button
                  onClick={() => onSelectQuest(quest.id, 'normal')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg transition-colors"
                >
                  <Award className="w-3.5 h-3.5" /> Practice Again
                </button>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
