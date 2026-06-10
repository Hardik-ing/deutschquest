import { motion } from 'framer-motion';
import { Edit3, Trophy } from 'lucide-react';
import type { AppState } from '../types';
import { Card } from '../components/ui/Card';

interface ProfilePageProps {
  state: AppState;
}

export function ProfilePage({ state }: ProfilePageProps) {
  const badges = [
    { title: 'German Beginner', description: 'Finish Level 1', earned: true },
    { title: '7 Day Streak', description: 'Keep your streak alive', earned: state.progress.streak >= 7 },
    { title: 'First Lesson', description: 'Complete your first lesson', earned: state.progress.completedLessons.length >= 1 },
    { title: 'Vocabulary Collector', description: 'Learn 50 words', earned: false },
  ];

  return (
    <div className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img src={state.user?.avatar} alt="Avatar" className="h-20 w-20 rounded-3xl border border-white/10 object-cover" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Profil</p>
              <h2 className="text-3xl font-semibold text-white">{state.user?.name}</h2>
              <p className="text-slate-400">{state.user?.learningGoal}</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 transition hover:border-sky-400/30">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card className="rounded-[36px] p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Level Summary</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'XP', value: state.progress.xp },
                { label: 'Coins', value: state.progress.coins },
                { label: 'Streak', value: `${state.progress.streak} Tage` },
                { label: 'Completed Lessons', value: state.progress.completedLessons.length },
              ].map(item => (
                <div key={item.label} className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="rounded-[36px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Trophy Room</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Deine Erfolge</h3>
            </div>
            <Trophy className="h-8 w-8 text-amber-300" />
          </div>
          <div className="mt-6 grid gap-4">
            {badges.map(badge => (
              <div key={badge.title} className={`rounded-3xl border p-4 ${badge.earned ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-white/10 bg-slate-950/80'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{badge.title}</p>
                    <p className="text-sm text-slate-400">{badge.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${badge.earned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>{badge.earned ? 'Earned' : 'Locked'}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
