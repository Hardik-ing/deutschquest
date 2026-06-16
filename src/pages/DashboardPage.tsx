import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Card } from '../components/ui/Card';
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
        <Card className="overflow-hidden p-8 bg-premiumNavy text-white border-none shadow-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-premiumCrimson font-bold">Willkommen, {state.user?.name}</p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl text-white">Dein Deutsch-Level</h2>
              <p className="mt-3 max-w-xl text-slate-300 text-lg">Setze deine Reise fort, an elite, gamified learning experience designed for modern language learners.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 text-slate-100 shadow-lg border border-white/20">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Aktueller Fortschritt</p>
              <p className="mt-3 text-4xl font-bold">Level 1</p>
              <div className="mt-4 rounded-full bg-white/20 p-1">
                <div className="h-3 rounded-full bg-premiumCrimson transition-all" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{progressPercentage}% zum nächsten Level</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'XP', value: state.progress.xp },
              { label: 'Coins', value: state.progress.coins },
              { label: 'Streak', value: `${state.progress.streak} Tage` },
            ].map(item => (
              <div key={item.label} className="bg-white border-l-4 border-premiumCrimson p-5 rounded-r-xl shadow-md">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-premiumNavy">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="grid gap-4 p-6 bg-white shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-premiumCrimson font-bold">Motivation</p>
              <h3 className="mt-2 text-2xl font-bold text-premiumNavy">{motivation}</h3>
            </div>
            <User className="h-9 w-9 text-premiumCrimson" />
          </div>
          <div className="grid gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
            <div className="bg-white border-l-4 border-premiumNavy p-6 rounded-r-xl shadow-md">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 font-bold">Continue Your Journey</p>
              <h3 className="text-xl font-bold text-premiumNavy mt-2">{currentLesson.title}</h3>
              <p className="mt-2 text-sm text-slate-600">Quest: {quest.title}</p>
              <p className="mt-1 text-sm text-slate-600">Fortschritt: {progressPercentage}%</p>
              <Link to={`/lesson/${currentLesson.id}`} className="mt-5 block text-center bg-premiumCrimson hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-150">
                Start Your Quest
              </Link>
            </div>
          </div>
        </Card>
      </motion.section>

      <motion.section className="grid gap-5 lg:grid-cols-4">
        {['Vocabulary', 'Grammar', 'Listening', 'Speaking'].map(title => (
          <Card key={title} className="rounded-xl bg-white shadow-md border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold">{title}</p>
                <p className="mt-3 text-2xl font-extrabold text-premiumNavy">{Math.floor(Math.random() * 85) + 15}%</p>
              </div>
              <Badge>{['Beginner', 'Good', 'Strong', 'Expert'][Math.floor(Math.random() * 4)]}</Badge>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-premiumNavy" style={{ width: `${Math.floor(Math.random() * 65) + 25}%` }} />
            </div>
          </Card>
        ))}
      </motion.section>

      <motion.section className="grid gap-5 xl:grid-cols-[1.25fr,0.75fr]">
        <Card className="rounded-2xl bg-white shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-premiumCrimson font-bold">Daily Goals</p>
                <h3 className="mt-2 text-2xl font-extrabold text-premiumNavy">Ziele für heute</h3>
              </div>
              <Badge>+25 Coins</Badge>
            </div>
            <div className="space-y-4">
              {['Complete 2 Lessons', 'Earn 50 XP', 'Practice 10 Words'].map(goal => (
                <div key={goal} className="bg-white border-l-4 border-premiumCrimson p-5 rounded-r-xl shadow-sm border-y border-r border-slate-100">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-premiumNavy">{goal}</p>
                      <p className="text-sm text-slate-500 mt-1">Reward: +25 Coins</p>
                    </div>
                    <span className="rounded-full bg-premiumNavy/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-premiumNavy font-bold">In progress</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl bg-premiumNavy text-white shadow-xl border-none p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-premiumCrimson font-bold">German Fluency Journey</p>
              <h3 className="mt-2 text-2xl font-extrabold text-white">A1 → A2 → B1 → B2 → C1 → C2</h3>
            </div>
            <div className="space-y-3">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((stage, index) => (
                <div key={stage} className="grid gap-2">
                  <div className="flex items-center justify-between text-sm text-slate-300 font-semibold">
                    <span>{stage}</span>
                    <span>{[25, 38, 55, 70, 85, 100][index]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-premiumCrimson" style={{ width: `${[25, 38, 55, 70, 85, 100][index]}%` }} />
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
