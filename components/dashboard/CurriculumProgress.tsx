import { memo } from 'react';
import type { Progress } from '../../types';
import { getOverallProgress, getChapterProgress } from '../../utils/helpers';

interface CurriculumProgressProps {
  progress: Progress;
  isProgressLoaded: boolean;
  onSelectChapter?: (chapterNumber: number) => void;
}

const CurriculumProgress = memo(({ progress, isProgressLoaded, onSelectChapter }: CurriculumProgressProps) => {
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

  const overallStats = getOverallProgress(progress);

  // Get chapter completion data for visualization
  const chapterData = Array.from({ length: 30 }, (_, i) => {
    const chapterNumber = i + 1;
    const chapterProgress = getChapterProgress(chapterNumber, progress);
    return {
      number: chapterNumber,
      ...chapterProgress
    };
  });

  return (
    <div className="bg-secondary rounded-lg p-6 border border-border-primary">
      <h3 className="text-xl font-bold text-text-primary mb-6">TypingPath Curriculum Progress</h3>
      
      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">{overallStats.overallCompletionPercentage}%</div>
          <div className="text-sm text-text-secondary">Overall Progress</div>
          <div className="text-xs text-text-secondary mt-1">
            {overallStats.totalCompletedDrills} / {overallStats.totalDrills} drills
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{overallStats.overallMasteryPercentage}%</div>
          <div className="text-sm text-text-secondary">Mastery Level</div>
          <div className="text-xs text-text-secondary mt-1">
            {overallStats.totalMasteredDrills} drills mastered
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{overallStats.completedChapters}</div>
          <div className="text-sm text-text-secondary">Chapters Done</div>
          <div className="text-xs text-text-secondary mt-1">
            of {overallStats.totalChapters} chapters
          </div>
        </div>
        
        <div className="bg-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{overallStats.masteredChapters}</div>
          <div className="text-sm text-text-secondary">Mastered</div>
          <div className="text-xs text-text-secondary mt-1">
            chapters complete
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      {overallStats.overallCompletionPercentage > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-text-primary mb-3">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {overallStats.overallCompletionPercentage >= 10 && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">🚀 Getting Started</span>
            )}
            {overallStats.overallCompletionPercentage >= 25 && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">📚 Quarter Master</span>
            )}
            {overallStats.overallCompletionPercentage >= 50 && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">⚡ Halfway Hero</span>
            )}
            {overallStats.overallCompletionPercentage >= 75 && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">🎯 Expert Typist</span>
            )}
            {overallStats.overallCompletionPercentage >= 90 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">👑 Near Mastery</span>
            )}
            {overallStats.isFullyCompleted && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm">🏆 CURRICULUM COMPLETE</span>
            )}
            {overallStats.isFullyMastered && (
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
