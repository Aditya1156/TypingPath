import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { SubscriptionTier } from '../types';
import { validateGiftCode, validateSubscriptionTier, isRateLimited } from '../utils/security';
import { isPremiumUser } from '../utils/isPremiumUser';

interface PaymentPortalProps {
  tier: SubscriptionTier;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentPortal: React.FC<PaymentPortalProps> = ({ tier, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'giftcode'>('card');
  const [giftCode, setGiftCode] = useState('');
  const [giftCodeError, setGiftCodeError] = useState('');
  const { user, upgradeSubscription } = useAuth();

  // SECURITY: Validate tier parameter
  if (!validateSubscriptionTier(tier)) {
    throw new Error('Invalid subscription tier');
  }

  // SECURITY: Ensure user is authenticated
  if (!user || user.uid === 'guest') {
    throw new Error('Authentication required for payment processing');
  }

  const prices = {
    premium: { monthly: 4.99, yearly: 49.99 },
    pro: { monthly: 9.99, yearly: 99.99 }
  };

  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Demo gift codes - same as in GiftCodeRedemption
  const DEMO_GIFT_CODES = [
    { code: 'TYPINGPATH2024', tier: 'premium' as SubscriptionTier, isUsed: false },
    { code: 'PREMIUM50OFF', tier: 'premium' as SubscriptionTier, isUsed: false },
    { code: 'BETA-ACCESS-001', tier: 'pro' as SubscriptionTier, isUsed: false },
    { code: 'EARLY-ADOPTER', tier: 'premium' as SubscriptionTier, isUsed: false },
    { code: 'LAUNCH-SPECIAL', tier: 'pro' as SubscriptionTier, isUsed: false }
  ];

  const validateGiftCodeInput = async (inputCode: string): Promise<{ valid: boolean; tier?: SubscriptionTier; message: string }> => {
    // SECURITY: Input validation and sanitization
    const validation = validateGiftCode(inputCode);
    if (!validation.isValid) {
      return { valid: false, message: 'Gift code format is invalid. Please check your code.' };
    }
    
    // Rate limiting for gift code attempts
    if (isRateLimited('giftcode-validation', 10, 300000)) { // 10 attempts per 5 minutes
      return { valid: false, message: 'Too many gift code attempts. Please wait 5 minutes before trying again.' };
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const normalizedCode = validation.sanitized;
    const giftCodeData = DEMO_GIFT_CODES.find(gc => gc.code === normalizedCode);

    if (!giftCodeData) {
      return { valid: false, message: 'Invalid gift code. Please check your code and try again.' };
    }

    if (giftCodeData.isUsed) {
      return { valid: false, message: 'This gift code has already been used.' };
    }

    // Mark code as used (in production, this would be done on the backend)
    giftCodeData.isUsed = true;

    // User gets upgraded to whatever tier the gift code provides
    // This allows flexible redemption - any valid code works regardless of intended upgrade tier
    return { 
      valid: true, 
      tier: giftCodeData.tier, // User gets the tier from the gift code
      message: `🎉 Gift code redeemed successfully! Upgrading to ${giftCodeData.tier.toUpperCase()}.`
    };
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setGiftCodeError('');
    
    try {
      if (paymentMethod === 'giftcode') {
        // Handle gift code redemption
        if (!giftCode.trim()) {
          setGiftCodeError('Please enter a gift code');
          setIsProcessing(false);
          return;
        }

        const result = await validateGiftCodeInput(giftCode);
        
        if (result.valid && result.tier) {
          // Automatically upgrade the user account
          await upgradeSubscription(result.tier);
          onSuccess();
        } else {
          setGiftCodeError(result.message);
        }
      } else {
        // SECURITY: Rate limiting for payment attempts
        if (isRateLimited('payment-processing', 3, 300000)) { // 3 attempts per 5 minutes
          throw new Error('Too many payment attempts. Please wait 5 minutes before trying again.');
        }
        
        // Handle regular payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock payment success
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        if (isSuccess) {
          await upgradeSubscription(tier);
          onSuccess();
        } else {
          throw new Error('Payment failed. Please try again.');
        }
      }
    } catch (error: any) {
      if (paymentMethod === 'giftcode') {
        setGiftCodeError(error.message || 'Failed to redeem gift code');
      } else {
        alert(error.message || 'Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPrice = tier === 'free' ? 0 : prices[tier as keyof typeof prices][billingPeriod];
  const yearlyDiscount = tier !== 'free' ? Math.round(((prices[tier as keyof typeof prices].monthly * 12) - prices[tier as keyof typeof prices].yearly) / (prices[tier as keyof typeof prices].monthly * 12) * 100) : 0;

  // Block payment UI for premium users
  if (isPremiumUser(user)) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">You already have premium access!</h2>
        <p className="text-muted-foreground mb-4">No need to pay again. Enjoy all features!</p>
        <button className="btn btn-primary mt-2" onClick={onCancel}>Close</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary border border-border-primary rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </h2>
            <button
              onClick={onCancel}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Billing Period Selection */}
          {tier !== 'free' && paymentMethod !== 'giftcode' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Billing Period
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    billingPeriod === 'monthly'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border-primary text-text-secondary hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold">Monthly</div>
                  <div className="text-sm">${prices[tier as keyof typeof prices].monthly}/month</div>
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`p-3 rounded-lg border text-center transition-all relative ${
                    billingPeriod === 'yearly'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border-primary text-text-secondary hover:border-accent/50'
                  }`}
                >
                  {yearlyDiscount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-success text-primary text-xs px-2 py-1 rounded-full">
                      Save {yearlyDiscount}%
                    </div>
                  )}
                  <div className="font-semibold">Yearly</div>
                  <div className="text-sm">${prices[tier as keyof typeof prices].yearly}/year</div>
                </button>
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center ${
                  paymentMethod === 'card'
                    ? 'border-accent bg-accent/10'
                    : 'border-border-primary hover:border-accent/50'
                }`}
              >
                <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v4H4v-4z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-text-primary">Credit/Debit Card</div>
                  <div className="text-sm text-text-secondary">Visa, Mastercard, American Express</div>
                </div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center ${
                  paymentMethod === 'paypal'
                    ? 'border-accent bg-accent/10'
                    : 'border-border-primary hover:border-accent/50'
                }`}
              >
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">PP</span>
                </div>
                <div>
                  <div className="font-medium text-text-primary">PayPal</div>
                  <div className="text-sm text-text-secondary">Pay with your PayPal account</div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('giftcode')}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center ${
                  paymentMethod === 'giftcode'
                    ? 'border-accent bg-accent/10'
                    : 'border-border-primary hover:border-accent/50'
                }`}
              >
                <div className="w-8 h-8 rounded bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-text-primary">Gift Code</div>
                  <div className="text-sm text-text-secondary">Redeem a promotional or gift code</div>
                </div>
              </button>
            </div>
          </div>

          {/* Mock Card Form */}
          {paymentMethod === 'card' && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Gift Code Form */}
          {paymentMethod === 'giftcode' && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Gift Code
                </label>
                <input
                  type="text"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  placeholder="ENTER-YOUR-CODE-HERE"
                  className="w-full p-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none font-mono text-center tracking-wider"
                />
                {giftCodeError && (
                  <p className="mt-2 text-sm text-danger">{giftCodeError}</p>
                )}
              </div>
              
              {/* Demo Codes for Testing */}
              <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <h4 className="text-sm font-medium text-accent mb-2">Demo Codes for Testing:</h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {DEMO_GIFT_CODES.filter(gc => !gc.isUsed).map((code, index) => (
                    <button
                      key={index}
                      onClick={() => setGiftCode(code.code)}
                      className="text-left p-2 rounded hover:bg-accent/10 transition-colors flex justify-between items-center"
                    >
                      <span className="font-mono text-accent">{code.code}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        code.tier === 'pro' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {code.tier.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-text-secondary mt-2 text-center">
                  Click any code to auto-fill • Pro codes work for Premium or Pro upgrades
                </p>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-tertiary/30 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-3">
              {paymentMethod === 'giftcode' ? 'Gift Code Redemption' : 'Order Summary'}
            </h3>
            {paymentMethod === 'giftcode' ? (
              <div className="text-center">
                <p className="text-text-secondary text-sm mb-2">
                  Enter a valid gift code to upgrade your account instantly.
                </p>
                <p className="text-accent font-medium">
                  🎁 No payment required with valid gift code!
                </p>
                <div className="mt-3 p-2 bg-accent/5 rounded border border-accent/20">
                  <p className="text-xs text-text-secondary">
                    Note: You'll be upgraded to whatever tier your gift code provides
                    (Premium or Pro), regardless of the plan you initially selected.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">
                    {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan ({billingPeriod})
                  </span>
                  <span className="text-text-primary">${currentPrice}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">Tax</span>
                  <span className="text-text-primary">$0.00</span>
                </div>
                <hr className="border-border-primary my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-text-primary">Total</span>
                  <span className="text-accent">${currentPrice}</span>
                </div>
              </>
            )}
          </div>

          {/* Payment Actions */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing || (paymentMethod === 'giftcode' && !giftCode.trim())}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                isProcessing || (paymentMethod === 'giftcode' && !giftCode.trim())
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent to-accent/80 text-primary hover:from-accent/90 hover:to-accent/70'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {paymentMethod === 'giftcode' ? 'Validating Gift Code...' : 'Processing Payment...'}
                </div>
              ) : paymentMethod === 'giftcode' ? (
                'Redeem Gift Code'
              ) : (
                `Complete Payment - $${currentPrice}`
              )}
            </button>
            
            <button
              onClick={onCancel}
              className="w-full py-2 px-4 text-text-secondary hover:text-accent transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center text-sm text-success">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              🔒 Secure 256-bit SSL encryption • This is a demo payment portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
