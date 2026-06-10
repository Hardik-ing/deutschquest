import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  langCode?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, langCode = 'de-DE' }) => {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.85; // slightly slower for optimal phonetic training

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech engine is not supported in this browser version.');
    }
  };

  return (
    <button
      onClick={speak}
      className={`p-3 rounded-full transition-all active:scale-90 ${
        speaking ? 'bg-emerald-500 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-500'
      }`}
      title={`Pronounce in target dialect (${langCode})`}
    >
      {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};
