import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { isPremiumUser } from '../../utils/isPremiumUser';
import type { ModalType, Theme } from '../../types';

interface HeaderProps {
  onShowModal: (modal: ModalType) => void;
  onShowSignIn?: () => void;
}

const Header = ({ onShowModal, onShowSignIn }: HeaderProps) => {
  const { user, isLoading } = useAuth();
  const { theme, setTheme } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const themes: { value: Theme; label: string; icon: string; premium?: boolean }[] = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'hacker', label: 'Hacker', icon: '💚', premium: true },
    { value: 'ocean', label: 'Ocean', icon: '🌊', premium: true },
    { value: 'sunset', label: 'Sunset', icon: '🌅', premium: true },
    { value: 'forest', label: 'Forest', icon: '🌲', premium: true }
  ];

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
    setIsThemeDropdownOpen(false); // Close theme dropdown too
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-20 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/85 backdrop-blur-lg border-b border-white/5 shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={scrollToTop}
              className="text-2xl sm:text-3xl font-bold text-text-primary hover:scale-110 transition-all duration-300 cursor-pointer group"
            >
              <span className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300">
                Type<span className="text-accent bg-gradient-to-r from-accent via-accent/90 to-accent/80 bg-clip-text text-transparent">Path</span>
              </span>
            </button>
          
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('features')} 
                className="relative text-text-secondary hover:text-accent transition-all duration-300 cursor-pointer group px-3 py-2 rounded-md hover:bg-white/5"
              >
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="relative text-text-secondary hover:text-accent transition-all duration-300 cursor-pointer group px-3 py-2 rounded-md hover:bg-white/5"
              >
                <span className="relative z-10">Pricing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="relative text-text-secondary hover:text-accent transition-all duration-300 cursor-pointer group px-3 py-2 rounded-md hover:bg-white/5"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              </button>
              
              {/* Theme Selector */}
              <div className="relative" ref={themeDropdownRef}>
                <button
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="relative text-text-secondary hover:text-accent transition-all duration-300 cursor-pointer group px-3 py-2 rounded-md hover:bg-white/5 flex items-center space-x-1"
                >
                  <span className="text-lg">{themes.find(t => t.value === theme)?.icon}</span>
                  <span className="relative z-10">Theme</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isThemeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                </button>
                
                {/* Theme Dropdown */}
                {isThemeDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-primary/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      {themes.map((themeOption) => {
                        const isLocked = themeOption.premium && !isPremiumUser(user);
                        return (
                          <button
                            key={themeOption.value}
                            onClick={() => {
                              if (isLocked) {
                                onShowModal('signUp');
                              } else {
                                setTheme(themeOption.value);
                                setIsThemeDropdownOpen(false);
                              }
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                              theme === themeOption.value 
                                ? 'bg-accent/20 text-accent' 
                                : isLocked
                                ? 'text-text-secondary/50 hover:text-text-secondary cursor-pointer'
                                : 'text-text-secondary hover:text-accent hover:bg-white/10'
                            }`}
                          >
                            <span className="text-lg">{themeOption.icon}</span>
                            <span>{themeOption.label}</span>
                            {themeOption.premium && (
                              <svg className="w-4 h-4 text-accent ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                              </svg>
                            )}
                            {theme === themeOption.value && !isLocked && (
                              <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="h-10 w-32 bg-white/10 animate-pulse rounded-lg backdrop-blur-sm"></div>
            ) : user && user.uid !== 'guest' ? (
              /* Authenticated User Profile - Clickable */
              <button 
                onClick={() => onShowModal('profile')}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                title="View Profile"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {user.name || user.email?.split('@')[0] || 'User'}
                </span>
                <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              /* Sign In/Sign Up Buttons for Non-Authenticated Users */
              <>
                <button 
                  onClick={() => onShowSignIn ? onShowSignIn() : onShowModal('signIn')} 
                  className="px-4 py-2 font-medium text-text-primary hover:text-accent transition-all duration-300 hover:bg-white/5 rounded-md"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => onShowModal('signUp')} 
                  className="px-5 py-2 font-semibold text-primary bg-gradient-to-r from-accent to-accent/80 rounded-lg hover:from-accent/90 hover:to-accent/70 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsThemeDropdownOpen(false); // Close theme dropdown when opening mobile menu
            }}
            className="md:hidden text-text-primary hover:text-accent transition-all duration-300 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden animate-in fade-in duration-300">
          <div className="fixed inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/95 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-8">
              <div className="space-y-6 text-center">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="block text-2xl text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 py-3 px-6 rounded-lg hover:bg-white/10"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="block text-2xl text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 py-3 px-6 rounded-lg hover:bg-white/10"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="block text-2xl text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 py-3 px-6 rounded-lg hover:bg-white/10"
                >
                  Contact
                </button>
                
                {/* Mobile Theme Selector */}
                <div className="pt-4">
                  <h3 className="text-lg text-text-secondary mb-4">Choose Theme</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((themeOption) => {
                      const isLocked = themeOption.premium && !isPremiumUser(user);
                      return (
                        <button
                          key={themeOption.value}
                          onClick={() => {
                            if (isLocked) {
                              onShowModal('signUp');
                              setIsMobileMenuOpen(false);
                            } else {
                              setTheme(themeOption.value);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 relative ${
                            theme === themeOption.value 
                              ? 'bg-accent/20 text-accent border border-accent/50' 
                              : isLocked
                              ? 'text-text-secondary/50 hover:text-text-secondary border border-white/5 cursor-pointer'
                              : 'text-text-secondary hover:text-accent hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <span className="text-lg">{themeOption.icon}</span>
                          <span className="text-sm font-medium">{themeOption.label}</span>
                          {themeOption.premium && (
                            <svg className="w-3 h-3 text-accent absolute top-1 right-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-7V8a5 5 0 00-10 0v3M7 21h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4 pt-8">
                {isLoading ? (
                  <div className="h-12 w-32 bg-white/10 animate-pulse rounded-lg backdrop-blur-sm"></div>
                ) : user && user.uid !== 'guest' ? (
                  /* Authenticated User Profile - Mobile Clickable */
                  <button 
                    onClick={() => {
                      onShowModal('profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-lg font-medium text-text-primary block">
                        {user.name || user.email?.split('@')[0] || 'User'}
                      </span>
                      <span className="text-sm text-text-secondary">View Profile & Settings</span>
                    </div>
                    <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  /* Sign In/Sign Up Buttons for Non-Authenticated Users - Mobile */
                  <>
                    <button 
                      onClick={() => {
                        onShowSignIn ? onShowSignIn() : onShowModal('signIn');
                        setIsMobileMenuOpen(false);
                      }} 
                      className="text-xl text-text-primary hover:text-accent transition-all duration-300 py-3 px-6 rounded-lg hover:bg-white/10"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        onShowModal('signUp');
                        setIsMobileMenuOpen(false);
                      }} 
                      className="px-8 py-3 font-semibold text-primary bg-gradient-to-r from-accent to-accent/80 rounded-lg hover:from-accent/90 hover:to-accent/70 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
