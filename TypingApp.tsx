import { useState, useCallback, useMemo, useEffect } from 'react';
import useEngine from './hooks/useEngine';
import useProgress from './hooks/useProgress';
import { useAuth } from './context/AuthContext';
import { useSettings } from './context/SettingsContext';
import { useTimer } from './context/TimerContext';
import { fetchAiAnalysis, fetchAiCustomDrill } from './services/geminiService';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import AiCoachFeedback from './components/AiCoachFeedback';
import LessonSelector from './components/LessonSelector';
import ChapterOverview from './components/chapter/ChapterOverview';
import ChapterView from './components/chapter/ChapterView';
import KeyboardGuide from './components/KeyboardGuide';
import FingerGuideUI from './components/FingerGuideUI';
import LiveStats from './components/LiveStats';
import AppSidebar from './components/AppSidebar';
import AppHeader from './components/AppHeader';
import Dashboard from './components/dashboard/Dashboard';
import SessionLimitGuard from './components/SessionLimitGuard';
import type { AiAnalysis, Lesson, PracticeMode, ModalType } from './types';
import { calculateAccuracy } from './utils/helpers';
import { optimizedChapters as chapters } from './data/optimized-lessons';

// Navigation state interface for browser history
interface NavigationState {
  view: 'chapters' | 'chapter' | 'lessons' | 'test' | 'guide' | 'dashboard';
  previousView: 'chapters' | 'chapter' | 'lessons' | 'test' | 'guide' | 'dashboard';
  currentChapterId?: string | null;
  currentLesson?: Lesson | null;
  currentDrillIndex?: number;
  scrollPosition?: number;
}

