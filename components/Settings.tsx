import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { playSound } from '../utils/helpers';
import { isPremiumUser } from '../utils/isPremiumUser';
import PremiumGuard from './PremiumGuard';
import type { Theme, CaretStyle } from '../types';

interface SettingsProps {
  onClose: () => void;
  onUpgrade?: () => void;
}

const Settings = ({ onClose, onUpgrade }: SettingsProps) => {
  const { user } = useAuth();
  // Always use the latest context value and isPremiumUser utility
  const isUserPremium = isPremiumUser(user);
  const { 
    isSoundEnabled, 
    toggleSound,
    theme,
    setTheme,
    caretStyle,
    setCaretStyle
  } = useSettings();

  const SettingRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="bg-tertiary rounded-md p-4">
      <label className="font-semibold text-text-primary block mb-3">{label}</label>
      {children}
    </div>
  );

  const getThemeDescription = (theme: Theme) => {
    switch (theme) {
      case 'dark': return '🌙 Classic Dark';
      case 'light': return '☀️ Clean Light';
      case 'hacker': return '💚 Matrix Style';
      case 'ocean': return '🌊 Ocean Blue';
      case 'sunset': return '🌅 Warm Sunset';
      case 'forest': return '🌲 Nature Green';
      default: return theme;
    }
  };

  const getThemePreview = (themeType: Theme) => {
    const previews = {
      dark: 'bg-gradient-to-r from-gray-900 to-gray-800',
      light: 'bg-gradient-to-r from-gray-100 to-white',
      hacker: 'bg-gradient-to-r from-green-900 to-green-800',
      ocean: 'bg-gradient-to-r from-blue-900 to-blue-800',
      sunset: 'bg-gradient-to-r from-orange-900 to-pink-800',
      forest: 'bg-gradient-to-r from-green-900 to-emerald-800'
    };
    return previews[themeType] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  return (
    <div 
      className="fixed inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-secondary p-6 rounded-lg shadow-2xl w-full max-w-6xl max-h-[80vh] overflow-y-auto border border-border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-accent">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-tertiary">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p className="text-sm text-text-secondary mb-6">Customize your typing experience</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <SettingRow label="Theme">
              <div className="w-full">
                <p className="text-sm text-text-secondary mb-4">Choose your preferred color scheme</p>
                
                {/* Free themes section */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Free Themes</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(['dark', 'light'] as Theme[]).map(t => (
                      <button 
                        key={t} 
                        onClick={() => setTheme(t)} 
                        className={`group relative px-4 py-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                          theme === t 
                            ? 'bg-accent text-primary shadow-lg ring-2 ring-accent/50' 
                            : 'bg-tertiary text-text-primary hover:bg-tertiary/70 hover:scale-105'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${getThemePreview(t)} border-2 border-border-primary shadow-sm`}></div>
                          <span>{getThemeDescription(t)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Premium themes section */}
                <div>
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                    Premium Themes 
                    <span className="text-accent">✨</span>
                  </h4>
                  {!isUserPremium ? (
                    <PremiumGuard
                      feature="theme"
                      requiredTier="premium"
                      themeCount={4}
                      onUpgradeClick={onUpgrade}
                      showBlurred={true}
                      overlayClassName="rounded-lg"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {(['hacker', 'ocean', 'sunset', 'forest'] as Theme[]).map(t => (
                          <button 
                            key={t} 
                            onClick={() => setTheme(t)} 
                            className={`group relative px-4 py-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                              theme === t 
                                ? 'bg-accent text-primary shadow-lg ring-2 ring-accent/50' 
                                : 'bg-tertiary text-text-primary hover:bg-tertiary/70 hover:scale-105'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full ${getThemePreview(t)} border-2 border-border-primary shadow-sm`}></div>
                              <span>{getThemeDescription(t)}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </PremiumGuard>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {(['hacker', 'ocean', 'sunset', 'forest'] as Theme[]).map(t => (
                        <button 
                          key={t} 
                          onClick={() => setTheme(t)} 
                          className={`group relative px-4 py-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                            theme === t 
                              ? 'bg-accent text-primary shadow-lg ring-2 ring-accent/50' 
                              : 'bg-tertiary text-text-primary hover:bg-tertiary/70 hover:scale-105'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full ${getThemePreview(t)} border-2 border-border-primary shadow-sm`}></div>
                            <span>{getThemeDescription(t)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SettingRow>
          </div>

          <div className="space-y-4">
            <SettingRow label="Caret Style">
              <div className="w-full">
                <p className="text-sm text-text-secondary mb-3">Choose how your cursor appears</p>
                <div className="flex flex-col gap-2">
                  {(['line', 'block', 'underline'] as CaretStyle[]).map(s => (
                    <button key={s} onClick={() => setCaretStyle(s)} className={`px-3 py-2 text-sm font-semibold rounded-md capitalize transition-colors ${caretStyle === s ? 'bg-accent text-primary' : 'bg-tertiary text-text-primary hover:bg-tertiary/50'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </SettingRow>
          </div>

          <div className="space-y-4">
            <SettingRow label="Sound Effects">
              <div className="w-full">
                <p className="text-sm text-text-secondary mb-3">Enable audio feedback while typing</p>
                <div className="flex justify-center mb-4">
                  <div className="relative inline-block w-12 h-6">
                    <input 
                        type="checkbox" 
                        id="sound-toggle"
                        checked={isSoundEnabled}
                        onChange={toggleSound}
                        className="absolute w-0 h-0 opacity-0"
                    />
                    <label 
                        htmlFor="sound-toggle" 
                        className={`block w-full h-full rounded-full cursor-pointer transition-colors ${isSoundEnabled ? 'bg-accent' : 'bg-tertiary'}`}
                    >
                        <span 
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isSoundEnabled ? 'translate-x-6' : ''}`}
                        ></span>
                    </label>
                  </div>
                </div>
                {isSoundEnabled && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-text-secondary">Test Sounds</h4>
                    <button onClick={() => playSound('correct')} className="w-full px-2 py-1 bg-success/20 hover:bg-success/30 text-success text-xs rounded transition-colors">Correct</button>
                    <button onClick={() => playSound('error')} className="w-full px-2 py-1 bg-danger/20 hover:bg-danger/30 text-danger text-xs rounded transition-colors">Error</button>
                    <button onClick={() => playSound('complete')} className="w-full px-2 py-1 bg-warning/20 hover:bg-warning/30 text-warning text-xs rounded transition-colors">Complete</button>
                  </div>
                )}
              </div>
            </SettingRow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;