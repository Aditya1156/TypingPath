import { useAuth } from '../context/AuthContext';
import { useTimer } from '../context/TimerContext';
import { useState, useEffect } from 'react';
import { isPremiumUser } from '../utils/isPremiumUser';
import PremiumBadge from './PremiumBadge';
import type { ModalType } from '../types';

interface AppHeaderProps {
  onShowModal: (modal: ModalType) => void;
  onOpenSidebar: () => void;
}

const AppHeader = ({ onShowModal, onOpenSidebar }: AppHeaderProps) => {
  const { user } = useAuth();
  const { timerStats } = useTimer();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for auto-hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Calculate session limit based on subscription
  const getSessionInfo = () => {
    if (!user || user.uid === 'guest') {
      return { used: 0, limit: 3, isLimited: true };
    }

    const used = user.subscription?.sessionsUsed || 0;
    
    if (isPremiumUser(user)) {
      return { used, limit: null, isLimited: false };
    } else {
      return { used, limit: 3, isLimited: true };
    }
  };

  const sessionInfo = getSessionInfo();
  const isSessionLimitReached = sessionInfo.isLimited && sessionInfo.used >= (sessionInfo.limit || 0);

  const formatTotalTime = (seconds: number) => {
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };

  // Get today's session count (we'll use the daily sessions from subscription)
  const todaySessionCount = sessionInfo.used;

  return (
    <header className={`fixed top-0 left-0 right-0 w-full bg-secondary/30 backdrop-blur-sm border-b border-border-primary z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App Logo & User Profile */}
          <div className="flex items-center space-x-6">
            {/* App Logo */}
            <div className="text-xl font-bold text-text-primary">
              <span className="drop-shadow-lg">
                Typing<span className="text-accent bg-gradient-to-r from-accent via-accent/90 to-accent/80 bg-clip-text text-transparent">Path</span>
              </span>
            </div>
            
            {/* User Profile */}
            <button 
              onClick={() => {
                if (user?.uid === 'guest') {
                  onShowModal('signUp');
                } else {
                  onShowModal('profile');
                }
              }}
              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
              title={user?.uid === 'guest' ? 'Sign up for full features' : 'View Profile'}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-text-primary">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  {user && user.uid !== 'guest' && (
                    <PremiumBadge tier={user.subscription?.tier || 'free'} size="sm" />
                  )}
                </div>
                <span className="text-xs text-text-secondary">
                  {user?.uid === 'guest' ? 'Click to sign up' : 'Click to view profile'}
                </span>
              </div>
            </button>
          </div>

          {/* Center - Time Tracking */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-3 py-2 bg-tertiary/50 rounded-lg">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-text-secondary">Total Time:</span>
              <span className="font-mono text-accent font-medium">
                {formatTotalTime(timerStats.totalTimeSpent)}
              </span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-2 bg-tertiary/50 rounded-lg">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm text-text-secondary">Sessions:</span>
              <span className="font-mono text-accent font-medium">
                {todaySessionCount}
              </span>
            </div>
          </div>

          {/* Right side - Session Limits + Menu */}
          <div className="flex items-center space-x-3">
            {/* Mobile time stats */}
            <div className="md:hidden flex items-center space-x-2 px-2 py-1 bg-tertiary/50 rounded text-xs">
              <span className="text-text-secondary">{formatTotalTime(timerStats.totalTimeSpent)}</span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">{todaySessionCount} sessions</span>
            </div>

            {/* Session Limit Indicator */}
            {sessionInfo.isLimited && (
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-2 rounded-lg border ${
                  isSessionLimitReached 
                    ? 'bg-danger/10 border-danger/30 text-danger' 
                    : sessionInfo.used >= 2 
                    ? 'bg-warning/10 border-warning/30 text-warning' 
                    : 'bg-tertiary/50 border-border-primary text-text-secondary'
                }`}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {sessionInfo.used}/{sessionInfo.limit} sessions
                    </span>
                  </div>
                  {isSessionLimitReached && (
                    <div className="text-xs mt-1">Daily limit reached</div>
                  )}
                </div>

                {(isSessionLimitReached || sessionInfo.used >= 2) && (
                  <button
                    onClick={() => onShowModal('upgrade')}
                    className="px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-primary rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 hover:scale-105 text-sm font-medium"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            )}

            {/* Premium Users - Just show unlimited indicator */}
            {!sessionInfo.isLimited && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-accent/10 border border-accent/30 rounded-lg">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-accent font-medium">Unlimited</span>
              </div>
            )}

            {/* Professional Menu Button - Right Corner */}
            <button 
              onClick={onOpenSidebar}
              className="p-3 rounded-lg bg-tertiary/30 hover:bg-tertiary/60 border border-border-primary/20 hover:border-accent/30 transition-all duration-300 group"
              aria-label="Open menu"
            >
              <svg 
                className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
                <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
