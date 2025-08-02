# API Documentation

## TypingPath API Reference

This document outlines the key APIs and interfaces used in TypingPath.

## Core Components

### TypingEngine Hook (`useEngine`)

The core typing engine that handles all typing logic.

```typescript
interface TypingEngineState {
  state: 'waiting' | 'run' | 'finish';
  words: string[];
  typed: string;
  errors: number;
  errorDetails: ErrorDetail[];
  wpm: number;
  accuracy: number;
  totalTyped: number;
  fingersToUse: string[];
  liveWpm: number;
  consistency: number;
}

const useEngine = (
  isActive: boolean, 
  soundEnabled: boolean
): TypingEngineState & {
  loadTest: (text?: string) => void;
  restart: () => void;
}
```

### Settings Context

Manages user preferences and theme settings.

```typescript
interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  caretStyle: CaretStyle;
  setCaretStyle: (style: CaretStyle) => void;
}
```

### Progress Tracking (`useProgress`)

Handles user progress and performance data.

```typescript
interface UserProgress {
  lessonsCompleted: Record<string, LessonProgress>;
  totalSessions: number;
  totalTimeSpent: number;
  averageWpm: number;
  averageAccuracy: number;
  bestWpm: number;
  bestAccuracy: number;
  streakData: StreakData;
}
```

## AI Services

### Gemini AI Integration

```typescript
// Get AI analysis of typing errors
fetchAiAnalysis(errorDetails: ErrorDetail[]): Promise<AiAnalysis>

// Generate custom practice drill
fetchAiCustomDrill(keys: string, mode: PracticeMode): Promise<string>
```

### AI Analysis Response

```typescript
interface AiAnalysis {
  overallAssessment: string;
  specificIssues: string[];
  recommendations: string[];
  practiceExercises: string[];
  estimatedImprovementTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

## Theme System

### Theme Types

```typescript
type Theme = 'dark' | 'light' | 'hacker' | 'ocean' | 'sunset' | 'forest';

interface ThemeConfig {
  name: string;
  description: string;
  emoji: string;
  cssVariables: Record<string, string>;
}
```

### CSS Custom Properties

Each theme defines these CSS variables:

```css
:root {
  --color-primary: #...;
  --color-secondary: #...;
  --color-tertiary: #...;
  --color-accent: #...;
  --color-text-primary: #...;
  --color-text-secondary: #...;
  --color-border-primary: #...;
  --color-success: #...;
  --color-danger: #...;
  --color-warning: #...;
}
```

## Dashboard Analytics

### Performance Metrics

```typescript
interface PerformanceMetrics {
  wpm: number;
  accuracy: number;
  consistency: number;
  errors: number;
  timeSpent: number;
  keystrokes: number;
  correctKeystrokes: number;
}

interface SessionData {
  id: string;
  date: Date;
  lessonId: string;
  lessonName: string;
  drillIndex: number;
  metrics: PerformanceMetrics;
  duration: number;
}
```

### Achievement System

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
  unlockedAt?: Date;
}
```

## Event System

### Keyboard Events

The typing engine listens for these keyboard events:

- `keydown`: Main typing logic
- `keyup`: Special key handling (Tab, Escape)
- `beforeunload`: Save progress on page exit

### Custom Events

```typescript
// Typing events
interface TypingEvent {
  type: 'correct' | 'incorrect' | 'complete';
  character: string;
  position: number;
  timestamp: number;
}

// Sound events
interface SoundEvent {
  type: 'correct' | 'error' | 'complete';
  volume: number;
}
```

## Lesson System

### Lesson Structure

```typescript
interface Lesson {
  id: string;
  name: string;
  type: 'drill' | 'guide' | 'challenge';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  texts: string[];
  description?: string;
  focusKeys?: string[];
}

interface Chapter {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}
```

### Progress Tracking

```typescript
interface LessonProgress {
  completed: boolean;
  bestWpm: number;
  bestAccuracy: number;
  attempts: number;
  lastAttempt: Date;
  drillsCompleted: Record<number, DrillProgress>;
}

interface DrillProgress {
  completed: boolean;
  wpm: number;
  accuracy: number;
  completedAt: Date;
}
```

## Error Handling

### Error Types

```typescript
interface AppError {
  type: 'network' | 'ai' | 'storage' | 'unknown';
  message: string;
  code?: string;
  timestamp: Date;
}

// Error boundaries catch these errors
class TypingError extends Error {
  type: 'engine' | 'ui' | 'data';
  component?: string;
}
```

### Error Recovery

The app implements several error recovery strategies:

1. **Network Errors**: Retry with exponential backoff
2. **AI Errors**: Graceful degradation with fallback messages
3. **Storage Errors**: Use session storage as backup
4. **Component Errors**: Error boundaries with user-friendly messages

## Performance Optimization

### Memoization

Key components use React.memo and useMemo:

```typescript
// Expensive calculations are memoized
const liveStats = useMemo(() => 
  calculateLiveStats(typed, errors, startTime), 
  [typed, errors, startTime]
);

// Components with stable props are memoized
const MemoizedTypingTest = React.memo(TypingTest);
```

### Virtual Scrolling

Large lesson lists use virtual scrolling for performance:

```typescript
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => ReactNode;
}
```

## Security Considerations

### API Keys

- Gemini API key is stored in environment variables
- Never exposed in client-side code
- Rotation recommended every 90 days

### Data Privacy

- No personal data sent to AI services
- Local storage for user preferences only
- Optional cloud sync with user consent

### Input Validation

All user inputs are validated:

```typescript
const validateLessonText = (text: string): boolean => {
  return text.length > 0 && 
         text.length < 10000 && 
         /^[\x20-\x7E\n\r\t]*$/.test(text);
};
```

## Browser Compatibility

### Supported Browsers

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features

- ES6+ support
- CSS Custom Properties
- Web Audio API (for sounds)
- Local Storage
- Fetch API

### Polyfills

The app includes polyfills for:

- `requestIdleCallback`
- `IntersectionObserver`
- `ResizeObserver`
