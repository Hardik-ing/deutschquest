import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx('inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300', className)} {...props}>
      {children}
    </span>
  );
}
