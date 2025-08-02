import type { Progress } from '../../types';

interface RecentActivityProps {
    progress: Progress;
    onSelectDrill: (lesson: any, drillIndex: number) => void;
}

const RecentActivity = ({ progress, onSelectDrill }: RecentActivityProps) => {
    // Get the 5 most recent activities from progress entries
    const recentActivities = Object.entries(progress)
        .map(([key, performance]) => {
            // Parse the key to extract lesson info (assuming format like "lessonId-drillIndex")
            const [lessonId, drillIndexStr] = key.split('-');
            const drillIndex = parseInt(drillIndexStr) || 0;
            return {
                key,
                lessonId,
                drillIndex,
                ...performance
            };
        })
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

    const formatTimeAgo = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'mastered': return 'text-green-400';
            case 'proficient': return 'text-blue-400';
            case 'needs-practice': return 'text-yellow-400';
            default: return 'text-text-secondary';
        }
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case 'mastered': return '🏆';
            case 'proficient': return '✅';
            case 'needs-practice': return '📈';
            default: return '📝';
        }
    };

    if (recentActivities.length === 0) {
        return (
            <div className="bg-secondary p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h3>
                <p className="text-text-secondary">No recent activity. Start typing to see your progress!</p>
            </div>
        );
    }

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h3>
            <div className="space-y-3">
                {recentActivities.map((activity) => (
                    <div 
                        key={activity.key}
                        className="flex items-center justify-between p-3 bg-tertiary rounded-md hover:bg-tertiary/80 transition-colors cursor-pointer"
                        onClick={() => {
                            // Create a mock lesson object for the callback
                            const mockLesson = { id: activity.lessonId, name: `Lesson ${activity.lessonId}`, texts: [] };
                            onSelectDrill(mockLesson, activity.drillIndex);
                        }}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTierIcon(activity.tier)}</span>
                            <div>
                                <p className="font-medium text-text-primary">
                                    Lesson {activity.lessonId} - Drill {activity.drillIndex + 1}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    {activity.wpm} WPM • {activity.accuracy}% accuracy
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-medium ${getTierColor(activity.tier)}`}>
                                {activity.tier.charAt(0).toUpperCase() + activity.tier.slice(1).replace('-', ' ')}
                            </p>
                            <p className="text-xs text-text-secondary">
                                {formatTimeAgo(activity.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
