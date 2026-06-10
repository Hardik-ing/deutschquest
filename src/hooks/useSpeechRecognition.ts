import { useEffect, useState } from 'react';

type Recognition = typeof window extends never ? never : any;

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
  }, []);

  const start = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported.');
      return;
    }
    const recognition: Recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };
    recognition.onresult = (event: any) => {
      const lastIndex = event.results.length - 1;
      const result = event.results[lastIndex][0].transcript;
      setTranscript(result);
    };
    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stop = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition: Recognition = new SpeechRecognition();
    recognition.stop();
    setIsListening(false);
  };

  return { transcript, isListening, error, start, stop };
}
