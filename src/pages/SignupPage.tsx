import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { UserData } from '../types';
import { mockUser } from '../data/mockData';

interface SignupPageProps {
  onSignup: (user: UserData) => void;
}

const nativeLanguages = ['English', 'Hindi', 'Marathi', 'French', 'Spanish'];
const goals = ['Travel German', 'Work German', 'Fluent conversation', 'Exam preparation'];

export function SignupPage({ onSignup }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState(nativeLanguages[0]);
  const [goal, setGoal] = useState(goals[0]);

  const valid = !!name && !!email && password.length >= 8 && password === confirmPassword;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-black/80 p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <div className="rounded-[32px] bg-premiumNavy/90 p-8 shadow-xl shadow-black/50">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-premiumCrimson font-bold">Starte deine Reise</p>
            <h2 className="text-3xl font-semibold text-white">Erstelle dein Konto und erhalte tägliche Motivation.</h2>
            <p className="text-slate-400">Wähle deine Muttersprache, dein Lernziel und unlocke Quests für echtes Sprachwachstum.</p>
          </div>
          <div className="mt-8 grid gap-4">
            <label className="space-y-2 text-sm text-slate-200">
              Full Name
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Email
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" type="email" />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Password
              <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Confirm Password
              <Input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" type="password" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                Native Language
                <select className="w-full rounded-3xl border border-slate-700 bg-black px-4 py-3 text-slate-100" value={nativeLanguage} onChange={e => setNativeLanguage(e.target.value)}>
                  {nativeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                Learning Goal
                <select className="w-full rounded-3xl border border-slate-700 bg-black px-4 py-3 text-slate-100" value={goal} onChange={e => setGoal(e.target.value)}>
                  {goals.map(goalOption => <option key={goalOption} value={goalOption}>{goalOption}</option>)}
                </select>
              </label>
            </div>
            <Button variant="primary" disabled={!valid} onClick={() => onSignup({ ...mockUser, name: name || mockUser.name, email: email || mockUser.email, nativeLanguage, learningGoal: goal })}>
              Create Account
            </Button>
            <div className="grid gap-3">
              <Button variant="secondary">Continue with Google</Button>
              <Button variant="ghost">Continue with Apple</Button>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] bg-gradient-to-br from-premiumCrimson/20 via-black to-premiumNavy/90 p-8 shadow-xl shadow-premiumCrimson/10">
          <div className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
              <h3 className="text-xl font-semibold text-white">Props deines Abenteuers</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>• Tägliche XP-Belohnungen</li>
                <li>• Wiederholbare Lektionen</li>
                <li>• Audio- und Sprechübungen</li>
                <li>• Echtzeit Motivation vom Mentor</li>
              </ul>
            </div>
            <p className="text-sm text-slate-400">Bereits ein Konto? <Link to="/login" className="text-premiumCrimson font-bold underline">Hier anmelden</Link>.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
