import { useMemo } from 'react';
import type { Progress, Lesson } from '../../types';
import { chapters } from '../../data/lessons';
import ProgressTick from '../ProgressTick';

interface ProblemAreasProps {
    progress: Progress;
    onSelectDrill: (lesson: Lesson, drillIndex: number) => void;
}

const ProblemAreas = ({ progress, onSelectDrill }: ProblemAreasProps) => {
    const problemDrills = useMemo(() => {
        const tierOrder = { 'needs-practice': 1, 'proficient': 2, 'mastered': 3 };
        
        return Object.entries(progress)
            .map(([drillId, performance]) => {
                const [lessonId, drillIndexStr] = drillId.split('-').slice(1).join('-').match(/^([\d-]+)-(\d+)$/)?.slice(1) || [];
                const drillIndex = parseInt(drillIndexStr, 10);
                
                let lesson: Lesson | undefined;
                for (const chapter of chapters) {
                    const found = chapter.lessons.find(l => l.id === `${chapter.id.split('-')[1]}-${lessonId}`);
                    if (found) {
                        lesson = found;
                        break;
                    }
                }

                if (!lesson || isNaN(drillIndex)) return null;

                return {
                    lesson,
                    drillIndex,
                    performance
                };
            })
            .filter(item => item !== null && item.performance.tier !== 'mastered')
            .sort((a, b) => {
                // Sort by tier first (needs-practice > proficient)
                const tierDiff = tierOrder[a!.performance.tier] - tierOrder[b!.performance.tier];
                if (tierDiff !== 0) return tierDiff;
                // Then sort by WPM (lower is worse)
                return a!.performance.wpm - b!.performance.wpm;
            })
            .slice(0, 5); // Show top 5 problem areas

    }, [progress]);

    if (problemDrills.length === 0) {
        return null; // Don't show the component if there are no problem areas (or everything is mastered)
    }

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-4">Practice Your Weak Spots</h3>
            <p className="text-sm text-text-secondary mb-4">Here are a few drills where you could improve. Click one to practice!</p>
            <div className="space-y-3">
                {problemDrills.filter(drill => drill !== null).map((drill, index) => {
                    const { lesson, drillIndex, performance } = drill!;
                    return (
                        <button
                            key={index}
                            onClick={() => onSelectDrill(lesson!, drillIndex)}
                            className="w-full flex items-center justify-between gap-4 p-4 bg-tertiary rounded-md hover:bg-border-primary transition-colors text-left"
                        >
                            <div className="flex-grow">
                                <p className="font-semibold text-text-primary">{lesson!.name}</p>
                                <p className="text-xs text-text-secondary">Drill {drillIndex + 1}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="font-semibold text-text-secondary">{performance.wpm} WPM / {performance.accuracy}%</span>
                                <ProgressTick tier={performance.tier} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProblemAreas;
