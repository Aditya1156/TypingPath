import React from 'react';
import { useAuth } from '../context/AuthContext';
import TimerWidget from './TimerWidget';
import type { ModalType } from '../types';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToHome: () => void;
  onShowModal: (modal: ModalType) => void;
  onNavigate: (view: 'lessons' | 'guide' | 'dashboard') => void;
  activeView: string;
}

const AppSidebar = ({ isOpen, onClose, onGoToHome, onShowModal, onNavigate, activeView }: AppSidebarProps) => {
  const { user } = useAuth();
  
  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const NavLink = ({ view, children, icon }: { view: 'lessons' | 'dashboard', children: React.ReactNode, icon: React.ReactNode }) => {
    const isActive = activeView === view || (activeView === 'test' && view === 'lessons') || (activeView === 'guide' && view === 'lessons');
    return (
      <button 
        onClick={() => handleAction(() => onNavigate(view))}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
          isActive ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'
        }`}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  };

  return (
    <aside className={`fixed top-0 right-0 h-full w-64 bg-secondary border-l border-border-primary flex flex-col p-4 z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button 
        onClick={() => handleAction(onGoToHome)}
        className="text-2xl font-bold text-text-primary mb-8 px-2 hover:scale-110 transition-transform cursor-pointer"
      >
        Typing<span className="text-accent">Path</span>
      </button>
      
      <nav className="flex flex-col gap-2">
        <button 
          onClick={() => handleAction(onGoToHome)}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold text-text-secondary hover:bg-tertiary hover:text-text-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Back to Home
        </button>
        <NavLink view="lessons" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}>
          Lessons
        </NavLink>
        <NavLink view="dashboard" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="8" x2="8" y1="12" y2="16"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="16" x2="16" y1="12" y2="16"/></svg>}>
          Dashboard
        </NavLink>      </nav>
      
      {/* Timer Widget */}
      <div className="mt-6">
        <TimerWidget compact={true} />
      </div>
      
      <div className="mt-auto pt-4 border-t border-border-primary">
        <div className="mb-4 p-3 bg-tertiary/30 rounded-md text-xs text-text-secondary">
          <p className="font-semibold mb-2">Quick Navigation:</p>
          <div className="space-y-1">
            <p><kbd className="bg-tertiary px-1 rounded text-xs">Esc</kbd> Back/Home</p>
            <p><kbd className="bg-tertiary px-1 rounded text-xs">Tab</kbd> Restart Test</p>
          </div>
        </div>
        <button 
            onClick={() => handleAction(() => onShowModal('settings'))}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold text-text-secondary hover:bg-tertiary hover:text-text-primary transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            Settings
        </button>
        {user && user.uid !== 'guest' ? (
          <div className="p-3 rounded-lg bg-tertiary">
            <p className="text-sm text-text-primary font-semibold truncate">{user.name || user.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-text-secondary truncate">{user.email || 'No email'}</p>
            <button 
              onClick={() => handleAction(() => onShowModal('profile'))}
              className="w-full text-center mt-3 px-3 py-1.5 text-xs font-semibold bg-tertiary/80 hover:bg-border-primary rounded-md transition-colors"
            >
              View Profile
            </button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <button 
              onClick={() => handleAction(() => onShowModal('signUp'))}
              className="w-full text-center px-4 py-2.5 font-semibold bg-accent text-primary hover:bg-accent/80 rounded-md transition-colors"
            >
              Sign Up
            </button>
            <button 
              onClick={() => handleAction(() => onShowModal('signIn'))}
              className="w-full text-center px-4 py-2.5 font-semibold bg-white/10 text-text-primary hover:bg-white/20 rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
