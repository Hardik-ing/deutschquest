import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('rounded-[28px] border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-glow', className)} {...props} />
  );
}
