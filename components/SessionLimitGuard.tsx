import React from 'react';
import { useAuth } from '../context/AuthContext';
import { isPremiumUser } from '../utils/isPremiumUser';
import { useProgressiveSignup } from '../hooks/useProgressiveSignup';

interface SessionLimitGuardProps {
  children: React.ReactNode;
  onUpgrade?: () => void;
  onSignIn?: () => void;
  currentView?: string; // Add currentView prop to control where guest notification shows
}

const SessionLimitGuard: React.FC<SessionLimitGuardProps> = ({ 
  children, 
  onUpgrade,
  onSignIn,
  currentView 
}) => {
  const { user } = useAuth();
  const { 
    shouldShowPrompt, 
    sessionsCompleted, 
    dismissPrompt, 
    getPromptMessage,
    isGuestUser 
  } = useProgressiveSignup();

  // Helper function to check if user has reached daily session limit
  const hasReachedSessionLimit = () => {
    if (!user || isPremiumUser(user)) {
      return false; // Premium users have unlimited sessions
    }

    const today = new Date().toISOString().split('T')[0];
    const lastSessionDate = user.subscription?.lastSessionDate;
    const sessionsUsed = user.subscription?.sessionsUsed || 0;

    // Reset sessions if it's a new day
    if (lastSessionDate !== today) {
      return false; // New day, sessions reset
    }

    // Check if user has exceeded daily limit (3 sessions for free users)
    return sessionsUsed >= 3;
  };

  // For guest users, show progressive sign-up prompts
  if (isGuestUser) {
    // Show sign-up prompt overlay when triggered
    if (shouldShowPrompt) {
      const { title, message } = getPromptMessage;
      
      return (
        <div className="relative">
          {children}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-secondary border border-accent/20 rounded-lg p-8 text-center max-w-md mx-auto">
              <div className="mb-6">
                <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-text-secondary mb-4">{message}</p>
                
                <div className="bg-tertiary/30 rounded-lg p-4 mb-6">
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">✨ Free account includes:</p>
                    <ul className="text-left space-y-1">
                      <li>• Progress tracking & statistics</li>
                      <li>• Performance history</li>
                      <li>• Advanced typing lessons</li>
                      <li>• Custom practice texts</li>
                      <li>• Achievement badges</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  {onSignIn && (
                    <button
                      onClick={() => {
                        dismissPrompt();
                        onSignIn();
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Sign Up & Save Progress
                    </button>
                  )}
                  
                  <button
                    onClick={dismissPrompt}
                    className="w-full px-6 py-3 bg-tertiary border border-accent/30 text-text-primary font-medium rounded-lg hover:bg-border-primary hover:border-accent/50 transition-all duration-300"
                  >
                    Continue as Guest
                  </button>
                  
                  <div className="text-xs text-text-secondary">
                    <p>🎯 Guest mode includes: All lessons • Typing tests • Keyboard guide • Live stats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Show small sign-up hint for guest users (only on lessons and dashboard views)
    if (currentView === 'lessons' || currentView === 'dashboard') {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Guest Mode: Session {sessionsCompleted + 1}
                </span>
              </div>
              {onSignIn && (
                <button
                  onClick={onSignIn}
                  className="text-xs px-3 py-1 text-accent border border-accent/50 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  Sign Up
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              Full access to lessons, tests, and guides • Sign up to save progress
            </div>
          </div>
          {children}
        </div>
      );
    }

    // Show clean experience on all other views (guide, dashboard, test, etc.)
    return <>{children}</>;
  }

  if (hasReachedSessionLimit()) {
    return (
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-8 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-text-primary mb-2">Daily Session Limit Reached</h3>
          <p className="text-text-secondary mb-4">
            You've completed your 3 free practice sessions for today. Come back tomorrow or upgrade for unlimited access!
          </p>
          
          <div className="bg-tertiary/30 rounded-lg p-4 mb-6">
            <div className="text-sm text-text-secondary">
              <p className="mb-2">🎯 Sessions completed today: <span className="font-semibold text-accent">3/3</span></p>
              <p>⏰ Sessions reset daily at midnight</p>
            </div>
          </div>

          <div className="space-y-3">
            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Upgrade for Unlimited Sessions
              </button>
            )}
            
            <div className="text-xs text-text-secondary">
              <p>Premium starts at $4.99/month</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Free users get clean experience - session tracking is handled in AppHeader
  if (user && !isPremiumUser(user)) {
    return <>{children}</>;
  }

  // Premium users get completely clean experience - NO indicators or limits
  if (user && isPremiumUser(user)) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default SessionLimitGuard;
