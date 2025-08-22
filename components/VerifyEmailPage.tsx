import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const VerifyEmailPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const { user, checkEmailVerification } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Wait a moment for auth state to update
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const verified = await checkEmailVerification();
        if (verified) {
          setIsVerified(true);
          setError('');
          
          // Redirect to dashboard after success
          setTimeout(() => {
            const continueUrl = new URLSearchParams(window.location.search).get('continueUrl');
            window.location.href = continueUrl || '/';
          }, 3000);
        } else {
          setError('Email verification failed. Please try clicking the link again.');
        }
      } catch (err: any) {
        setError(err.message || 'Verification failed. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    };

    // Only verify if we have a user
    if (user && user.uid !== 'guest') {
      verifyEmail();
    } else {
      setIsVerifying(false);
      setError('Please sign in first to verify your email.');
    }
  }, [user, checkEmailVerification]);

  const handleReturnHome = () => {
    const continueUrl = new URLSearchParams(window.location.search).get('continueUrl');
    window.location.href = continueUrl || '/';
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-secondary rounded-xl shadow-2xl w-full max-w-md p-8 border border-border-primary text-center">
        {isVerifying ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">Verifying Email</h1>
            <p className="text-text-secondary">
              Please wait while we verify your email address...
            </p>
          </>
        ) : isVerified ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-success/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-success mb-4">Email Verified!</h1>
            <p className="text-text-secondary mb-6">
              Your email has been successfully verified. You'll be redirected to the app in a few seconds.
            </p>
            <button
              onClick={handleReturnHome}
              className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Continue to App
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-danger/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-danger mb-4">Verification Failed</h1>
            <p className="text-text-secondary mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleReturnHome}
                className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Return to App
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-tertiary text-text-primary border border-border-primary rounded-lg hover:bg-tertiary/80 transition-colors"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
