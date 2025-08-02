import type { Progress } from '../../types';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress?: number;
    requirement?: number;
}

interface AchievementsProps {
    progress: Progress;
}

const Achievements = ({ progress }: AchievementsProps) => {
    const performanceEntries = Object.values(progress);
    const totalDrills = performanceEntries.length;
    const masteredDrills = performanceEntries.filter(p => p.tier === 'mastered').length;
    const proficientDrills = performanceEntries.filter(p => p.tier === 'proficient').length;
    const bestWpm = totalDrills > 0 ? Math.max(...performanceEntries.map(p => p.wpm)) : 0;
    const avgAccuracy = totalDrills > 0 
        ? Math.round(performanceEntries.reduce((sum, p) => sum + p.accuracy, 0) / totalDrills)
        : 0;
    
    // Count consecutive days of practice
    const practiceDays = new Set(
        performanceEntries.map(p => new Date(p.timestamp).toDateString())
    ).size;

    // Check for perfect accuracy sessions
    const perfectSessions = performanceEntries.filter(p => p.accuracy === 100).length;

    const achievements: Achievement[] = [
        {
            id: 'first-drill',
            name: 'First Steps',
            description: 'Complete your first typing drill',
            icon: '🎯',
            unlocked: totalDrills >= 1
        },
        {
            id: 'speed-demon-30',
            name: 'Speed Demon I',
            description: 'Reach 30 WPM',
            icon: '⚡',
            unlocked: bestWpm >= 30,
            progress: Math.min(bestWpm, 30),
            requirement: 30
        },
        {
            id: 'speed-demon-50',
            name: 'Speed Demon II',
            description: 'Reach 50 WPM',
            icon: '🚀',
            unlocked: bestWpm >= 50,
            progress: Math.min(bestWpm, 50),
            requirement: 50
        },
        {
            id: 'speed-demon-70',
            name: 'Speed Demon III',
            description: 'Reach 70 WPM',
            icon: '🏎️',
            unlocked: bestWpm >= 70,
            progress: Math.min(bestWpm, 70),
            requirement: 70
        },
        {
            id: 'accuracy-master',
            name: 'Accuracy Master',
            description: 'Maintain 95% average accuracy',
            icon: '🎯',
            unlocked: avgAccuracy >= 95,
            progress: Math.min(avgAccuracy, 95),
            requirement: 95
        },
        {
            id: 'perfectionist',
            name: 'Perfectionist',
            description: 'Achieve 100% accuracy in 5 sessions',
            icon: '💎',
            unlocked: perfectSessions >= 5,
            progress: Math.min(perfectSessions, 5),
            requirement: 5
        },
        {
            id: 'marathon-runner',
            name: 'Marathon Runner',
            description: 'Complete 100 drills',
            icon: '🏃‍♂️',
            unlocked: totalDrills >= 100,
            progress: Math.min(totalDrills, 100),
            requirement: 100
        },
        {
            id: 'master-student',
            name: 'Master Student',
            description: 'Master 20 drills',
            icon: '🏆',
            unlocked: masteredDrills >= 20,
            progress: Math.min(masteredDrills, 20),
            requirement: 20
        },
        {
            id: 'dedicated-learner',
            name: 'Dedicated Learner',
            description: 'Practice for 7 different days',
            icon: '📅',
            unlocked: practiceDays >= 7,
            progress: Math.min(practiceDays, 7),
            requirement: 7
        },
        {
            id: 'consistency-king',
            name: 'Consistency King',
            description: 'Have 50+ proficient or mastered drills',
            icon: '👑',
            unlocked: (masteredDrills + proficientDrills) >= 50,
            progress: Math.min(masteredDrills + proficientDrills, 50),
            requirement: 50
        }
    ];

    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const progressAchievements = achievements.filter(a => !a.unlocked && a.progress !== undefined);

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
                Achievements ({unlockedAchievements.length}/{achievements.length})
            </h3>
            
            {unlockedAchievements.length === 0 ? (
                <p className="text-text-secondary">Start typing to unlock achievements!</p>
            ) : (
                <div className="space-y-4">
                    {/* Unlocked Achievements */}
                    <div>
                        <h4 className="text-lg font-medium text-accent mb-3">Unlocked</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {unlockedAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-md"
                                >
                                    <span className="text-2xl">{achievement.icon}</span>
                                    <div>
                                        <p className="font-medium text-green-400">{achievement.name}</p>
                                        <p className="text-xs text-text-secondary">{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* In Progress Achievements */}
                    {progressAchievements.length > 0 && (
                        <div>
                            <h4 className="text-lg font-medium text-accent mb-3">In Progress</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {progressAchievements.slice(0, 4).map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="flex items-center space-x-3 p-3 bg-tertiary rounded-md"
                                    >
                                        <span className="text-2xl opacity-50">{achievement.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-text-primary">{achievement.name}</p>
                                            <p className="text-xs text-text-secondary mb-1">{achievement.description}</p>
                                            <div className="w-full bg-tertiary rounded-full h-2">
                                                <div
                                                    className="bg-accent h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${((achievement.progress || 0) / (achievement.requirement || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs text-text-secondary mt-1">
                                                {achievement.progress || 0}/{achievement.requirement}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Achievements;
