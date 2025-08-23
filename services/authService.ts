import firebase from "firebase/compat/app";
import { auth } from '../firebaseConfig';
import { userService } from './userService';
import type { User } from '../types';

// Configure Google provider to request additional scopes
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

export const authService = {
  signInWithGoogle: async (): Promise<void> => {
    try {
      // 🔧 FIX: Use popup flow for all environments (more reliable than redirect)
      console.log('🌐 Using popup flow for Google Sign-In');
      console.log('🔍 Debug Info:', {
        hostname: window.location.hostname,
        origin: window.location.origin,
        userAgent: navigator.userAgent.substring(0, 50),
        firebaseConfig: {
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY
        }
      });
      
      const result = await auth.signInWithPopup(googleProvider);
      console.log('Google Sign-In successful:', result.user?.displayName || result.user?.email);
      
      // Check if this was a new user vs existing user
      if (result.additionalUserInfo?.isNewUser) {
        console.log('✨ New Google account created successfully');
      } else {
        console.log('👋 Existing Google user signed in successfully');
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential
      });
      
      // Handle specific Firebase auth errors with better messages
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          // This happens when user tries to sign up with Google but email already exists with password
          const email = error.email;
          throw new Error(`An account with ${email} already exists. Please sign in with your password instead, or use "Forgot Password" to reset it.`);
        case 'auth/operation-not-allowed':
          throw new Error('Google Sign-In is not enabled. Please contact support.');
        case 'auth/operation-not-supported-in-this-environment':
          throw new Error('Google Sign-In is not supported in this environment.');
        case 'auth/popup-blocked':
          throw new Error('Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.');
        case 'auth/popup-closed-by-user':
          throw new Error('Sign-in was cancelled. Please try again.');
        case 'auth/cancelled-popup-request':
          throw new Error('Sign-in was cancelled.');
        case 'auth/unauthorized-domain':
          throw new Error(`This domain (${window.location.hostname}) is not authorized for Google Sign-In. Please contact support.`);
        case 'auth/credential-already-in-use':
          throw new Error('This Google account is already linked to another user. Please try a different account.');
        case 'auth/network-request-failed':
          throw new Error('Network error occurred. Please check your internet connection and try again.');
        case 'auth/internal-error':
          throw new Error('An internal error occurred. Please try again later.');
        default:
          throw new Error(`Google Sign-In failed: ${error.message || 'Unknown error'}. Please try again.`);
      }
    }
  },

  signUp: async (name: string, email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting to create user with email:', email);
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User credential created:', userCredential.user?.uid);
      
      if (userCredential.user) {
        await userCredential.user.updateProfile({ displayName: name });
        console.log('User profile updated with displayName:', name);
        
        // Send email verification
        try {
          await userCredential.user.sendEmailVerification({
            url: `${window.location.origin}/verify-email?continueUrl=${encodeURIComponent(window.location.origin)}`,
            handleCodeInApp: false
          });
          console.log('✅ Email verification sent successfully to:', email);
        } catch (verificationError: any) {
          console.error('❌ Failed to send email verification:', verificationError);
          // Don't throw here - account is still created, just log the error
          // User can request resend later
        }
      }
      
      const { uid, displayName, email: userEmail } = userCredential.user!;
      
      // Create user data with default subscription and features
      const userData = userService.createDefaultUserData(uid, displayName || name || null, userEmail);
      
      // Try to save user data to Firestore (but don't fail if it doesn't work)
      try {
        await userService.saveUserData(userData);
        console.log('User data saved to Firestore');
      } catch (saveError) {
        console.warn('Could not save user data to Firestore, continuing with local data:', saveError);
        // Continue anyway - user account is still created successfully
      }
      
      console.log('Sign-up successful for user:', userData.uid);
      return userData;
    } catch (error: any) {
      console.error('Sign-up error:', error);
      // Map Firebase error codes to more user-friendly messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('An account with this email already exists. Try signing in instead or use a different email address.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/weak-password':
          throw new Error('Password should be at least 6 characters long.');
        case 'auth/operation-not-allowed':
          throw new Error('Email/password accounts are not enabled. Please contact support.');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection and try again.');
        default:
          throw new Error(error.message || 'An unexpected error occurred during sign up.');
      }
    }
  },
  
  signIn: async (email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting to sign in user with email:', email);
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Sign-in successful for user:', userCredential.user?.uid);
      
      const { uid, displayName, email: userEmail } = userCredential.user!;
      
      // Try to load user data from Firestore with fallback
      let userData: User;
      try {
        const firestoreData = await userService.loadUserData(uid);
        
        // If no Firestore data exists, create default data and try to save it
        if (!firestoreData) {
          console.log('No Firestore data found for user, creating default data');
          userData = userService.createDefaultUserData(uid, displayName || null, userEmail);
          try {
            await userService.saveUserData(userData);
          } catch (saveError) {
            console.warn('Could not save user data to Firestore, continuing with local data:', saveError);
            // Continue anyway - user can still sign in
          }
        } else {
          userData = firestoreData;
        }
      } catch (loadError) {
        console.warn('Could not load user data from Firestore, using default data:', loadError);
        // Create default data if Firestore fails completely
        userData = userService.createDefaultUserData(uid, displayName || null, userEmail);
      }
      
      console.log('User data loaded for sign-in:', userData.uid);
      return userData;
    } catch (error: any) {
      console.error('Sign-in error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No account found with this email address. Please sign up first or check your email.');
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          throw new Error('Incorrect password. Please try again or reset your password.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/too-many-requests':
          throw new Error('Too many failed login attempts. Please try again later or reset your password.');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled. Please contact support.');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection and try again.');
        default:
          throw new Error(error.message || 'An unexpected error occurred during sign in.');
      }
    }
  },

  signOut: async (): Promise<void> => {
    try {
      // Clear all local storage and session storage related to auth
      localStorage.removeItem('firebase_auth_state_change');
      localStorage.removeItem('typer_session_data');
      localStorage.removeItem('typer_session_config');
      localStorage.removeItem('typer_trusted_devices');
      localStorage.removeItem('typer_last_activity');
      
      // Clear session storage
      sessionStorage.clear();
      
      // Clear any secure session storage
      if (typeof window !== 'undefined') {
        try {
          const keys = Object.keys(sessionStorage);
          keys.forEach(key => {
            if (key.includes('typer_') || key.includes('firebase_')) {
              sessionStorage.removeItem(key);
            }
          });
        } catch (e) {
          console.warn('Could not clear session storage:', e);
        }
      }
      
      // Sign out from Firebase Auth
      await auth.signOut();
      
      console.log('Complete sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  updateProfile: async (name: string): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      // Update Firebase Auth profile
      await currentUser.updateProfile({ displayName: name });
      
      // Update Firestore user document
      await userService.updateProfile(currentUser.uid, { name });
      
      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update error:', error);
      switch (error.code) {
        case 'auth/requires-recent-login':
          throw new Error('Please sign in again to update your profile.');
        default:
          throw new Error(error.message || 'Failed to update profile.');
      }
    }
  },

  updatePassword: async (newPassword: string): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      await currentUser.updatePassword(newPassword);
      console.log('Password updated successfully');
    } catch (error: any) {
      console.error('Password update error:', error);
      switch (error.code) {
        case 'auth/requires-recent-login':
          throw new Error('Please sign in again to change your password.');
        case 'auth/weak-password':
          throw new Error('Password should be at least 6 characters long.');
        default:
          throw new Error(error.message || 'Failed to update password.');
      }
    }
  },

  reauthenticate: async (password: string): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user is currently signed in');
      }
      
      const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
      await currentUser.reauthenticateWithCredential(credential);
      console.log('Reauthentication successful');
    } catch (error: any) {
      console.error('Reauthentication error:', error);
      switch (error.code) {
        case 'auth/wrong-password':
          throw new Error('Current password is incorrect.');
        case 'auth/invalid-credential':
          throw new Error('Invalid credentials provided.');
        default:
          throw new Error(error.message || 'Failed to verify current password.');
      }
    }
  },

  // Email verification methods
  sendEmailVerification: async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      if (currentUser.emailVerified) {
        throw new Error('Email is already verified');
      }
      
      await currentUser.sendEmailVerification({
        url: `${window.location.origin}/verify-email?continueUrl=${encodeURIComponent(window.location.origin)}`,
        handleCodeInApp: false
      });
      
      console.log('Email verification sent successfully');
    } catch (error: any) {
      console.error('Send email verification error:', error);
      switch (error.code) {
        case 'auth/too-many-requests':
          throw new Error('Too many verification emails sent. Please wait before requesting another.');
        case 'auth/user-not-found':
          throw new Error('User not found. Please sign up first.');
        default:
          throw new Error(error.message || 'Failed to send verification email.');
      }
    }
  },

  checkEmailVerification: async (): Promise<boolean> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return false;
      }
      
      // Reload user to get latest email verification status
      await currentUser.reload();
      return currentUser.emailVerified;
    } catch (error) {
      console.error('Check email verification error:', error);
      return false;
    }
  },

  resendEmailVerification: async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      if (currentUser.emailVerified) {
        throw new Error('Email is already verified');
      }
      
      await currentUser.sendEmailVerification({
        url: `${window.location.origin}/verify-email?continueUrl=${encodeURIComponent(window.location.origin)}`,
        handleCodeInApp: false
      });
      
      console.log('Email verification resent successfully');
    } catch (error: any) {
      console.error('Resend email verification error:', error);
      switch (error.code) {
        case 'auth/too-many-requests':
          throw new Error('Too many verification emails sent. Please wait at least 1 minute before requesting another.');
        default:
          throw new Error(error.message || 'Failed to resend verification email.');
      }
    }
  },

  /**
   * Get the authentication provider for a user
   */
  getProvider: (user: any): string | null => {
    if (!user || !user.providerData || user.providerData.length === 0) {
      return null;
    }
    return user.providerData[0]?.providerId || null;
  },

  /**
   * Check if user is a Google Sign-In user
   */
  isGoogleUser: (user: any): boolean => {
    return authService.getProvider(user) === 'google.com';
  },

  /**
   * Check if user needs email verification
   * Google users are considered verified by default
   */
  needsEmailVerification: (user: any): boolean => {
    if (!user) return false;
    
    // Google users don't need email verification
    if (authService.isGoogleUser(user)) {
      return false;
    }
    
    // Email/password users need verification if not already verified
    return authService.getProvider(user) === 'password' && !user.emailVerified;
  },

  /**
   * Add password to Google account (allow Google users to set a password)
   */
  addPasswordToAccount: async (password: string): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Check if user is a Google user
      if (!authService.isGoogleUser(currentUser)) {
        throw new Error('This feature is only available for Google sign-in users');
      }

      // Create email/password credential
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email!,
        password
      );

      // Link the credential to the current account
      await currentUser.linkWithCredential(credential);
      
      console.log('Password successfully added to Google account');
    } catch (error: any) {
      console.error('Add password error:', error);
      switch (error.code) {
        case 'auth/weak-password':
          throw new Error('Password is too weak. Please choose a stronger password (at least 6 characters).');
        case 'auth/email-already-in-use':
          throw new Error('This email is already associated with a password. You can reset your password instead.');
        case 'auth/credential-already-in-use':
          throw new Error('A password is already set for this account.');
        case 'auth/provider-already-linked':
          throw new Error('This account already has a password. You can change it in settings.');
        default:
          throw new Error(error.message || 'Failed to add password to your account.');
      }
    }
  },

  /**
   * Check if Google user has a password linked
   */
  hasPasswordLinked: (user: any): boolean => {
    if (!user || !user.providerData) return false;
    return user.providerData.some((provider: any) => provider?.providerId === 'password');
  },

  /**
   * Send password reset email (works for both email/password and Google users with linked passwords)
   */
  sendPasswordResetEmail: async (email: string): Promise<void> => {
    try {
      await auth.sendPasswordResetEmail(email, {
        url: `${window.location.origin}/`,
        handleCodeInApp: false,
      });
      console.log('Password reset email sent successfully');
    } catch (error: any) {
      console.error('Password reset email error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No account found with this email address.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/too-many-requests':
          throw new Error('Too many password reset requests. Please wait before trying again.');
        default:
          throw new Error(error.message || 'Failed to send password reset email.');
      }
    }
  }
};