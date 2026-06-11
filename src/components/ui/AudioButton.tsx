import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  lang?: 'de-DE' | 'en-US';
  langCode?: 'de-DE' | 'en-US';
  audioUrl?: string | null;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, langCode, lang, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const resolvedLangCode = lang ?? langCode ?? 'de-DE';

  const playNativeAudio = () => {
    if (!audioUrl) return false;

    const audio = new Audio(audioUrl);
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    audio.play().catch(error => {
      setIsPlaying(false);
      console.log('Native audio playback blocked:', error);
    });
    return true;
  };

  const handleSpeak = () => {
    if (!text) return;
    if (playNativeAudio()) return;

    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech engine is not supported in this browser version.');
      return;
    }

    window.speechSynthesis.cancel();

    const cleanPromptText = text.replace(/\[.*?\]/g, '').replace('Translate:', '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanPromptText);
    utterance.lang = resolvedLangCode;
    utterance.rate = resolvedLangCode === 'de-DE' ? 0.85 : 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`p-3 rounded-full transition-all active:scale-90 ${
        isPlaying
          ? 'bg-indigo-600 text-white animate-pulse'
          : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md'
      }`}
      title={audioUrl ? 'Play native German recording' : 'Listen to question prompt'}
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
};
