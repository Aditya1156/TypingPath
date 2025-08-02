// Input validation and sanitization utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 255); // Limit length
};

export const validateGiftCode = (code: string): { isValid: boolean; sanitized: string } => {
  const sanitized = code.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  const isValid = /^[A-Z0-9-]{3,20}$/.test(sanitized);
  
  return { isValid, sanitized };
};

export const validateSubscriptionTier = (tier: string): boolean => {
  const validTiers = ['free', 'premium', 'pro'];
  return validTiers.includes(tier);
};

// Rate limiting utilities (client-side protection)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (entry.count >= maxRequests) {
    return true;
  }
  
  entry.count++;
  return false;
};

// Secure session storage utilities
export const secureSessionStorage = {
  set: (key: string, value: string): void => {
    try {
      // Add timestamp and basic obfuscation
      const data = {
        value: btoa(value), // Base64 encode
        timestamp: Date.now()
      };
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to set session storage:', error);
    }
  },
  
  get: (key: string, maxAge: number = 3600000): string | null => { // Default 1 hour
    try {
      const item = sessionStorage.getItem(key);
      if (!item) return null;
      
      const data = JSON.parse(item);
      const now = Date.now();
      
      // Check if expired
      if (now - data.timestamp > maxAge) {
        sessionStorage.removeItem(key);
        return null;
      }
      
      return atob(data.value); // Base64 decode
    } catch (error) {
      console.error('Failed to get session storage:', error);
      return null;
    }
  },
  
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  }
};
