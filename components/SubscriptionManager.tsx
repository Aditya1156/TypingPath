import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PaymentPortal from './PaymentPortal';
import GiftCodeRedemption from './GiftCodeRedemption';
import { isPremiumUser } from '../utils/isPremiumUser';
import type { SubscriptionTier } from '../types';

interface SubscriptionManagerProps {
  onClose?: () => void;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ onClose }) => {
  const { user, upgradeSubscription } = useAuth();
  const [showPaymentPortal, setShowPaymentPortal] = useState(false);
  const [showGiftCodeRedemption, setShowGiftCodeRedemption] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('premium');

  // ACCESSIBILITY: Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const plans = [
    {
      tier: 'free' as SubscriptionTier,
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 practice sessions per day',
        '2 themes (Dark & Light)',
        '5 basic lessons',
        'Basic statistics',
        'Words & Keys practice modes'
      ],
      limitations: [
        'No AI Coach',
        'Limited analytics',
        'No custom lessons',
        'No data export'
      ],
      buttonText: 'Current Plan',
      recommended: false
    },
    {
      tier: 'premium' as SubscriptionTier,
      name: 'Premium',
      price: '$4.99',
      period: 'month',
      features: [
        'Unlimited practice sessions',
        'All 6 themes unlocked',
        'Complete lesson library (50+ lessons)',
        'AI Coach feedback',
        'Advanced analytics & insights',
        'All practice modes',
        'Progress export',
        'Priority support'
      ],
      limitations: [],
      buttonText: 'Upgrade to Premium',
      recommended: true
    },
    {
      tier: 'pro' as SubscriptionTier,
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      features: [
        'Everything in Premium',
        'Custom lesson creation',
        'Advanced AI coaching',
        'Team management (coming soon)',
        'API access (coming soon)',
        'White-label options (coming soon)'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      recommended: false
    }
  ];

  const currentPlan = user?.subscription?.tier || 'free';

  const handleUpgrade = async (tier: SubscriptionTier) => {
    if (tier === 'free') return;
    
    // SECURITY FIX: Require authentication for subscription upgrades
    if (!user || user.uid === 'guest') {
      // Redirect guest users to sign up before purchasing
      if (onClose) onClose(); // Close subscription manager
      // This should trigger the sign-in modal in the parent component
      window.dispatchEvent(new CustomEvent('requireAuth', { 
        detail: { action: 'upgrade', tier } 
      }));
      return;
    }
    
    setSelectedTier(tier);
    setShowPaymentPortal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await upgradeSubscription(selectedTier);
      setShowPaymentPortal(false);
      if (onClose) onClose();
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  const handleGiftCodeSuccess = async (_tier: SubscriptionTier) => {
    setShowGiftCodeRedemption(false);
    if (onClose) onClose();
  };

  const handleStartTrial = async () => {
    // Implement 7-day free trial logic
    try {
      await upgradeSubscription('premium');
      if (onClose) onClose();
    } catch (error) {
      console.error('Trial start failed:', error);
    }
  };

  // Early return for premium users
  if (isPremiumUser(user)) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">You already have premium access!</h2>
        <p className="text-muted-foreground mb-4">Enjoy all features—no need to upgrade again.</p>
        <button className="btn btn-primary mt-2" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in overflow-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-title"
    >
      <div 
        className="bg-secondary p-6 rounded-lg shadow-2xl w-full max-w-6xl mx-4 my-8 border border-border-primary max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Close button */}
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-text-secondary hover:bg-tertiary transition-colors"
            aria-label="Close subscription manager"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 id="subscription-title" className="text-3xl font-bold text-text-primary mb-4">Choose Your Plan</h2>
          <p className="text-text-secondary">Unlock your typing potential with premium features</p>
          
          {/* SECURITY ENHANCEMENT: Show authentication requirement for guests */}
          {(!user || user.uid === 'guest') && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Sign up required to purchase premium plans</span>
              </div>
            </div>
          )}
        
        {/* Gift Code Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-accent">Have a gift code?</span>
            </div>
            <button
              onClick={() => setShowGiftCodeRedemption(true)}
              className="px-4 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
            >
              Redeem Gift Code
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`relative bg-secondary border rounded-xl p-6 transition-all duration-300 ${
              plan.recommended
                ? 'border-accent scale-105 shadow-lg shadow-accent/20'
                : 'border-border-primary hover:border-accent/50'
            } ${currentPlan === plan.tier ? 'ring-2 ring-accent' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {currentPlan === plan.tier && (
              <div className="absolute -top-3 right-4">
                <span className="bg-success text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  Current
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-bold text-accent">{plan.price}</span>
                {plan.tier !== 'free' && (
                  <span className="text-text-secondary ml-1">/{plan.period}</span>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Included Features:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-danger mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-text-secondary">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleUpgrade(plan.tier)}
                disabled={currentPlan === plan.tier || (plan.tier === 'free')}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  currentPlan === plan.tier
                    ? 'bg-tertiary text-text-secondary cursor-not-allowed'
                    : plan.recommended
                    ? 'bg-gradient-to-r from-accent to-accent/80 text-primary hover:from-accent/90 hover:to-accent/70'
                    : 'bg-secondary border border-accent text-accent hover:bg-accent hover:text-primary'
                }`}
              >
                {currentPlan === plan.tier 
                  ? 'Current Plan' 
                  : (!user || user.uid === 'guest') && plan.tier !== 'free'
                  ? `Sign Up & ${plan.buttonText}`
                  : plan.buttonText
                }
              </button>

              {plan.tier === 'premium' && currentPlan === 'free' && !user?.subscription?.trialUsed && (
                <button
                  onClick={handleStartTrial}
                  className="w-full py-2 px-4 rounded-lg font-medium border border-accent/50 text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  Start 7-Day Free Trial
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 p-6 bg-tertiary/30 rounded-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Need help choosing?</h3>
        <p className="text-text-secondary text-sm mb-4">
          Contact our support team for personalized recommendations
        </p>
        <div className="flex justify-center space-x-4">
          <a href="mailto:support@typingpath.com" className="text-accent hover:underline">
            Email Support
          </a>
          <span className="text-text-secondary">•</span>
          <a href="#" className="text-accent hover:underline">
            Live Chat
          </a>
        </div>
      </div>

      {onClose && (
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 text-text-secondary hover:text-accent transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Payment Portal Modal */}
      {showPaymentPortal && (
        <PaymentPortal
          tier={selectedTier}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentPortal(false)}
        />
      )}

      {/* Gift Code Redemption Modal */}
      {showGiftCodeRedemption && (
        <GiftCodeRedemption
          onSuccess={handleGiftCodeSuccess}
          onClose={() => setShowGiftCodeRedemption(false)}
        />
      )}
      </div>
    </div>
  );
};

export default SubscriptionManager;
