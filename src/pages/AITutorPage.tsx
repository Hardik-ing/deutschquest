import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type { AppState } from '../types';

const prompts = [
  'Explain the difference between Guten Morgen and Guten Abend.',
  'Correct the sentence: Ich heiße Hardik.',
  'Recommend a revision path for weak vocabulary.',
  'Explain when to use ich vs du.',
];

export function AITutorPage({ state }: { state: AppState }) {
  const [prompt, setPrompt] = useState(prompts[0]);
  const [response, setResponse] = useState('');

  const answer = useMemo(() => {
    if (prompt.includes('Guten Morgen')) {
      return 'Guten Morgen wird morgens verwendet, Guten Abend ab der Dämmerung. Übe beide mit den jeweiligen Situationen.';
    }
    if (prompt.includes('Corre')) {
      return 'Dein Satz ist bereits richtig. Du kannst auch sagen: Ich bin Hardik. Beide Varianten funktionieren.';
    }
    if (prompt.includes('revision')) {
      return 'Konzentriere dich auf schwache Wörter, wiederhole sie mit Audio und spreche sie laut nach.';
    }
    return 'Nutze kurze, klare Sätze und übe täglich für dein nächstes Level.';
  }, [prompt]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-8">
      <Card className="rounded-[36px] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Professor Deutsch</p>
            <h2 className="text-3xl font-semibold text-white">AI Mentor</h2>
            <p className="mt-2 text-slate-400">Stelle Fragen, erhalte Grammatikhilfe und individuelle Motivation.</p>
          </div>
          <Badge>{state.progress.streak} Day streak</Badge>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr,1.2fr]">
          <div className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Ask your AI coach</p>
            {prompts.map(item => (
              <button key={item} type="button" onClick={() => { setPrompt(item); setResponse(''); }} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-sky-400/20 hover:bg-slate-800/90">
                {item}
              </button>
            ))}
          </div>
          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Professor's Response</p>
            <p className="mt-4 text-lg font-semibold text-white">{prompt}</p>
            <div className="mt-6 space-y-4">
              <p className="rounded-3xl bg-slate-950/90 p-4 text-slate-200">{response || answer}</p>
              <Button variant="primary" onClick={() => setResponse(answer)}>Generate Advice</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
