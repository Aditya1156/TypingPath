
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PremiumBadge from '../PremiumBadge';
import LoadingSpinner from '../LoadingSpinner';
import SignOutConfirmation from './SignOutConfirmation';
import { validatePassword, sanitizeInput } from '../../utils/security';

interface ProfileProps {
  onClose: () => void;
}

const Profile = ({ onClose }: ProfileProps) => {
  const { user, updateProfile, updatePassword } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setShowSignOutConfirmation(true);
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const sanitizedName = sanitizeInput(name);
    if (sanitizedName.length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(sanitizedName);
      setIsEditingName(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelNameEdit = () => {
    setIsEditingName(false);
    setName(user?.name || '');
    setError('');
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };
  
  if (!user) return null;

  // Check if user signed up with Google (no password)
  const isGoogleUser = user.email && !currentPassword && user.uid !== 'guest';
  const canChangePassword = !isGoogleUser || user.email;

  return (
    <div 
      className="fixed inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-secondary p-8 rounded-lg shadow-2xl w-full max-w-md border border-border-primary max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-accent">Profile</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-tertiary">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="space-y-6 text-text-primary">
          {/* User Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{user.name || user.email?.split('@')[0] || 'User'}</h3>
                {user.uid !== 'guest' && (
                  <PremiumBadge tier={user.subscription?.tier || 'free'} size="sm" />
                )}
              </div>
              <p className="text-text-secondary">{user.email || 'Guest User'}</p>
            </div>
          </div>

          {/* Editable Name Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Display Name</span>
              {!isEditingName && user.uid !== 'guest' && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-accent hover:text-accent/80 text-sm font-medium"
                >
                  Edit
                </button>
              )}
            </div>
            
            {isEditingName ? (
              <form onSubmit={handleUpdateName} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-accent text-primary rounded-md hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 text-sm font-medium"
                  >
                    {isLoading ? <LoadingSpinner /> : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelNameEdit}
                    className="flex-1 px-3 py-2 bg-tertiary text-text-secondary rounded-md hover:bg-tertiary/80 focus:outline-none text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-lg font-semibold">{user.name || user.email?.split('@')[0] || 'User'}</div>
            )}
          </div>

          {/* Password Change Section */}
          {user.uid !== 'guest' && canChangePassword && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Password</span>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="text-accent hover:text-accent/80 text-sm font-medium"
                  >
                    Change
                  </button>
                )}
              </div>
              
              {isChangingPassword ? (
                <form onSubmit={handleUpdatePassword} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-tertiary border border-border-primary rounded-md text-text-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-accent text-primary rounded-md hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 text-sm font-medium"
                    >
                      {isLoading ? <LoadingSpinner /> : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelPasswordChange}
                      className="flex-1 px-3 py-2 bg-tertiary text-text-secondary rounded-md hover:bg-tertiary/80 focus:outline-none text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-lg font-semibold">••••••••</div>
              )}
            </div>
          )}

          {/* Account Details */}
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-sm text-text-secondary">Subscription</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold capitalize">{user.subscription?.tier || 'Free'}</span>
                {user.subscription?.endDate && (
                  <span className="text-xs text-text-secondary">
                    Until {new Date(user.subscription.endDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            {user.uid !== 'guest' && (
              <div className="flex flex-col">
                <span className="text-sm text-text-secondary">Member Since</span>
                <span className="text-lg font-semibold">
                  {new Date(user.subscription?.startDate || Date.now()).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/30 rounded-md">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={handleSignOut} 
            className="flex-1 flex justify-center items-center px-6 py-3 font-semibold text-white bg-danger rounded-md hover:bg-danger/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-danger transition-colors"
          >
            Sign Out
          </button>
        </div>

      </div>
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirmation && (
        <SignOutConfirmation 
          onClose={() => setShowSignOutConfirmation(false)}
          onConfirm={onClose}
        />
      )}
    </div>
  );
};

export default Profile;
