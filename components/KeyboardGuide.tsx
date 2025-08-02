import React, { useState, useEffect, useCallback } from 'react';
import { getFingersForChar } from '../utils/helpers';

// --- Data & Configuration ---

const guideSteps = [
  {
    title: 'The Home Row',
    description: "This is your base of operations. Place your index fingers on 'F' and 'J'—you'll feel the bumps. Keep your other fingers on the same row.",
    highlightKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", ' '],
    drillText: 'asdf jkl; sad lad fall jag;',
  },
  {
    title: 'The Top Row',
    description: "Reach up from the home row to hit these keys. Try to return your fingers to the home row after each press.",
    highlightKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    drillText: 'the quick power art two true',
  },
  {
    title: 'The Bottom Row',
    description: "Now, reach down from the home row. This row can be tricky, so focus on precise finger movements.",
    highlightKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    drillText: 'zoo, vex, can, man, buzz, mix',
  },
  {
    title: 'The Number Row',
    description: "The number row requires a longer reach. Use the same finger that controls the key directly below it.",
    highlightKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    drillText: '12345 67890 19 28 37 46 50',
  },
  {
    title: 'The Shift Keys',
    description: "Hold 'Shift' with one pinky and press a letter with the opposite hand to capitalize. This is crucial for speed and accuracy.",
    highlightKeys: ['shift', 'a', 's', 'd', 'j', 'k', 'l', ';', 'A', 'S', 'D', 'J', 'K', 'L', ';'],
    drillText: 'Ask a Lad; A Lass; The Quick Brown Fox.',
  },
  {
    title: 'Punctuation & Symbols',
    description: "Practice common punctuation and symbols used in writing and code. Use the Shift key for the top symbols.",
    highlightKeys: ["'", '"', '!', '?', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|'],
    drillText: `He said, "It's a great day!" What? a-b_c=d+e {x|y}`,
  },
  {
    title: 'Control Keys',
    description: "These keys control editing and navigation. We won't drill them, but it's important to know where they are.",
    highlightKeys: ['Tab', 'CapsLock', 'Backspace', 'Enter', 'Control', 'Alt'],
    drillText: '',
  }
];

const keyGroups = [
  { row: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='], mods: { 'Backspace': 'w-24' } },
  { row: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'], mods: { 'Tab': 'w-20' } },
  { row: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"], mods: { 'CapsLock': 'w-24', 'Enter': 'w-28' } },
  { row: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], mods: { 'shift': 'w-32' }, rightMods: { 'shift': 'w-32' } },
  { row: [' '], mods: { 'Control': 'w-20', 'Alt': 'w-20' }, rightMods: { 'Alt': 'w-20', 'Control': 'w-20' } }
];


// --- Components ---

const Key = React.memo(({ char, widthClass, isHighlighted, isNext, isPressed }: { char: string; widthClass: string; isHighlighted: boolean; isNext: boolean; isPressed: boolean }) => {
  const baseClass = "h-12 flex items-center justify-center rounded-md font-semibold transition-all duration-100 border-b-4 border-black/20";
  const name = char === ' ' ? 'Space' : char;
  
  let stateClass = 'bg-tertiary text-text-primary';
  if (isHighlighted) stateClass = 'bg-accent/30 text-accent border-accent/40';
  if (isNext) stateClass = 'bg-accent text-primary scale-110 shadow-lg shadow-accent/50 border-accent/80';
  if (isPressed) stateClass = 'bg-success text-primary transform translate-y-px border-success/80';

  return (
    <div className={`${baseClass} ${widthClass} ${stateClass}`}>
      <span className="capitalize text-sm">{name}</span>
    </div>
  );
});

const Keyboard = ({ highlightKeys, nextKeys, pressedKey }: { highlightKeys: string[], nextKeys: string[], pressedKey: string | null}) => (
  <div className="relative w-full max-w-5xl">
    <div className="flex flex-col gap-1.5 p-3 bg-primary/70 rounded-lg z-10">
      {keyGroups.map((group, index) => (
        <div key={index} className="flex justify-center items-center gap-1.5">
          {group.mods && Object.entries(group.mods).map(([key, width]) => (
            <Key key={key} char={key} widthClass={width} isHighlighted={highlightKeys.includes(key.toLowerCase())} isNext={nextKeys.includes(key.toLowerCase())} isPressed={key.toLowerCase() === pressedKey?.toLowerCase()} />
          ))}
          {group.row.map(key => (
            <Key key={key} char={key} widthClass={key === ' ' ? 'flex-grow' : 'w-12'} isHighlighted={highlightKeys.includes(key)} isNext={nextKeys.includes(key)} isPressed={key === pressedKey} />
          ))}
          {group.rightMods && Object.entries(group.rightMods).map(([key, width]) => (
            <Key key={key} char={key} widthClass={width} isHighlighted={highlightKeys.includes(key.toLowerCase())} isNext={nextKeys.includes(key.toLowerCase())} isPressed={key.toLowerCase() === pressedKey?.toLowerCase()} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---

const KeyboardGuide = ({ onStartFirstLesson, onBackToMenu }: { onStartFirstLesson: () => void; onBackToMenu: () => void; }) => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [nextKeys, setNextKeys] = useState<string[]>([]);
  const [fingersToUse, setFingersToUse] = useState<string[]>([]);

  const currentStep = guideSteps[step];
  const { drillText } = currentStep;

  useEffect(() => {
    const nextChar = drillText ? drillText[typed.length] : null;
    if (!nextChar) {
        setNextKeys([]);
        setFingersToUse([]);
        return;
    }
    
    const { keys, fingers } = getFingersForChar(nextChar);
    setNextKeys(keys);
    setFingersToUse(fingers);

  }, [drillText, typed]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.repeat) return;
    
    const { drillText } = guideSteps[step];
    if (!drillText || typed.length >= drillText.length) return;
    
    let key = e.key;
    if (key.length === 1) { // Catches all typable characters
        setTyped(t => t + key);
    } else if (key === 'Backspace') {
        setTyped(t => t.slice(0, -1));
    }

    const lowerKey = key.toLowerCase();
    setPressedKey(lowerKey === ' ' ? ' ' : lowerKey);
    const timer = setTimeout(() => setPressedKey(null), 150);
    return () => clearTimeout(timer);

  }, [step, typed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setTyped('');
  }, [step]);
  
  const handleNext = () => {
    if (step < guideSteps.length - 1) setStep(s => s + 1);
    else onStartFirstLesson();
  };

  const handlePrev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const nextChar = drillText[typed.length];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="relative text-center mb-6">
        {/* Back button */}
        <button 
          onClick={onBackToMenu}
          className="absolute left-0 top-0 p-2 text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
          title="Back to lessons"
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
          <span>Lessons</span>
          <span className="mx-1">→</span>
          <span className="text-accent">Keyboard Guide</span>
        </nav>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">Keyboard Positioning Guide</h1>
        <h2 className="text-2xl text-accent mt-2">{currentStep.title}</h2>
      </header>

      <main className="flex flex-col items-center gap-6 p-6 bg-secondary rounded-lg shadow-lg">
        <p className="text-center text-lg max-w-3xl text-text-secondary">{currentStep.description}</p>
        
        <div className="relative w-full max-w-5xl">
            <Keyboard highlightKeys={currentStep.highlightKeys} nextKeys={nextKeys} pressedKey={pressedKey} />
        </div>
        
        {drillText && (
          <div className="w-full max-w-3xl text-center mt-4">
            <h3 className="text-xl font-semibold text-text-secondary mb-2">Try It!</h3>

            {nextChar && (
              <div className="text-text-secondary mb-3 flex flex-col sm:flex-row justify-center items-baseline gap-x-6 gap-y-2">
                <p>Next Key: <span className="font-bold text-accent text-2xl">{nextChar === ' ' ? 'Space' : nextChar}</span></p>
                 {fingersToUse.length > 0 && (
                    <p className="flex items-baseline gap-x-2">Use Finger(s): <span className="font-bold text-rose-400 text-2xl">{fingersToUse.join(' + ')}</span></p>
                 )}
              </div>
            )}

            <div className="p-4 bg-primary/70 rounded-md text-2xl tracking-widest font-mono min-h-[52px]">
                {drillText.split('').map((char, index) => {
                    let color = 'text-text-secondary/50';
                    if(index < typed.length) {
                      color = typed[index] === char ? 'text-success' : 'text-danger';
                    }
                    if(index === typed.length) {
                      return <span key={index} className="border-b-2 border-accent animate-pulse">{char === ' ' ? '\u00A0' : char}</span>;
                    }
                    return <span key={index} className={color}>{char === ' ' ? '\u00A0' : char}</span>;
                })}
            </div>
            {typed.length >= drillText.length && <p className="text-success font-bold mt-3 animate-pulse">Great! You can move to the next step.</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <button onClick={handlePrev} disabled={step === 0} className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-text-primary bg-tertiary rounded-md hover:bg-border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Previous
            </button>
            <button onClick={handleNext} className="flex items-center justify-center gap-2 px-8 py-3 font-semibold text-primary bg-accent rounded-md hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-all duration-300 transform hover:scale-105">
              {step === guideSteps.length - 1 ? 'Start First Lesson' : 'Next'}
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
        </div>
         <button onClick={onBackToMenu} className="mt-2 text-sm text-accent hover:text-accent/80 underline">
            Skip and go back to all lessons
        </button>
      </main>
    </div>
  );
};

export default KeyboardGuide;
