import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';

interface SignOutConfirmationProps {
  onClose: () => void;
  onConfirm?: () => void;
}

const SignOutConfirmation = ({ onClose, onConfirm }: SignOutConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      if (onConfirm) {
        onConfirm();
      }
      onClose();
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if there's an error, we still close the modal since signOut handles cleanup
      onClose();
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
        className="bg-secondary p-6 rounded-lg shadow-2xl w-full max-w-md border border-border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-primary">Sign Out</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-text-secondary hover:bg-tertiary transition-colors"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-text-secondary mb-2">
            Are you sure you want to sign out{user?.name ? `, ${user.name}` : ''}?
          </p>
          <div className="bg-tertiary p-3 rounded-lg border border-border-primary">
            <p className="text-sm text-text-secondary">
              <strong>What happens when you sign out:</strong>
            </p>
            <ul className="text-sm text-text-secondary mt-2 space-y-1">
              <li>• Your typing progress will be saved to the cloud</li>
              <li>• You'll need to sign in again to access your account</li>
              <li>• All local session data will be cleared</li>
              <li>• You can continue as a guest with limited features</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-tertiary border border-border-primary text-text-primary rounded-md hover:bg-border-primary transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-danger/10 border border-danger/30 text-danger rounded-md hover:bg-danger/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmation;
