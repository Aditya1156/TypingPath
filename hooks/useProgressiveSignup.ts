import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProgressiveSignupState {
  shouldShowPrompt: boolean;
  promptReason: string;
  sessionsCompleted: number;
  testsCompleted: number;
  timeSpent: number; // in seconds
}

// Constants for trigger thresholds
const THRESHOLDS = {
  SESSIONS: 3,
  PERFORMANCE_WPM: 40,
  PERFORMANCE_ACCURACY: 95,
  TESTS: 5,
  TIME_MINUTES: 10
} as const;

const STORAGE_KEYS = {
  SESSIONS: 'guestSessions',
  TESTS: 'guestTests',
  TIME: 'guestTimeSpent'
} as const;

export const useProgressiveSignup = () => {
  const { user } = useAuth();
  const [state, setState] = useState<ProgressiveSignupState>({
    shouldShowPrompt: false,
    promptReason: '',
    sessionsCompleted: 0,
    testsCompleted: 0,
    timeSpent: 0
  });

  // Memoize guest user check
  const isGuestUser = useMemo(() => !user || user.uid === 'guest', [user]);

  // Helper to get stored value with error handling
  const getStoredValue = useCallback((key: string): number => {
    try {
      return parseInt(localStorage.getItem(key) || '0', 10) || 0;
    } catch {
      return 0;
    }
  }, []);

  // Helper to set stored value with error handling
  const setStoredValue = useCallback((key: string, value: number): void => {
    try {
      localStorage.setItem(key, value.toString());
    } catch {
      // Fail silently if localStorage is not available
    }
  }, []);

  // Initialize from localStorage for guest users
  useEffect(() => {
    if (isGuestUser) {
      const sessions = getStoredValue(STORAGE_KEYS.SESSIONS);
      const tests = getStoredValue(STORAGE_KEYS.TESTS);
      const time = getStoredValue(STORAGE_KEYS.TIME);
      
      setState(prev => ({
        ...prev,
        sessionsCompleted: sessions,
        testsCompleted: tests,
        timeSpent: time
      }));
    }
  }, [isGuestUser, getStoredValue]);

  // Track session completion with optimized state updates
  const trackSessionComplete = useCallback(() => {
    if (isGuestUser) {
      setState(prev => {
        const newSessions = prev.sessionsCompleted + 1;
        setStoredValue(STORAGE_KEYS.SESSIONS, newSessions);

        // Show prompt after threshold sessions
        if (newSessions >= THRESHOLDS.SESSIONS) {
          return {
            ...prev,
            sessionsCompleted: newSessions,
            shouldShowPrompt: true,
            promptReason: 'sessions'
          };
        }
        
        return { ...prev, sessionsCompleted: newSessions };
      });
    }
  }, [isGuestUser, setStoredValue]);

  // Track test completion with optimized state updates
  const trackTestComplete = useCallback((wpm: number, accuracy: number) => {
    if (isGuestUser) {
      setState(prev => {
        const newTests = prev.testsCompleted + 1;
        setStoredValue(STORAGE_KEYS.TESTS, newTests);

        // Show prompt after good performance or test threshold
        const hasGoodPerformance = wpm >= THRESHOLDS.PERFORMANCE_WPM && accuracy >= THRESHOLDS.PERFORMANCE_ACCURACY;
        const reachedTestThreshold = newTests >= THRESHOLDS.TESTS;

        if (hasGoodPerformance) {
          return {
            ...prev,
            testsCompleted: newTests,
            shouldShowPrompt: true,
            promptReason: 'performance'
          };
        } else if (reachedTestThreshold) {
          return {
            ...prev,
            testsCompleted: newTests,
            shouldShowPrompt: true,
            promptReason: 'tests'
          };
        }

        return { ...prev, testsCompleted: newTests };
      });
    }
  }, [isGuestUser, setStoredValue]);

  // Track time spent with optimized state updates
  const trackTimeSpent = useCallback((seconds: number) => {
    if (isGuestUser) {
      setState(prev => {
        const newTimeSpent = prev.timeSpent + seconds;
        setStoredValue(STORAGE_KEYS.TIME, newTimeSpent);

        // Show prompt after time threshold (10 minutes = 600 seconds)
        if (newTimeSpent >= THRESHOLDS.TIME_MINUTES * 60) {
          return {
            ...prev,
            timeSpent: newTimeSpent,
            shouldShowPrompt: true,
            promptReason: 'time'
          };
        }

        return { ...prev, timeSpent: newTimeSpent };
      });
    }
  }, [isGuestUser, setStoredValue]);

  // Dismiss prompt
  const dismissPrompt = useCallback(() => {
    setState(prev => ({
      ...prev,
      shouldShowPrompt: false,
      promptReason: ''
    }));
  }, []);

  // Reset all guest data (for sign-up completion)
  const resetGuestData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSIONS);
      localStorage.removeItem(STORAGE_KEYS.TESTS);
      localStorage.removeItem(STORAGE_KEYS.TIME);
    } catch {
      // Fail silently if localStorage is not available
    }
    
    setState({
      shouldShowPrompt: false,
      promptReason: '',
      sessionsCompleted: 0,
      testsCompleted: 0,
      timeSpent: 0
    });
  }, []);

  // Memoized prompt message generator
  const getPromptMessage = useMemo(() => {
    const { promptReason, sessionsCompleted, testsCompleted, timeSpent } = state;
    
    switch (promptReason) {
      case 'sessions':
        return {
          title: '🎉 You\'re on fire!',
          message: `You've completed ${sessionsCompleted} practice sessions! Sign up to track your progress and unlock advanced features.`
        };
      case 'performance':
        return {
          title: '⚡ Impressive performance!',
          message: 'Your typing skills are improving! Sign up to save your achievements and get personalized coaching.'
        };
      case 'tests':
        return {
          title: '📈 Consistent practice!',
          message: `You've completed ${testsCompleted} tests! Sign up to see detailed analytics and track your improvement over time.`
        };
      case 'time':
        return {
          title: '⏰ Dedicated learner!',
          message: `You've practiced for ${Math.round(timeSpent / 60)} minutes! Sign up to save your progress and access premium features.`
        };
      default:
        return {
          title: '🚀 Ready to level up?',
          message: 'Sign up to save your progress and unlock advanced typing features!'
        };
    }
  }, [state]);

  return {
    shouldShowPrompt: state.shouldShowPrompt,
    promptReason: state.promptReason,
    sessionsCompleted: state.sessionsCompleted,
    testsCompleted: state.testsCompleted,
    timeSpent: state.timeSpent,
    isGuestUser,
    trackSessionComplete,
    trackTestComplete,
    trackTimeSpent,
    dismissPrompt,
    resetGuestData,
    getPromptMessage
  };
};
