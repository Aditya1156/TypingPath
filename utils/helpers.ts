// --- Helper Functions ---

import type { Lesson } from "../types";

// --- Web Audio API Sound Generator ---
let audioContext: AudioContext | null = null;

const initAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
  return audioContext;
};

const createBeep = (frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') => {
  const ctx = initAudioContext();
  if (!ctx) return;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

const createClickSound = () => {
  const ctx = initAudioContext();
  if (!ctx) return;
  const bufferSize = ctx.sampleRate * 0.05; // 50ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.1;
  }
  const source = ctx.createBufferSource();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  source.buffer = buffer;
  filter.type = 'highpass';
  filter.frequency.value = 1000;
  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  source.start();
};

const createSuccessChord = () => {
  const ctx = initAudioContext();
  if (!ctx) return;
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      createBeep(freq, 0.3, 0.15, 'sine');
    }, index * 50);
  });
};

const createCompleteChord = () => {
  const ctx = initAudioContext();
  if (!ctx) return;
  const frequencies = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      createBeep(freq, 0.5, 0.2, 'sine');
    }, index * 30);
  });
};

export type SoundType = 'correct' | 'error' | 'click' | 'success' | 'complete' | 'space' | 'backspace';

export const playSound = (type: SoundType) => {
  try {
    const ctx = initAudioContext();
    if (!ctx) return;
    
    // Resume context if suspended (required for many browsers)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => console.warn('Could not resume audio context:', err));
    }
    
    switch (type) {
      case 'correct':
        createBeep(800, 0.1, 0.3, 'sine');
        break;
      case 'error':
        createBeep(200, 0.2, 0.4, 'sawtooth');
        break;
      case 'click':
        createClickSound();
        break;
      case 'space':
        createBeep(400, 0.05, 0.2, 'sine');
        break;
      case 'backspace':
        createBeep(300, 0.1, 0.25, 'triangle');
        break;
      case 'success':
        createSuccessChord();
        break;
      case 'complete':
        createCompleteChord();
        break;
    }
  } catch (e) {
    console.warn('Error playing sound:', e);
  }
};


const keyToFingerMap: Record<string, string> = {
  // Left Hand
  '`': 'Left Pinky', '1': 'Left Pinky', 'q': 'Left Pinky', 'a': 'Left Pinky', 'z': 'Left Pinky',
  '2': 'Left Ring', 'w': 'Left Ring', 's': 'Left Ring', 'x': 'Left Ring',
  '3': 'Left Middle', 'e': 'Left Middle', 'd': 'Left Middle', 'c': 'Left Middle',
  '4': 'Left Index', 'r': 'Left Index', 'f': 'Left Index', 'v': 'Left Index',
  '5': 'Left Index', 't': 'Left Index', 'g': 'Left Index', 'b': 'Left Index',
  // Right Hand
  '6': 'Right Index', 'y': 'Right Index', 'h': 'Right Index', 'n': 'Right Index',
  '7': 'Right Index', 'u': 'Right Index', 'j': 'Right Index', 'm': 'Right Index',
  '8': 'Right Middle', 'i': 'Right Middle', 'k': 'Right Middle', ',': 'Right Middle',
  '9': 'Right Ring', 'o': 'Right Ring', 'l': 'Right Ring', '.': 'Right Ring',
  '0': 'Right Pinky', 'p': 'Right Pinky', ';': 'Right Pinky', '/': 'Right Pinky',
  '-': 'Right Pinky', '[': 'Right Pinky',
  '=': 'Right Pinky', ']': 'Right Pinky',
  "'": 'Right Pinky', '\\': 'Right Pinky',
  // Thumbs
  ' ': 'Thumb',
};

const shiftMap: Record<string, string> = {
  '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
  '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-',
  '+': '=', '{': '[', '}': ']', '|': '\\', '"': "'", ':': ';',
  '<': ',', '>': '.', '?': '/', 'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g',
  'H': 'h', 'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p', 'Q': 'q',
  'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'
};

/**
 * Determines the keys and fingers to use for a given character.
 * @param char The character to analyze.
 * @returns An object with the keys to press and the fingers to use.
 */
