export type State = "start" | "run" | "finish";

export interface ErrorDetail {
  expected: string;
  actual: string;
  index: number;
}

export interface AiAnalysis {
  analysis: string;
  drill: string[];
}

export type PracticeMode = 'keys' | 'words' | 'paragraph' | 'code';

export interface Lesson {
  id: string;
  name:string;
  texts: string[]; // A lesson now contains multiple drills for variety
  type?: 'test' | 'guide';
}

export interface Chapter {
  id:string;
  name: string;
  description: string;
  lessons: Lesson[];
}

// Additions for progress tracking
export type PerformanceTier = 'mastered' | 'proficient' | 'needs-practice';

export interface DrillPerformance {
  wpm: number;
  accuracy: number;
  tier: PerformanceTier;
  timestamp: number;
}

export type Progress = Record<string, DrillPerformance>;

// Addition for authentication - Aligned with Firebase
export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string for premium/pro
  trialUsed?: boolean;
  sessionsUsed?: number; // For free tier session limits
  lastSessionDate?: string; // YYYY-MM-DD format
}

export interface PremiumFeatures {
  aiCoach: boolean;
  advancedAnalytics: boolean;
  unlimitedSessions: boolean;
  customLessons: boolean;
  exportData: boolean;
  themesUnlocked: number; // Number of themes unlocked
  lessonsUnlocked: number; // Number of lessons unlocked
  practiceModesUnlocked: PracticeMode[]; // Available practice modes
}

export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  subscription: SubscriptionInfo;
  features: PremiumFeatures;
}

export type ModalType = 'signIn' | 'signUp' | 'profile' | 'settings' | 'upgrade';


// Additions for Toast Notifications
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

// Additions for Settings
export type Theme = 'dark' | 'light' | 'hacker' | 'ocean' | 'sunset' | 'forest';
export type CaretStyle = 'line' | 'block' | 'underline';

export interface SettingsContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isSoundEnabled: boolean;
    toggleSound: () => void;
    caretStyle: CaretStyle;
    setCaretStyle: (style: CaretStyle) => void;
}

// Timer related types
export interface TimerStats {
  dailyTimeSpent: number; // in seconds
  weeklyTimeSpent: number; // in seconds
  monthlyTimeSpent: number; // in seconds
  totalTimeSpent: number; // in seconds
  currentSessionTime: number; // in seconds
  dailyGoal: number; // in seconds (default 30 minutes)
  sessionLimit: number; // in seconds (default 2 hours)
  dailyLimit: number; // in seconds (default 8 hours)
  streak: number; // days
  lastActiveDate: string; // YYYY-MM-DD format
}

export interface TimerContextType {
  timerStats: TimerStats;
  isSessionActive: boolean;
  startSession: () => void;
  endSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  setDailyGoal: (seconds: number) => void;
  setSessionLimit: (seconds: number) => void;
  setDailyLimit: (seconds: number) => void;
  formatTime: (seconds: number) => string;
  getTimeUntilGoal: () => number;
  isGoalReached: () => boolean;
  isSessionLimitReached: () => boolean;
  isDailyLimitReached: () => boolean;
  getTimeUntilSessionLimit: () => number;
  getTimeUntilDailyLimit: () => number;
}