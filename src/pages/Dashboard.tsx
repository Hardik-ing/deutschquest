import React, { useState } from 'react';
import { Trophy, Flame, Coins, Zap, Settings, Volume2, VolumeX, Crown, UserCheck } from 'lucide-react';
import { Profile, Quest } from '../types/database.types';
import { QuestMap } from '../components/ui/QuestMap';
import { AITutorPanel } from '../components/ui/AITutorPanel';

interface DashboardProps {
  profile: Profile;
  quests: Quest[];
  onSelectQuest: (questId: number, mode: 'normal' | 'replay' | 'challenge' | 'review') => void;
  onNavigate: (page: string) => void;
  onToggleSound: (enabled: boolean) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, quests, onSelectQuest, onNavigate, onToggleSound }) => {
  // Split the 100 levels into manageable groups for smoother UI navigation
  const [activeTier, setActiveTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

  const filteredQuests = quests.filter(q => {
    if (activeTier === 'tier1') return q.level_id < 20;               // Free Levels (1-19)
    if (activeTier === 'tier2') return q.level_id >= 20 && q.level_id < 60; // Core Premium (20-59)
    return q.level_id >= 60;                                          // Mastery Hub (60-100)
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 glassmorphism shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">DeutschQuest</h2>
          {profile.is_premium && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Crown className="w-3 h-3 fill-current" /> Plus Member
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs font-black">
          <button
            onClick={() => onToggleSound(!profile.sound_enabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
              profile.sound_enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}
          >
            {profile.sound_enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{profile.sound_enabled ? "Audio: On" : "Audio: Muted"}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 fill-current" /> <span>{profile.streak} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-500 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 fill-current" /> <span>{profile.xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full">
            <Coins className="w-4 h-4 fill-current" /> <span>{profile.coins} Coins</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* LEFT COLUMN: 100 LEVEL ACCORDION TIER CONSOLE */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* WELCOME CARD WITH RESUME BUTTON */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black">Willkommen, {profile.username}! 👋</h1>
              <p className="text-xs text-slate-300 mt-1 max-w-md">Continue your language learning journey from where you left off.</p>
            </div>
            <button 
              onClick={() => onSelectQuest(profile.current_level_id, 'normal')}
              className="bg-emerald-500 hover:bg-emerald-400 px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 text-white whitespace-nowrap"
            >
              Resume Journey (Lvl {profile.current_level_id})
            </button>
          </div>
          
          {/* TIER SEGMENT FILTER BAR */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-200/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTier('tier1')}
              className={`py-2 text-xs font-black rounded-xl transition-all ${activeTier === 'tier1' ? 'bg-white dark:bg-slate-800 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Basics (1-19)
            </button>
            <button 
              onClick={() => setActiveTier('tier2')}
              className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${activeTier === 'tier2' ? 'bg-white dark:bg-slate-800 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Intermediate (20-59) { !profile.is_premium && <Crown className="w-3 h-3 text-amber-500 fill-current" /> }
            </button>
            <button 
              onClick={() => setActiveTier('tier3')}
              className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${activeTier === 'tier3' ? 'bg-white dark:bg-slate-800 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Mastery (60-100) { !profile.is_premium && <Crown className="w-3 h-3 text-amber-500 fill-current" /> }
            </button>
          </div>

          {/* RENDERING DYNAMIC SCROLL PATH */}
          <div className="glassmorphism p-6 rounded-3xl relative min-h-[500px]">
            <div className="mb-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Displaying {filteredQuests.length} Modules in Current Category
              </span>
            </div>
            
            <QuestMap quests={filteredQuests} onSelectQuest={onSelectQuest} />
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR PERKS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-4 rounded-2xl glassmorphism space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
              <Settings className="w-4 h-4" /> Preferences
            </h4>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 p-3 rounded-xl">
              <div>
                <span className="text-xs font-bold block">Audio Auto-Read</span>
                <span className="text-[10px] text-slate-400">Speaks when a card mounts</span>
              </div>
              <input
                type="checkbox"
                checked={profile.sound_enabled}
                onChange={(e) => onToggleSound(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('leaderboard')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 text-left flex flex-col gap-2"><Trophy className="w-6 h-6 text-amber-500" /><span className="text-xs font-black">Leaderboard</span></button>
            <button onClick={() => onNavigate('profile')} className="p-4 rounded-2xl glassmorphism hover:bg-slate-100 dark:hover:bg-slate-900 text-left flex flex-col gap-2"><UserCheck className="w-6 h-6 text-blue-500" /><span className="text-xs font-black">Profile</span></button>
          </div>

          <AITutorPanel />
        </div>
      </div>
    </div>
  );
};
