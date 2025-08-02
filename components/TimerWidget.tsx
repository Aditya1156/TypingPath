import { useState } from 'react';
import { useTimer } from '../context/TimerContext';

interface TimerWidgetProps {
  compact?: boolean; // For sidebar use
  showGoalSetting?: boolean;
}

const TimerWidget = ({ compact = false, showGoalSetting = false }: TimerWidgetProps) => {
  const {
    timerStats,
    isSessionActive,
    startSession,
    endSession,
    pauseSession,
    setDailyGoal,
    setSessionLimit,
    setDailyLimit,
    formatTime,
    getTimeUntilGoal,
    isGoalReached,
    isSessionLimitReached,
    isDailyLimitReached
  } = useTimer();
  
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [showLimitSettings, setShowLimitSettings] = useState(false);
  const [goalInput, setGoalInput] = useState('30'); // Default 30 minutes
  const [sessionLimitInput, setSessionLimitInput] = useState('120'); // Default 2 hours
  const [dailyLimitInput, setDailyLimitInput] = useState('480'); // Default 8 hours

  const handleGoalSubmit = () => {
    const minutes = parseInt(goalInput);
    if (minutes > 0 && minutes <= 480) { // Max 8 hours
      setDailyGoal(minutes * 60); // Convert to seconds
      setShowGoalInput(false);
    }
  };

  const handleSessionLimitSubmit = () => {
    const minutes = parseInt(sessionLimitInput);
    if (minutes > 0 && minutes <= 480) { // Max 8 hours
      setSessionLimit(minutes * 60); // Convert to seconds
      setShowLimitSettings(false);
    }
  };

  const handleDailyLimitSubmit = () => {
    const minutes = parseInt(dailyLimitInput);
    if (minutes > 0 && minutes <= 1440) { // Max 24 hours
      setDailyLimit(minutes * 60); // Convert to seconds
      setShowLimitSettings(false);
    }
  };

  const progressPercentage = Math.min((timerStats.dailyTimeSpent / timerStats.dailyGoal) * 100, 100);

  if (compact) {
    return (
      <div className="bg-tertiary/50 rounded-lg p-3 border border-border-primary">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Daily Practice
          </h3>
          {isGoalReached() && (
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
              Goal ✓
            </span>
          )}
          {isDailyLimitReached() && (
            <span className="text-xs bg-danger/20 text-danger px-2 py-1 rounded">
              Limit!
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">Today</span>
            <span className="text-text-primary font-mono">
              {formatTime(timerStats.dailyTimeSpent)}
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isDailyLimitReached() ? 'bg-danger' : isGoalReached() ? 'bg-success' : 'bg-accent'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Goal: {formatTime(timerStats.dailyGoal)}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>

          {isDailyLimitReached() && (
            <div className="text-xs text-danger text-center">
              Daily limit reached! Consider taking a break.
            </div>
          )}

          {isSessionActive && (
            <div className={`mt-2 p-2 rounded border ${
              isSessionLimitReached() 
                ? 'bg-danger/10 border-danger/20' 
                : 'bg-accent/10 border-accent/20'
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-semibold ${
                  isSessionLimitReached() ? 'text-danger' : 'text-accent'
                }`}>
                  {isSessionLimitReached() ? 'Session Limit Reached!' : 'Session Active'}
                </span>
                <span className={`text-xs font-mono ${
                  isSessionLimitReached() ? 'text-danger' : 'text-accent'
                }`}>
                  {formatTime(timerStats.currentSessionTime)}
                </span>
              </div>
              {isSessionLimitReached() && (
                <div className="text-xs text-danger mt-1">
                  Session will end automatically
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-lg p-6 border border-border-primary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Practice Timer
        </h2>
        
        {showGoalSetting && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowGoalInput(!showGoalInput)}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Set Goal
            </button>
            <button
              onClick={() => setShowLimitSettings(!showLimitSettings)}
              className="text-sm text-warning hover:text-warning/80 transition-colors"
            >
              Set Limits
            </button>
          </div>
        )}
      </div>

      {showGoalInput && (
        <div className="mb-4 p-3 bg-tertiary/50 rounded-md">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Daily Goal (minutes)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="5"
              max="480"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-primary border border-border-primary rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleGoalSubmit}
              className="px-4 py-2 bg-accent text-slate-900 rounded-md hover:bg-accent/90 transition-colors"
            >
              Set
            </button>
          </div>
        </div>
      )}

      {/* Current Session */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Current Session</h3>
          <div className="flex gap-2">
            {!isSessionActive ? (
              <button
                onClick={startSession}
                className="px-4 py-2 bg-accent text-slate-900 rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Start
              </button>
            ) : (
              <>
                <button
                  onClick={pauseSession}
                  className="px-3 py-2 bg-warning text-slate-900 rounded-md hover:bg-warning/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </button>
                <button
                  onClick={endSession}
                  className="px-4 py-2 bg-danger text-white rounded-md hover:bg-danger/90 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                  End
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-mono font-bold text-accent mb-2">
            {formatTime(timerStats.currentSessionTime)}
          </div>
          {isSessionActive && (
            <div className="text-sm text-text-secondary">
              Session in progress...
            </div>
          )}
        </div>
      </div>

      {/* Daily Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Today's Progress</h3>
          {isGoalReached() && !isDailyLimitReached() && (
            <span className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-semibold">
              🎉 Goal Reached!
            </span>
          )}
          {isDailyLimitReached() && (
            <span className="bg-danger/20 text-danger px-3 py-1 rounded-full text-sm font-semibold">
              ⚠️ Daily Limit Reached!
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Time Practiced</span>
            <span className="font-mono font-semibold text-text-primary">
              {formatTime(timerStats.dailyTimeSpent)}
            </span>
          </div>
          
          <div className="w-full bg-tertiary rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isDailyLimitReached() ? 'bg-danger' : isGoalReached() ? 'bg-success' : 'bg-accent'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Goal: {formatTime(timerStats.dailyGoal)}</span>
            <span>
              {isDailyLimitReached()
                ? `Limit: ${formatTime(timerStats.dailyLimit)}`
                : isGoalReached() 
                  ? `+${formatTime(timerStats.dailyTimeSpent - timerStats.dailyGoal)} over goal!`
                  : `${formatTime(getTimeUntilGoal())} remaining`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Limit Warnings */}
      {(isDailyLimitReached() || isSessionLimitReached()) && (
        <div className="mt-4 p-4 bg-danger/10 border border-danger/20 rounded-md">
          <h4 className="text-sm font-semibold text-danger mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="m12 17 .01 0"/>
            </svg>
            Practice Limit Reached
          </h4>
          <div className="space-y-1 text-sm text-danger">
            {isDailyLimitReached() && (
              <p>• You've reached your daily practice limit of {formatTime(timerStats.dailyLimit)}</p>
            )}
            {isSessionLimitReached() && (
              <p>• Current session has reached the {formatTime(timerStats.sessionLimit)} limit</p>
            )}
            <p className="text-xs text-text-secondary mt-2">
              Consider taking a break to avoid eye strain and maintain focus quality.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-tertiary/50 rounded-md">
          <div className="text-lg font-bold text-accent">
            {timerStats.streak}
          </div>
          <div className="text-xs text-text-secondary">Day Streak</div>
        </div>
        
        <div className="text-center p-3 bg-tertiary/50 rounded-md">
          <div className="text-lg font-bold text-accent">
            {formatTime(timerStats.weeklyTimeSpent)}
          </div>
          <div className="text-xs text-text-secondary">This Week</div>
        </div>
        
        <div className="text-center p-3 bg-tertiary/50 rounded-md">
          <div className="text-lg font-bold text-accent">
            {formatTime(timerStats.totalTimeSpent)}
          </div>
          <div className="text-xs text-text-secondary">All Time</div>
        </div>
      </div>

      {showLimitSettings && (
        <div className="mb-4 p-3 bg-tertiary/50 rounded-md border border-warning/20">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="m12 17 .01 0"/>
            </svg>
            Safety Limits
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">
                Session Limit (minutes) - Auto-end sessions
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="15"
                  max="480"
                  value={sessionLimitInput}
                  onChange={(e) => setSessionLimitInput(e.target.value)}
                  className="flex-1 px-2 py-1 bg-primary border border-border-primary rounded text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-warning"
                />
                <button
                  onClick={handleSessionLimitSubmit}
                  className="px-3 py-1 bg-warning text-slate-900 rounded text-sm hover:bg-warning/90 transition-colors"
                >
                  Set
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Current: {formatTime(timerStats.sessionLimit)}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">
                Daily Limit (minutes) - Stop all sessions
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="30"
                  max="1440"
                  value={dailyLimitInput}
                  onChange={(e) => setDailyLimitInput(e.target.value)}
                  className="flex-1 px-2 py-1 bg-primary border border-border-primary rounded text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-warning"
                />
                <button
                  onClick={handleDailyLimitSubmit}
                  className="px-3 py-1 bg-warning text-slate-900 rounded text-sm hover:bg-warning/90 transition-colors"
                >
                  Set
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Current: {formatTime(timerStats.dailyLimit)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerWidget;