const TypingApp = ({ onGoToLanding, onShowModal }: { onGoToLanding: () => void; onShowModal: (modal: ModalType) => void; }) => {
  const [view, setView] = useState<'chapters' | 'chapter' | 'lessons' | 'test' | 'guide' | 'dashboard'>('chapters');
  const [previousView, setPreviousView] = useState<'chapters' | 'chapter' | 'lessons' | 'test' | 'guide' | 'dashboard'>('chapters');
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { isSoundEnabled, caretStyle } = useSettings();
  const { startSession, endSession, isSessionActive } = useTimer();
  const { state, words, typed, errors, errorDetails, wpm, accuracy, totalTyped, loadTest, restart, fingersToUse, liveWpm, consistency } = useEngine(view === 'test', isSoundEnabled);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentDrillIndex, setCurrentDrillIndex] = useState<number>(0);
  
  // History management for browser navigation sync
  const [isNavigatingByHistory, setIsNavigatingByHistory] = useState(false);
  
  // Scroll position state to preserve position when navigating back
  const [scrollPositions, setScrollPositions] = useState<{[key: string]: number}>({});

  // Save current scroll position
  const saveScrollPosition = (viewName: string) => {
    const scrollY = window.scrollY;
    setScrollPositions(prev => ({
      ...prev,
      [viewName]: scrollY
    }));
  };

  // Restore scroll position for a view
  const restoreScrollPosition = (viewName: string) => {
    const savedPosition = scrollPositions[viewName];
    if (savedPosition !== undefined) {
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
    }
  };

  // Restore scroll position when view changes
  useEffect(() => {
    restoreScrollPosition(view);
  }, [view, scrollPositions]);

  // Navigate to view with history management
  const navigateToView = useCallback((newView: 'chapters' | 'chapter' | 'lessons' | 'test' | 'guide' | 'dashboard', updateHistory = true) => {
    saveScrollPosition(view);
    setPreviousView(view);
    setView(newView);
    
    if (updateHistory && !isNavigatingByHistory) {
      // Create a new history entry for this navigation
      const navigationState: NavigationState = {
        view: newView,
        previousView: view,
        currentChapterId,
        currentLesson,
        currentDrillIndex,
        scrollPosition: window.scrollY
      };
      
      window.history.pushState({ ...navigationState, isTypingApp: true }, '', window.location.href);
    }
  }, [view, currentChapterId, currentLesson, currentDrillIndex, isNavigatingByHistory]);

  // Handle browser back/forward navigation and prevent website exit
  useEffect(() => {
    // Initialize history state on mount
    const initialState: NavigationState = {
      view,
      previousView,
      currentChapterId,
      currentLesson,
      currentDrillIndex,
      scrollPosition: window.scrollY
    };
    
    // Replace current history state with our navigation state
    if (!window.history.state?.isTypingApp) {
      window.history.replaceState({ ...initialState, isTypingApp: true }, '', window.location.href);
    }

    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.isTypingApp) {
        setIsNavigatingByHistory(true);
        const state = event.state as NavigationState & { isTypingApp: boolean };
        
        // Restore navigation state from history
        setView(state.view);
        setPreviousView(state.previousView);
        setCurrentChapterId(state.currentChapterId || null);
        
        if (state.currentLesson) {
          setCurrentLesson(state.currentLesson);
          setCurrentDrillIndex(state.currentDrillIndex || 0);
          
          // If returning to a test, reload the test content
          if (state.view === 'test' && state.currentLesson) {
            if (state.currentLesson.id === 'random') {
              loadTest();
            } else if (state.currentLesson.id === 'ai-drill') {
              loadTest(state.currentLesson.texts[0]);
            } else if (state.currentLesson.texts) {
              loadTest(state.currentLesson.texts[state.currentDrillIndex || 0]);
            }
          }
        }
        
        // Restore scroll position
        if (state.scrollPosition !== undefined) {
          setTimeout(() => {
            window.scrollTo(0, state.scrollPosition!);
          }, 50);
        }
        
        setIsNavigatingByHistory(false);
      } else {
        // If no typing app state and we're at the root, stay in app but go to chapters
        if (view !== 'chapters') {
          // Push chapters view to history and navigate there instead of exiting
          event.preventDefault();
          navigateToView('chapters', false);
        } else {
          // Only exit if already at chapters view
          onGoToLanding();
        }
      }
    };

    // Prevent accidental website exit with confirmation
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only show confirmation if user is actively typing or has made progress
      if (view === 'test' && (state === 'run' || totalTyped > 0)) {
        event.preventDefault();
        return (event.returnValue = 'You have an active typing test. Are you sure you want to leave?');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [onGoToLanding, loadTest, view, previousView, currentChapterId, currentLesson, currentDrillIndex, state, totalTyped, navigateToView]);

  // Push new state to history when navigation changes (but not during history navigation)
  useEffect(() => {
    if (!isNavigatingByHistory) {
      const navigationState: NavigationState = {
        view,
        previousView,
        currentChapterId,
        currentLesson,
        currentDrillIndex,
        scrollPosition: window.scrollY
      };
      
      window.history.pushState({ ...navigationState, isTypingApp: true }, '', window.location.href);
    }
  }, [view, previousView, currentChapterId, currentLesson, currentDrillIndex, isNavigatingByHistory]);

  // Upgrade function for premium features
  const handleUpgrade = useCallback(() => {
    onShowModal('upgrade' as ModalType);
  }, [onShowModal]);

  // Sign in function for guest users
  const handleSignIn = useCallback(() => {
    onShowModal('signIn');
  }, [onShowModal]);

  const { progress, saveDrillPerformance, resetProgress, isLoaded: isProgressLoaded } = useProgress(user);

  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  const [isAiDrillLoading, setIsAiDrillLoading] = useState(false);
  const [aiDrillError, setAiDrillError] = useState<string | null>(null);

  const isFinished = state === 'finish';
  const isTyping = state === 'run';

  // Start timer when typing begins
  useEffect(() => {
    if (isTyping && !isSessionActive) {
      startSession();
    }
  }, [isTyping, isSessionActive, startSession]);

  // End timer when test finishes
  useEffect(() => {
    if (isFinished && isSessionActive) {
      endSession();
    }
  }, [isFinished, isSessionActive, endSession]);

  useEffect(() => {
    if (isFinished && currentLesson && currentLesson.type !== 'guide' && currentLesson.id !== 'random' && currentLesson.id !== 'ai-drill') {
        saveDrillPerformance(currentLesson, currentDrillIndex, wpm, accuracy);
    }
  }, [isFinished, currentLesson, currentDrillIndex, wpm, accuracy, saveDrillPerformance]);

  const handleGetAiAnalysis = useCallback(async () => {
    if (errorDetails.length === 0) {
      setAiError("There were no errors to analyze. Great job!");
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    setAiAnalysis(null);
    try {
      const analysis = await fetchAiAnalysis(errorDetails);
      if(analysis) {
        setAiAnalysis(analysis);
      } else {
        setAiError("Sorry, the AI coach couldn't provide feedback at this time.");
      }
    } catch (err) {
      setAiError("An error occurred while fetching AI analysis.");
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  }, [errorDetails]);
  
  const resetAiState = () => {
    setAiAnalysis(null);
    setIsAiLoading(false);
    setAiError(null);
    setAiDrillError(null);
  };

  const handleBackFromAi = useCallback(() => {
    setAiAnalysis(null);
    setAiError(null);
    // Stay in the current view (test with results) - just hide the AI analysis panel
    // The user can then use the regular navigation buttons in the Results component
  }, []);

  const handlePracticeAiDrill = useCallback((drillText: string) => {
    // Clear AI analysis state
    setAiAnalysis(null);
    setAiError(null);
    
    // Load the AI drill text and switch to test view
    loadTest(drillText);
    saveScrollPosition(view);
    // Don't update previousView here - we want to preserve where the user originally came from
    // The previousView should already be set to 'dashboard' or 'lessons' from the original drill selection
    setView('test');
    setCurrentLesson({ id: 'ai-drill', name: 'AI Generated Drill', texts: [drillText] });
    setCurrentDrillIndex(0);
  }, [loadTest, view, saveScrollPosition]);

  const handleRestart = useCallback(() => {
    restart();
    resetAiState();
  }, [restart]);

  // Handle chapter selection from dashboard
  const handleSelectChapter = useCallback((chapterNumber: number) => {
    // Convert chapter number to chapter ID and navigate
    const chapterId = chapters[chapterNumber - 1]?.id || chapters[0]?.id;
    if (chapterId) {
      setCurrentChapterId(chapterId);
      saveScrollPosition(view);
      setPreviousView(view);
      setView('chapter');
    }
  }, [view, saveScrollPosition]);

  // Handle chapter selection from chapter overview
  const handleSelectChapterFromOverview = useCallback((chapterId: string) => {
    setCurrentChapterId(chapterId);
    saveScrollPosition(view);
    setPreviousView(view);
    setView('chapter');
  }, [view, saveScrollPosition]);

  // Handle navigating back to chapter overview
  const handleBackToChapters = useCallback(() => {
    saveScrollPosition(view);
    setPreviousView(view);
    setView('chapters');
    setCurrentChapterId(null);
  }, [view, saveScrollPosition]);

  // Handle navigating to a specific chapter from chapter view
  const handleNavigateChapter = useCallback((chapterId: string) => {
    setCurrentChapterId(chapterId);
    saveScrollPosition(view);
    // Stay in chapter view, just switch chapter
  }, [view, saveScrollPosition]);
  
  const handleNavigate = (newView: 'chapters' | 'chapter' | 'lessons' | 'guide' | 'dashboard') => {
    navigateToView(newView);
  };

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    saveScrollPosition(view);
    resetAiState();
    setCurrentLesson(lesson);
    if (lesson.type === 'guide') {
      setPreviousView(view);
      setView('guide');
      return;
    }
    
    setCurrentDrillIndex(0);
    loadTest(lesson.texts[0]);
    setPreviousView(view);
    setView('test');
  }, [loadTest, view, saveScrollPosition]);

  const handleSelectDrill = useCallback((lesson: Lesson, drillIndex: number) => {
    saveScrollPosition(view);
    resetAiState();
    setCurrentLesson(lesson);
    setCurrentDrillIndex(drillIndex);
    loadTest(lesson.texts[drillIndex]);
    setPreviousView(view);
    setView('test');
  }, [loadTest, view, saveScrollPosition]);
  
  const handleStartFirstLesson = useCallback(() => {
    const firstRealLesson = chapters.find(c => c.id !== 'chapter-0')?.lessons[0];
    if (firstRealLesson) {
      handleSelectLesson(firstRealLesson);
    }
  }, [handleSelectLesson]);

  const handleSelectRandom = useCallback(() => {
    saveScrollPosition(view);
    loadTest(); 
    setCurrentLesson({ id: 'random', name: "Random Word Challenge", texts: [] });
    setCurrentDrillIndex(0);
    setPreviousView(view);
    setView('test');
    resetAiState();
  }, [loadTest, view, saveScrollPosition]);

  const handleBackToMenu = useCallback(() => {
    saveScrollPosition(view);
    setView(previousView);
    setCurrentLesson(null);
    resetAiState();
  }, [view, previousView, saveScrollPosition]);

  // ESC key handler for quick navigation and browser keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      // Don't interfere with typing test input or other form elements
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Handle browser navigation shortcuts
      if ((event.altKey || event.metaKey) && event.key === 'ArrowLeft') {
        // Alt+Left Arrow or Cmd+Left Arrow (browser back)
        event.preventDefault();
        window.history.back();
        return;
      }
      
      if ((event.altKey || event.metaKey) && event.key === 'ArrowRight') {
        // Alt+Right Arrow or Cmd+Right Arrow (browser forward)
        event.preventDefault();
        window.history.forward();
        return;
      }
      
      // Only handle ESC key for internal navigation
      if (event.key === 'Escape') {
        if (view === 'test' || view === 'dashboard') {
          handleBackToMenu();
        } else if (view === 'guide') {
          handleBackToMenu();
        } else if (view === 'lessons') {
          onGoToLanding();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, handleBackToMenu, onGoToLanding]);

  const hasNextDrill = useMemo(() => {
    if (!currentLesson || currentLesson.id === 'random' || currentLesson.id === 'ai-drill' || currentLesson.type === 'guide') {
      return false;
    }
    return currentDrillIndex < currentLesson.texts.length - 1;
  }, [currentLesson, currentDrillIndex]);
  
  const { nextLesson, hasNextLesson } = useMemo(() => {
    if (hasNextDrill || !currentLesson || currentLesson.type === 'guide' || currentLesson.id === 'random' || currentLesson.id === 'ai-drill') {
      return { nextLesson: null, hasNextLesson: false };
    }

    let currentChapterIndex = -1;
    let currentLessonIndex = -1;

    for(let i=0; i < chapters.length; i++) {
        const lessonIndex = chapters[i].lessons.findIndex(l => l.id === currentLesson.id);
        if (lessonIndex !== -1) {
            currentChapterIndex = i;
            currentLessonIndex = lessonIndex;
            break;
        }
    }

    if(currentChapterIndex === -1) return { nextLesson: null, hasNextLesson: false };

    const currentChapter = chapters[currentChapterIndex];
    if (currentLessonIndex < currentChapter.lessons.length - 1) {
        const next = currentChapter.lessons[currentLessonIndex + 1];
        return { nextLesson: next, hasNextLesson: true };
    } else if (currentChapterIndex < chapters.length - 1) {
        const next = chapters[currentChapterIndex + 1].lessons[0];
        return { nextLesson: next, hasNextLesson: true };
    }

    return { nextLesson: null, hasNextLesson: false };

  }, [currentLesson, hasNextDrill]);

  const handleNextDrill = useCallback(() => {
    if (!currentLesson || !hasNextDrill) return;

    const nextIndex = currentDrillIndex + 1;
    setCurrentDrillIndex(nextIndex);
    loadTest(currentLesson.texts[nextIndex]);
    resetAiState();
  }, [currentLesson, currentDrillIndex, hasNextDrill, loadTest]);

  const handleNextLesson = useCallback(() => {
    if (nextLesson) {
      handleSelectLesson(nextLesson);
    }
  }, [nextLesson, handleSelectLesson]);


  const handleGenerateAiDrill = useCallback(async (keys: string, practiceMode: PracticeMode) => {
    saveScrollPosition(view);
    setIsAiDrillLoading(true);
    setAiDrillError(null);
    try {
      const drillText = await fetchAiCustomDrill(keys, practiceMode);
      loadTest(drillText);
      setCurrentLesson({ id: 'ai-drill', name: `AI Drill: ${keys}`, texts: [drillText] });
      setCurrentDrillIndex(0);
      setPreviousView(view);
      setView('test');
    } catch (error: any) {
      setAiDrillError(error.message || "Failed to generate AI drill.");
    } finally {
      setIsAiDrillLoading(false);
    }
  }, [loadTest, view, saveScrollPosition]);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'chapters':
        return (
          <ChapterOverview
            chapters={chapters}
            onSelectChapter={handleSelectChapterFromOverview}
            onSelectRandom={handleSelectRandom}
            onGenerateAiDrill={handleGenerateAiDrill}
            isAiDrillLoading={isAiDrillLoading}
            aiDrillError={aiDrillError}
            progress={progress}
            isProgressLoaded={isProgressLoaded}
            onResetProgress={resetProgress}
            onBackToHome={onGoToLanding}
            onUpgrade={handleUpgrade}
          />
        );
      case 'chapter':
        const currentChapter = chapters.find(c => c.id === currentChapterId) || chapters[0];
        return (
          <ChapterView
            chapter={currentChapter}
            chapters={chapters}
            onSelectLesson={handleSelectLesson}
            onSelectDrill={handleSelectDrill}
            progress={progress}
            isProgressLoaded={isProgressLoaded}
            onUpgrade={handleUpgrade}
            onBackToLessons={handleBackToChapters}
            onNavigateChapter={handleNavigateChapter}
          />
        );
      case 'lessons':
        return (
          <LessonSelector
            chapters={chapters}
            onSelectLesson={handleSelectLesson}
            onSelectDrill={handleSelectDrill}
            onSelectRandom={handleSelectRandom}
            onGenerateAiDrill={handleGenerateAiDrill}
            isAiDrillLoading={isAiDrillLoading}
            aiDrillError={aiDrillError}
            progress={progress}
            isProgressLoaded={isProgressLoaded}
            onResetProgress={resetProgress}
            onBackToHome={onGoToLanding}
            onUpgrade={handleUpgrade}
          />
        );
      case 'guide':
        return <KeyboardGuide onStartFirstLesson={handleStartFirstLesson} onBackToMenu={handleBackToMenu} />;
      case 'dashboard':
        return (
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackToMenu}
                className="ml-16 p-2 text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                title={`Back to ${previousView === 'dashboard' ? 'dashboard' : 'lessons'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to {previousView === 'dashboard' ? 'Dashboard' : 'Lessons'}
              </button>
              <nav className="text-sm text-text-secondary">
                <span>Home</span>
                <span className="mx-2">→</span>
                <span>Lessons</span>
                <span className="mx-2">→</span>
                <span className="text-accent">Dashboard</span>
              </nav>
            </div>
            <Dashboard progress={progress} isProgressLoaded={isProgressLoaded} onSelectDrill={handleSelectDrill} onUpgrade={handleUpgrade} onSelectChapter={handleSelectChapter} />
          </div>
        );
      case 'test':
        return (
          <div className="flex flex-col items-center justify-center flex-grow w-full">
            <header className="relative w-full max-w-5xl text-center mb-4">
              {/* Back button */}
              <button 
                onClick={handleBackToMenu}
                className="absolute left-16 top-0 p-2 text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                title={`Back to ${previousView === 'dashboard' ? 'dashboard' : 'lessons'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back
              </button>
              
              {/* Breadcrumb navigation */}
              <nav className="absolute right-0 top-0 text-xs text-text-secondary mt-2 hidden sm:block">
                <span>Home</span>
                <span className="mx-1">→</span>
                <span>{previousView === 'dashboard' ? 'Dashboard' : 'Lessons'}</span>
                <span className="mx-1">→</span>
                <span className="text-accent">
                  {currentLesson?.id === 'random' ? 'Random Test' : 
                   currentLesson?.id === 'ai-drill' ? 'AI Drill' : 
                   currentLesson?.name || 'Test'}
                </span>
              </nav>
              
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                {currentLesson?.name}
              </h1>
              {currentLesson && currentLesson.id !== 'random' && currentLesson.id !== 'ai-drill' && currentLesson.type !== 'guide' && (
                <h2 className="text-lg text-text-secondary mt-1">Drill {currentDrillIndex + 1}</h2>
              )}
            </header>
            
            <main className="w-full max-w-5xl flex flex-col items-center gap-8">
              <div className="flex flex-col items-center justify-center min-h-[56px] w-full">
                {!isFinished && isTyping && (
                  <LiveStats liveWpm={liveWpm} accuracy={calculateAccuracy(typed.length, errors)} errors={errors} />
                )}
                {!isFinished && !isTyping && (
                  <div className="text-center">
                    <p className="text-lg text-accent animate-pulse mb-2">Start typing to begin...</p>
                  </div>
                )}
                {!isFinished && <FingerGuideUI fingers={fingersToUse} />}
              </div>
              
              <div className="w-full max-w-3xl">
                {isFinished ? (
                  <Results 
                    wpm={wpm} 
                    accuracy={accuracy}
                    consistency={consistency}
                    errors={errors}
                    onRestart={handleRestart}
                    onGetAiAnalysis={handleGetAiAnalysis}
                    isAiLoading={isAiLoading}
                    errorDetails={errorDetails}
                    onBackToMenu={handleBackToMenu}
                    hasNextDrill={hasNextDrill}
                    onNextDrill={handleNextDrill}
                    hasNextLesson={hasNextLesson}
                    onNextLesson={handleNextLesson}
                    onUpgrade={handleUpgrade}
                  />
                ) : (
                  <TypingTest words={words} typed={typed} totalTyped={totalTyped} caretStyle={caretStyle} />
                )}
              </div>

              {isAiLoading && <LoadingSpinner />}
              {aiError && <p className="text-danger bg-danger/10 p-3 rounded-md">{aiError}</p>}
              {aiAnalysis && <AiCoachFeedback aiAnalysis={aiAnalysis} onBack={handleBackFromAi} onPracticeDrill={handlePracticeAiDrill} onUpgrade={handleUpgrade} />}
            </main>

            <footer className="text-center text-text-secondary mt-16 text-sm">
              <p>Press <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Tab</kbd> to restart the test or <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Esc</kbd> to go back to lessons at any time.</p>
            </footer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-text-primary font-mono">
      <AppSidebar 
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onGoToHome={onGoToLanding}
        onShowModal={onShowModal}
        onNavigate={handleNavigate}
        activeView={view}
      />

       {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-30"
          onClick={handleCloseSidebar}
        />
      )}

      {/* App Header - Show on chapter overview and individual chapter views */}
      {(view === 'chapters' || view === 'chapter' || view === 'lessons') && (
        <AppHeader onShowModal={onShowModal} onOpenSidebar={handleOpenSidebar} />
      )}

      <main className={`flex-grow flex flex-col items-center p-4 sm:p-6 lg:p-8 overflow-y-auto ${(view === 'chapters' || view === 'chapter' || view === 'lessons') ? 'pt-40 mt-8' : 'pt-4'}`}>
        <SessionLimitGuard onUpgrade={handleUpgrade} onSignIn={handleSignIn} currentView={view}>
          {renderContent()}
        </SessionLimitGuard>
      </main>
    </div>
  );
};

export default TypingApp;
