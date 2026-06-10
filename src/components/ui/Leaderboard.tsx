import React from 'react';
import { ArrowLeft, Trophy, Medal, ShieldAlert } from 'lucide-react';

export const Leaderboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const topLearners = [
    { username: 'AlphaLinguist', xp: 4890, rank: 1, avatar: '🥇' },
    { username: 'Hardik Jain', xp: 3950, rank: 2, avatar: '🥈' },
    { username: 'BerlinCoder', xp: 2100, rank: 3, avatar: '🥉' },
    { username: 'Emma_Schmidt', xp: 1850, rank: 4, avatar: '⚡' },
    { username: 'TechGuru_DE', xp: 1200, rank: 5, avatar: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Quest Map
        </button>

        <div className="text-center">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto animate-pulse" />
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-2">Weekly Leaderboard Arena</h1>
          <p className="text-xs text-slate-400">Compete globally against language learners. Resets every single Sunday night.</p>
        </div>

        <div className="glassmorphism rounded-3xl p-4 divide-y divide-slate-200 dark:divide-slate-800">
          {topLearners.map((learner, index) => (
            <div key={index} className="flex items-center justify-between py-4 px-2 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 rounded-xl transition-all">
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-slate-400 w-6">{learner.rank}</span>
                <span className="text-2xl">{learner.avatar}</span>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{learner.username}</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Verified Native Competitor</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{learner.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
