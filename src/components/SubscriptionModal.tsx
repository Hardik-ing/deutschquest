import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Zap, Crown, X, Check } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-2xl border border-indigo-500/30 relative overflow-hidden"
          >
            {/* Background Light Glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mt-4">
              <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 animate-pulse border border-amber-500/30">
                <Crown className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                Unlock DeutschQuest Plus
              </h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                You reached Level 20! Unlock full access to complete your journey to native fluency.
              </p>
            </div>

            {/* Feature Perks Checklist */}
            <div className="my-6 space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                <span>Unlock Advanced Campaign Levels 20 to 100</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                <span>Unlimited Lesson Hearts & Mistake Replays</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                <span>Advanced AI Voice Chat with Professor Deutsch</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="border-2 border-amber-500 bg-amber-500/10 p-4 rounded-2xl flex justify-between items-center relative">
              <span className="absolute -top-2.5 left-4 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                Best Value
              </span>
              <div>
                <span className="text-sm font-black block text-amber-400">DeutschQuest Fluency Pass</span>
                <span className="text-[10px] text-slate-300">Continuous programmatic updates</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black block">$9.99<span className="text-xs font-medium">/mo</span></span>
                <span className="text-[9px] text-slate-400 line-through">$19.99/mo</span>
              </div>
            </div>

            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black py-3.5 rounded-xl shadow-xl shadow-amber-500/10 transform active:scale-98 transition-all text-center text-sm tracking-wide mt-6 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" /> Upgrade Instantly & Continue Journeys
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
