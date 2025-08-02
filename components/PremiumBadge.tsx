import React from 'react';
import type { SubscriptionTier } from '../types';

interface PremiumBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  tier, 
  size = 'md', 
  showText = true 
}) => {
  if (tier === 'free') return null;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getBadgeStyle = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'premium':
        return {
          bg: 'bg-gradient-to-r from-accent to-accent/80',
          text: 'text-primary',
          icon: '👑',
          label: 'Premium'
        };
      case 'pro':
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-purple-400',
          text: 'text-white',
          icon: '💎',
          label: 'Pro'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          icon: '⭐',
          label: 'Free'
        };
    }
  };

  const style = getBadgeStyle(tier);

  return (
    <span className={`
      inline-flex items-center justify-center rounded-lg font-semibold
      ${sizeClasses[size]} ${style.bg} ${style.text}
    `}>
      <span className={`${iconSizes[size]} mr-1`}>
        {style.icon}
      </span>
      {showText && style.label}
    </span>
  );
};

export default PremiumBadge;
