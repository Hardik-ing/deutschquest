import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  lang: 'de-DE' | 'en-US';
  langCode?: 'de-DE' | 'en-US';
  audioUrl?: string | null;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, langCode, lang, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const resolvedLangCode = lang ?? langCode;

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

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;
    if (playNativeAudio()) return;

    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech engine is not supported in this browser version.');
      return;
    }

    window.speechSynthesis.cancel();

    const cleanPromptText = text
      .replace(/\[.*?\]/g, '')
      .replace(/—/g, '')
      .replace('Translate:', '')
      .trim();
    const utterance = new SpeechSynthesisUtterance(cleanPromptText);
    utterance.lang = resolvedLangCode;
    utterance.rate = resolvedLangCode === 'en-US' ? 0.75 : 0.85;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (resolvedLangCode === 'en-US') {
      const premiumEnglishVoice = voices.find(v =>
        v.lang.startsWith('en-US') && (v.name.includes('Google') || v.name.includes('Natural'))
      ) || voices.find(v => v.lang.startsWith('en-US'));

      if (premiumEnglishVoice) utterance.voice = premiumEnglishVoice;
    } else {
      const premiumGermanVoice = voices.find(v =>
        v.lang.startsWith('de-DE') && (v.name.includes('Google') || v.name.includes('Natural'))
      ) || voices.find(v => v.lang.startsWith('de-DE'));

      if (premiumGermanVoice) utterance.voice = premiumGermanVoice;
    }

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
          ? 'bg-indigo-600 text-white scale-95 shadow-inner'
          : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md hover:scale-105'
      }`}
      title={audioUrl ? 'Play native German recording' : 'Listen to question prompt'}
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
};
