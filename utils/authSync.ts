import { auth } from '../firebaseConfig';
import firebase from "firebase/compat/app";

/**
 * Utility to ensure Firebase auth state is properly synchronized across tabs
 * This helps prevent "Missing or insufficient permissions" errors in Firestore
 */
export class AuthStateSynchronizer {
  private static instance: AuthStateSynchronizer;
  private syncInProgress = false;

  static getInstance(): AuthStateSynchronizer {
    if (!AuthStateSynchronizer.instance) {
      AuthStateSynchronizer.instance = new AuthStateSynchronizer();
    }
    return AuthStateSynchronizer.instance;
  }

  /**
   * Force synchronization of Firebase auth state
   * This should be called when opening new tabs or when auth errors occur
   */
  async syncAuthState(): Promise<void> {
    if (this.syncInProgress) {
      console.log('[Auth Sync] Sync already in progress, skipping');
      return;
    }

    this.syncInProgress = true;
    try {
      console.log('[Auth Sync] Starting Firebase auth state synchronization...');
      
      // Check if we have a current user
      const currentUser = auth.currentUser;
      if (currentUser) {
        console.log('[Auth Sync] Current user found:', currentUser.uid);
        
        // Force token refresh to ensure valid authentication
        try {
          await currentUser.getIdToken(true); // Force refresh
          console.log('[Auth Sync] ✅ Token refreshed successfully');
          
          // Reload user data to ensure we have the latest profile
          await currentUser.reload();
          console.log('[Auth Sync] ✅ User data reloaded');
          
          // Verify the token is working by making a test Firestore call
          // This will help identify auth issues early
          return;
        } catch (tokenError) {
          console.error('[Auth Sync] ❌ Token refresh failed:', tokenError);
          throw tokenError;
        }
      } else {
        console.log('[Auth Sync] No current user found');
      }
    } catch (error) {
      console.error('[Auth Sync] ❌ Auth state sync failed:', error);
      throw error;
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Wait for Firebase auth to be fully ready
   * This ensures auth state is properly initialized before making Firestore calls
   */
  async waitForAuthReady(): Promise<firebase.User | null> {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  /**
   * Setup cross-tab auth state synchronization
   * This listens for auth changes from other tabs and syncs accordingly
   */
  setupCrossTabSync(): () => void {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'firebase_auth_state_change') {
        console.log('[Auth Sync] Cross-tab auth change detected');
        this.syncAuthState().catch(error => {
          console.warn('[Auth Sync] Cross-tab sync failed:', error);
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }

  /**
   * Check if the current auth state is valid for Firestore operations
   */
  async isAuthStateValid(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return false;

      // Try to get a fresh token
      await currentUser.getIdToken(true);
      return true;
    } catch (error) {
      console.warn('[Auth Sync] Auth state is invalid:', error);
      return false;
    }
  }

  /**
   * Retry a Firestore operation with auth state synchronization
   */
  async retryWithAuthSync<T>(operation: () => Promise<T>, maxRetries = 2): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Ensure auth state is valid before attempting operation
        if (!(await this.isAuthStateValid())) {
          console.log(`[Auth Sync] Attempt ${attempt}: Auth state invalid, syncing...`);
          await this.syncAuthState();
        }

        // Try the operation
        return await operation();
      } catch (error: any) {
        lastError = error;
        console.warn(`[Auth Sync] Attempt ${attempt} failed:`, error.message);

        // If it's a permissions error, try to sync auth state
        if (error.message?.includes('Missing or insufficient permissions') && attempt < maxRetries) {
          console.log(`[Auth Sync] Permissions error detected, syncing auth state...`);
          await this.syncAuthState();
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else if (attempt >= maxRetries) {
          break;
        }
      }
    }

    throw lastError || new Error('Operation failed after all retries');
  }
}

export const authSync = AuthStateSynchronizer.getInstance();
