import { useState, ChangeEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { isPremiumUser } from '../utils/isPremiumUser';
import PremiumGuard from './PremiumGuard';
import type { Chapter, Lesson, PracticeMode, Progress } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ProgressTick from './ProgressTick';
import { getDrillId } from '../utils/helpers';

interface LessonSelectorProps {
  chapters: Chapter[];
  onSelectLesson: (lesson: Lesson) => void;
  onSelectDrill: (lesson: Lesson, drillIndex: number) => void;
  onSelectRandom: () => void;
  onGenerateAiDrill: (keys: string, mode: PracticeMode) => void;
  isAiDrillLoading: boolean;
  aiDrillError: string | null;
  progress: Progress;
  isProgressLoaded: boolean;
  onResetProgress: () => void;
  onBackToHome?: () => void;
  onUpgrade?: () => void;
}

const LessonSelector = ({ 
  chapters, 
  onSelectLesson, 
  onSelectDrill, 
  onSelectRandom, 
  onGenerateAiDrill, 
  isAiDrillLoading, 
  aiDrillError, 
  progress, 
  isProgressLoaded, 
  onResetProgress, 
  onBackToHome, 
  onUpgrade 
}: LessonSelectorProps) => {
  const [difficultKeys, setDifficultKeys] = useState('');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('words');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const { user } = useAuth();

  // Free users get access to entire Chapter 1 (home row) + limited access to Chapter 2
  const maxFreeLessons = 10; // Increased to cover all of Chapter 1
  const isUserPremium = isPremiumUser(user);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessonId((prev: string | null) => (prev === lessonId ? null : lessonId));
  };

  const handleGenerateClick = () => {
    if (difficultKeys.trim()) {
      onGenerateAiDrill(difficultKeys.trim(), practiceMode);
    }
  };

  const handleGenerateRandomClick = () => {
    const difficultKeysPool = ['q', 'z', 'x', 'p', ';', '[', ']', '\\', '/', 'v', 'b', 'g', 'h', ',', '.'];
    const shuffled = difficultKeysPool.sort(() => 0.5 - Math.random());
    const selectedKeys = shuffled.slice(0, 4).join(' ');
    setDifficultKeys(selectedKeys);
    onGenerateAiDrill(selectedKeys, practiceMode);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-secondary border-b border-border-primary mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Home
            </button>
          )}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
              Practice Library
            </h1>
            <p className="text-text-secondary">Choose your learning path and start improving your typing skills</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Quick Practice Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AI Drill Generator - Premium */}
          <PremiumGuard
            feature="aiCoach"
            requiredTier="premium"
            onUpgradeClick={onUpgrade}
            showBlurred={true}
            overlayClassName="rounded-xl"
          >
            <div className="bg-secondary rounded-xl border border-border-primary p-6 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-accent mb-1">AI Drill Generator</h3>
                  <p className="text-text-secondary text-sm">Personalized practice targeting your weakest keys</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="difficult-keys" className="block text-sm font-medium text-text-secondary mb-2">
                    Target Keys
                  </label>
                  <input
                    id="difficult-keys"
                    type="text"
                    value={difficultKeys}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDifficultKeys(e.target.value)}
                    placeholder="e.g., q z p ; [ ] \\"
                    className="w-full px-4 py-3 bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Practice Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['keys', 'words', 'paragraph', 'code'] as PracticeMode[]).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setPracticeMode(mode)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                          practiceMode === mode 
                            ? 'bg-accent text-primary shadow-md' 
                            : 'bg-tertiary text-text-primary hover:bg-border-primary'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleGenerateClick}
                    disabled={!difficultKeys.trim() || isAiDrillLoading}
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-3 font-semibold text-primary bg-accent rounded-lg hover:bg-accent/90 disabled:bg-tertiary disabled:text-text-secondary disabled:cursor-not-allowed transition-all relative overflow-hidden"
                  >
                    {isAiDrillLoading && difficultKeys.trim() ? <LoadingSpinner /> : 'Generate Drill'}
                    {/* TypingPath Logo Symbol - Blurred */}
                    <div className="absolute top-1 right-2 opacity-20 blur-[1px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={handleGenerateRandomClick}
                    disabled={isAiDrillLoading}
                    title="Let AI pick difficult keys for you"
                    className="px-4 py-3 font-semibold text-primary bg-success rounded-lg hover:bg-success/90 disabled:bg-tertiary disabled:text-text-secondary transition-all relative overflow-hidden"
                  >
                    🎲
                    {/* TypingPath Logo Symbol - Blurred */}
                    <div className="absolute top-1 right-1 opacity-20 blur-[1px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  </button>
                </div>

                {aiDrillError && (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                    <p className="text-danger text-sm">{aiDrillError}</p>
                  </div>
                )}
              </div>
            </div>
          </PremiumGuard>

          {/* Random Challenge */}
          <div className="bg-secondary rounded-xl border border-border-primary p-6 h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-warning mb-1">Random Challenge</h3>
                <p className="text-text-secondary text-sm">Quick practice with random word selection</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-text-secondary">
                Jump into a quick typing test with randomly selected words. Perfect for warming up or testing your current speed.
              </p>
              <button
                onClick={onSelectRandom}
                className="w-full px-6 py-3 font-semibold text-primary bg-warning rounded-lg hover:bg-warning/90 transition-all transform hover:scale-[1.02] relative overflow-hidden"
              >
                Start Random Test
                {/* TypingPath Logo Symbol - Blurred */}
                <div className="absolute top-1 right-2 opacity-20 blur-[1px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Structured Lessons */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Structured Lessons</h2>
            <p className="text-text-secondary">Progress through our comprehensive typing curriculum</p>
          </div>

          {/* Lessons Grid */}
          <div className="space-y-6">
            {chapters.map((chapter, chapterIndex) => {
              const totalDrills = chapter.lessons.reduce((acc, lesson) => acc + (lesson.type === 'test' ? lesson.texts.length : 0), 0);
              const completedDrills = chapter.lessons.reduce((acc, lesson) => {
                if (lesson.type === 'test') {
                  return acc + lesson.texts.filter((_, index) => progress[getDrillId(lesson, index)]).length;
                }
                return acc;
              }, 0);

              // Determine if entire chapter should be locked
              // Free users get Chapter 0 (welcome) and Chapter 1 (home row) completely free
              // Chapter 2+ are fully locked for premium
              const isEntireChapterLocked = !isUserPremium && chapterIndex >= 2; // Only Chapter 2+ are fully locked
              
              const chapterContent = (
                <div key={chapter.id} className="bg-secondary rounded-xl border border-border-primary p-6">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-accent">{chapter.name}</h3>
                    {isProgressLoaded && totalDrills > 0 && (
                      <span className="text-sm font-semibold text-text-secondary bg-tertiary px-3 py-1 rounded-full">
                        {completedDrills} / {totalDrills} Complete
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary mb-6">{chapter.description}</p>
                  
                  <div className="space-y-3">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      // Calculate global lesson index across all chapters
                      const globalLessonIndex = chapters.slice(0, chapters.indexOf(chapter))
                        .reduce((acc, prevChapter) => acc + prevChapter.lessons.length, 0) + lessonIndex;
                      
                      // Chapter 1 (home row) is always free, other chapters use global lesson limit
                      const isLessonLocked = !isUserPremium && chapterIndex > 1 && globalLessonIndex >= maxFreeLessons;
                      
                      if (lesson.type === 'guide') {
                        const guideContent = (
                          <button
                            key={lesson.id}
                            onClick={() => !isLessonLocked && onSelectLesson(lesson)}
                            className={`w-full p-4 text-left font-semibold text-text-primary bg-tertiary/50 rounded-lg hover:bg-tertiary transition-colors flex justify-between items-center relative overflow-hidden ${isLessonLocked ? 'cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                  <polyline points="14,2 14,8 20,8"/>
                                  <line x1="16" y1="13" x2="8" y2="13"/>
                                  <line x1="16" y1="17" x2="8" y2="17"/>
                                  <polyline points="10,9 9,9 8,9"/>
                                </svg>
                              </div>
                              <span>{lesson.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="m12 5 7 7-7 7"/>
                              </svg>
                              {/* TypingPath Logo Symbol - Blurred */}
                              <div className="absolute top-2 right-2 opacity-20 blur-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                  <path d="M2 17l10 5 10-5"/>
                                  <path d="M2 12l10 5 10-5"/>
                                </svg>
                              </div>
                            </div>
                          </button>
                        );
                        
                        if (isLessonLocked && !isEntireChapterLocked) {
                          return (
                            <PremiumGuard
                              key={lesson.id}
                              feature="lesson"
                              requiredTier="premium"
                              lessonCount={globalLessonIndex}
                              onUpgradeClick={onUpgrade}
                              showBlurred={true}
                              overlayClassName="rounded-lg"
                            >
                              {guideContent}
                            </PremiumGuard>
                          );
                        }
                        
                        return guideContent;
                      }
                      
                      const testContent = (
                        <div key={lesson.id} className="bg-tertiary/30 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => !isLessonLocked && toggleLesson(lesson.id)}
                            className={`w-full p-4 text-left font-semibold text-text-primary hover:bg-tertiary/50 transition-colors flex justify-between items-center relative overflow-hidden ${isLessonLocked ? 'cursor-not-allowed' : ''}`}
                            aria-expanded={expandedLessonId === lesson.id}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2"/>
                                  <rect x="9" y="11" width="6" height="11"/>
                                  <path d="M21 12h-6v4h6v-4z"/>
                                </svg>
                              </div>
                              <span>{lesson.name}</span>
                              <span className="text-xs text-text-secondary bg-primary px-2 py-1 rounded">
                                {lesson.texts?.length || 0} drills
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-200 ${expandedLessonId === lesson.id ? 'rotate-90' : 'rotate-0'}`}>
                                <polyline points="9 18 15 12 9 6"/>
                              </svg>
                              {/* TypingPath Logo Symbol - Blurred */}
                              <div className="absolute top-2 right-2 opacity-20 blur-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                  <path d="M2 17l10 5 10-5"/>
                                  <path d="M2 12l10 5 10-5"/>
                                </svg>
                              </div>
                            </div>
                          </button>
                          
                          {expandedLessonId === lesson.id && (
                            <div className="p-4 border-t border-border-primary/30 bg-primary/10">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {lesson.texts.map((_, index) => {
                                  const drillId = getDrillId(lesson, index);
                                  const performance = progress[drillId];
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => !isLessonLocked && onSelectDrill(lesson, index)}
                                      className={`flex items-center justify-between gap-2 p-3 text-sm font-medium bg-tertiary rounded-lg hover:bg-accent hover:text-primary transition-all transform hover:scale-105 relative overflow-hidden ${isLessonLocked ? 'cursor-not-allowed' : ''}`}
                                    >
                                      <span>Drill {index + 1}</span>
                                      <div className="flex items-center gap-2">
                                        {isProgressLoaded && <ProgressTick tier={performance?.tier} />}
                                        {/* TypingPath Logo Symbol - Blurred */}
                                        <div className="absolute top-1 right-1 opacity-20 blur-[1px]">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                            <path d="M2 17l10 5 10-5"/>
                                            <path d="M2 12l10 5 10-5"/>
                                          </svg>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                      
                      if (isLessonLocked && !isEntireChapterLocked) {
                        return (
                          <PremiumGuard
                            key={lesson.id}
                            feature="lesson"
                            requiredTier="premium"
                            lessonCount={globalLessonIndex}
                            onUpgradeClick={onUpgrade}
                            showBlurred={true}
                            overlayClassName="rounded-lg"
                          >
                            {testContent}
                          </PremiumGuard>
                        );
                      }
                      
                      return testContent;
                    })}
                  </div>
                </div>
              );

              // If entire chapter is locked, wrap it with PremiumGuard
              if (isEntireChapterLocked) {
                return (
                  <PremiumGuard
                    key={chapter.id}
                    feature="lesson"
                    requiredTier="premium"
                    lessonCount={chapterIndex + 1}
                    onUpgradeClick={onUpgrade}
                    showBlurred={true}
                    overlayClassName="rounded-xl"
                  >
                    {chapterContent}
                  </PremiumGuard>
                );
              }

              return chapterContent;
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
        <div className="bg-secondary rounded-xl border border-border-primary p-6">
          <p className="text-text-secondary mb-4">
            Ready to accelerate your typing journey? Select any lesson or create a custom drill to get started.
          </p>
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
                onResetProgress();
              }
            }}
            className="text-danger hover:text-danger/80 underline text-sm transition-colors"
          >
            Reset All Progress
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LessonSelector;
