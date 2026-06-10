import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20',
        className,
      )}
      {...props}
    />
  );
}
