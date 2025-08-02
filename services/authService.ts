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
      // Using signInWithRedirect for better compatibility across environments
      await auth.signInWithRedirect(googleProvider);
      // The result will be handled by the onAuthStateChanged listener in AuthContext
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/operation-not-allowed':
          throw new Error('Google Sign-In is not enabled. Please contact support.');
        case 'auth/operation-not-supported-in-this-environment':
          throw new Error('Google Sign-In is not supported in this environment.');
        case 'auth/popup-blocked':
          throw new Error('Pop-up was blocked. Please allow pop-ups and try again.');
        case 'auth/cancelled-popup-request':
          throw new Error('Sign-in was cancelled.');
        default:
          throw new Error(error.message || 'Failed to start Google Sign-In. Please try again.');
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
  }
};