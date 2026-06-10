import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/70',
        variant === 'primary' && 'bg-sky-500 text-slate-950 border-transparent hover:bg-sky-400 shadow-sky-500/30',
        variant === 'secondary' && 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700',
        variant === 'ghost' && 'bg-transparent text-slate-100 border-slate-600 hover:border-slate-500 hover:bg-white/5',
        variant === 'danger' && 'bg-rose-500 text-white border-transparent hover:bg-rose-400',
        className,
      )}
      {...props}
    />
  );
}
