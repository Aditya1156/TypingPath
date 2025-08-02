// Main components
export { default as TypingApp } from './TypingApp';
export { default as App } from './App';

// Core components
export { default as TypingTest } from './components/TypingTest';
export { default as Results } from './components/Results';
export { default as Settings } from './components/Settings';
export { default as LoadingSpinner } from './components/LoadingSpinner';

// Premium components
export { default as PremiumGuard } from './components/PremiumGuard';
export { default as PremiumFeatureCard } from './components/PremiumFeatureCard';
export { default as SubscriptionManager } from './components/SubscriptionManager';

// Auth components (lazy loaded)
export { default as SignIn } from './components/auth/SignIn';
export { default as SignUp } from './components/auth/SignUp';
export { default as Profile } from './components/auth/Profile';

// Dashboard components (lazy loaded)
export { default as Dashboard } from './components/dashboard/Dashboard';
export { default as StatsCards } from './components/dashboard/StatsCards';
export { default as PerformanceChart } from './components/dashboard/PerformanceChart';

// Landing page components
export { default as LandingPage } from './components/landing/LandingPage';
export { default as Header } from './components/landing/Header';
export { default as Hero } from './components/landing/Hero';
export { default as Features } from './components/landing/Features';

// Context providers
export { AuthProvider, useAuth } from './context/AuthContext';
export { SettingsProvider, useSettings } from './context/SettingsContext';
export { ToastProvider, useToast } from './context/ToastContext';
export { TimerProvider, useTimer } from './context/TimerContext';

// Services
export * from './services/authService';
export * from './services/userService';
export * from './services/geminiService';

// Utils
export * from './utils/helpers';
export * from './utils/performance';
export * from './utils/security';

// Types
export type * from './types';
