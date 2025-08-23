import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebaseConfig';
import { secureSessionStorage } from '../utils/security';

const GoogleAuthDebug = () => {
  const [authState, setAuthState] = useState({
    currentUser: null as any,
    isPending: false,
    hasRedirectParams: false,
    sessionFlags: {
      signingIn: false,
      googleSignInPending: false
    }
  });

  useEffect(() => {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasRedirectParams = urlParams.has('state') || urlParams.has('code');

    // Check session flags
    const signingIn = !!secureSessionStorage.get('signingIn');
    const googleSignInPending = !!secureSessionStorage.get('googleSignInPending');

    // Update state
    setAuthState(prev => ({
      ...prev,
      hasRedirectParams,
      sessionFlags: { signingIn, googleSignInPending }
    }));

    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('GoogleAuthDebug: Auth state changed:', user ? user.uid : 'No user');
      setAuthState(prev => ({
        ...prev,
        currentUser: user
      }));
    });

    // Check for redirect result
    auth.getRedirectResult()
      .then((result) => {
        console.log('GoogleAuthDebug: Redirect result:', result);
        if (result && result.user) {
          console.log('GoogleAuthDebug: User from redirect:', result.user.uid, result.user.email);
        }
      })
      .catch((error) => {
        console.error('GoogleAuthDebug: Redirect error:', error);
      });

    return unsubscribe;
  }, []);

  const handleTestGoogleSignIn = async () => {
    console.log('GoogleAuthDebug: Starting test Google sign-in');
    try {
      setAuthState(prev => ({ ...prev, isPending: true }));
      
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      console.log('GoogleAuthDebug: Provider configured:', {
        providerId: provider.providerId
      });
      
      console.log('GoogleAuthDebug: Current URL:', window.location.href);
      console.log('GoogleAuthDebug: Firebase App:', auth.app.name);
      
      secureSessionStorage.set('googleSignInPending', 'true');
      secureSessionStorage.set('signingIn', 'true');
      
      console.log('GoogleAuthDebug: Starting redirect...');
      await auth.signInWithRedirect(provider);
    } catch (error) {
      console.error('GoogleAuthDebug: Test sign-in error:', error);
      setAuthState(prev => ({ ...prev, isPending: false }));
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-secondary border border-border-primary rounded-lg p-4 max-w-sm z-50">
      <h3 className="text-sm font-bold text-accent mb-2">Google Auth Debug</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-text-secondary">Current User:</span>{' '}
          <span className="text-text-primary">
            {authState.currentUser ? authState.currentUser.uid : 'None'}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Has Redirect Params:</span>{' '}
          <span className={authState.hasRedirectParams ? 'text-green-500' : 'text-red-500'}>
            {authState.hasRedirectParams ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Signing In Flag:</span>{' '}
          <span className={authState.sessionFlags.signingIn ? 'text-green-500' : 'text-red-500'}>
            {authState.sessionFlags.signingIn ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Google Pending Flag:</span>{' '}
          <span className={authState.sessionFlags.googleSignInPending ? 'text-green-500' : 'text-red-500'}>
            {authState.sessionFlags.googleSignInPending ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Auth Flow:</span>{' '}
          <span className="text-text-primary text-xs">
            {window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'Popup (Localhost)' : 'Redirect (Production)'}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Current URL:</span>{' '}
          <span className="text-text-primary text-xs">
            {window.location.origin}
          </span>
        </div>
        
        <div>
          <span className="text-text-secondary">Firebase Project:</span>{' '}
          <span className="text-text-primary text-xs">
            {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not configured'}
          </span>
        </div>
        
        <div className="pt-2">
          <button
            onClick={handleTestGoogleSignIn}
            disabled={authState.isPending}
            className="w-full px-3 py-1 bg-accent text-primary rounded text-xs font-medium hover:bg-accent/80 disabled:opacity-50"
          >
            {authState.isPending ? 'Testing...' : 'Test Google Sign-In'}
          </button>
        </div>
        
        <div className="pt-1">
          <button
            onClick={() => {
              secureSessionStorage.remove('signingIn');
              secureSessionStorage.remove('googleSignInPending');
              window.location.href = window.location.pathname; // Clear URL params
            }}
            className="w-full px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
          >
            Clear Debug State
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthDebug;
