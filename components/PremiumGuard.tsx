import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import type { SubscriptionTier, PracticeMode } from '../types';

interface PremiumGuardProps {
  feature: 'aiCoach' | 'advancedAnalytics' | 'unlimitedSessions' | 'customLessons' | 'exportData' | 'theme' | 'lesson' | 'practiceMode';
  requiredTier?: SubscriptionTier;
  themeCount?: number;
  lessonCount?: number;
  practiceMode?: PracticeMode;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  onUpgradeClick?: () => void;
  showBlurred?: boolean; // Show content blurred instead of replacing
  overlayClassName?: string; // Custom class for overlay styling
}

const PremiumGuard: React.FC<PremiumGuardProps> = ({
  feature,
  requiredTier = 'premium',
  themeCount = 0,
  lessonCount = 0,
  practiceMode,
  fallback,
  children,
  onUpgradeClick,
  showBlurred = true,
  overlayClassName
}) => {
  const { user } = useAuth();
  const { theme } = useSettings();

  // Theme-aware blur and overlay styles
  const getThemeAwareStyles = () => {
    switch (theme) {
      case 'light':
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-80 transition-all duration-300 group-hover:opacity-70',
          overlayClass: 'bg-white/10 backdrop-blur-sm border border-white/20',
          overlayGradient: 'from-white/5 to-gray-100/10'
        };
      case 'hacker':
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-85 transition-all duration-300 group-hover:opacity-75',
          overlayClass: 'bg-green-900/10 backdrop-blur-sm border border-green-500/20',
          overlayGradient: 'from-green-900/5 to-green-800/10'
        };
      case 'ocean':
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-85 transition-all duration-300 group-hover:opacity-75',
          overlayClass: 'bg-blue-900/10 backdrop-blur-sm border border-blue-500/20',
          overlayGradient: 'from-blue-900/5 to-blue-800/10'
        };
      case 'sunset':
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-85 transition-all duration-300 group-hover:opacity-75',
          overlayClass: 'bg-orange-900/10 backdrop-blur-sm border border-orange-500/20',
          overlayGradient: 'from-orange-900/5 to-red-800/10'
        };
      case 'forest':
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-85 transition-all duration-300 group-hover:opacity-75',
          overlayClass: 'bg-green-900/10 backdrop-blur-sm border border-green-600/20',
          overlayGradient: 'from-green-900/5 to-green-700/10'
        };
      default: // dark
        return {
          blurClass: 'blur-[2px] pointer-events-none select-none opacity-85 transition-all duration-300 group-hover:opacity-75',
          overlayClass: 'bg-primary/5 backdrop-blur-sm border border-white/10',
          overlayGradient: 'from-primary/5 to-secondary/10'
        };
    }
  };

  const themeStyles = getThemeAwareStyles();

  // If no user or guest user, treat them exactly like free users
  if (!user || user.uid === 'guest') {
    // Create a free user object for consistent access checking
    const freeUserForChecking = user || {
      uid: 'guest',
      name: null,
      email: null,
      subscription: { 
        tier: 'free' as const,
        startDate: new Date().toISOString(),
        sessionsUsed: 0,
        lastSessionDate: new Date().toISOString().split('T')[0],
        trialUsed: false
      },
      features: {
        aiCoach: false,
        advancedAnalytics: false,
        unlimitedSessions: false,
        customLessons: false,
        exportData: false,
        themesUnlocked: 2,
        lessonsUnlocked: 5,
        practiceModesUnlocked: ['keys', 'words'] as const
      }
    };

    // Use the same access check logic as authenticated free users
    const hasAccess = checkFeatureAccess(freeUserForChecking, feature, {
      requiredTier,
      themeCount,
      lessonCount,
      practiceMode
    });

    // If guest has access (within free limits), show content
    if (hasAccess) {
      return <>{children}</>;
    }

    // For features beyond free limits, show upgrade prompts
    if (showBlurred) {
      return (
        <div className="relative group cursor-pointer" onClick={onUpgradeClick}>
          {/* Enhanced blurred content - more visible */}
          <div className={themeStyles.blurClass}>
            {children}
          </div>
              {/* Theme-aware premium overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${themeStyles.overlayGradient} ${themeStyles.overlayClass} rounded-lg transition-all duration-300 group-hover:scale-[1.01] ${overlayClassName || ''}`}>
            <div className="text-center p-4 max-w-xs mx-4">
              <div className="mb-3 relative">
                <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-full blur-lg mx-auto"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  {feature === 'aiCoach' ? (
                    // AI icon for AI-related features
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ) : (
                    // Lock icon for all other premium features
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
              
              {/* Enhanced CTA button - Compact */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpgradeClick) {
                    onUpgradeClick();
                  }
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent/90 text-primary text-sm font-bold rounded-lg hover:from-accent/95 hover:to-accent/85 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              >
                Unlock Premium
              </button>
            </div>
          </div>
          
          {/* Subtle pulse animation for attention */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full animate-pulse opacity-60"></div>
        </div>
      );
    }
    
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6 text-center">
        <div className="mb-4">
          {feature === 'aiCoach' ? (
            // AI icon for AI-related features
            <svg className="w-12 h-12 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ) : (
            // Lock icon for all other premium features
            <svg className="w-12 h-12 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          )}
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {getFeatureTitle(feature, lessonCount)} - Premium Feature
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            {getFeatureDescription(feature, requiredTier, lessonCount)}
          </p>
          <div className="space-y-2">
            <button
              onClick={onUpgradeClick}
              className="w-full px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300"
            >
              Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Premium'}
            </button>
            <p className="text-xs text-text-secondary">
              Unlock all features starting from $4.99/month
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasAccess = checkFeatureAccess(user, feature, {
    requiredTier,
    themeCount,
    lessonCount,
    practiceMode
  });

  // If user has premium access, show content directly with NO overlays or restrictions
  if (hasAccess) {
    return <>{children}</>;
  }

  // Always show blurred content with premium overlay for non-premium users
  if (showBlurred || !hasAccess) {
    return (
      <div className="relative group cursor-pointer" onClick={onUpgradeClick}>
        {/* Enhanced blurred content - more visible */}
        <div className={themeStyles.blurClass}>
          {children}
        </div>
        
        {/* Theme-aware premium overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${themeStyles.overlayGradient} ${themeStyles.overlayClass} rounded-lg transition-all duration-300 group-hover:scale-[1.01] ${overlayClassName || ''}`}>
          <div className="text-center p-4 max-w-xs mx-4">
            {/* Premium Icon with glow effect - Compact version */}
            <div className="mb-3 relative">
              <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-full blur-lg mx-auto"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto shadow-lg">
                {feature === 'aiCoach' ? (
                  // AI icon for AI-related features
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ) : (
                  // Lock icon for all other premium features
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Enhanced CTA button - Compact */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpgradeClick?.();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent/90 text-primary text-sm font-bold rounded-lg hover:from-accent/95 hover:to-accent/85 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              Unlock Premium
            </button>
          </div>
        </div>
        
        {/* Subtle pulse animation for attention */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full animate-pulse opacity-60"></div>
      </div>
    );
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6 text-center">
      <div className="mb-4">
        {feature === 'aiCoach' ? (
          // AI icon for AI-related features
          <svg className="w-12 h-12 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ) : (
          // Lock icon for all other premium features
          <svg className="w-12 h-12 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        )}
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {getFeatureTitle(feature, lessonCount)} - Premium Feature
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          {getFeatureDescription(feature, requiredTier, lessonCount)}
        </p>
        <div className="space-y-2">
          <button
            onClick={onUpgradeClick}
            className="w-full px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300"
          >
            Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Premium'}
          </button>
          <p className="text-xs text-text-secondary">
            Unlock all features starting from $4.99/month
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to check feature access
const checkFeatureAccess = (
  user: any,
  feature: string,
  options: {
    requiredTier: SubscriptionTier;
    themeCount: number;
    lessonCount: number;
    practiceMode?: PracticeMode;
  }
): boolean => {
  const { subscription, features } = user;
  const { requiredTier, themeCount, lessonCount, practiceMode } = options;

  // Check subscription tier hierarchy
  const tierLevel: Record<SubscriptionTier, number> = {
    free: 0,
    premium: 1,
    pro: 2
  };

  const userTier = (subscription?.tier || 'free') as SubscriptionTier;
  const userTierLevel = tierLevel[userTier];
  const requiredTierLevel = tierLevel[requiredTier];

  // If user has premium or pro, they get access to ALL features
  if (userTierLevel >= requiredTierLevel) {
    return true;
  }

  // For free users, check specific feature access
  if (userTierLevel < requiredTierLevel) {
    return false;
  }

  // Feature-specific checks (only for edge cases)
  switch (feature) {
    case 'aiCoach':
      return features?.aiCoach || false;
    case 'advancedAnalytics':
      return features?.advancedAnalytics || false;
    case 'unlimitedSessions':
      return features?.unlimitedSessions || false;
    case 'customLessons':
      return features?.customLessons || false;
    case 'exportData':
      return features?.exportData || false;
    case 'theme':
      return (features?.themesUnlocked || 2) > themeCount;
    case 'lesson':
      return (features?.lessonsUnlocked || 3) > lessonCount;
    case 'practiceMode':
      return practiceMode ? features?.practiceModesUnlocked?.includes(practiceMode) || false : true;
    default:
      return true;
  }
};

// Helper function to get feature titles
const getFeatureTitle = (feature: string, lessonCount?: number): string => {
  // Special handling for chapter-level locks
  if (feature === 'lesson' && lessonCount && lessonCount > 10) {
    return lessonCount > 2 ? 'Advanced Chapters' : 'Complete Course';
  }
  
  const titles = {
    aiCoach: 'AI Coach',
    advancedAnalytics: 'Advanced Analytics',
    unlimitedSessions: 'Unlimited Sessions',
    customLessons: 'Custom Lessons',
    exportData: 'Export Data',
    theme: 'Premium Themes',
    lesson: 'All Lessons',
    practiceMode: 'Practice Modes'
  };
  return titles[feature as keyof typeof titles] || 'Premium Feature';
};

// Helper function to get feature descriptions
const getFeatureDescription = (feature: string, tier: SubscriptionTier, lessonCount?: number): string => {
  // Special handling for chapter-level locks
  if (feature === 'lesson' && lessonCount && lessonCount > 10) {
    return `Unlock the complete typing curriculum with ${lessonCount > 2 ? 'advanced' : 'intermediate'} chapters. Master all keys, special characters, and advanced typing techniques.`;
  }
  
  const descriptions = {
    aiCoach: 'Get personalized feedback and improvement suggestions from our AI coach.',
    advancedAnalytics: 'Access detailed performance analytics, progress tracking, and insights.',
    unlimitedSessions: 'Practice without daily session limits and time restrictions.',
    customLessons: 'Create and customize your own typing lessons and exercises.',
    exportData: 'Export your progress data and statistics in various formats.',
    theme: 'Unlock beautiful premium themes to customize your typing experience.',
    lesson: 'Access our complete library of typing lessons and exercises.',
    practiceMode: 'Unlock additional practice modes for comprehensive training.'
  };
  return descriptions[feature as keyof typeof descriptions] || `This feature requires ${tier} subscription.`;
};

export default PremiumGuard;
