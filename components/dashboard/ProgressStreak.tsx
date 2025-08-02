import type { Progress } from '../../types';

interface ProgressStreakProps {
    progress: Progress;
}

const ProgressStreak = ({ progress }: ProgressStreakProps) => {
    const performanceEntries = Object.values(progress);
    
    // Calculate daily progress
    const dailyProgress = performanceEntries.reduce((acc, performance) => {
        const date = new Date(performance.timestamp).toDateString();
        if (!acc[date]) {
            acc[date] = {
                date,
                sessions: 0,
                totalWpm: 0,
                totalAccuracy: 0,
                masteredCount: 0,
                proficientCount: 0
            };
        }
        acc[date].sessions++;
        acc[date].totalWpm += performance.wpm;
        acc[date].totalAccuracy += performance.accuracy;
        if (performance.tier === 'mastered') acc[date].masteredCount++;
        if (performance.tier === 'proficient') acc[date].proficientCount++;
        return acc;
    }, {} as Record<string, any>);

    const sortedDays = Object.values(dailyProgress).sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate current streak
    const calculateStreak = () => {
        let streak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        
        // Check if user practiced today or yesterday (to be lenient)
        const hasRecentActivity = dailyProgress[today] || dailyProgress[yesterday];
        if (!hasRecentActivity) return 0;

        // Count consecutive days backwards
        for (let i = 0; i < 30; i++) { // Check last 30 days max
            const checkDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toDateString();
            if (dailyProgress[checkDate]) {
                streak++;
            } else if (i > 1) { // Allow one day gap for flexibility
                break;
            }
        }
        return streak;
    };

    const currentStreak = calculateStreak();
    const totalDays = Object.keys(dailyProgress).length;
    const avgSessionsPerDay = totalDays > 0 ? (performanceEntries.length / totalDays).toFixed(1) : '0';

    // Get last 7 days for mini calendar view
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateString = date.toDateString();
        const dayData = dailyProgress[dateString];
        return {
            date,
            hasActivity: !!dayData,
            sessions: dayData?.sessions || 0,
            quality: dayData ? (dayData.masteredCount + dayData.proficientCount) / dayData.sessions : 0
        };
    }).reverse();

    const getActivityColor = (day: any) => {
        if (!day.hasActivity) return 'bg-gray-700';
        if (day.quality >= 0.8) return 'bg-green-500';
        if (day.quality >= 0.5) return 'bg-blue-500';
        if (day.quality >= 0.2) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getStreakMessage = () => {
        if (currentStreak === 0) return "Start your streak today!";
        if (currentStreak === 1) return "Great start! Keep it up!";
        if (currentStreak < 7) return "Building momentum!";
        if (currentStreak < 30) return "You're on fire! 🔥";
        return "Incredible dedication! 🏆";
    };

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Progress Streak</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Streak Stats */}
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">
                            {currentStreak}
                        </div>
                        <p className="text-text-secondary">Day Streak</p>
                        <p className="text-sm text-accent mt-1">{getStreakMessage()}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-text-primary">{totalDays}</div>
                            <p className="text-xs text-text-secondary">Total Days</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-text-primary">{avgSessionsPerDay}</div>
                            <p className="text-xs text-text-secondary">Avg Sessions/Day</p>
                        </div>
                    </div>
                </div>

                {/* Weekly Activity */}
                <div>
                    <h4 className="text-lg font-medium text-text-primary mb-3">Last 7 Days</h4>
                    <div className="grid grid-cols-7 gap-1 mb-3">
                        {last7Days.map((day, index) => (
                            <div key={index} className="text-center">
                                <div className="text-xs text-text-secondary mb-1">
                                    {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div
                                    className={`w-8 h-8 rounded ${getActivityColor(day)} flex items-center justify-center text-xs font-medium text-white mx-auto`}
                                    title={`${day.date.toLocaleDateString()}: ${day.sessions} sessions`}
                                >
                                    {day.sessions > 0 ? day.sessions : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-xs text-text-secondary">
                        <div className="flex items-center justify-between mb-1">
                            <span>Activity Level:</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span>Less</span>
                            <div className="flex space-x-1">
                                <div className="w-3 h-3 bg-gray-700 rounded"></div>
                                <div className="w-3 h-3 bg-red-500 rounded"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Daily Stats */}
            {sortedDays.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-lg font-medium text-text-primary mb-3">Recent Daily Stats</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {sortedDays.slice(0, 5).map((day: any, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-tertiary rounded">
                                <span className="text-sm text-text-primary">
                                    {new Date(day.date).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </span>
                                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                                    <span>{day.sessions} sessions</span>
                                    <span>{Math.round(day.totalWpm / day.sessions)} avg WPM</span>
                                    <span>{Math.round(day.totalAccuracy / day.sessions)}% avg acc</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressStreak;
