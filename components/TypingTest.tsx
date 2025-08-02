import React from 'react';
import type { CaretStyle } from '../types';

interface CharacterProps {
  char: string;
  state: 'correct' | 'incorrect' | 'untyped';
}

const Character = React.memo(({ char, state }: CharacterProps) => {
  const stateClasses = {
    correct: 'text-success',
    incorrect: 'text-danger',
    untyped: 'text-text-secondary',
  };
  
  return <span className={`transition-colors duration-200 ease-in-out ${stateClasses[state]}`}>{char}</span>;
});

const Cursor = React.memo(({ style }: { style: CaretStyle }) => {
  const baseClasses = "absolute h-full top-0";
  const styleClasses = {
    line: "w-[2px] bg-accent animate-pulse left-0",
    block: "w-full bg-accent/25 animate-pulse",
    underline: "w-full h-[2px] bg-accent bottom-[-2px] animate-pulse"
  };
  return <span className={`${baseClasses} ${styleClasses[style]}`}></span>
});


interface TypingTestProps {
  words: string;
  typed: string;
  totalTyped: number;
  caretStyle: CaretStyle;
}

const TypingTest = ({ words, typed, totalTyped, caretStyle }: TypingTestProps) => {
  const characters = React.useMemo(() => {
    return words.split('').map((char, index) => {
      let state: 'correct' | 'incorrect' | 'untyped' = 'untyped';
      if (index < totalTyped) {
        state = typed[index] === char ? 'correct' : 'incorrect';
      }
      return { char, state };
    });
  }, [words, typed, totalTyped]);

  return (
    <div 
      className="relative text-2xl lg:text-3xl leading-relaxed break-all p-8 bg-secondary rounded-lg shadow-lg" 
      onClick={() => {
        // Ensure the document has focus for keyboard events
        window.focus();
      }}
      tabIndex={0}
    >
      {characters.map(({ char, state }, index) => (
        <span key={index} className="relative">
          {index === totalTyped && <Cursor style={caretStyle} />}
          <Character char={char} state={state} />
        </span>
      ))}
    </div>
  );
};

export default TypingTest;