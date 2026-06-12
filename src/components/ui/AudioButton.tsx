import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;

    window.speechSynthesis.cancel();

    let cleanPromptText = '';

    // 🟢 ACCENT FIX: Extract ONLY the quote contents so it stops trying to read layout templates
    const quoteMatch = text.match(/"([^"]*)"/);
    if (quoteMatch && quoteMatch[1]) {
      cleanPromptText = quoteMatch[1];
    } else {
      // Fallback if no quotes exist
      cleanPromptText = text
        .replace(/\[.*?\]/g, '')
        .replace(/—/g, '')
        .replace('Translate:', '')
        .replace(/Grammar Fill-In.*?:\s*/i, '');
    }

    // 🟢 UNDERSCORE FIX: Aggressively convert any series of underscores or dashes into a short silent breath pause
    cleanPromptText = cleanPromptText
      .replace(/_{1,}/g, '...') // Catches any number of consecutive underscores
      .replace(/\(.*?\)/g, '')   // Removals translation hints like (to see) so it stays silent
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanPromptText);
    
    // Set language to English since the sentence frame is English structure
    utterance.lang = 'en-US'; 
    utterance.rate = 0.75; // Slower delivery for maximum academic focus
    utterance.pitch = 1.0;

    // Find a premium native voice system
    const voices = window.speechSynthesis.getVoices();
    const premiumEnglishVoice = voices.find(v => 
      v.lang.startsWith('en-US') && (v.name.includes('Google') || v.name.includes('Natural'))
    ) || voices.find(v => v.lang.startsWith('en-US'));
    
    if (premiumEnglishVoice) utterance.voice = premiumEnglishVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`p-3 rounded-full transition-all ${
        isPlaying
          ? 'bg-indigo-600 text-white scale-95'
          : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md'
      }`}
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
};
