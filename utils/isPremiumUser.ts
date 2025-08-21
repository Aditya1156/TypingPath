import type { User } from '../types';

/**
 * Check if user has premium access
 * Returns true for premium or pro tier users
 */
export function isPremiumUser(user: User | null | undefined): boolean {
  if (!user || user.uid === 'guest') {
    return false;
  }

  if (!user.subscription) {
    return false;
  }

  const tier = user.subscription.tier;
  const isPremium = tier === 'premium' || tier === 'pro';
  
  // Check if subscription is still valid
  if (isPremium && user.subscription.endDate) {
    const endDate = new Date(user.subscription.endDate);
    const now = new Date();
    if (endDate < now) {
      return false;
    }
  }
  
  return isPremium;
}

/**
 * Refresh user subscription status from Firestore
 */
export async function refreshPremiumStatus(user: User | null): Promise<boolean> {
  if (!user || user.uid === 'guest') return false;
  
  try {
    // Dynamic import to avoid circular dependencies
    const { userService } = await import('../services/userService');
    const latestUser = await userService.loadUserData(user.uid);
    
    if (latestUser) {
      // Trigger a context update by dispatching a custom event
      window.dispatchEvent(new CustomEvent('userDataRefreshed', { 
        detail: latestUser 
      }));
      return isPremiumUser(latestUser);
    }
  } catch (error) {
    console.error('[Premium Refresh] Failed to refresh premium status:', error);
  }
  
  return isPremiumUser(user);
}
