import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type { ProgressState } from '../types';

interface RevisionModePageProps {
  progress: ProgressState;
  updateProgress: (update: Partial<ProgressState>) => void;
}

const weakTopics = ['Color vocabulary', 'Pronunciation of greetings', 'Fill-in-the-blank verbs', 'Listening comprehension'];

export function RevisionModePage({ progress, updateProgress }: RevisionModePageProps) {
  const handleReview = () => {
    updateProgress({ xp: progress.xp + 20, coins: progress.coins + 5 });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Revision Mode</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Practice old lessons and strengthen weak areas.</h2>
          <p className="mt-3 text-slate-400">Personalized review based on your errors, missed words and pronunciation feedback.</p>
        </div>
        <div className="mt-8 grid gap-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
          {weakTopics.map(topic => (
            <div key={topic} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="font-semibold text-white">{topic}</p>
              <p className="mt-2 text-sm text-slate-400">Review this category to increase your mastery and boost your next lesson score.</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Collect revision rewards for weak points.</p>
            <p className="mt-2 text-lg font-semibold text-white">You can earn +20 XP and +5 Coins per review session.</p>
          </div>
          <Button variant="primary" onClick={handleReview}>Start Revision Session</Button>
        </div>
      </Card>
    </motion.div>
  );
}
