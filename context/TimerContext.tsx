import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthContext';

interface TimerStats {
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

interface TimerContextType {
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

const defaultTimerStats: TimerStats = {
  dailyTimeSpent: 0,
  weeklyTimeSpent: 0,
  monthlyTimeSpent: 0,
  totalTimeSpent: 0,
  currentSessionTime: 0,
  dailyGoal: 1800, // 30 minutes default
  sessionLimit: 7200, // 2 hours default
  dailyLimit: 28800, // 8 hours default
  streak: 0,
  lastActiveDate: ''
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [timerStats, setTimerStats] = useState<TimerStats>(defaultTimerStats);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);

  // Load timer stats from Firebase
  const loadTimerStats = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const docRef = db.collection('userTimerStats').doc(user.uid);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data() as TimerStats;
        
        // Check if it's a new day and reset daily stats
        if (data.lastActiveDate !== today) {
          const updatedStats = {
            ...data,
            dailyTimeSpent: 0,
            currentSessionTime: 0,
            lastActiveDate: today,
            // Update streak logic
            streak: isConsecutiveDay(data.lastActiveDate, today) ? data.streak + 1 : 1
          };
          
          setTimerStats(updatedStats);
          await docRef.set(updatedStats);
        } else {
          setTimerStats(data);
        }
      } else {
        // First time user
        const initialStats = {
          ...defaultTimerStats,
          lastActiveDate: today
        };
        setTimerStats(initialStats);
        await docRef.set(initialStats);
      }
    } catch (error) {
      console.error('Error loading timer stats:', error);
    }
  }, [user?.uid]);

  // Check if two dates are consecutive days
  const isConsecutiveDay = (lastDate: string, currentDate: string): boolean => {
    if (!lastDate) return false;
    
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diffTime = current.getTime() - last.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 1;
  };

  // Save timer stats to Firebase
  const saveTimerStats = useCallback(async (stats: TimerStats) => {
    if (!user?.uid) return;

    try {
      await db.collection('userTimerStats').doc(user.uid).set(stats);
    } catch (error) {
      console.error('Error saving timer stats:', error);
    }
  }, [user?.uid]);

  // Update session time every second
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSessionActive && !isPaused && sessionStartTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - sessionStartTime) / 1000) + pausedTime;
        
        setTimerStats(prev => ({
          ...prev,
          currentSessionTime: elapsedTime
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, isPaused, sessionStartTime, pausedTime]);

  // Load stats on component mount and user change
  useEffect(() => {
    loadTimerStats();
  }, [loadTimerStats]);

  const startSession = useCallback(() => {
    const now = Date.now();
    setSessionStartTime(now);
    setIsSessionActive(true);
    setIsPaused(false);
    setPausedTime(0);
    
    setTimerStats(prev => ({
      ...prev,
      currentSessionTime: 0
    }));
  }, []);

  const pauseSession = useCallback(() => {
    if (isSessionActive && !isPaused) {
      setIsPaused(true);
      if (sessionStartTime) {
        const currentPausedTime = Math.floor((Date.now() - sessionStartTime) / 1000) + pausedTime;
        setPausedTime(currentPausedTime);
      }
    }
  }, [isSessionActive, isPaused, sessionStartTime, pausedTime]);

  const resumeSession = useCallback(() => {
    if (isSessionActive && isPaused) {
      setSessionStartTime(Date.now());
      setIsPaused(false);
    }
  }, [isSessionActive, isPaused]);

  const endSession = useCallback(async () => {
    if (!isSessionActive) return;

    const sessionTime = timerStats.currentSessionTime;
    const today = new Date().toISOString().split('T')[0];
    
    const updatedStats: TimerStats = {
      ...timerStats,
      dailyTimeSpent: timerStats.dailyTimeSpent + sessionTime,
      weeklyTimeSpent: timerStats.weeklyTimeSpent + sessionTime,
      monthlyTimeSpent: timerStats.monthlyTimeSpent + sessionTime,
      totalTimeSpent: timerStats.totalTimeSpent + sessionTime,
      currentSessionTime: 0,
      lastActiveDate: today
    };

    setTimerStats(updatedStats);
    await saveTimerStats(updatedStats);
    
    setIsSessionActive(false);
    setSessionStartTime(null);
    setIsPaused(false);
    setPausedTime(0);
  }, [isSessionActive, timerStats, saveTimerStats]);

  const setDailyGoal = useCallback(async (seconds: number) => {
    const updatedStats = {
      ...timerStats,
      dailyGoal: seconds
    };
    
    setTimerStats(updatedStats);
    await saveTimerStats(updatedStats);
  }, [timerStats, saveTimerStats]);

  const setSessionLimit = useCallback(async (seconds: number) => {
    const updatedStats = {
      ...timerStats,
      sessionLimit: seconds
    };
    
    setTimerStats(updatedStats);
    await saveTimerStats(updatedStats);
  }, [timerStats, saveTimerStats]);

  const setDailyLimit = useCallback(async (seconds: number) => {
    const updatedStats = {
      ...timerStats,
      dailyLimit: seconds
    };
    
    setTimerStats(updatedStats);
    await saveTimerStats(updatedStats);
  }, [timerStats, saveTimerStats]);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }, []);

  const getTimeUntilGoal = useCallback((): number => {
    return Math.max(0, timerStats.dailyGoal - timerStats.dailyTimeSpent);
  }, [timerStats.dailyGoal, timerStats.dailyTimeSpent]);

  const isGoalReached = useCallback((): boolean => {
    return timerStats.dailyTimeSpent >= timerStats.dailyGoal;
  }, [timerStats.dailyTimeSpent, timerStats.dailyGoal]);

  const isSessionLimitReached = useCallback((): boolean => {
    return timerStats.currentSessionTime >= timerStats.sessionLimit;
  }, [timerStats.currentSessionTime, timerStats.sessionLimit]);

  const isDailyLimitReached = useCallback((): boolean => {
    return timerStats.dailyTimeSpent >= timerStats.dailyLimit;
  }, [timerStats.dailyTimeSpent, timerStats.dailyLimit]);

  const getTimeUntilSessionLimit = useCallback((): number => {
    return Math.max(0, timerStats.sessionLimit - timerStats.currentSessionTime);
  }, [timerStats.sessionLimit, timerStats.currentSessionTime]);

  const getTimeUntilDailyLimit = useCallback((): number => {
    return Math.max(0, timerStats.dailyLimit - timerStats.dailyTimeSpent);
  }, [timerStats.dailyLimit, timerStats.dailyTimeSpent]);

  // Monitor limits and auto-end sessions when reached
  useEffect(() => {
    if (isSessionActive) {
      // Check session limit
      if (timerStats.currentSessionTime >= timerStats.sessionLimit) {

        endSession();
      }
      
      // Check daily limit
      if (timerStats.dailyTimeSpent >= timerStats.dailyLimit) {

        endSession();
      }
    }
  }, [isSessionActive, timerStats.currentSessionTime, timerStats.sessionLimit, timerStats.dailyTimeSpent, timerStats.dailyLimit, endSession]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    timerStats,
    isSessionActive,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
    setDailyGoal,
    setSessionLimit,
    setDailyLimit,
    formatTime,
    getTimeUntilGoal,
    isGoalReached,
    isSessionLimitReached,
    isDailyLimitReached,
    getTimeUntilSessionLimit,
    getTimeUntilDailyLimit
  }), [
    timerStats,
    isSessionActive,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
    setDailyGoal,
    setSessionLimit,
    setDailyLimit,
    formatTime,
    getTimeUntilGoal,
    isGoalReached,
    isSessionLimitReached,
    isDailyLimitReached,
    getTimeUntilSessionLimit,
    getTimeUntilDailyLimit
  ]);

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
