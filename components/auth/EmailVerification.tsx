import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import LoadingSpinner from '../LoadingSpinner';

interface EmailVerificationProps {
  onClose: () => void;
  onVerificationComplete: () => void;
  userEmail: string;
}

const EmailVerification = ({ onClose, onVerificationComplete, userEmail }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  // Countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('🔄 Attempting to resend verification email...');
      await authService.resendEmailVerification();
      console.log('✅ Verification email resent successfully');
      setSuccess('Verification email sent! Please check your inbox.');
      setCountdown(60); // 60 second cooldown
    } catch (err: any) {
      console.error('❌ Failed to resend verification email:', err);
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setError('');
    
    try {
      console.log('🔍 Checking email verification status...');
      const isVerified = await authService.checkEmailVerification();
      console.log('📧 Email verification status:', isVerified);
      
      if (isVerified) {
        console.log('✅ Email verified successfully!');
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          onVerificationComplete();
        }, 1500);
      } else {
        console.log('❌ Email not yet verified');
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
    } catch (err: any) {
      console.error('❌ Error checking verification status:', err);
      setError(err.message || 'Failed to check verification status.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-secondary p-8 rounded-xl shadow-2xl w-full max-w-md border border-border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Verify Your Email</h2>
          <p className="text-text-secondary">
            We've sent a verification link to:
          </p>
          <p className="text-accent font-semibold mt-1 break-all">
            {userEmail}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-tertiary/50 border border-border-primary rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-2">Next steps:</h3>
            <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>Return here and click "I've verified my email"</li>
            </ol>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <p className="text-sm text-success">{success}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={isChecking}
              className="w-full flex justify-center items-center px-6 py-3 font-semibold text-primary bg-accent rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-colors disabled:opacity-50"
            >
              {isChecking ? <LoadingSpinner /> : "I've verified my email"}
            </button>

            <button
              onClick={handleResendVerification}
              disabled={isResending || countdown > 0}
              className="w-full flex justify-center items-center px-6 py-3 font-medium text-text-secondary bg-tertiary border border-border-primary rounded-lg hover:bg-tertiary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-border-primary transition-colors disabled:opacity-50"
            >
              {isResending ? (
                <LoadingSpinner />
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                "Resend verification email"
              )}
            </button>
          </div>

          <div className="text-center pt-4 border-t border-border-primary">
            <p className="text-xs text-text-secondary mb-2">
              Didn't receive the email? Check your spam folder or try a different email address.
            </p>
            <button
              onClick={onClose}
              className="text-sm text-text-secondary hover:text-accent transition-colors underline"
            >
              Close and sign up with a different email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
