import PremiumGuard from './PremiumGuard';
import type { AiAnalysis } from '../types';

interface AiCoachFeedbackProps {
  aiAnalysis: AiAnalysis;
  onBack?: () => void;
  onPracticeDrill?: (drillText: string) => void;
  onUpgrade?: () => void;
}

const AiCoachFeedback = ({ aiAnalysis, onBack, onPracticeDrill, onUpgrade }: AiCoachFeedbackProps) => {
  const drillText = aiAnalysis.drill.join(' ');

  const handlePracticeDrill = () => {
    if (onPracticeDrill) {
      onPracticeDrill(drillText);
    }
  };

  return (
    <PremiumGuard 
      feature="aiCoach" 
      requiredTier="premium"
      onUpgradeClick={onUpgrade}
      showBlurred={true}
    >
      <div className="w-full max-w-3xl p-6 bg-secondary rounded-lg shadow-lg text-text-secondary animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            <h3 className="text-xl font-bold text-accent">Aether AI™ Analysis</h3>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-accent hover:bg-tertiary/50 rounded-md transition-colors"
              title="Back to results"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back
            </button>
          )}
        </div>
        <p className="mb-6 text-text-secondary italic">"{aiAnalysis.analysis}"</p>
        
        <h4 className="text-lg font-semibold text-text-primary mb-3">Custom "Weak Spot" Drill:</h4>
        <div className="p-4 bg-tertiary/70 rounded-md">
          <p className="text-success font-medium tracking-wider text-lg">
            {drillText}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handlePracticeDrill}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-primary font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Practice This Drill
          </button>
          
          <p className="text-xs text-text-secondary/70 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
            Click to start an interactive practice session with this AI-generated drill
          </p>
        </div>
        
        <p className="text-xs text-text-secondary/70 mt-4">
          Tip: Focus on accuracy over speed when practicing these problem keys.
        </p>
      </div>
    </PremiumGuard>
  );
};

export default AiCoachFeedback;
