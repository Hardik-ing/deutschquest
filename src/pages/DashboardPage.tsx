import { motion } from 'framer-motion';
// @ts-ignore
import { supabase } from '../config/supabaseClient';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { questList, lessons, timelessMotivation } from '../data/mockData';
import type { AppState, ProgressState } from '../types';

interface DashboardPageProps {
  state: AppState;
  updateProgress: (update: Partial<ProgressState>) => void;
}

function getCurrentQuest(progress: ProgressState) {
  return questList.find(q => q.unlocked && !progress.completedQuests.includes(q.id)) ?? questList[questList.length - 1];
}

export function DashboardPage({ state }: DashboardPageProps) {
  const quest = getCurrentQuest(state.progress);
  const currentLesson = lessons.find(lesson => lesson.id === state.progress.lastLessonId) ?? lessons[0];
  const motivation = timelessMotivation[Math.floor(Math.random() * timelessMotivation.length)];
  const progressPercentage = Math.min(100, Math.round((state.progress.xp / 300) * 100));

  return (
    <div className="grid gap-8">
      <motion.section className="grid gap-5 sm:grid-cols-[1.5fr,1fr]">
        <Card className="overflow-hidden p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Willkommen, {state.user?.name}</p>
              <h2 className="mt-2 text-4xl font-semibold text-white">Dein Deutsch-Level</h2>
              <p className="mt-3 max-w-xl text-slate-400">Setze deine Reise fort, verbessere deine Wortschatz-Beherrschung und schließe Belohnungs-Quests ab.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-100 shadow-xl shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Aktueller Fortschritt</p>
              <p className="mt-3 text-4xl font-semibold text-white">Level 1</p>
              <div className="mt-4 rounded-full bg-slate-800/90 p-1">
                <div className="h-3 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{progressPercentage}% zum nächsten Level</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'XP', value: state.progress.xp, accent: 'text-sky-300' },
              { label: 'Coins', value: state.progress.coins, accent: 'text-amber-300' },
              { label: 'Streak', value: `${state.progress.streak} Tage`, accent: 'text-emerald-300' },
            ].map(item => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                <p className={`mt-3 text-3xl font-semibold ${item.accent}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="grid gap-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Motivation</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{motivation}</h3>
            </div>
            <User className="h-9 w-9 text-sky-300" />
          </div>
          <div className="grid gap-3 rounded-3xl bg-slate-950/80 p-4">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Continue Your Journey</p>
              <p className="mt-2 text-lg font-semibold text-white">{currentLesson.title}</p>
              <p className="mt-2 text-sm text-slate-400">Quest: {quest.title}</p>
              <p className="mt-2 text-sm text-slate-400">Fortschritt: {progressPercentage}%</p>
              <Link to={`/lesson/${currentLesson.id}`} className="mt-4 inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">Continue</Link>
            </div>
          </div>
        </Card>
      </motion.section>

      <motion.section className="grid gap-5 lg:grid-cols-4">
        {['Vocabulary', 'Grammar', 'Listening', 'Speaking'].map(title => (
          <Card key={title} className="rounded-[32px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{Math.floor(Math.random() * 85) + 15}%</p>
              </div>
              <Badge>{['Beginner', 'Good', 'Strong', 'Expert'][Math.floor(Math.random() * 4)]}</Badge>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${Math.floor(Math.random() * 65) + 25}%` }} />
            </div>
          </Card>
        ))}
      </motion.section>

      <motion.section className="grid gap-5 xl:grid-cols-[1.25fr,0.75fr]">
        <Card className="rounded-[36px] p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Daily Goals</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Ziele für heute</h3>
              </div>
              <Badge>+25 Coins</Badge>
            </div>
            <div className="space-y-4">
              {['Complete 2 Lessons', 'Earn 50 XP', 'Practice 10 Words'].map(goal => (
                <div key={goal} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{goal}</p>
                      <p className="text-sm text-slate-400">Reward: +25 Coins</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">In progress</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="rounded-[36px] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">German Fluency Journey</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">A1 → A2 → B1 → B2 → C1 → C2</h3>
            </div>
            <div className="space-y-3">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((stage, index) => (
                <div key={stage} className="grid gap-2">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{stage}</span>
                    <span>{[25, 38, 55, 70, 85, 100][index]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900/80">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${[25, 38, 55, 70, 85, 100][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}
