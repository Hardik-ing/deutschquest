import { useCallback } from 'react';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'de-DE') => {
    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.volume = 1;
    synth.cancel();
    synth.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    synth?.cancel();
  }, []);

  return { speak, stop };
}
