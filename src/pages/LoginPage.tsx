import { motion } from 'framer-motion';
// @ts-ignore
import { supabase } from '../config/supabaseClient';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useState } from 'react';
import type { UserData } from '../types';
import { mockUser } from '../data/mockData';

interface LoginPageProps {
  onLogin: (user: UserData) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-6 rounded-[32px] bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Willkommen zurück</p>
            <h2 className="text-3xl font-semibold text-white">Logge dich ein und setze dein Abenteuer fort.</h2>
            <p className="text-slate-400">Lerne Deutsch mit täglichen Quests, XP, Belohnungen und echten Fortschritten.</p>
          </div>
          <div className="grid gap-4">
            <label className="space-y-2 text-sm text-slate-200">
              Email
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" type="email" />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Passwort
              <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" />
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-400" />
              Remember Me
            </label>
            <Button variant="primary" onClick={() => onLogin({ ...mockUser, email: email || mockUser.email })}>Login</Button>
            <div className="grid gap-3">
              <Button variant="secondary">Continue with Google</Button>
              <Button variant="ghost">Continue with Apple</Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-slate-200 shadow-xl shadow-slate-950/40">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" />
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">DeutschQuest startet hier</h3>
              <p className="text-slate-400">Verfolge deinen Fortschritt, sammle Münzen und vervollständige tägliche Lernquests.</p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-950/70 p-4">
              {['XP-System', 'Tägliche Quests', 'Sprachübungen', 'AI Tutor'].map(item => (
                <div key={item} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{item}</span>
                  <span className="text-xs uppercase tracking-[0.24em] text-sky-300">Neu</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">Noch kein Konto? <Link to="/signup" className="text-sky-300 underline">Erstelle eines</Link>.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
