import React, { useState } from 'react';
import { Bot, Send, Sparkles, Wand2 } from 'lucide-react';

export const AITutorPanel: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hallo! I am Professor Deutsch, your smart AI Language Guide. Stuck on vocabulary syntax or gendered articles? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let explanation = `Excellent query! In German syntax, notice how verb structures shift position based on context rules. Keep reviewing past exercises!`;
      if (input.toLowerCase().includes('guten morgen')) {
        explanation = `Aha! "Guten Morgen" is used specifically as a greeting from dawn until around 11 AM. Afterward, shift smoothly toward using "Guten Tag"!`;
      } else if (input.toLowerCase().includes('article') || input.toLowerCase().includes('the')) {
        explanation = `German uses three gendered noun articles: "der" (masculine), "die" (feminine), and "das" (neuter). Practice parsing compound words regularly to predict them easily!`;
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: explanation }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="glassmorphism rounded-2xl p-5 flex flex-col h-[400px] w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
        <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-xl text-white">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            Professor Deutsch <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </h3>
          <p className="text-[11px] font-medium text-emerald-500">AI Tutor Mentor active</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
              m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl rounded-tl-none p-3 text-slate-400 italic flex items-center gap-2">
              <Wand2 className="w-3.5 h-3.5 animate-spin" /> Professor Deutsch is translating thoughts...
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask grammar grammar or phrase structures..."
          className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
        />
        <button
          onClick={handleSend}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
