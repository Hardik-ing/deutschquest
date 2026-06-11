import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  langCode?: string;
  audioUrl?: string | null;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, langCode = 'de-DE', audioUrl }) => {
  const [speaking, setSpeaking] = useState(false);

  const playNativeAudio = () => {
    if (!audioUrl) return false;

    const audio = new Audio(audioUrl);
    audio.onplay = () => setSpeaking(true);
    audio.onended = () => setSpeaking(false);
    audio.onerror = () => setSpeaking(false);
    audio.play().catch(error => {
      setSpeaking(false);
      console.log('Native audio playback blocked:', error);
    });
    return true;
  };

  const playSmsFlow = (messageText: string) => {
    const utterance = new SpeechSynthesisUtterance(messageText);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
      const successAudio = new Audio('/audio/success.mp3');
      successAudio.play().catch(error => console.log('Audio play blocked:', error));
    };
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    if (playNativeAudio()) return;

    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech engine is not supported in this browser version.');
      return;
    }

    window.speechSynthesis.cancel();

    if (langCode === 'en-IN') {
      playSmsFlow(text);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.85; // slightly slower for optimal phonetic training

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className={`p-3 rounded-full transition-all active:scale-90 ${
        speaking ? 'bg-emerald-500 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-500'
      }`}
      title={audioUrl ? 'Play native German recording' : `Pronounce in target dialect (${langCode})`}
    >
      {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};
