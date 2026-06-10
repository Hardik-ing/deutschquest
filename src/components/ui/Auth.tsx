import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Mail, Lock, User, Milestone } from 'lucide-react';
import { ThemeToggle } from '../layout/ThemeToggle';

interface AuthProps {
  onAuthSuccess: (profile: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [nativeLang, setNativeLang] = useState('English');
  const [learningGoal, setLearningGoal] = useState('Casual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockProfile = {
      id: 'usr-875932',
      username: fullName || email.split('@')[0],
      native_lang: nativeLang,
      learning_goal: learningGoal,
      xp: 120,
      coins: 45,
      streak: 3,
      current_level_id: 1,
      avatar_url: null
    };
    onAuthSuccess(mockProfile);
  };

  return (
    <div className="min-h-screen animated-bg flex flex-col justify-center items-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glassmorphism rounded-3xl p-8 shadow-2xl text-slate-800 dark:text-slate-100 relative overflow-hidden"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent tracking-tight">DeutschQuest</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Learn German absolute beginner to advanced game maps</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Native Lang</label>
                <select
                  value={nativeLang}
                  onChange={(e) => setNativeLang(e.target.value)}
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Marathi">Marathi</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Intensity Goal</label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                >
                  <option value="Casual">Casual (5m/d)</option>
                  <option value="Regular">Regular (15m/d)</option>
                  <option value="Insane">Insane (45m/d)</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold py-3 rounded-xl shadow-lg mt-4 text-sm tracking-wide transform active:scale-95 transition-all"
          >
            {isLogin ? 'Sign In to Account' : 'Register New Account'}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <span className="text-xs font-bold bg-white dark:bg-slate-900 px-3 relative z-10 text-slate-400 uppercase">Or Secure Federated Provider</span>
          <div className="absolute left-0 right-0 top-2 h-[1px] bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/40 hover:bg-white/60 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            <Globe className="w-4 h-4 text-red-500" /> Google Auth
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/40 hover:bg-white/60 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-slate-900 dark:text-white" /> Apple Secure
          </button>
        </div>

        <p className="text-xs text-center font-semibold text-slate-500 mt-6">
          {isLogin ? "Don't have an account yet? " : 'Already mastered a profile? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 dark:text-indigo-400 underline font-bold ml-0.5">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
