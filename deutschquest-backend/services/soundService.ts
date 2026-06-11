export const playFeedbackSound = (correct: boolean, soundEnabled: boolean) => {
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
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);     // Note C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // Note E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // Note G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(293.66, ctx.currentTime); // Note D4
      osc.frequency.linearRampToValueAtTime(196.00, ctx.currentTime + 0.25); // Slide down to G3
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (err) {
    console.warn("Audio Context playback restricted:", err);
  }
};
