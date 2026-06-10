import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Coins, Zap, BookOpen, Compass, Shield, UserCheck, FlameKindling, Activity, GraduationCap } from 'lucide-react';
import { Profile, Quest } from '../../types/database.types';
import { QuestMap } from './QuestMap';
import { AITutorPanel } from './AITutorPanel';

interface DashboardProps {
  profile: Profile;
  quests: Quest[];
  onSelectQuest: (questId: number, mode: 'normal' | 'replay' | 'challenge' | 'review') => void;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, quests, onSelectQuest, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <header className="sticky top-0 z-50 glassmorphism shadow-md px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">DeutschQuest Dashboard</h2>
        
        <div className="flex items-center gap-4 text-xs font-black">
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-full border border-amber-500/20">
            <Flame className="w-4 h-4 fill-current animate-pulse" /> <span>{profile.streak} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-500 px-3 py-1.5 rounded-full border border-indigo-500/20">
            <Zap className="w-4 h-4 fill-current" /> <span>{profile.xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full border border-yellow-500/20">
            <Coins className="w-4 h-4 fill-current" /> <span>{profile.coins} Coins</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black">Willkommen, {profile.username}! 👋</h1>
              <p className="text-xs text-slate-300 mt-1 max-w-md">Your language-learning game is synchronized. Resume your journey below to build your fluency streak.</p>
              <div className="flex items-center gap-2 mt-4 text-xs bg-white/10 px-3 py-1.5 rounded-lg w-max font-bold border border-white/10">
                <GraduationCap className="w-4 h-4" /> Global CEFR Roadmap Level: A1 Fluency
              </div>
            </div>
            <button 
              onClick={() => onSelectQuest(quests.find(q => !q.completed)?.id || quests[0].id, 'normal')}
              className="bg-emerald-500 hover:bg-emerald-400 px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 transition-all active:scale-95 text-white"
            >
              Continue Journey
            </button>
          </div>

          <div className="glassmorphism p-6 rounded-3xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">Level 1: German Basics Campaign</h3>
                <p className="text-xs text-slate-400">Complete quests sequentially to unlock specialized challenge tiers</p>
              </div>
              <div className="text-right text-xs font-bold text-slate-500">
                <span>{quests.filter(q => q.completed).length} / {quests.length} Completed</span>
              </div>
            </div>
            <QuestMap quests={quests} onSelectQuest={onSelectQuest} />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('leaderboard')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-left flex flex-col gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">Leaderboard</span>
            </button>
            <button onClick={() => onNavigate('profile')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-left flex flex-col gap-2">
              <UserCheck className="w-6 h-6 text-blue-500" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">Profile & Badges</span>
            </button>
            <button onClick={() => onNavigate('admin')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-left flex flex-col gap-2">
              <Compass className="w-6 h-6 text-purple-500" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">Admin Module</span>
            </button>
            <button onClick={() => alert('Launching Revision Arena...')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-left flex flex-col gap-2">
              <Activity className="w-6 h-6 text-rose-500" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">Revision Mode</span>
            </button>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wide">
              <FlameKindling className="w-4 h-4" /> Daily Goals Engine
            </div>
            <ul className="text-xs font-bold text-slate-600 dark:text-slate-300 space-y-1.5">
              <li className="flex justify-between"><span>• Practice 10 core words today</span> <span className="text-emerald-500">✔ Done</span></li>
              <li className="flex justify-between"><span>• Secure 50 total XP rewards</span> <span className="text-slate-400">20 XP left</span></li>
            </ul>
          </div>

          <AITutorPanel />
        </div>

      </div>
    </div>
  );
};
