import type { User } from '../types';

/**
 * Enhanced premium user checker with debugging and fallbacks
 * Addresses inconsistent premium feature access issues
 */
export function isPremiumUser(user: User | null | undefined): boolean {
  // Early returns for null/undefined/guest users
  if (!user) {
    console.debug('[Premium Check] User is null/undefined');
    return false;
  }
  
  if (user.uid === 'guest') {
    console.debug('[Premium Check] User is guest');
    return false;
  }

  // Check subscription object exists
  if (!user.subscription) {
    console.warn('[Premium Check] User has no subscription object:', user.uid);
    return false;
  }

  const tier = user.subscription.tier;
  console.debug('[Premium Check] User tier:', tier, 'UID:', user.uid);
  
  // Check for premium/pro tiers
  const isPremium = tier === 'premium' || tier === 'pro';
  
  // Additional validation: check if subscription is still valid
  if (isPremium && user.subscription.endDate) {
    const endDate = new Date(user.subscription.endDate);
    const now = new Date();
    const isExpired = endDate < now;
    
    if (isExpired) {
      console.warn('[Premium Check] Subscription expired:', {
        uid: user.uid,
        tier,
        endDate: user.subscription.endDate,
        now: now.toISOString()
      });
      return false;
    }
  }
  
  console.debug('[Premium Check] Final result:', isPremium, 'for user:', user.uid);
  return isPremium;
}

/**
 * Force refresh user subscription status from Firestore
 * Use this when premium features seem inconsistent
 */
export async function refreshPremiumStatus(user: User | null): Promise<boolean> {
  if (!user || user.uid === 'guest') return false;
  
  try {
    // Dynamic import to avoid circular dependencies
    const { userService } = await import('../services/userService');
    const latestUser = await userService.loadUserData(user.uid);
    
    if (latestUser) {
      console.log('[Premium Refresh] Latest user data loaded:', latestUser.subscription.tier);
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
