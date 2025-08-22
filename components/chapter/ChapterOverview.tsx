import { useState, ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import PremiumGuard from '../PremiumGuard';
import type { Chapter, PracticeMode, Progress } from '../../types';
import LoadingSpinner from '../LoadingSpinner';
import { getDrillId } from '../../utils/helpers';

interface ChapterOverviewProps {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
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

const ChapterOverview = ({ 
  chapters, 
  onSelectChapter,
  onSelectRandom, 
  onGenerateAiDrill, 
  isAiDrillLoading, 
  aiDrillError, 
  progress, 
  isProgressLoaded, 
  onResetProgress, 
  onBackToHome, 
  onUpgrade 
}: ChapterOverviewProps) => {
  const [difficultKeys, setDifficultKeys] = useState('');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('words');
  const { user } = useAuth();
  
  // Use consistent premium check logic (same as PremiumGuard)
  const isUserPremium = user?.subscription?.tier === 'premium' || user?.subscription?.tier === 'pro';

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
    <div className="w-full min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-secondary border-b border-border-primary mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
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
            <p className="text-text-secondary">Choose your learning path and master typing one chapter at a time</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
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
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-3 font-semibold text-primary bg-accent rounded-lg hover:bg-accent/90 disabled:bg-tertiary disabled:text-text-secondary disabled:cursor-not-allowed transition-all"
                  >
                    {isAiDrillLoading && difficultKeys.trim() ? <LoadingSpinner /> : 'Generate Drill'}
                  </button>
                  <button
                    onClick={handleGenerateRandomClick}
                    disabled={isAiDrillLoading}
                    title="Let AI pick difficult keys for you"
                    className="px-4 py-3 font-semibold text-primary bg-success rounded-lg hover:bg-success/90 disabled:bg-tertiary disabled:text-text-secondary transition-all"
                  >
                    🎲
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
                className="w-full px-6 py-3 font-semibold text-primary bg-warning rounded-lg hover:bg-warning/90 transition-all transform hover:scale-[1.02]"
              >
                Start Random Test
              </button>
            </div>
          </div>
        </section>

        {/* Chapter Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Typing Curriculum</h2>
            <p className="text-text-secondary">Master typing step-by-step with our structured learning path</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {chapters.map((chapter, index) => {
              const totalDrills = chapter.lessons.reduce((acc, lesson) => 
                acc + (lesson.type === 'test' ? lesson.texts.length : 0), 0
              );
              const completedDrills = chapter.lessons.reduce((acc, lesson) => {
                if (lesson.type === 'test') {
                  return acc + lesson.texts.filter((_, drillIndex) => progress[getDrillId(lesson, drillIndex)]).length;
                }
                return acc;
              }, 0);
              
              const progressPercentage = totalDrills > 0 ? Math.round((completedDrills / totalDrills) * 100) : 0;
              const isChapterLocked = !isUserPremium && index >= 2;

              const chapterCard = (
                <div className="bg-secondary rounded-xl border border-border-primary overflow-hidden hover:border-accent/50 transition-all transform hover:scale-[1.02] group h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Chapter Number Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        isChapterLocked 
                          ? 'bg-tertiary text-text-secondary'
                          : progressPercentage === 100 
                          ? 'bg-success/20 text-success' 
                          : progressPercentage > 0
                          ? 'bg-accent/20 text-accent'
                          : 'bg-tertiary text-text-secondary'
                      }`}>
                        {isChapterLocked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      {/* Progress Ring */}
                      {!isChapterLocked && isProgressLoaded && totalDrills > 0 && (
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              className="text-tertiary"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${progressPercentage * 1.005} 100.5`}
                              className="text-accent transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent">{progressPercentage}%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chapter Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {chapter.name}
                    </h3>
                    
                    {/* Chapter Description */}
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                      {chapter.description}
                    </p>

                    {/* Chapter Stats */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-text-secondary">
                          <span className="font-semibold text-text-primary">{chapter.lessons.length}</span> lessons
                        </span>
                        <span className="text-text-secondary">
                          <span className="font-semibold text-text-primary">{totalDrills}</span> drills
                        </span>
                      </div>
                      
                      {!isChapterLocked && progressPercentage > 0 && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                          {completedDrills} completed
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!isChapterLocked && isProgressLoaded && totalDrills > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-text-secondary">Progress</span>
                          <span className="text-xs font-semibold text-accent">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-tertiary rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow"></div>

                    {/* Action Button */}
                    <button
                      onClick={() => !isChapterLocked && onSelectChapter(chapter.id)}
                      disabled={isChapterLocked}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mt-auto ${
                        isChapterLocked
                          ? 'bg-tertiary text-text-secondary cursor-not-allowed'
                          : progressPercentage === 100
                          ? 'bg-success text-primary hover:bg-success/90'
                          : progressPercentage > 0
                          ? 'bg-accent text-primary hover:bg-accent/90'
                          : 'bg-border-primary text-text-primary hover:bg-accent hover:text-primary'
                      }`}
                    >
                      {isChapterLocked ? 'Locked' : progressPercentage === 100 ? 'Review Chapter' : progressPercentage > 0 ? 'Continue' : 'Start Chapter'}
                    </button>
                  </div>
                </div>
              );

              // Wrap locked chapters with PremiumGuard
              if (isChapterLocked) {
                return (
                  <PremiumGuard
                    key={chapter.id}
                    feature="lesson"
                    requiredTier="premium"
                    lessonCount={index + 1}
                    onUpgradeClick={onUpgrade}
                    showBlurred={true}
                    overlayClassName="rounded-xl"
                  >
                    {chapterCard}
                  </PremiumGuard>
                );
              }

              return <div key={chapter.id}>{chapterCard}</div>;
            })}
          </div>
        </section>

        {/* Learning Path Visualization - Enhanced Scrollable */}
        <section className="bg-secondary rounded-xl border border-border-primary p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Your Learning Journey</h3>
            <p className="text-text-secondary">Follow the structured path from beginner to expert - {chapters.length} chapters total</p>
          </div>
          
          <div className="relative">
            {/* Horizontal Scrollable Container */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-track-tertiary scrollbar-thumb-accent scroll-smooth mx-2">
              <div className="relative min-w-max py-8">
                {/* Straight Progress Line - Dynamic SVG */}
                <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{ zIndex: 1 }}>
                  <svg 
                    width="100%" 
                    height="64" 
                    viewBox={`0 0 ${chapters.length * 172} 64`} 
                    className="overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      {/* Gradient for completed path */}
                      <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'hsl(var(--color-text-success))', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'hsl(var(--color-text-accent))', stopOpacity: 1 }} />
                      </linearGradient>
                      
                      {/* Glow effect for active path */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background straight line - aligned with circle centers */}
                    <line
                      x1={16 + 70} // px-4 (16px) + half of min-w-[140px] (70px) = center of first circle
                      y1={20} // Center Y position aligned with circle
                      x2={16 + 70 + ((chapters.length - 1) * 172)} // Last circle center: 172px spacing (140px + 32px gap)
                      y2={20} // Same Y position for straight line
                      stroke="hsl(var(--color-bg-tertiary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    
                    {/* Progress straight line segments - dynamically colored and aligned */}
                    {isProgressLoaded && chapters.map((chapter, index) => {
                      const isCompleted = chapter.lessons.every(lesson => 
                        lesson.type === 'guide' || lesson.texts?.every((_, i) => progress[getDrillId(lesson, i)])
                      );
                      
                      if (index === 0) return null; // No line before first chapter
                      
                      // Calculate exact center positions matching the chapter layout
                      const currentCenterX = 16 + 70 + (index * 172); // px-4 + half-width + (index * total-spacing)
                      const prevCenterX = 16 + 70 + ((index - 1) * 172);
                      const y = 20; // Straight line at consistent Y position
                      
                      // Previous chapter completion status
                      const prevChapter = chapters[index - 1];
                      const isPrevCompleted = prevChapter.lessons.every(lesson => 
                        lesson.type === 'guide' || lesson.texts?.every((_, i) => progress[getDrillId(lesson, i)])
                      );
                      
                      // Only show segment if previous chapter is completed or current is in progress
                      if (!isPrevCompleted && !isCompleted) return null;
                      
                      return (
                        <line
                          key={`segment-${index}`}
                          x1={prevCenterX}
                          y1={y}
                          x2={currentCenterX}
                          y2={y}
                          stroke={isCompleted ? "url(#completedGradient)" : "hsl(var(--color-text-accent))"}
                          strokeWidth="4"
                          strokeLinecap="round"
                          filter={isCompleted ? "url(#glow)" : "none"}
                          className="transition-all duration-1000 ease-in-out"
                          style={{
                            strokeDasharray: isCompleted ? "none" : "12 6",
                            animation: isCompleted ? "none" : "dash 2s linear infinite"
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>
                
                {/* Chapter Milestones - All chapters in horizontal scroll */}
                <div className="flex gap-8 px-4">
                  {chapters.map((chapter, index) => {
                    const isCompleted = isProgressLoaded && chapter.lessons.every(lesson => 
                      lesson.type === 'guide' || lesson.texts?.every((_, i) => progress[getDrillId(lesson, i)])
                    );
                    const isLocked = !isUserPremium && index >= 2;
                    
                    return (
                      <div 
                        key={chapter.id} 
                        className={`flex flex-col items-center text-center min-w-[140px] cursor-pointer transition-all duration-200 p-4 relative ${
                          !isLocked ? 'hover:text-accent' : ''
                        }`}
                        onClick={() => !isLocked && onSelectChapter(chapter.id)}
                        style={{ 
                          transform: 'translateZ(0)', // Force hardware acceleration for stable positioning
                          zIndex: 10 // Ensure chapters stay above the wave path
                        }}
                      >
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm mb-3 transition-all ${
                          isLocked 
                            ? 'bg-tertiary border-tertiary text-text-secondary'
                            : isCompleted 
                            ? 'bg-success border-success text-primary shadow-lg shadow-success/25' 
                            : 'bg-primary border-accent text-accent shadow-lg shadow-accent/25'
                        }`}>
                          {isLocked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          ) : isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20,6 9,17 4,12"/>
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <h4 className={`text-sm font-semibold mb-1 ${isLocked ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {chapter.name.replace(/^Chapter \d+:\s*/, '')}
                        </h4>
                        <p className={`text-xs line-clamp-3 ${isLocked ? 'text-text-secondary/70' : 'text-text-secondary'}`}>
                          {chapter.description}
                        </p>
                        
                        {/* Chapter Status Indicator */}
                        <div className="mt-2">
                          {isLocked ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-tertiary text-text-secondary">
                              Locked
                            </span>
                          ) : isCompleted ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
                              Completed
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                              {index === 0 ? 'Start Here' : 'Available'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Legend only - without scroll hint */}
            <div className="flex justify-end items-center mt-4 text-xs text-text-secondary">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                  <span>Locked</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overall Progress Stats */}
          <div className="mt-8 p-6 bg-tertiary rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-text-primary">Learning Progress</h4>
              <span className="text-accent font-bold">
                {isProgressLoaded ? 
                  `${chapters.filter(c => c.lessons.every(l => l.type === 'guide' || l.texts?.every((_, i) => progress[getDrillId(l, i)]))).length} / ${chapters.length}` 
                  : '0 / ' + chapters.length
                } chapters completed
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {isProgressLoaded ? 
                    chapters.filter(c => c.lessons.every(l => l.type === 'guide' || l.texts?.every((_, i) => progress[getDrillId(l, i)]))).length
                    : 0
                  }
                </div>
                <div className="text-sm text-text-secondary">Completed</div>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-accent">
                  {isUserPremium ? chapters.length - 2 : 2}
                </div>
                <div className="text-sm text-text-secondary">Available</div>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-text-secondary">
                  {isUserPremium ? 2 : chapters.length - 2}
                </div>
                <div className="text-sm text-text-secondary">
                  {isUserPremium ? 'Free Chapters' : 'Premium Only'}
                </div>
              </div>
            </div>
            
            {!isUserPremium && (
              <div className="mt-6 text-center">
                <button
                  onClick={onUpgrade}
                  className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25"
                >
                  Unlock All {chapters.length} Chapters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
        <div className="bg-secondary rounded-xl border border-border-primary p-6">
          <p className="text-text-secondary mb-4">
            Ready to start your typing journey? Choose a chapter above or try a quick challenge.
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

export default ChapterOverview;
