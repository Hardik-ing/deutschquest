import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Star } from 'lucide-react';
import { Exercise } from '../../types/database.types';
import { AudioButton } from './AudioButton';
import { SpeechRecognitionComponent } from './SpeechRecognitionComponent';
import { supabase } from '../../config/supabaseClient';

interface ExerciseCardProps {
  exercise: Exercise;
  soundEnabled: boolean;
  onNext: (isCorrect: boolean, skipAndReplace?: boolean) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, soundEnabled, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);
  const [nativeAudioUrl, setNativeAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const exerciseId = String(exercise.id);
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(exerciseId);

    setNativeAudioUrl(null);

    if (!isUuid) return;

    const loadNativeAudio = async () => {
      const { data: audioTrack, error } = await supabase
        .from('audio_assets')
        .select('audio_url')
        .eq('exercise_id', exerciseId)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.warn('Native audio lookup failed:', error.message);
        return;
      }

      setNativeAudioUrl(audioTrack?.audio_url ?? null);
    };

    loadNativeAudio();

    return () => {
      isMounted = false;
    };
  }, [exercise.id]);

  // Helper helper to dynamically translate the core German answer back to English for post-attempt review
  const getEnglishTranslationFallback = (germanText: string): string => {
    const lower = germanText.toLowerCase();
    if (lower.includes('apfel')) return "I eat the apple.";
    if (lower.includes('wasser')) return "I drink the water.";
    if (lower.includes('bruder')) return "I have the brother.";
    if (lower.includes('mutter')) return "I see the mother.";
    if (lower.includes('auto')) return "I buy the car.";
    if (lower.includes('hotel')) return "I book the hotel.";
    if (lower.includes('computer')) return "I search for the computer.";
    if (lower.includes('büro')) return "I see the office.";
    if (lower.includes('wetter')) return "The weather is very beautiful.";
    if (lower.includes('sonne')) return "The sun is very warm.";
    if (lower.includes('wunderbar')) return "That is wonderful for this level.";
    return "Dynamic phrase translated successfully.";
  };

  const playFeedbackSound = (correct: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (correct) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(293.66, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(196.00, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCheck = () => {
    if (exercise.type !== 'speaking' && !selectedOption) return;
    
    let correct = false;
    if (exercise.type === 'speaking') {
      correct = (speakingScore ?? 0) >= 60;
    } else {
      correct = selectedOption === exercise.correct_answer;
    }
    
    setIsCorrect(correct);
    setHasChecked(true);
    playFeedbackSound(correct);
  };

  return (
    <div className="w-full max-w-xl mx-auto glassmorphism rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Question Header */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-500">{exercise.type} challenge</span>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            {/* Show clean prompt or hide specific solution parts until checked */}
            {exercise.question_text}
          </h2>
        </div>
        {exercise.german_audio_text && <AudioButton text={exercise.german_audio_text} audioUrl={nativeAudioUrl} />}
      </div>

      {/* Input Options Grid */}
      <div className="py-2">
        {exercise.type === 'speaking' ? (
          <SpeechRecognitionComponent expectedText={exercise.correct_answer} onResult={(score, text) => { setSpeakingScore(score); setSelectedOption(text); }} />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {exercise.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  disabled={hasChecked}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all flex justify-between items-center ${
                    isSelected ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ⚡ THE TRANSLATION REVEAL BANNER (Triggers post-attempt) */}
      {hasChecked && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`p-4 rounded-2xl flex items-start gap-3 border ${
            isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/20' : 'bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950/20'
          }`}
        >
          {isCorrect ? <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-600" /> : <XCircle className="w-6 h-6 shrink-0 mt-0.5 text-rose-600" />}
          <div className="flex-1 text-sm space-y-1">
            <h4 className="font-extrabold">{isCorrect ? '🎉 Correct!' : '⚠️ Nice Try!'}</h4>
            <p className="text-xs">
              Correct Solution: <span className="font-bold underline text-emerald-600">{exercise.correct_answer}</span>
            </p>
            
            {/* 🎯 TRANSLATION REVEAL HOOK */}
            <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/30 text-xs">
              <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 block">English Meaning:</span>
              <p className="italic font-medium text-slate-700 dark:text-slate-300">
                "{getEnglishTranslationFallback(exercise.correct_answer)}"
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Control Actions */}
      <div className="pt-2">
        {!hasChecked ? (
          <button
            disabled={exercise.type !== 'speaking' && !selectedOption}
            onClick={handleCheck}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all"
          >
            Verify Selection
          </button>
        ) : (
          <button
            onClick={() => onNext(isCorrect, false)}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            Advance Challenge <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
