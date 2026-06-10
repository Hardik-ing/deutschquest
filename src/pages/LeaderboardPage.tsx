import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';

const leaders = [
  { name: 'Lukas', xp: 1240, streak: 12 },
  { name: 'Mia', xp: 1148, streak: 10 },
  { name: 'Noah', xp: 1012, streak: 8 },
  { name: 'Eva', xp: 980, streak: 7 },
];

export function LeaderboardPage() {
  return (
    <div className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Leaderboard</p>
            <h2 className="text-3xl font-semibold text-white">Top Learners der Woche</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-100">
            <Sparkles className="h-4 w-4 text-amber-300" /> Weekly XP showcase
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr,1fr]">
          {leaders.map((leader, index) => (
            <motion.div key={leader.name} whileHover={{ y: -4 }} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{leader.name}</p>
                  <p className="text-sm text-slate-400">Streak: {leader.streak} Tage</p>
                </div>
                <div className="rounded-full bg-slate-800/90 px-3 py-2 text-sm font-semibold text-sky-300">#{index + 1}</div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">XP</p>
                <p className="mt-2 text-3xl font-semibold text-white">{leader.xp}</p>
                <div className="mt-4 h-2 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${Math.min(100, leader.xp / 12)}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-[36px] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Podium</p>
          <div className="mt-8 grid gap-5 rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">1st</span>
              <div>
                <p className="text-xl font-semibold text-white">Lukas</p>
                <p className="text-sm text-slate-400">1,240 XP</p>
              </div>
              <Crown className="h-6 w-6 text-amber-300" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">2nd</span>
              <div>
                <p className="text-lg font-semibold text-white">Mia</p>
                <p className="text-sm text-slate-400">1,148 XP</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">3rd</span>
              <div>
                <p className="text-lg font-semibold text-white">Noah</p>
                <p className="text-sm text-slate-400">1,012 XP</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-[36px] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Monthly XP Leaders</p>
          <ul className="mt-6 space-y-4">
            {leaders.map((leader, index) => (
              <li key={leader.name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4">
                <div>
                  <p className="font-semibold text-white">{leader.name}</p>
                  <p className="text-sm text-slate-500">Streak: {leader.streak} Tage</p>
                </div>
                <span className="text-sm font-semibold text-sky-300">{leader.xp} XP</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
