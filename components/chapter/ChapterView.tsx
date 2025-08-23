import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PremiumGuard from '../PremiumGuard';
import ProgressTick from '../ProgressTick';
import type { Chapter, Lesson, Progress } from '../../types';
import { getDrillId } from '../../utils/helpers';

interface ChapterViewProps {
  chapter: Chapter;
  chapters: Chapter[];
  onSelectLesson: (lesson: Lesson) => void;
  onSelectDrill: (lesson: Lesson, drillIndex: number) => void;
  progress: Progress;
  isProgressLoaded: boolean;
  onUpgrade?: () => void;
  onBackToLessons: () => void;
  onNavigateChapter: (chapterId: string) => void;
}

const ChapterView = ({
  chapter,
  chapters,
  onSelectLesson,
  onSelectDrill,
  progress,
  isProgressLoaded,
  onUpgrade,
  onBackToLessons,
  onNavigateChapter
}: ChapterViewProps) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  // Use consistent premium check logic (same as PremiumGuard)
  const isUserPremium = user?.subscription?.tier === 'premium' || user?.subscription?.tier === 'pro';

  // Find current chapter index
  const currentChapterIndex = chapters.findIndex(c => c.id === chapter.id);
  const previousChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  // Calculate chapter progress
  const totalDrills = chapter.lessons.reduce((acc, lesson) => 
    acc + (lesson.texts?.length || 0), 0
  );
  const completedDrills = chapter.lessons.reduce((acc, lesson) => {
    if (lesson.texts) {
      return acc + lesson.texts.filter((_, index) => progress[getDrillId(lesson, index)]).length;
    }
    return acc;
  }, 0);

  const progressPercentage = totalDrills > 0 ? Math.round((completedDrills / totalDrills) * 100) : 0;

  // Determine if chapter should be locked
  const isChapterLocked = !isUserPremium && currentChapterIndex >= 2;

  const toggleLesson = (lessonId: string) => {
    setExpandedLessonId(prev => prev === lessonId ? null : lessonId);
  };

  // Auto-expand first lesson on load
  useEffect(() => {
    if (chapter.lessons.length > 0 && !expandedLessonId) {
      setExpandedLessonId(chapter.lessons[0].id);
    }
  }, [chapter.id]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-secondary border-b border-border-primary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToLessons}
                className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                All Chapters
              </button>
              
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-tertiary hover:bg-accent/10 border border-border-primary rounded-lg text-text-secondary hover:text-accent transition-all"
                title="Toggle chapter navigation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
                Chapters
              </button>
              
              <div className="h-6 w-px bg-border-primary"></div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">{chapter.name}</h1>
                <p className="text-sm text-text-secondary">{chapter.description}</p>
              </div>
            </div>
            
            {/* Progress Badge */}
            {isProgressLoaded && totalDrills > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-text-primary">{progressPercentage}% Complete</div>
                  <div className="text-xs text-text-secondary">{completedDrills} / {totalDrills} drills</div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-tertiary"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${progressPercentage * 1.76} 176`}
                      className="text-accent transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{progressPercentage}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Collapsible Chapter Navigation Sidebar */}
      <aside className={`fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-secondary border-r border-border-primary overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">All Chapters</h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-text-secondary hover:text-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className="space-y-2">
            {chapters.map((chap, index) => {
              const isCurrentChapter = chap.id === chapter.id;
              const isLocked = !isUserPremium && index >= 2;
              
              const chapterTotalDrills = chap.lessons.reduce((acc, lesson) => 
                acc + (lesson.texts?.length || 0), 0
              );
              const chapterCompletedDrills = chap.lessons.reduce((acc, lesson) => {
                if (lesson.texts) {
                  return acc + lesson.texts.filter((_, idx) => progress[getDrillId(lesson, idx)]).length;
                }
                return acc;
              }, 0);
              const chapterProgress = chapterTotalDrills > 0 ? Math.round((chapterCompletedDrills / chapterTotalDrills) * 100) : 0;

              return (
                <button
                  key={chap.id}
                  onClick={() => {
                    if (!isLocked) {
                      onNavigateChapter(chap.id);
                      setIsSidebarOpen(false); // Close sidebar after navigation
                    }
                  }}
                  disabled={isLocked}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isCurrentChapter
                      ? 'bg-accent/10 border-accent text-accent'
                      : isLocked
                      ? 'bg-tertiary/50 border-border-primary text-text-secondary cursor-not-allowed opacity-60'
                      : 'bg-tertiary border-border-primary text-text-primary hover:bg-accent/5 hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{chap.name.replace(/^Chapter \d+:\s*/, '')}</h4>
                      <p className="text-xs opacity-75 line-clamp-2">{chap.description}</p>
                    </div>
                    {isLocked && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary/50 flex-shrink-0 ml-2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    )}
                  </div>
                  {!isLocked && chapterTotalDrills > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-primary rounded-full h-1.5">
                        <div 
                          className="bg-current h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${chapterProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{chapterProgress}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Upgrade CTA for locked chapters */}
          {!isUserPremium && (
            <div className="mt-6 p-4 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-semibold text-accent mb-2">Unlock All Chapters</h4>
              <p className="text-xs text-text-secondary mb-3">
                Get access to all {chapters.length} chapters and advanced features.
              </p>
              <button
                onClick={() => {
                  onUpgrade?.();
                  setIsSidebarOpen(false);
                }}
                className="w-full px-3 py-2 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex">
        {/* Main Content - Now Full Width */}
        <main className="flex-1 max-w-6xl mx-auto px-6 py-8 mt-4">
          {/* Chapter Content */}
          <div className="space-y-6">
            {/* Chapter Header */}
            <div className="bg-secondary rounded-xl border border-border-primary p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">{chapter.name}</h2>
                  <p className="text-text-secondary">{chapter.description}</p>
                </div>
              </div>
              
              {/* Chapter Stats */}
              {isProgressLoaded && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-primary">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{chapter.lessons.length}</div>
                    <div className="text-sm text-text-secondary">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{totalDrills}</div>
                    <div className="text-sm text-text-secondary">Total Drills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{completedDrills}</div>
                    <div className="text-sm text-text-secondary">Completed</div>
                  </div>
                </div>
              )}
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              {chapter.lessons.map((lesson, lessonIndex) => {
                const globalLessonIndex = chapters.slice(0, currentChapterIndex)
                  .reduce((acc, prevChapter) => acc + prevChapter.lessons.length, 0) + lessonIndex;
                
                const isLessonLocked = !isUserPremium && currentChapterIndex > 1 && globalLessonIndex >= 10;

                if (lesson.type === 'guide') {
                  const guideContent = (
                    <div className="bg-secondary rounded-xl border border-border-primary p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10,9 9,9 8,9"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-text-primary">{lesson.name}</h3>
                          <p className="text-text-secondary">Interactive guide</p>
                        </div>
                        <button
                          onClick={() => !isLessonLocked && onSelectLesson(lesson)}
                          disabled={isLessonLocked}
                          className="px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 disabled:bg-tertiary disabled:text-text-secondary disabled:cursor-not-allowed transition-all"
                        >
                          Start Guide
                        </button>
                      </div>
                    </div>
                  );

                  if (isLessonLocked && !isChapterLocked) {
                    return (
                      <PremiumGuard
                        key={lesson.id}
                        feature="lesson"
                        requiredTier="premium"
                        lessonCount={globalLessonIndex}
                        onUpgradeClick={onUpgrade}
                        showBlurred={true}
                        overlayClassName="rounded-xl"
                      >
                        {guideContent}
                      </PremiumGuard>
                    );
                  }

                  return guideContent;
                }

                // Test lesson
                const testContent = (
                  <div className="bg-secondary rounded-xl border border-border-primary overflow-hidden">
                    <button
                      onClick={() => !isLessonLocked && toggleLesson(lesson.id)}
                      disabled={isLessonLocked}
                      className="w-full p-6 text-left hover:bg-tertiary/30 transition-colors disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2"/>
                              <rect x="9" y="11" width="6" height="11"/>
                              <path d="M21 12h-6v4h6v-4z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-text-primary mb-1">{lesson.name}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-text-secondary">{lesson.texts?.length || 0} drills</span>
                              {isProgressLoaded && lesson.texts && (
                                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                                  {lesson.texts.filter((_, index) => progress[getDrillId(lesson, index)]).length} completed
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-200 ${expandedLessonId === lesson.id ? 'rotate-90' : 'rotate-0'}`}>
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </div>
                    </button>

                    {expandedLessonId === lesson.id && !isLessonLocked && (
                      <div className="px-6 pb-6 border-t border-border-primary/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          {lesson.texts?.map((_, index) => {
                            const drillId = getDrillId(lesson, index);
                            const performance = progress[drillId];
                            return (
                              <button
                                key={index}
                                onClick={() => onSelectDrill(lesson, index)}
                                className="flex items-center justify-between gap-3 p-4 bg-tertiary rounded-lg hover:bg-accent hover:text-primary transition-all transform hover:scale-105"
                              >
                                <span className="font-medium">Drill {index + 1}</span>
                                <div className="flex items-center gap-2">
                                  {isProgressLoaded && <ProgressTick tier={performance?.tier} />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );

                if (isLessonLocked && !isChapterLocked) {
                  return (
                    <PremiumGuard
                      key={lesson.id}
                      feature="lesson"
                      requiredTier="premium"
                      lessonCount={globalLessonIndex}
                      onUpgradeClick={onUpgrade}
                      showBlurred={true}
                      overlayClassName="rounded-xl"
                    >
                      {testContent}
                    </PremiumGuard>
                  );
                }

                return <div key={lesson.id}>{testContent}</div>;
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-border-primary">
              {previousChapter ? (
                <button
                  onClick={() => onNavigateChapter(previousChapter.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary border border-border-primary rounded-lg hover:bg-tertiary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-sm text-text-secondary">Previous</div>
                    <div className="font-semibold text-text-primary">{previousChapter.name.replace(/^Chapter \d+:\s*/, '')}</div>
                  </div>
                </button>
              ) : (
                <div></div>
              )}

              {nextChapter && (!isUserPremium ? currentChapterIndex < 1 : true) ? (
                <button
                  onClick={() => onNavigateChapter(nextChapter.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-sm opacity-90">Next</div>
                    <div className="font-semibold">{nextChapter.name.replace(/^Chapter \d+:\s*/, '')}</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              ) : nextChapter && !isUserPremium ? (
                <div className="text-center">
                  <div className="text-sm text-text-secondary mb-2">Unlock more chapters</div>
                  <button
                    onClick={onUpgrade}
                    className="px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChapterView;
