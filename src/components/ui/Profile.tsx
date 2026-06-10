import React from 'react';
import { ArrowLeft, Award, Shield, Milestone, Star, CheckSquare } from 'lucide-react';
import { Profile as ProfileType } from '../../types/database.types';

interface ProfileProps {
  profile: ProfileType;
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Map Track
        </button>

        <div className="glassmorphism rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-3xl font-black text-white shadow-inner">
            HJ
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{profile.username}</h2>
            <p className="text-xs text-slate-400 font-medium">Native Config Interface Language: <span className="text-slate-700 dark:text-slate-200 font-bold">{profile.native_lang}</span></p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-[10px] font-black uppercase text-slate-500">Goal Tier: {profile.learning_goal}</span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-[10px] font-black uppercase border border-emerald-500/20">Active Streak Kept</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase font-extrabold tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> Permanent Badges & Achievements Collection
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glassmorphism p-4 rounded-2xl text-center space-y-2 border-t-4 border-t-amber-500">
              <span className="text-2xl block">🥉</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">First Word Unlocked</h4>
              <p className="text-[10px] text-slate-400">Successfully handled your very first programmatic translation exercise.</p>
            </div>
            <div className="glassmorphism p-4 rounded-2xl text-center space-y-2 border-t-4 border-t-blue-500">
              <span className="text-2xl block">🥈</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">First Lesson Mastery</h4>
              <p className="text-[10px] text-slate-400">Completed a comprehensive core grammar sequence node completely.</p>
            </div>
            <div className="glassmorphism p-4 rounded-2xl text-center space-y-2 border-t-4 border-t-emerald-500">
              <span className="text-2xl block">🥇</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">German Beginner Guru</h4>
              <p className="text-[10px] text-slate-400">Conquered all standard greeting structural quests without losing heart reserves.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
