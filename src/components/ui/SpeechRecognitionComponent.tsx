import React, { useState, useEffect } from 'react';
import { Mic, MicOff, RefreshCw } from 'lucide-react';

interface SpeechRecognitionProps {
  expectedText: string;
  onResult: (score: number, speechText: string) => void;
}

export const SpeechRecognitionComponent: React.FC<SpeechRecognitionProps> = ({ expectedText, onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'de-DE';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      
      rec.onresult = (event: any) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        
        const cleanTarget = expectedText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
        const cleanSpeech = speechToText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
        
        let matchScore = 0;
        if (cleanTarget === cleanSpeech) {
          matchScore = 100;
        } else {
          const targetWords = cleanTarget.split(' ');
          const matchingWords = targetWords.filter((w: string) => cleanSpeech.includes(w));
          matchScore = Math.round((matchingWords.length / targetWords.length) * 100);
        }
        
        onResult(matchScore, speechToText);
      };

      setRecognition(rec);
    }
  }, [expectedText, onResult]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Web Speech Microphone API engine unavailable in this interface framework.');
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      setTranscript('');
      recognition.start();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl w-full max-w-md mx-auto space-y-4">
      <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">German Speaking Practice</p>
      <blockquote className="text-xl font-bold text-blue-600 dark:text-blue-400">"{expectedText}"</blockquote>
      
      <button
        onClick={toggleListening}
        className={`p-5 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
          isListening ? 'bg-red-500 animate-bounce animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500'
        }`}
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>

      {transcript && (
        <div className="text-center bg-slate-100 dark:bg-slate-800 p-3 rounded-xl w-full">
          <p className="text-xs text-slate-400">System Transcribed Voice Input:</p>
          <p className="font-medium text-slate-700 dark:text-slate-300 italic">"{transcript}"</p>
        </div>
      )}
    </div>
  );
};
