import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { isPremiumUser } from '../utils/isPremiumUser';
import type { SubscriptionTier } from '../types';

interface PremiumFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  requiredTier?: SubscriptionTier;
  onUpgrade?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PremiumFeatureCard: React.FC<PremiumFeatureCardProps> = ({
  title,
  description,
  icon,
  requiredTier = 'premium',
  onUpgrade,
  className = '',
  children
}) => {
  const { user } = useAuth();
  const { theme } = useSettings();

  // Theme-aware overlay styles
  const getThemeOverlayStyles = () => {
    switch (theme) {
      case 'light':
        return 'bg-white/10 backdrop-blur-sm border border-white/20';
      case 'hacker':
        return 'bg-green-900/10 backdrop-blur-sm border border-green-500/20';
      case 'ocean':
        return 'bg-blue-900/10 backdrop-blur-sm border border-blue-500/20';
      case 'sunset':
        return 'bg-orange-900/10 backdrop-blur-sm border border-orange-500/20';
      case 'forest':
        return 'bg-green-900/10 backdrop-blur-sm border border-green-600/20';
      default: // dark
        return 'bg-primary/5 backdrop-blur-sm border border-white/10';
    }
  };

  const hasAccess = () => {
    if (!user || user.uid === 'guest') return false; // Guest users have no premium access
    const userTier = user.subscription?.tier || 'free';
    const tierLevel: Record<SubscriptionTier, number> = { free: 0, premium: 1, pro: 2 };
    return tierLevel[userTier] >= tierLevel[requiredTier];
  };

  const userHasAccess = hasAccess();

  if (isPremiumUser(user)) {
    return (
      <div className={`relative bg-secondary rounded-xl p-6 border border-border-primary transition-all duration-300 hover:shadow-lg ${className}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative bg-secondary rounded-xl p-6 border border-border-primary transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              {title}
              {!userHasAccess && (
                <span className="text-xs bg-gradient-to-r from-accent to-accent/80 text-primary px-2 py-1 rounded-lg font-semibold">
                  PREMIUM
                </span>
              )}
            </h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
        </div>
      </div>

      {/* Content or Upgrade Prompt */}
      {userHasAccess ? (
        <div className="mt-4">
          {children}
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border border-accent/20">
          <div className="text-center">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              Upgrade to {requiredTier} to unlock this feature
            </p>
            <button
              onClick={onUpgrade}
              className="px-4 py-2 bg-gradient-to-r from-accent to-accent/90 text-primary text-sm font-semibold rounded-lg hover:from-accent/95 hover:to-accent/85 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Lock overlay for locked features */}
      {!userHasAccess && children && (
        <div 
          className={`absolute inset-0 ${getThemeOverlayStyles()} rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 hover:scale-[1.01] cursor-pointer z-10`}
          onClick={() => {
            if (onUpgrade) {
              onUpgrade();
            }
          }}
        >
          <div className="text-center p-4 max-w-xs mx-4">
            {/* Premium Icon with glow effect - Compact version */}
            <div className="mb-3 relative">
              <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-full blur-lg mx-auto"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onUpgrade) {
                  onUpgrade();
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent/90 text-primary text-sm font-bold rounded-lg hover:from-accent/95 hover:to-accent/85 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              Unlock Premium
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumFeatureCard;
