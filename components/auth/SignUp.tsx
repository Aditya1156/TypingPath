import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';
import { validateEmail, validatePassword, sanitizeInput, isRateLimited, secureSessionStorage } from '../../utils/security';

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSignUpSuccess?: () => void;
}

const SignUp = ({ onClose, onSwitchToSignIn, onSignUpSuccess }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // SECURITY: Input validation and sanitization
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = password; // Don't modify password, just validate
    
    if (sanitizedName.length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }
    
    if (!validateEmail(sanitizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    const passwordValidation = validatePassword(sanitizedPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }
    
    // Rate limiting: max 3 signup attempts per 5 minutes
    if (isRateLimited('signup', 3, 300000)) {
      setError('Too many signup attempts. Please wait 5 minutes before trying again.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Set flag for redirect handling
      secureSessionStorage.set('signingIn', 'true');
      await signUp(sanitizedName, sanitizedEmail, sanitizedPassword);
      if (onSignUpSuccess) {
        onSignUpSuccess();
      } else {
        onClose();
      }
    } catch (err: any) {
      secureSessionStorage.remove('signingIn'); // Remove flag on error
      
      // Check if it's an email already exists error
      if (err.message && err.message.includes('already exists')) {
        setError(err.message);
      } else {
        setError(err.message || 'Failed to sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = () => {
    setError('');
    // Set flag for redirect handling
    secureSessionStorage.set('signingIn', 'true');
    setIsGoogleLoading(true);
    signInWithGoogle().catch((err) => {
      setError(err.message || 'Failed to start Google Sign-In.');
      setIsGoogleLoading(false);
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-secondary p-8 rounded-lg shadow-2xl w-full max-w-md border border-border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-accent">Create Account</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-tertiary">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="space-y-4">
           <button 
            type="button" 
            onClick={handleGoogleSignIn} 
            disabled={isLoading || isGoogleLoading}
            className="w-full flex justify-center items-center gap-3 px-4 py-2.5 border border-border-primary rounded-md bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            {isGoogleLoading ? <LoadingSpinner /> : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.657-11.303-8H6.306C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.24 44 30.025 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                Sign up with Google
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border-primary" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-secondary px-2 text-text-secondary">Or sign up with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email-signup" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <input type="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="password-signup"  className="block text-sm font-medium text-text-secondary mb-1">Password</label>
            <input type="password" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none" />
          </div>

          {error && (
            <div className="space-y-2">
              <p className="text-sm text-danger">{error}</p>
              {error.includes('already exists') && (
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  className="w-full px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-md hover:bg-accent/20 transition-colors text-sm font-medium"
                >
                  Sign In Instead
                </button>
              )}
            </div>
          )}
          
          <button type="submit" disabled={isLoading || isGoogleLoading} className="w-full mt-2 flex justify-center items-center px-6 py-3 font-semibold text-primary bg-accent rounded-md hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-colors disabled:bg-tertiary">
            {isLoading ? <LoadingSpinner /> : 'Sign Up'}
          </button>
          
          <p className="text-sm text-center text-text-secondary">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToSignIn} className="font-medium text-accent hover:underline">
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
