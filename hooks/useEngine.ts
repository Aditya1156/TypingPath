import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { State, ErrorDetail } from '../types';
import { generateWords } from '../utils/words';
import { isKeyboardCode, calculateWPM, calculateAccuracy, getFingersForChar, calculateConsistency, playSound } from '../utils/helpers';

const NUMBER_OF_WORDS = 30;

const useEngine = (isEnabled: boolean, isSoundEnabled: boolean) => {
  const [state, setState] = useState<State>("start");
  const [words, setWords] = useState<string>("");
  const [typed, setTyped] = useState<string>("");
  const [errors, setErrors] = useState<number>(0);
  const [errorDetails, setErrorDetails] = useState<ErrorDetail[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTestText, setCurrentTestText] = useState("");
  const [fingersToUse, setFingersToUse] = useState<string[]>([]);
  
  // New state for professional features
  const [liveWpm, setLiveWpm] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const keystrokeTimestamps = useRef<number[]>([]);

  const totalTyped = typed.length;

  // Improved WPM calculation with memoization
  const wpm = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const timeInSeconds = (endTime - startTime) / 1000;
    return timeInSeconds > 0 ? calculateWPM(timeInSeconds, totalTyped) : 0;
  }, [startTime, endTime, totalTyped]);

  const accuracy = useMemo(() => {
    return calculateAccuracy(totalTyped, errors);
  }, [totalTyped, errors]);

  const loadTest = useCallback((text?: string) => {
    try {
      const newText = text || generateWords(NUMBER_OF_WORDS);
      
      // Validate text input
      if (!newText || newText.trim().length === 0) {
        console.warn('Invalid text provided, generating default words');
        const fallbackText = generateWords(NUMBER_OF_WORDS);
        setCurrentTestText(fallbackText);
        setWords(fallbackText);
      } else {
        setCurrentTestText(newText);
        setWords(newText);
      }
      
      setState("start");
      setTyped("");
      setErrors(0);
      setErrorDetails([]);
      setStartTime(null);
      setEndTime(null);
      setLiveWpm(0);
      setConsistency(0);
      keystrokeTimestamps.current = [];
    } catch (error) {
      console.error('Error loading test:', error);
      // Fallback to default words
      const fallbackText = generateWords(NUMBER_OF_WORDS);
      setCurrentTestText(fallbackText);
      setWords(fallbackText);
      setState("start");
      setTyped("");
      setErrors(0);
      setErrorDetails([]);
      setStartTime(null);
      setEndTime(null);
      setLiveWpm(0);
      setConsistency(0);
      keystrokeTimestamps.current = [];
    }
  }, []);
  
  const restart = useCallback(() => {
    loadTest(currentTestText);
  }, [loadTest, currentTestText]);


  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }
    
    const { key, code } = event;
    
    if (state === 'finish') {
      if (key === 'Tab') {
        event.preventDefault();
        restart();
      }
      return;
    }
    
    if (!words) {
      return;
    }

    // Handle backspace with proper bounds checking
    if (key === 'Backspace') {
      event.preventDefault();
      setTyped((prev) => {
        if (prev.length === 0) return prev; // Prevent unnecessary updates
        return prev.slice(0, -1);
      });
      if (isSoundEnabled) playSound('backspace');
      return;
    }

    // Only process valid keyboard codes and prevent typing beyond text length
    if (isKeyboardCode(code) && typed.length < words.length) {
      // More aggressive event prevention for better cross-browser compatibility
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      if (state === 'start') {
        setState('run');
        setStartTime(Date.now());
      }
      
      keystrokeTimestamps.current.push(Date.now());
      
      const currentCharacter = words[typed.length];
      if (key !== currentCharacter) {
        setErrors((prev) => prev + 1);
        setErrorDetails(prev => [...prev, { expected: currentCharacter, actual: key, index: typed.length}]);
        if (isSoundEnabled) playSound('error');
      } else {
        // Play different sounds for different key types
        if (isSoundEnabled) {
          if (key === ' ') {
            playSound('space');
          } else {
            playSound('correct');
          }
        }
      }
      setTyped((prev) => prev + key);
    }
  }, [state, words, typed.length, restart, isSoundEnabled]); // Optimized dependencies

  // Effect for finishing the test with error handling
  useEffect(() => {
    if (state === 'run' && typed.length === words.length && words.length > 0) {
      try {
        setState('finish');
        setEndTime(Date.now());
        
        // Calculate consistency with validation
        if (keystrokeTimestamps.current.length > 0) {
          const consistencyValue = calculateConsistency(keystrokeTimestamps.current);
          setConsistency(consistencyValue);
        }
        
        if (isSoundEnabled) {
          playSound('complete');
        }
      } catch (error) {
        console.error('Error finishing test:', error);
        // Ensure we still finish the test even if there's an error
        setState('finish');
        setEndTime(Date.now());
      }
    }
  }, [state, typed.length, words.length, isSoundEnabled]);

  // Effect for main keydown listener
  useEffect(() => {
    if (isEnabled) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isEnabled, handleKeyDown]);

  // Effect for calculating live WPM with error handling
  useEffect(() => {
    let interval: number | undefined;
    
    if (state === 'run' && startTime) {
      interval = window.setInterval(() => {
        try {
          const timeElapsed = (Date.now() - startTime) / 1000;
          if (timeElapsed > 0) {
            const currentLiveWpm = calculateWPM(timeElapsed, typed.length);
            // Only update if the value has changed to prevent unnecessary re-renders
            setLiveWpm(prev => prev !== currentLiveWpm ? currentLiveWpm : prev);
          }
        } catch (error) {
          console.warn('Error calculating live WPM:', error);
        }
      }, 1000); // Update every second for smoother feedback
    } else {
      setLiveWpm(0);
    }
    
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [state, startTime, typed.length]);


  // Effect for finger guidance
  useEffect(() => {
    if (state === 'start' || state === 'run') {
        const nextChar = words[typed.length];
        if (nextChar) {
            const { fingers } = getFingersForChar(nextChar);
            setFingersToUse(fingers);
        } else {
            setFingersToUse([]);
        }
    } else {
        setFingersToUse([]);
    }
}, [typed, words, state]);

  return { state, words, typed, errors, errorDetails, wpm, accuracy, totalTyped, loadTest, restart, fingersToUse, liveWpm, consistency };
};

export default useEngine;