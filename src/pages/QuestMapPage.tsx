import { motion } from 'framer-motion';
// @ts-ignore
import { supabase } from '../config/supabaseClient';
import { Link } from 'react-router-dom';
import { questList } from '../data/mockData';
import type { ProgressState } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface QuestMapPageProps {
  progress: ProgressState;
  updateProgress: (update: Partial<ProgressState>) => void;
}

export function QuestMapPage({ progress, updateProgress }: QuestMapPageProps) {
  const completedQuests = new Set(progress.completedQuests);

  const handleComplete = (questId: string) => {
    if (completedQuests.has(questId)) return;
    updateProgress({
      completedQuests: [...progress.completedQuests, questId],
      xp: progress.xp + 30,
      coins: progress.coins + 12,
    });
  };

  return (
    <div className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Quest Map</p>
          <h2 className="text-3xl font-semibold text-white">Reise durch das Deutsch-Universum</h2>
          <p className="text-slate-400">Schließe Quests ab, speichere deine Erfolge und bleibe motiviert. Jede abgeschlossene Quest bleibt immer zugänglich.</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {questList.map((quest, index) => {
            const isCompleted = completedQuests.has(quest.id);
            const isUnlocked = quest.unlocked || isCompleted;
            return (
              <motion.div
                key={quest.id}
                className={`rounded-[24px] border p-6 transition ${isCompleted ? 'border-emerald-400/40 bg-emerald-500/10' : isUnlocked ? 'border-slate-600 bg-slate-950/80' : 'border-slate-700 bg-slate-900/60 opacity-60'}`}
                whileHover={{ y: isUnlocked ? -4 : 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{quest.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{quest.description}</p>
                  </div>
                  <Badge>{isCompleted ? 'Completed' : isUnlocked ? 'Open' : 'Locked'}</Badge>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr,auto]">
                  <Link
                    to={`/lesson/${quest.lessonId}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isUnlocked ? 'bg-sky-500 text-slate-950 hover:bg-sky-400' : 'cursor-not-allowed bg-slate-700 text-slate-500'}`}
                  >
                    Open Lesson
                  </Link>
                  <button
                    type="button"
                    disabled={!isUnlocked || isCompleted}
                    onClick={() => handleComplete(quest.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'} ${!isUnlocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {isCompleted ? 'Replay Quest' : 'Complete Quest'}
                  </button>
                </div>
                <div className="mt-4 text-sm text-slate-400">Reward: +{quest.rewardXp} XP, +{quest.rewardCoins} Coins</div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
          <p className="font-semibold text-white">Reminder</p>
          <p className="mt-2 text-slate-400">Completed quests stay available forever. Replay them anytime to improve mastery, review mistakes, or challenge yourself.</p>
        </div>
      </Card>
    </div>
  );
}
