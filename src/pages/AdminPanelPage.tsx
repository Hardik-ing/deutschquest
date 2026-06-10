import { motion } from 'framer-motion';
import { PlusCircle, User, ServerCog } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function AdminPanelPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Admin Dashboard</p>
            <h2 className="text-3xl font-semibold text-white">Manage Levels, Lessons & Progress</h2>
          </div>
          <Button variant="secondary">Create New Level</Button>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            { title: 'Levels & Quests', description: 'Organisiere Inhalte und Spielebenen.', icon: <PlusCircle className="h-6 w-6 text-sky-300" /> },
            { title: 'User Management', description: 'Verwalte Benutzer, Fortschritte und Stream.', icon: <User className="h-6 w-6 text-emerald-300" /> },
            { title: 'Audio & Media', description: 'Lade Audios sowie Grafiken hoch.', icon: <ServerCog className="h-6 w-6 text-violet-300" /> },
          ].map(item => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center gap-3">{item.icon}<h3 className="text-xl font-semibold text-white">{item.title}</h3></div>
              <p className="mt-3 text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
