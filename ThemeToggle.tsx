import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // If you use lucide icons

export const ThemeToggle: React.FC = () => {
  // 1. Initialize state based on what the user previously chose, defaulting to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('dq_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // 2. Watch for state changes and update the document root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('dq_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('dq_theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      type="button"
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2.5 bg-slate-800 dark:bg-slate-200 text-amber-400 dark:text-indigo-950 rounded-xl border border-white/5 shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Toggle Theme Mode"
    >
      {/* Swap icons or text dynamically based on current mode */}
      {isDarkMode ? (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <Sun className="w-4 h-4" /> <span>Light Mode</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <Moon className="w-4 h-4" /> <span>Night Mode</span>
        </div>
      )}
    </button>
  );
};