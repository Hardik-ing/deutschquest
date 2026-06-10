import React, { useState } from 'react';
import { ArrowLeft, Save, ShieldAlert, PlusCircle, Trash2 } from 'lucide-react';
import { Exercise } from '../../types/database.types';

export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: 1, lesson_id: 1, type: 'translation', question_text: 'Translate: Good Morning', correct_answer: 'Guten Morgen', options: ['Guten Morgen', 'Guten Abend', 'Hallo'] }
  ]);

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');

  const handleCreateExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !correctAnswer) return;

    const newEx: Exercise = {
      id: Date.now(),
      lesson_id: 1,
      type: 'translation',
      question_text: question,
      correct_answer: correctAnswer,
      options: [correctAnswer, opt1, opt2].filter(Boolean)
    };

    setExercises([...exercises, newEx]);
    setQuestion('');
    setCorrectAnswer('');
    setOpt1('');
    setOpt2('');
    alert('Exercise successfully configured inside live runtime simulation storage state arrays!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Map Tracker
        </button>

        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-red-800 dark:text-red-400">
            <span className="font-black uppercase block">Superuser Admin Mode Active</span>
            Modify language learning structures, append lesson vectors, or verify global database schemas.
          </div>
        </div>

        <div className="glassmorphism rounded-3xl p-6">
          <h3 className="text-sm uppercase font-extrabold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-indigo-500" /> Create Next Content Exercise Challenge
          </h3>

          <form onSubmit={handleCreateExercise} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 uppercase text-slate-400">Exercise Question Text</label>
              <input type="text" required value={question} onChange={e => setQuestion(e.target.value)} placeholder="e.g. Translate: Goodbye" className="w-full p-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold mb-1 uppercase text-slate-400">Correct Answer Choice</label>
                <input type="text" required value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
              </div>
              <div>
                <label className="block font-bold mb-1 uppercase text-slate-400">Distractor Option B</label>
                <input type="text" value={opt1} onChange={e => setOpt1(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
              </div>
              <div>
                <label className="block font-bold mb-1 uppercase text-slate-400">Distractor Option C</label>
                <input type="text" value={opt2} onChange={e => setOpt2(e.target.value)} className="w-full p-2.5 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
              </div>
            </div>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md">
              <Save className="w-4 h-4" /> Store Question
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Active Live Content Catalog Logs</h3>
          {exercises.map((ex) => (
            <div key={ex.id} className="glassmorphism p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <h5 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{ex.question_text}</h5>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Target Key Solution: <span className="text-emerald-500 font-black">{ex.correct_answer}</span></p>
              </div>
              <button onClick={() => setExercises(exercises.filter(item => item.id !== ex.id))} className="text-rose-500 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-500/10 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
