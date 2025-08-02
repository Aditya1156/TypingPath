import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration, using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate that all required Firebase environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('Missing required Firebase environment variables:', missingEnvVars);
  throw new Error(`Firebase configuration incomplete. Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Initialize Firebase, preventing re-initialization on hot reloads
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Initialize Firebase services
const auth = app.auth();
const db = app.firestore();

// Set default persistence to SESSION (only for current browser session)
// This prevents automatic login after browser restart
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

// Force immediate auth state synchronization for new tabs
if (typeof window !== 'undefined') {
  // Listen for auth state changes to sync across tabs
  auth.onAuthStateChanged((user) => {
    console.log('[Firebase Config] Auth state changed:', user ? `User: ${user.uid}` : 'No user');
    
    // Broadcast auth state change to other tabs
    try {
      localStorage.setItem('firebase_auth_state_change', JSON.stringify({
        timestamp: Date.now(),
        hasUser: !!user,
        uid: user?.uid || null
      }));
    } catch (error) {
      console.warn('[Firebase Config] Failed to broadcast auth state:', error);
    }
  });
  
  // Listen for auth state changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'firebase_auth_state_change') {
      console.log('[Firebase Config] Received auth state change from another tab');
      // The auth state will automatically sync, we just log it
    } else if (e.key === 'firebase_auth_signout') {
      console.log('[Firebase Config] Received signout signal from another tab');
      // Force signout in this tab too
      auth.signOut().catch(err => console.warn('Cross-tab signout failed:', err));
    }
  });
}

export { auth, db };