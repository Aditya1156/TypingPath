import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import type { Theme, CaretStyle, SettingsContextType } from '../types';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>('dark');
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [caretStyle, setCaretStyleState] = useState<CaretStyle>('line');

    useEffect(() => {
        const storedTheme = localStorage.getItem('typingpath-theme') as Theme | null;
        if (storedTheme) {
            setThemeState(storedTheme);
        } else {
            // Default to dark theme if no stored preference
            setThemeState('dark');
            localStorage.setItem('typingpath-theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        const storedSound = localStorage.getItem('typingpath-sound');
        if (storedSound) setIsSoundEnabled(JSON.parse(storedSound));

        const storedCaret = localStorage.getItem('typingpath-caret') as CaretStyle | null;
        if (storedCaret) setCaretStyleState(storedCaret);
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('typingpath-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleSound = useCallback(() => {
        setIsSoundEnabled(prev => {
            const newState = !prev;
            localStorage.setItem('typingpath-sound', JSON.stringify(newState));
            return newState;
        });
    }, []);

    const setCaretStyle = (newStyle: CaretStyle) => {
        setCaretStyleState(newStyle);
        localStorage.setItem('typingpath-caret', newStyle);
    };
    
    // Apply theme on initial load
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);


    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        theme,
        setTheme,
        isSoundEnabled,
        toggleSound,
        caretStyle,
        setCaretStyle,
    }), [theme, isSoundEnabled, caretStyle, setTheme, toggleSound, setCaretStyle]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