export const getFingersForChar = (char: string): { keys: string[], fingers: string[] } => {
    if (!char) return { keys: [], fingers: [] };

    const isShifted = char in shiftMap;
    const baseKey = isShifted ? shiftMap[char] : char.toLowerCase();
    
    const keysToPress = [baseKey];
    const fingerForBaseKey = keyToFingerMap[baseKey] || null;
    const fingers = fingerForBaseKey ? [fingerForBaseKey] : [];

    if (isShifted) {
        keysToPress.push('shift');
        if (fingerForBaseKey?.startsWith('Left')) {
            fingers.unshift('Right Pinky'); // for Shift
        } else if (fingerForBaseKey?.startsWith('Right')) {
            fingers.unshift('Left Pinky'); // for Shift
        } else {
             fingers.unshift('Pinky'); // Fallback for space etc.
        }
    }

    return {
        keys: keysToPress,
        fingers: fingers.filter(f => f) as string[]
    };
};


/**
 * Calculates words per minute (WPM). A "word" is standardized as 5 characters.
 * @param timeInSeconds The time elapsed in seconds.
 * @param totalChars The total number of characters typed.
 * @returns The calculated WPM.
 */
export const calculateWPM = (timeInSeconds: number, totalChars: number): number => {
  if (totalChars === 0 || timeInSeconds === 0) {
    return 0;
  }
  const minutes = timeInSeconds / 60;
  const words = totalChars / 5;
  return Math.round(words / minutes);
};

/**
 * Calculates typing accuracy.
 * @param totalChars The total number of characters in the test text.
 * @param errors The number of errors made by the user.
 * @returns The accuracy percentage.
 */
export const calculateAccuracy = (totalTyped: number, errors: number): number => {
  if (totalTyped === 0) {
    return 100;
  }
  const correctChars = totalTyped - errors;
  return Math.round((correctChars / totalTyped) * 100);
};

/**
 * Calculates typing consistency based on the timing between keystrokes.
 * @param timestamps An array of timestamps for each keystroke.
 * @returns The consistency percentage.
 */
export const calculateConsistency = (timestamps: number[]): number => {
    if (timestamps.length < 5) {
        return 0; // Not enough data for a meaningful calculation
    }

    const deltas = [];
    for (let i = 1; i < timestamps.length; i++) {
        deltas.push(timestamps[i] - timestamps[i - 1]);
    }

    const mean = deltas.reduce((a, b) => a + b) / deltas.length;
    const variance = deltas.map(d => (d - mean) ** 2).reduce((a, b) => a + b) / deltas.length;
    const stdDev = Math.sqrt(variance);

    // Normalize standard deviation against the mean to get a coefficient of variation.
    // The consistency score is the inverse, scaled to a percentage.
    const consistency = Math.max(0, (1 - stdDev / mean)) * 100;

    return Math.round(consistency);
};

/**
 * Creates a unique identifier for a drill based on the lesson and drill index.
 * @param lesson The lesson object.
 * @param drillIndex The index of the drill within the lesson.
 * @returns A unique string ID for the drill.
 */
export const getDrillId = (lesson: Lesson, drillIndex: number): string => {
  return `${lesson.id}-${drillIndex}`;
};

/**
 * Determines the performance tier based on WPM and accuracy.
 * @param wpm The words per minute achieved.
 * @param accuracy The accuracy percentage achieved.
 * @returns The calculated performance tier.
 */
export const getPerformanceTier = (wpm: number, accuracy: number): 'mastered' | 'proficient' | 'needs-practice' => {
  if (accuracy >= 98 && wpm >= 50) {
    return 'mastered';
  }
  if (accuracy >= 95 && wpm >= 30) {
    return 'proficient';
  }
  return 'needs-practice';
};

/**
 * Checks if a keyboard event code represents a typable character (letter, number, symbol, space).
 * @param code The event.code from a keyboard event.
 * @returns True if the key is typable, false otherwise.
 */
export const isKeyboardCode = (code: string): boolean => {
    return (
        code.startsWith('Key') ||
        code.startsWith('Digit') ||
        code.startsWith('Backquote') ||
        code.startsWith('Minus') ||
        code.startsWith('Equal') ||
        code.startsWith('Bracket') ||
        code.startsWith('Backslash') ||
        code.startsWith('Semicolon') ||
        code.startsWith('Quote') ||
        code.startsWith('Comma') ||
        code.startsWith('Period') ||
        code.startsWith('Slash') ||
        code === 'Space'
    );
};

