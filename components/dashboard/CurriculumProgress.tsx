import { memo } from 'react';
import type { Progress, Chapter } from '../../types';
import { getDrillId } from '../../utils/helpers';

interface CurriculumProgressProps {
  progress: Progress;
  isProgressLoaded: boolean;
  onSelectChapter?: (chapterNumber: number) => void;
  chapters?: Chapter[]; // Add chapters as optional prop to get real data
}

const CurriculumProgress = memo(({ progress, isProgressLoaded, onSelectChapter, chapters = [] }: CurriculumProgressProps) => {
  if (!isProgressLoaded) {
    return (
      <div className="bg-secondary rounded-lg p-6 border border-border-primary">
        <div className="animate-pulse">
          <div className="h-6 bg-border-primary rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-border-primary rounded"></div>
            <div className="h-4 bg-border-primary rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate overall statistics from actual chapter data
  const totalChapters = chapters.length || 30; // Fallback to 30 if no chapters provided
  const totalDrills = chapters.reduce((acc, chapter) => 
    acc + chapter.lessons.reduce((lessonAcc, lesson) => 
      lessonAcc + (lesson.texts?.length || 0), 0
    ), 0
  ) || 450; // Fallback if no chapters provided
  
  const totalCompletedDrills = Object.keys(progress).length;
  const totalMasteredDrills = Object.values(progress).filter((p: any) => p.tier === 'mastered').length;
  
  // Calculate chapter-based statistics
  let completedChapters = 0;
  let masteredChapters = 0;
  
  const chapterData = chapters.map((chapter, index) => {
    const chapterTotalDrills = chapter.lessons.reduce((acc, lesson) => 
      acc + (lesson.texts?.length || 0), 0
    );
    const chapterCompletedDrills = chapter.lessons.reduce((acc, lesson) => {
      if (lesson.texts) {
        return acc + lesson.texts.filter((_, textIndex) => progress[getDrillId(lesson, textIndex)]).length;
      }
      return acc;
    }, 0);
    const chapterMasteredDrills = chapter.lessons.reduce((acc, lesson) => {
      if (lesson.texts) {
        return acc + lesson.texts.filter((_, textIndex) => 
          progress[getDrillId(lesson, textIndex)]?.tier === 'mastered'
        ).length;
      }
      return acc;
    }, 0);
    
    const completionPercentage = chapterTotalDrills > 0 ? Math.round((chapterCompletedDrills / chapterTotalDrills) * 100) : 0;
    const masteryPercentage = chapterTotalDrills > 0 ? Math.round((chapterMasteredDrills / chapterTotalDrills) * 100) : 0;
    const isCompleted = chapterCompletedDrills === chapterTotalDrills;
    const isMastered = chapterMasteredDrills === chapterTotalDrills;
    
    if (isCompleted) completedChapters++;
    if (isMastered) masteredChapters++;
    
    return {
      number: index + 1,
      totalDrills: chapterTotalDrills,
      completedDrills: chapterCompletedDrills,
      masteredDrills: chapterMasteredDrills,
      completionPercentage,
      masteryPercentage,
      isCompleted,
      isMastered
    };
  });
  
  // If no chapters provided, create fallback data
  if (chapters.length === 0) {
    for (let i = 1; i <= 30; i++) {
      const chapterDrills = Object.keys(progress).filter(drillId => 
        drillId.startsWith(`${i}-`)
      );
      const totalDrillsInChapter = 15; // Fallback assumption
      const completedDrillsInChapter = chapterDrills.length;
      const masteredDrillsInChapter = chapterDrills.filter(drillId => 
        progress[drillId]?.tier === 'mastered'
      ).length;
      
      if (completedDrillsInChapter === totalDrillsInChapter) completedChapters++;
      if (masteredDrillsInChapter === totalDrillsInChapter) masteredChapters++;
      
      chapterData.push({
        number: i,
        totalDrills: totalDrillsInChapter,
        completedDrills: completedDrillsInChapter,
        masteredDrills: masteredDrillsInChapter,
        completionPercentage: Math.round((completedDrillsInChapter / totalDrillsInChapter) * 100),
        masteryPercentage: Math.round((masteredDrillsInChapter / totalDrillsInChapter) * 100),
        isCompleted: completedDrillsInChapter === totalDrillsInChapter,
        isMastered: masteredDrillsInChapter === totalDrillsInChapter
      });
    }
  }
  
  const overallCompletionPercentage = totalDrills > 0 ? Math.round((totalCompletedDrills / totalDrills) * 100) : 0;
  const overallMasteryPercentage = totalDrills > 0 ? Math.round((totalMasteredDrills / totalDrills) * 100) : 0;
  const isFullyCompleted = completedChapters === totalChapters;
  const isFullyMastered = masteredChapters === totalChapters;

  return (
    <div className="bg-secondary rounded-lg p-6 border border-border-primary">
      <h3 className="text-xl font-bold text-text-primary mb-6">TypingPath Curriculum Progress</h3>
      
      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">{overallCompletionPercentage}%</div>
          <div className="text-sm text-text-secondary">Overall Progress</div>
          <div className="text-xs text-text-secondary mt-1">
            {totalCompletedDrills} / {totalDrills} drills
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{overallMasteryPercentage}%</div>
          <div className="text-sm text-text-secondary">Mastery Level</div>
          <div className="text-xs text-text-secondary mt-1">
            {totalMasteredDrills} drills mastered
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{completedChapters}</div>
          <div className="text-sm text-text-secondary">Chapters Done</div>
          <div className="text-xs text-text-secondary mt-1">
            of {totalChapters} chapters
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{masteredChapters}</div>
          <div className="text-sm text-text-secondary">Mastered</div>
          <div className="text-xs text-text-secondary mt-1">
            chapters complete
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      {overallCompletionPercentage > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-text-primary mb-3">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {overallCompletionPercentage >= 10 && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">🚀 Getting Started</span>
            )}
            {overallCompletionPercentage >= 25 && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">📚 Quarter Master</span>
            )}
            {overallCompletionPercentage >= 50 && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">⚡ Halfway Hero</span>
            )}
            {overallCompletionPercentage >= 75 && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">🎯 Expert Typist</span>
            )}
            {overallCompletionPercentage >= 90 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">👑 Near Mastery</span>
            )}
            {isFullyCompleted && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm">🏆 CURRICULUM COMPLETE</span>
            )}
            {isFullyMastered && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">👑 ULTIMATE MASTER</span>
            )}
          </div>
        </div>
      )}

      {/* Chapter Progress Grid */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-text-primary mb-3">Chapter Progress</h4>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {chapterData.map((chapter) => {
            const getChapterColor = () => {
              if (chapter.isMastered) return 'bg-green-500';
              if (chapter.isCompleted) return 'bg-blue-500';
              if (chapter.completedDrills > 0) return 'bg-yellow-500';
              return 'bg-border-primary';
            };

            const getChapterIcon = () => {
              if (chapter.isMastered) return '👑';
              if (chapter.isCompleted) return '✅';
              if (chapter.completedDrills > 0) return '⚡';
              return chapter.number.toString();
            };

            return (
              <button
                key={chapter.number}
                onClick={() => onSelectChapter?.(chapter.number)}
                className={`
                  ${getChapterColor()} 
                  w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm
                  hover:scale-110 transition-transform cursor-pointer border-2 border-transparent
                  hover:border-accent
                `}
                title={`Chapter ${chapter.number}: ${chapter.completedDrills}/${chapter.totalDrills} drills (${chapter.completionPercentage}% complete, ${chapter.masteryPercentage}% mastered)`}
              >
                {getChapterIcon()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="text-sm text-text-secondary">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-border-primary rounded"></div>
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Mastered</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CurriculumProgress.displayName = 'CurriculumProgress';

export default CurriculumProgress;
