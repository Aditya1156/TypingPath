import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { SubscriptionTier } from '../types';

interface GiftCodeRedemptionProps {
  onSuccess: (tier: SubscriptionTier) => void;
  onClose: () => void;
}

// Demo gift codes - In production, these would be stored securely in your backend
const DEMO_GIFT_CODES = [
  { code: 'TYPINGPATH2024', tier: 'premium' as SubscriptionTier, isUsed: false },
  { code: 'PREMIUM50OFF', tier: 'premium' as SubscriptionTier, isUsed: false },
  { code: 'BETA-ACCESS-001', tier: 'pro' as SubscriptionTier, isUsed: false },
  { code: 'EARLY-ADOPTER', tier: 'premium' as SubscriptionTier, isUsed: false },
  { code: 'LAUNCH-SPECIAL', tier: 'pro' as SubscriptionTier, isUsed: false }
];

const GiftCodeRedemption: React.FC<GiftCodeRedemptionProps> = ({ onSuccess, onClose }) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [showCodes, setShowCodes] = useState(false);
  const { user } = useAuth();

  const validateGiftCode = async (inputCode: string): Promise<{ valid: boolean; tier?: SubscriptionTier; message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const normalizedCode = inputCode.trim().toUpperCase();
    const giftCode = DEMO_GIFT_CODES.find(gc => gc.code === normalizedCode);

    if (!giftCode) {
      return { valid: false, message: 'Invalid gift code. Please check your code and try again.' };
    }

    if (giftCode.isUsed) {
      return { valid: false, message: 'This gift code has already been used.' };
    }

    // Mark code as used (in production, this would be done on the backend)
    giftCode.isUsed = true;

    return { 
      valid: true, 
      tier: giftCode.tier,
      message: `Gift code redeemed successfully! You now have ${giftCode.tier} access.`
    };
  };

  const handleRedeemCode = async () => {
    if (!code.trim()) {
      setError('Please enter a gift code');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const result = await validateGiftCode(code);
      
      if (result.valid && result.tier) {
        onSuccess(result.tier);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred while validating the gift code. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRedeemCode();
    }
  };

  const availableCodes = DEMO_GIFT_CODES.filter(gc => !gc.isUsed);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary border border-border-primary rounded-xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Redeem Gift Code</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Gift Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Enter Gift Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="ENTER-YOUR-CODE-HERE"
                className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none font-mono text-center tracking-wider"
                disabled={isValidating}
              />
              {isValidating && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-danger">{error}</p>
            )}
          </div>

          {/* Redeem Button */}
          <button
            onClick={handleRedeemCode}
            disabled={isValidating || !code.trim()}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mb-4 ${
              isValidating || !code.trim()
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent to-accent/80 text-primary hover:from-accent/90 hover:to-accent/70'
            }`}
          >
            {isValidating ? 'Validating Code...' : 'Redeem Gift Code'}
          </button>

          {/* Demo Section */}
          <div className="border-t border-border-primary pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-text-primary">
                Demo Codes ({availableCodes.length} available)
              </h3>
              <button
                onClick={() => setShowCodes(!showCodes)}
                className="text-xs text-accent hover:underline"
              >
                {showCodes ? 'Hide' : 'Show'} Codes
              </button>
            </div>
            
            {showCodes && (
              <div className="space-y-2">
                {availableCodes.map((giftCode, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-tertiary/30 rounded border cursor-pointer hover:bg-tertiary/50 transition-colors"
                    onClick={() => setCode(giftCode.code)}
                  >
                    <span className="font-mono text-sm text-text-primary">{giftCode.code}</span>
                    <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                      {giftCode.tier}
                    </span>
                  </div>
                ))}
                {availableCodes.length === 0 && (
                  <p className="text-sm text-text-secondary text-center py-2">
                    All demo codes have been used. Refresh the page to reset.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Gift Code Info */}
          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-text-primary font-medium mb-1">
                  How Gift Codes Work
                </p>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Enter a valid gift code to upgrade your account</li>
                  <li>• Each code can only be used once</li>
                  <li>• Codes grant immediate access to premium features</li>
                  <li>• This is a demo - codes reset when page is refreshed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Current User Info */}
          {user && (
            <div className="mt-4 text-center">
              <p className="text-xs text-text-secondary">
                Current plan: <span className="text-accent font-medium">{user.subscription.tier}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCodeRedemption;