/**
 * Calculates the progress statistics for a chapter based on completed drills.
 * @param chapterNumber The chapter number (1-30).
 * @param progress The user's progress object.
 * @returns Chapter progress statistics.
 */
export const getChapterProgress = (chapterNumber: number, progress: Record<string, any>) => {
  const chapterDrills = Object.keys(progress).filter(drillId => 
    drillId.startsWith(`${chapterNumber}-`)
  );
  
  const totalDrills = 15; // Each chapter has 15 drills
  const completedDrills = chapterDrills.length;
  const masteredDrills = chapterDrills.filter(drillId => 
    progress[drillId]?.tier === 'mastered'
  ).length;
  const proficientDrills = chapterDrills.filter(drillId => 
    progress[drillId]?.tier === 'proficient'
  ).length;
  
  const completionPercentage = Math.round((completedDrills / totalDrills) * 100);
  const masteryPercentage = Math.round((masteredDrills / totalDrills) * 100);
  
  return {
    totalDrills,
    completedDrills,
    masteredDrills,
    proficientDrills,
    completionPercentage,
    masteryPercentage,
    isCompleted: completedDrills === totalDrills,
    isMastered: masteredDrills === totalDrills
  };
};

/**
 * Calculates overall curriculum progress across all 30 chapters.
 * @param progress The user's progress object.
 * @returns Overall curriculum statistics.
 */
export const getOverallProgress = (progress: Record<string, any>) => {
  const totalChapters = 30;
  const totalDrills = totalChapters * 15; // 30 chapters × 15 drills each = 450 total
  
  let completedChapters = 0;
  let masteredChapters = 0;
  let totalCompletedDrills = Object.keys(progress).length;
  let totalMasteredDrills = Object.values(progress).filter((p: any) => p.tier === 'mastered').length;
  
  // Count completed and mastered chapters
  for (let i = 1; i <= totalChapters; i++) {
    const chapterProgress = getChapterProgress(i, progress);
    if (chapterProgress.isCompleted) completedChapters++;
    if (chapterProgress.isMastered) masteredChapters++;
  }
  
  const overallCompletionPercentage = Math.round((totalCompletedDrills / totalDrills) * 100);
  const overallMasteryPercentage = Math.round((totalMasteredDrills / totalDrills) * 100);
  const chapterCompletionPercentage = Math.round((completedChapters / totalChapters) * 100);
  
  return {
    totalChapters,
    totalDrills,
    completedChapters,
    masteredChapters,
    totalCompletedDrills,
    totalMasteredDrills,
    overallCompletionPercentage,
    overallMasteryPercentage,
    chapterCompletionPercentage,
    isFullyCompleted: completedChapters === totalChapters,
    isFullyMastered: masteredChapters === totalChapters
  };
};

/**
 * Gets the next recommended drill for the user based on their progress.
 * @param progress The user's progress object.
 * @returns Recommendation for the next drill to practice.
 */
export const getNextRecommendedDrill = (progress: Record<string, any>) => {
  // Find the first incomplete drill in sequential order
  for (let chapter = 1; chapter <= 30; chapter++) {
    for (let drill = 0; drill < 15; drill++) {
      const drillId = `${chapter}-${drill}`;
      if (!progress[drillId]) {
        return {
          chapterNumber: chapter,
          drillIndex: drill,
          drillId,
          reason: 'Next in sequence'
        };
      }
    }
  }
  
  // If all drills are completed, find the first non-mastered drill
  for (let chapter = 1; chapter <= 30; chapter++) {
    for (let drill = 0; drill < 15; drill++) {
      const drillId = `${chapter}-${drill}`;
      if (progress[drillId]?.tier !== 'mastered') {
        return {
          chapterNumber: chapter,
          drillIndex: drill,
          drillId,
          reason: 'Needs mastery'
        };
      }
    }
  }
  
  // All drills are mastered - suggest practicing the ultimate challenge
  return {
    chapterNumber: 30,
    drillIndex: 14, // The ultimate test
    drillId: '30-14',
    reason: 'Ultimate challenge'
  };
};