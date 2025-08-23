import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';
import { validatePassword, sanitizeInput } from '../../utils/security';

interface PasswordManagementProps {
  onClose: () => void;
  user: any;
}

const PasswordManagement = ({ onClose, user }: PasswordManagementProps) => {
  const [mode, setMode] = useState<'check' | 'add' | 'reset'>('check');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { isGoogleUser, hasPasswordLinked, addPasswordToAccount, sendPasswordResetEmail } = useAuth();

  const isGoogle = isGoogleUser(user);
  const hasPassword = hasPasswordLinked(user);

  const handleAddPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const validation = validatePassword(sanitizedPassword);
    if (!validation.isValid) {
      setError(validation.errors.join('. '));
      return;
    }

    setIsLoading(true);
    try {
      await addPasswordToAccount(sanitizedPassword);
      setSuccess('Password successfully added to your account! You can now sign in with either Google or email/password.');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => onClose(), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setSuccess('Password reset email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
          <h2 className="text-2xl font-bold text-accent">Password Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-tertiary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {mode === 'check' && (
          <div className="space-y-4">
            <div className="p-4 bg-tertiary rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${isGoogle ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                <span className="font-medium">Google Account</span>
                <span className="text-sm text-success">✓ Linked</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${hasPassword ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="font-medium">Password</span>
                <span className={`text-sm ${hasPassword ? 'text-success' : 'text-text-secondary'}`}>
                  {hasPassword ? '✓ Set' : '○ Not Set'}
                </span>
              </div>
            </div>

            <div className="text-sm text-text-secondary">
              {isGoogle && !hasPassword && (
                <p>You signed up with Google. You can add a password to enable email/password sign-in as an alternative.</p>
              )}
              {isGoogle && hasPassword && (
                <p>You can sign in with either Google or your email/password. You can also reset your password if needed.</p>
              )}
            </div>

            <div className="space-y-3">
              {isGoogle && !hasPassword && (
                <button
                  onClick={() => setMode('add')}
                  className="w-full px-4 py-2 bg-accent text-primary rounded-md hover:bg-accent/80 transition-colors font-medium"
                >
                  Add Password to Account
                </button>
              )}
              
              {hasPassword && (
                <button
                  onClick={() => setMode('reset')}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-medium"
                >
                  Reset Password
                </button>
              )}
            </div>
          </div>
        )}

        {mode === 'add' && (
          <form onSubmit={handleAddPassword} className="space-y-4">
            <p className="text-sm text-text-secondary mb-4">
              Adding a password will allow you to sign in with either Google or email/password.
            </p>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-text-secondary mb-1">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-text-secondary mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}
            {success && <p className="text-sm text-success">{success}</p>}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setMode('check')}
                className="flex-1 px-4 py-2 bg-tertiary text-text-secondary rounded-md hover:bg-border-primary transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-accent text-primary rounded-md hover:bg-accent/80 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? <LoadingSpinner /> : 'Add Password'}
              </button>
            </div>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={handleSendResetEmail} className="space-y-4">
            <p className="text-sm text-text-secondary mb-4">
              We'll send a password reset link to your email address.
            </p>
            
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-text-secondary mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}
            {success && <p className="text-sm text-success">{success}</p>}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setMode('check')}
                className="flex-1 px-4 py-2 bg-tertiary text-text-secondary rounded-md hover:bg-border-primary transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? <LoadingSpinner /> : 'Send Reset Email'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordManagement;
