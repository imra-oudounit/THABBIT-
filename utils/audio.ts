// Pleasant, self-contained sound effects using Web Audio API
let audioCtx: AudioContext | null = null;
let isMuted = false;

export function setMuted(muted: boolean) {
  isMuted = muted;
}

export function getMuted() {
  return isMuted;
}

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq: number, type: OscillatorType, duration: number, volume: number, delay: number = 0) {
  if (isMuted) return;
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
  
  osc.start(now);
  osc.stop(now + duration);
}

export function playSound(type: 'click' | 'success' | 'error' | 'celebrate' | 'listen') {
  if (isMuted) return;

  if (type === 'click') {
    // Soft, subtle UI click (high frequency, very short)
    playTone(800, 'sine', 0.05, 0.03);
  } 
  else if (type === 'success') {
    // Pleasant major chord chime (C5 - E5 - G5)
    playTone(523.25, 'sine', 0.4, 0.08);
    playTone(659.25, 'sine', 0.4, 0.08, 0.1);
    playTone(783.99, 'sine', 0.5, 0.08, 0.2);
  } 
  else if (type === 'error') {
    // Soft, low descending tone (gentle, not harsh)
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.25);
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  } 
  else if (type === 'celebrate') {
    // Upbeat, cheerful arpeggio (C major 7)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; 
    notes.forEach((freq, i) => {
      playTone(freq, 'sine', 0.4, 0.06, i * 0.08);
    });
  }
  else if (type === 'listen') {
    // Subtle, soft pulsing ambient sound
    playTone(440, 'sine', 0.5, 0.02);
  }
}
