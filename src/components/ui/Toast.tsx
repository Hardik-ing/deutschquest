import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-3xl border border-slate-600 bg-slate-950/95 px-4 py-3 text-sm shadow-xl shadow-slate-950/40 backdrop-blur-xl"
    >
      <p className="text-slate-100">{message}</p>
    </motion.div>
  );
}
