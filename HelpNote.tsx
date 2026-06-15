import React, { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface HelpNoteProps {
  currentLevel: number;
  activeQuest: number;
}

export const HelpNote: React.FC<HelpNoteProps> = ({ currentLevel, activeQuest }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show the guide if they are on Level 1, Quest 1 and haven't closed it yet
    const hasDismissed = localStorage.getItem('dq_dismissed_guide');
    if (currentLevel === 1 && activeQuest === 1 && !hasDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentLevel, activeQuest]);

  const handleDismiss = () => {
    localStorage.setItem('dq_dismissed_guide', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 mb-6 relative animate-fade-in">
      {/* Close Button */}
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss guide"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Note Content */}
      <div className="flex gap-3 items-start pr-6">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl mt-0.5 shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-200">
            Willkommen! New to DeutschQuest? 🇩🇪
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tap the sound button to hear the sentence. Choose the correct German translation below. 
            <strong> Careful:</strong> Options scramble every round! If you guess wrong, you must click <span className="text-amber-400">"Retry Challenge"</span> to correct it before advancing.
          </p>
        </div>
      </div>
    </div>
  );
};