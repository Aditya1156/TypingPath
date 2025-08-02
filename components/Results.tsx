import PremiumGuard from './PremiumGuard';
import type { ErrorDetail } from '../types';

interface ResultsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  consistency: number;
  onRestart: () => void;
  onGetAiAnalysis: () => void;
  isAiLoading: boolean;
  errorDetails: ErrorDetail[];
  onBackToMenu: () => void;
  hasNextDrill?: boolean;
  onNextDrill?: () => void;
  hasNextLesson?: boolean;
  onNextLesson?: () => void;
  onUpgrade?: () => void;
}

const Results = ({ wpm, accuracy, consistency, errors, onRestart, onGetAiAnalysis, isAiLoading, errorDetails, onBackToMenu, hasNextDrill, onNextDrill, hasNextLesson, onNextLesson, onUpgrade }: ResultsProps) => {
  const hasErrors = errorDetails.length > 0;

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-secondary rounded-lg shadow-lg text-text-primary w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-accent">Test Complete!</h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full">
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-tertiary min-w-[140px] text-center">
          <span className="text-5xl font-bold text-success">{wpm}</span>
          <span className="text-sm text-text-secondary">WPM</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-tertiary min-w-[140px] text-center">
          <span className="text-5xl font-bold text-success">{accuracy}%</span>
          <span className="text-sm text-text-secondary">Accuracy</span>
        </div>
         <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-tertiary min-w-[140px] text-center">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-success">{consistency}%</span>
            <div className="group relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary/50 cursor-help"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 text-xs text-center text-primary bg-tertiary rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Measures the rhythm of your keystrokes. Higher is better!
              </div>
            </div>
          </div>
          <span className="text-sm text-text-secondary">Consistency</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-tertiary min-w-[140px] text-center">
          <span className="text-5xl font-bold text-danger">{errors}</span>
          <span className="text-sm text-text-secondary">Errors</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
         <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-text-primary bg-tertiary rounded-md hover:bg-border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back to Lessons
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-primary bg-accent rounded-md hover:bg-accent/80 transition-colors relative overflow-hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
          Try Again (Tab)
          {/* TypingPath Logo Symbol - Blurred */}
          <div className="absolute top-1 right-2 opacity-20 blur-[1px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </button>
        {hasNextDrill && onNextDrill && (
           <button
            onClick={onNextDrill}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-primary bg-success rounded-md hover:bg-success/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-success transition-colors"
          >
            Next Drill
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 5 7 7-7 7"/><path d="M5 12h8"/></svg>
          </button>
        )}
        {hasNextLesson && onNextLesson && (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-primary bg-success rounded-md hover:bg-success/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-success transition-colors"
          >
            Next Lesson
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        )}
      </div>
      <div className="mt-6 w-full">
        <PremiumGuard
          feature="aiCoach"
          requiredTier="premium"
          onUpgradeClick={onUpgrade}
          showBlurred={true}
          overlayClassName="rounded-md"
        >
          <button
            onClick={onGetAiAnalysis}
            disabled={isAiLoading || !hasErrors}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-text-primary bg-gradient-to-r from-accent to-accent/90 rounded-md hover:from-accent/90 hover:to-accent/80 transition-all transform hover:scale-[1.02] disabled:bg-tertiary/50 disabled:text-text-secondary/50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            title={!hasErrors ? "No errors to analyze!" : "Get AI Coaching"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
            {isAiLoading ? 'Analyzing...' : 'Aether AI™ Coach Analysis'}
          </button>
        </PremiumGuard>
      </div>
    </div>
  );
};

export default Results;
