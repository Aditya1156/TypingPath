import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import LandingPage from './components/landing/LandingPage';
import TypingApp from './TypingApp';
import ToastContainer from './components/ToastContainer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

import { useAuth } from './context/AuthContext';
import { useSettings } from './context/SettingsContext';
import { useToast } from './context/ToastContext';
import { TimerProvider } from './context/TimerContext';
import { secureSessionStorage } from './utils/security';
import type { ModalType } from './types';

// Lazy load auth and settings components for better performance
const SignIn = lazy(() => import('./components/auth/SignIn'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const Profile = lazy(() => import('./components/auth/Profile'));
const Settings = lazy(() => import('./components/Settings'));
const SubscriptionManager = lazy(() => import('./components/SubscriptionManager'));

const App = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  const { user, isLoading } = useAuth();
  const { theme } = useSettings();
  const { addToast } = useToast();

  // Check if this is a Google Sign-In redirect by looking at URL parameters
  const isGoogleRedirect = window.location.search.includes('state=') || window.location.search.includes('code=');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle redirect to main app after successful authentication
  useEffect(() => {
    if (!isLoading && user && user.uid !== 'guest' && !initialAuthChecked) {
      // Check if user was just authenticated (not initial load with existing auth)
      const wasSigningIn = secureSessionStorage.get('signingIn');
      
      if (wasSigningIn && view === 'landing') {
        setView('app');
        setActiveModal(null);
        secureSessionStorage.remove('signingIn');
      }
      setInitialAuthChecked(true);
    }
  }, [user, isLoading, view, initialAuthChecked]);

  // Additional check for Google Sign-In redirects that might not have the signingIn flag
  useEffect(() => {
    if (!isLoading && user && user.uid !== 'guest' && view === 'landing') {
      // Check if this is likely a Google Sign-In redirect (no signingIn flag but user exists)
      const wasSigningIn = secureSessionStorage.get('signingIn');
      if (!wasSigningIn && !initialAuthChecked && isGoogleRedirect) {
        // This is definitely a Google Sign-In redirect
        setView('app');
        setActiveModal(null);
      }
    }
  }, [user, isLoading, view, initialAuthChecked, isGoogleRedirect]);

  // Handle redirect to landing page after sign-out (but keep guests in app)
  useEffect(() => {
    if (!isLoading && !user && view === 'app') {
      // Only redirect to landing if user is null (signed out), not guests
      setView('landing');
      setActiveModal(null);
    }
  }, [user, isLoading, view]);

  // SECURITY FIX: Handle auth requirement from subscription attempts
  useEffect(() => {
    const handleRequireAuth = (event: CustomEvent) => {
      const { action, tier } = event.detail;
      if (action === 'upgrade') {
        // Store the intended upgrade for after authentication using secure storage
        secureSessionStorage.set('pendingUpgrade', tier);
        handleShowModal('signIn');
      }
    };

    const handleShowUpgradeModal = () => {
      // Open upgrade modal after authentication
      handleShowModal('upgrade');
    };

    window.addEventListener('requireAuth', handleRequireAuth as EventListener);
    window.addEventListener('showUpgradeModal', handleShowUpgradeModal as EventListener);
    
    return () => {
      window.removeEventListener('requireAuth', handleRequireAuth as EventListener);
      window.removeEventListener('showUpgradeModal', handleShowUpgradeModal as EventListener);
    };
  }, []);
  
  const handleStartTyping = useCallback(() => {
    // Allow guest access but encourage sign-up for authenticated users
    if (user && user.uid !== 'guest') {
      // If authenticated, go to app
      setView('app');
      addToast('Welcome back! Enjoy unlimited typing practice.', 'success');
    } else {
      // Allow guest access - no sign-up required initially
      setView('app');
      addToast('🎉 Start practicing! Sign up anytime to save your progress.', 'success');
    }
  }, [user, addToast]);

  const handleGoToLanding = () => {
    setView('landing');
  };

  const handleShowModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleSignInSuccess = useCallback(() => {
    setActiveModal(null);
    setView('app'); // Redirect to main app after successful sign-in
  }, []);

  const handleShowSignInModal = useCallback(() => {
    secureSessionStorage.set('signingIn', 'true');
    setActiveModal('signIn');
  }, []);

  const renderModal = useCallback(() => {
    if (!activeModal) return null;
    return (
      <Suspense fallback={<LoadingSpinner />}>
        {(() => {
          switch(activeModal) {
            case 'signIn':
              return <SignIn onClose={handleCloseModal} onSwitchToSignUp={() => handleShowModal('signUp')} onSignInSuccess={handleSignInSuccess} />;
            case 'signUp':
              return <SignUp onClose={handleCloseModal} onSwitchToSignIn={handleShowSignInModal} onSignUpSuccess={handleSignInSuccess} />;
            case 'profile':
              return user ? <Profile onClose={handleCloseModal} /> : null;
            case 'settings':
              return <Settings onClose={handleCloseModal} onUpgrade={() => handleShowModal('upgrade')} />;
            case 'upgrade':
              return <SubscriptionManager onClose={handleCloseModal} />;
            default:
              return null;
          }
        })()}
      </Suspense>
    );
  }, [activeModal, user, handleCloseModal, handleShowModal, handleSignInSuccess, handleShowSignInModal]);

  return (
    <ErrorBoundary>
      <TimerProvider>
        <ToastContainer />
        {view === 'landing' ? (
          <LandingPage onStartTyping={handleStartTyping} onShowModal={handleShowModal} onShowSignIn={handleShowSignInModal} />
        ) : (
          <TypingApp 
            onGoToLanding={handleGoToLanding} 
            onShowModal={handleShowModal}
          />
        )}
        <Suspense fallback={<LoadingSpinner />}>
          {renderModal()}
        </Suspense>
      </TimerProvider>
    </ErrorBoundary>
  );
};

export default App;