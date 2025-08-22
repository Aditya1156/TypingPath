import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import firebase from "firebase/compat/app";
import { auth } from '../firebaseConfig';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { enhancedSessionService, SessionConfig } from '../services/enhancedSessionService';
import { authSync } from '../utils/authSync';
import type { User, SubscriptionTier } from '../types';
import { useToast } from './ToastContext';
import { secureSessionStorage } from '../utils/security';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signUp: (name: string, email: string, password: string) => Promise<User>;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  upgradeSubscription: (tier: SubscriptionTier, paymentMethod?: string) => Promise<void>;
  redeemGiftCode: (code: string) => Promise<SubscriptionTier>;
  // Email verification methods
  sendEmailVerification: () => Promise<void>;
  checkEmailVerification: () => Promise<boolean>;
  resendEmailVerification: () => Promise<void>;
  // Enhanced session management
  getSessionConfig: () => SessionConfig;
  updateSessionConfig: (config: Partial<SessionConfig>) => Promise<void>;
  isDeviceTrusted: () => boolean;
  addTrustedDevice: () => Promise<void>;
  extendSession: () => Promise<void>;
  getSessionTimeRemaining: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // Initialize auth synchronization for cross-tab support
  useEffect(() => {
    console.log('[Auth Context] Setting up auth synchronization...');
    
    // Setup cross-tab auth state synchronization
    const cleanupCrossTabSync = authSync.setupCrossTabSync();
    
    // Ensure auth state is properly initialized on mount
    authSync.syncAuthState().catch(error => {
      console.warn('[Auth Context] Initial auth sync failed:', error);
    });
    
    return cleanupCrossTabSync;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Ensure we have the latest user information
          await firebaseUser.reload();
          
          let userData: User;
          
          // Check if this is a Google Sign-In user
          if (firebaseUser.providerData.some(provider => provider?.providerId === 'google.com')) {
            try {
              userData = await userService.handleGoogleSignIn(firebaseUser);
            } catch (googleError) {
              console.warn('Google Sign-In data handling failed, using fallback:', googleError);
              userData = userService.createDefaultUserData(
                firebaseUser.uid,
                firebaseUser.displayName || null,
                firebaseUser.email || null
              );
            }
          } else {
            // For email/password users, try to load from Firestore with fallback
            try {
              const firestoreData = await userService.loadUserData(firebaseUser.uid);
              if (firestoreData) {
                userData = firestoreData;
              } else {
                // Fallback: create default data for existing users
                userData = userService.createDefaultUserData(
                  firebaseUser.uid,
                  firebaseUser.displayName || null,
                  firebaseUser.email || null
                );
                try {
                  await userService.saveUserData(userData);
                } catch (saveError) {
                  console.warn('Could not save user data to Firestore:', saveError);
                  // Continue anyway - user can still sign in
                }
              }
            } catch (loadError) {
              console.warn('Could not load user data from Firestore, using default data:', loadError);
              userData = userService.createDefaultUserData(
                firebaseUser.uid,
                firebaseUser.displayName || null,
                firebaseUser.email || null
              );
            }
          }

          setUser(userData);

          // Initialize or validate session for existing users
          try {
            const sessionExists = await enhancedSessionService.validateExistingSession();
            if (!sessionExists && firebaseUser) {
              // Create session for existing authenticated user
              const sessionConfig: SessionConfig = {
                rememberMe: true, // Assume true since user is already authenticated
                sessionDuration: 7, // Default 7 days
                autoLogin: true,
                trustedDevice: true // Assume trusted since they're already logged in
              };
              await enhancedSessionService.createSession(firebaseUser, sessionConfig);
              console.log('Session created for existing authenticated user');
            }
          } catch (sessionError) {
            console.warn('Could not initialize session:', sessionError);
            // Continue anyway - user is still authenticated
          }

          // Show success message for new users (both Google and email/password)
          const wasSigningIn = secureSessionStorage.get('signingIn');
          if (wasSigningIn) {
            const displayName = userData.name || userData.email?.split('@')[0] || 'User';
            addToast(`Welcome, ${displayName}!`, 'success');
            
            // Don't remove the signingIn flag here - let App.tsx handle it for proper redirect
          }

          // SECURITY FIX: Handle pending upgrade after authentication
          const pendingUpgrade = secureSessionStorage.get('pendingUpgrade', 300000); // 5 minute timeout
          if (pendingUpgrade) {
            secureSessionStorage.remove('pendingUpgrade');
            // Trigger upgrade modal after a brief delay to allow state to settle
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('showUpgradeModal', { 
                detail: { tier: pendingUpgrade } 
              }));
            }, 500);
          }
        } catch (error) {
          console.error('Error processing Firebase user:', error);
          // If there's an error, still set a basic user object
          const basicUserData = userService.createDefaultUserData(
            firebaseUser.uid,
            firebaseUser.displayName || null,
            firebaseUser.email || null
          );
          setUser(basicUserData);
        }
      } else {
        // Set a guest user with SAME restrictions as free signed-up users
        setUser({
          uid: 'guest',
          name: null,
          email: null,
          subscription: {
            tier: 'free',
            startDate: new Date().toISOString(),
            sessionsUsed: 0,
            lastSessionDate: new Date().toISOString().split('T')[0],
            trialUsed: false
          },
          features: {
            aiCoach: false, // Premium feature
            advancedAnalytics: false, // Premium feature  
            unlimitedSessions: false, // Same limit as free users
            customLessons: false, // Premium feature
            exportData: false, // Premium feature
            themesUnlocked: 2, // Same as free users - Dark and Light themes only
            lessonsUnlocked: 3, // Reduced to 3 lessons for both guest and free users
            practiceModesUnlocked: ['keys', 'words'] // Same as free users - basic modes only
          }
        });
      }
      setIsLoading(false);
    });

    // Handle redirect result with better error handling
    auth.getRedirectResult().then((result) => {
      if (result && result.user) {
        // Success message is now handled in onAuthStateChanged
        console.log('Google Sign-In successful:', result.user.displayName || result.user.email);
        // Don't remove signingIn flag here - let App.tsx handle the redirect
      }
    }).catch(error => {
      console.error("Redirect result error:", error);
      // Only clear the signing in flag on error
      secureSessionStorage.remove('signingIn');
      addToast(error.message || 'Failed to sign in with Google.', 'error');
    });

    return () => unsubscribe();
  }, [addToast]);

  // Listen for user data refresh events to fix inconsistent premium features
  useEffect(() => {
    const handleUserDataRefresh = async (event: CustomEvent) => {
      const refreshedUser = event.detail;
      if (refreshedUser && user && refreshedUser.uid === user.uid) {
        console.log('[Auth Context] Refreshing user data from event:', refreshedUser.subscription.tier);
        setUser(refreshedUser);
      }
    };

    const handlePremiumStatusRefresh = async () => {
      if (user && user.uid !== 'guest') {
        try {
          console.log('[Auth Context] Refreshing premium status from Firestore...');
          const latestUser = await userService.loadUserData(user.uid);
          if (latestUser && latestUser.subscription.tier !== user.subscription.tier) {
            console.log('[Auth Context] Premium status changed:', user.subscription.tier, '->', latestUser.subscription.tier);
            setUser(latestUser);
            addToast(`Subscription status updated to ${latestUser.subscription.tier}!`, 'info');
          }
        } catch (error) {
          console.warn('[Auth Context] Failed to refresh premium status:', error);
        }
      }
    };

    window.addEventListener('userDataRefreshed', handleUserDataRefresh as any);
    window.addEventListener('refreshPremiumStatus', handlePremiumStatusRefresh);
    
    return () => {
      window.removeEventListener('userDataRefreshed', handleUserDataRefresh as any);
      window.removeEventListener('refreshPremiumStatus', handlePremiumStatusRefresh);
    };
  }, [user, addToast]);

  const signIn = useCallback(async (email: string, password: string, trustedDevice: boolean = false) => {
    try {
      // Set Firebase persistence based on trusted device setting
      if (trustedDevice) {
        // Trust this device - persist across browser restarts
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        // Don't trust - only persist during browser session
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }

      // Use enhanced session service for sign-in with trusted device functionality
      const sessionConfig: Partial<SessionConfig> = {
        trustedDevice,
        rememberMe: trustedDevice,
        sessionDuration: trustedDevice ? 30 : 1, // 30 days if trusted, 1 day otherwise
        autoLogin: trustedDevice
      };

      const firebaseUser = await enhancedSessionService.signInWithRemember(email, password, sessionConfig);
      const signedInUser = await userService.loadUserData(firebaseUser.uid) ||
        userService.createDefaultUserData(firebaseUser.uid, firebaseUser.displayName, firebaseUser.email);

      // Set user state immediately for faster UI update
      setUser(signedInUser);
      const displayName = signedInUser.name || signedInUser.email?.split('@')[0] || 'User';

      if (trustedDevice) {
        addToast(`Welcome back, ${displayName}! Device trusted for 30 days.`, 'success');
      } else {
        addToast(`Welcome back, ${displayName}!`, 'success');
      }

      return signedInUser;
    } catch (error: any) {
      // Always show a clear error message for wrong credentials and all error states
      // This ensures the user is never left confused about login failures
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(e =>
        console.warn('Could not reset persistence:', e)
      );
      // If error message is not user-friendly, show a generic fallback
      const msg = error?.message && typeof error.message === 'string'
        ? error.message
        : 'Login failed. Please check your email and password and try again.';
      addToast(msg, 'error');
      throw error;
    }
  }, [addToast]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    try {
      const newUser = await authService.signUp(name, email, password);
      // Set user state immediately for faster UI update
      setUser(newUser);
      const displayName = newUser.name || name || 'User';
      addToast(`Account created successfully! Welcome, ${displayName}!`, 'success');
      return newUser;
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [addToast]);
  
  const signInWithGoogle = useCallback(async () => {
    try {
        await authService.signInWithGoogle();
        // Toast is handled by getRedirectResult
    } catch (error: any) {
        addToast(error.message, 'error');
        throw error;
    }
  }, [addToast]);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Clear user state immediately to prevent flickering
      setUser(null);
      
      // Call the enhanced signOut that clears all storage
      await authService.signOut();
      
      // Broadcast sign out to other tabs
      try {
        localStorage.setItem('firebase_auth_signout', JSON.stringify({
          timestamp: Date.now(),
          action: 'signout'
        }));
        // Clean up the broadcast message
        setTimeout(() => {
          localStorage.removeItem('firebase_auth_signout');
        }, 1000);
      } catch (e) {
        console.warn('Could not broadcast signout:', e);
      }
      
      addToast('You have been signed out successfully.', 'success');
    } catch (error: any) {
      console.error('Sign out error:', error);
      addToast('Sign out completed with some issues.', 'info');
      // Still consider it successful since user state is cleared
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  const updateProfile = useCallback(async (name: string) => {
    try {
      await authService.updateProfile(name);
      // Update the user state immediately
      if (user) {
        setUser(prev => prev ? { ...prev, name } : null);
      }
      addToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [user, addToast]);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      // First reauthenticate the user
      await authService.reauthenticate(currentPassword);
      // Then update the password
      await authService.updatePassword(newPassword);
      addToast('Password updated successfully!', 'success');
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [addToast]);

  const upgradeSubscription = useCallback(async (tier: SubscriptionTier, _paymentMethod?: string) => {
    if (!user) {
      throw new Error('User must be signed in to upgrade subscription');
    }
    if (user.uid === 'guest') {
      throw new Error('Please sign in to upgrade your subscription');
    }

    // Always fetch latest user data before upgrade
    let latestUser: User | null = null;
    try {
      latestUser = await userService.loadUserData(user.uid);
    } catch (err) {
      console.warn('Could not fetch latest user data before upgrade:', err);
    }
    const currentTier = latestUser?.subscription?.tier || user.subscription.tier;
    if (currentTier === 'premium' || currentTier === 'pro') {
      addToast('You already have premium access!', 'info');
      return;
    }

    try {
      console.log('Starting subscription upgrade for user:', user.uid, 'to tier:', tier);
      
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get new features for the tier
      const updatedFeatures = userService.getPremiumFeatures(tier);

      // Create updated subscription info
      const updatedSubscription = {
        ...user.subscription,
        tier,
        startDate: new Date().toISOString(),
        endDate: tier !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
      };

      // Update local state first for immediate UI response
      const updatedUser: User = {
        ...user,
        subscription: updatedSubscription,
        features: updatedFeatures
      };
      setUser(updatedUser);

      console.log('Attempting to update subscription in Firestore...');
      
      try {
        // Try to update subscription in Firestore
        await userService.updateSubscription(user.uid, updatedSubscription, updatedFeatures);
        console.log('✅ Firestore subscription update successful');
        // Broadcast premium status change to all tabs using multiple methods
        const statusChangeData = { 
          tier, 
          timestamp: Date.now(), 
          userId: user.uid 
        };
        
        // Method 1: localStorage (works for other tabs)
        localStorage.setItem('premiumStatusChanged', JSON.stringify(statusChangeData));
        console.log('📤 localStorage premium status change sent:', statusChangeData);
        
        // Method 2: BroadcastChannel (modern browsers, works for all tabs including current)
        if ('BroadcastChannel' in window) {
          const channel = new BroadcastChannel('premium-sync');
          channel.postMessage(statusChangeData);
          console.log('📤 BroadcastChannel message sent:', statusChangeData);
          channel.close();
        }
        
        // Method 3: Custom event for current tab
        window.dispatchEvent(new CustomEvent('premiumStatusUpdated', { 
          detail: statusChangeData
        }));
        console.log('📤 Custom event dispatched:', statusChangeData);
        
        console.log('🔄 Broadcasting premium status change to all tabs...');
        // Fetch latest user data from Firestore to ensure all tabs/devices are in sync
        const latestUser = await userService.loadUserData(user.uid);
        if (latestUser) {
          console.log('✅ Context updated with latest user data:', latestUser.subscription.tier);
          setUser(latestUser);
        }
        
        // Force immediate UI update by triggering a re-render
        setTimeout(() => {
          console.log('🔄 Forcing component re-renders...');
          window.dispatchEvent(new Event('resize')); // Triggers re-renders in many components
        }, 100);
        
        addToast(`Successfully upgraded to ${tier}!`, 'success');
      } catch (firestoreError: any) {
        console.warn('Firestore update failed, but subscription is active locally:', firestoreError);
        // Still show success since the subscription is working locally
        addToast(`Upgraded to ${tier}! (Data will sync when connection is restored)`, 'success');
        
        // Optionally, you could store the failed update for retry later
        try {
          localStorage.setItem('pendingSubscriptionUpdate', JSON.stringify({
            uid: user.uid,
            subscription: updatedSubscription,
            features: updatedFeatures,
            timestamp: Date.now()
          }));
        } catch (storageError) {
          console.warn('Could not store pending update:', storageError);
        }
      }
    } catch (error: any) {
      console.error('Subscription upgrade failed:', error);
      const errorMessage = error.message || 'Failed to upgrade subscription';
      addToast(errorMessage, 'error');
      throw error;
    }
  }, [user, addToast]);

  const redeemGiftCode = useCallback(async (code: string): Promise<SubscriptionTier> => {
    if (!user) {
      throw new Error('User must be signed in to redeem gift codes');
    }

    // Demo gift codes validation - in production this would be done on backend
    const DEMO_GIFT_CODES: { [key: string]: SubscriptionTier } = {
      'TYPINGPATH2024': 'premium',
      'PREMIUM50OFF': 'premium',
      'BETA-ACCESS-001': 'pro',
      'EARLY-ADOPTER': 'premium',
      'LAUNCH-SPECIAL': 'pro'
    };

    const normalizedCode = code.trim().toUpperCase();
    const tier = DEMO_GIFT_CODES[normalizedCode];

    if (!tier) {
      throw new Error('Invalid gift code');
    }

    try {
      // Use the existing upgrade method
      await upgradeSubscription(tier, 'gift-code');
      addToast(`Gift code redeemed! Welcome to ${tier}!`, 'success');
      return tier;
    } catch (error: any) {
      addToast(error.message || 'Failed to redeem gift code', 'error');
      throw error;
    }
  }, [user, upgradeSubscription, addToast]);

  // Function to retry pending subscription updates
  const retryPendingSubscriptionUpdate = useCallback(async () => {
    try {
      const pendingUpdate = localStorage.getItem('pendingSubscriptionUpdate');
      if (!pendingUpdate) return;

      const updateData = JSON.parse(pendingUpdate);
      const { uid, subscription, features } = updateData;

      // Only retry if it's for the current user and not too old (24 hours)
      if (uid === user?.uid && Date.now() - updateData.timestamp < 24 * 60 * 60 * 1000) {
        console.log('Retrying pending subscription update...');
        await userService.updateSubscription(uid, subscription, features);
        localStorage.removeItem('pendingSubscriptionUpdate');
        console.log('Pending subscription update completed successfully');
      } else {
        // Remove old or invalid pending updates
        localStorage.removeItem('pendingSubscriptionUpdate');
      }
    } catch (error) {
      console.warn('Failed to retry pending subscription update:', error);
      // Keep the pending update for next retry
    }
  }, [user]);

  // Try to sync pending updates when user changes or comes online
  useEffect(() => {
    if (user && user.uid !== 'guest') {
      retryPendingSubscriptionUpdate();
    }
  }, [user, retryPendingSubscriptionUpdate]);

  // Refetch user data from Firestore on window focus to sync premium status
  useEffect(() => {
    const handleFocus = async () => {
      if (auth.currentUser && auth.currentUser.uid !== 'guest') {
        try {
          const latestUser = await userService.loadUserData(auth.currentUser.uid);
          if (latestUser) {
            setUser(latestUser);
          }
        } catch (err) {
          console.warn('Failed to refresh user data from Firestore:', err);
        }
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // --- Robust Premium Sync: Polling, Cross-tab, and Guaranteed Fetch ---
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null;

    // Helper to fetch latest user data from Firestore with auth sync
    const fetchLatestUser = async () => {
      // Use the current user from context instead of auth.currentUser
      const currentUserId = user?.uid || auth.currentUser?.uid;
      if (currentUserId && currentUserId !== 'guest') {
        try {
          console.log('🔄 Fetching latest user data from Firestore for:', currentUserId);
          
          // Ensure auth state is valid before making Firestore calls
          const isAuthValid = await authSync.isAuthStateValid();
          if (!isAuthValid) {
            console.log('🔄 Auth state invalid, syncing before fetch...');
            await authSync.syncAuthState();
          }
          
          const latestUser = await userService.loadUserData(currentUserId);
          if (latestUser) {
            console.log('✅ Updated user data:', latestUser.subscription.tier);
            setUser(latestUser);
          } else {
            console.warn('❌ No user data found in Firestore for:', currentUserId);
          }
        } catch (err) {
          console.warn('❌ Failed to poll user data from Firestore:', err);
          
          // If it's a permissions error, try to sync auth state
          if ((err as any)?.message?.includes('Missing or insufficient permissions')) {
            console.log('🔄 Permissions error detected, forcing auth sync...');
            try {
              await authSync.syncAuthState();
              // Retry once after auth sync
              const latestUser = await userService.loadUserData(currentUserId);
              if (latestUser) {
                console.log('✅ Retry successful after auth sync:', latestUser.subscription.tier);
                setUser(latestUser);
              }
            } catch (retryError) {
              console.warn('❌ Retry after auth sync also failed:', retryError);
            }
          }
        }
      } else {
        console.log('⏭️ Skipping fetch - no valid user ID found');
      }
    };

    // 1. Guaranteed fetch on mount if session exists
    const currentUserId = user?.uid || auth.currentUser?.uid;
    if (currentUserId && currentUserId !== 'guest') {
      console.log('🎯 Initial fetch on mount for user:', currentUserId);
      fetchLatestUser();
    }

    // 2. Polling every 45 seconds
    pollingInterval = setInterval(fetchLatestUser, 45000);

    // 3. Cross-tab sync: listen for storage changes, broadcast channel, AND custom events
    const handleStorage = (e: StorageEvent) => {
      console.log('📨 Storage event received:', e.key, e.newValue);
      if (e.key === 'premiumStatusChanged') {
        console.log('🔄 Storage event detected, fetching latest user data...');
        fetchLatestUser();
      } else if (
        e.key === 'pendingSubscriptionUpdate' ||
        e.key === 'typer_session_data'
      ) {
        fetchLatestUser();
      }
    };
    
    const handlePremiumUpdate = (event: any) => {
      console.log('🔄 Premium update event detected:', event.detail);
      fetchLatestUser();
    };
    
    // BroadcastChannel for modern browsers (works across all tabs)
    let broadcastChannel: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      broadcastChannel = new BroadcastChannel('premium-sync');
      broadcastChannel.onmessage = (event) => {
        console.log('🔄 BroadcastChannel message received:', event.data);
        fetchLatestUser();
      };
      console.log('✅ BroadcastChannel listener set up');
    } else {
      console.warn('❌ BroadcastChannel not supported');
    }
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('premiumStatusUpdated', handlePremiumUpdate);
    console.log('✅ Event listeners set up for premium sync');

    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('premiumStatusUpdated', handlePremiumUpdate);
      if (broadcastChannel) {
        broadcastChannel.close();
      }
    };
  }, [user]); // Add user to dependency array to recreate when user changes

  // Periodic premium status verification to fix inconsistent behavior
  useEffect(() => {
    if (!user || user.uid === 'guest') return;
    
    const verifyPremiumStatus = async () => {
      try {
        const latestUser = await userService.loadUserData(user.uid);
        if (latestUser && latestUser.subscription.tier !== user.subscription.tier) {
          console.log('🔄 [Premium Verification] Status mismatch detected:', {
            current: user.subscription.tier,
            firestore: latestUser.subscription.tier
          });
          setUser(latestUser);
        }
      } catch (error) {
        console.warn('[Premium Verification] Failed to verify status:', error);
      }
    };

    // Verify premium status every 30 seconds when user is active
    const interval = setInterval(verifyPremiumStatus, 30000);
    
    // Also verify on window focus (when user returns to tab)
    const handleFocus = () => {
      console.log('🔄 [Premium Verification] Tab focused, verifying status...');
      verifyPremiumStatus();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  // Enhanced session management methods
  const getSessionConfig = useCallback(() => {
    return enhancedSessionService.getSessionConfig();
  }, []);

  const updateSessionConfig = useCallback(async (config: Partial<SessionConfig>) => {
    await enhancedSessionService.updateSessionConfig(config);
  }, []);

  const isDeviceTrusted = useCallback(() => {
    return enhancedSessionService.isDeviceTrusted();
  }, []);

  const addTrustedDevice = useCallback(async () => {
    await enhancedSessionService.addTrustedDevice();
    addToast('Device added to trusted devices', 'success');
  }, [addToast]);

  const extendSession = useCallback(async () => {
    await enhancedSessionService.extendSession();
    addToast('Session extended successfully', 'success');
  }, [addToast]);

  const getSessionTimeRemaining = useCallback(() => {
    const sessionData = enhancedSessionService.getSessionData();
    if (!sessionData) return 0;
    return Math.max(0, sessionData.expiresAt - Date.now());
  }, []);

  // Email verification methods
  const sendEmailVerification = useCallback(async () => {
    try {
      await authService.sendEmailVerification();
      addToast('Verification email sent! Please check your inbox.', 'success');
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [addToast]);

  const checkEmailVerification = useCallback(async () => {
    try {
      return await authService.checkEmailVerification();
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [addToast]);

  const resendEmailVerification = useCallback(async () => {
    try {
      await authService.resendEmailVerification();
      addToast('Verification email resent! Please check your inbox.', 'success');
    } catch (error: any) {
      addToast(error.message, 'error');
      throw error;
    }
  }, [addToast]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ 
    user, 
    isLoading, 
    signIn, 
    signUp, 
    signOut, 
    signInWithGoogle, 
    updateProfile, 
    updatePassword, 
    upgradeSubscription, 
    redeemGiftCode,
    // Email verification methods
    sendEmailVerification,
    checkEmailVerification,
    resendEmailVerification,
    // Enhanced session management
    getSessionConfig,
    updateSessionConfig,
    isDeviceTrusted,
    addTrustedDevice,
    extendSession,
    getSessionTimeRemaining
  }), [
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateProfile,
    updatePassword,
    upgradeSubscription,
    redeemGiftCode,
    sendEmailVerification,
    checkEmailVerification,
    resendEmailVerification,
    getSessionConfig,
    updateSessionConfig,
    isDeviceTrusted,
    addTrustedDevice,
    extendSession,
    getSessionTimeRemaining
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

