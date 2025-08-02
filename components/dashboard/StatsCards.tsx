import { memo, useMemo } from 'react';
import type { DrillPerformance } from '../../types';

interface StatsCardsProps {
    performanceEntries: DrillPerformance[];
}

const StatCard = memo(({ 
    label, 
    value, 
    unit, 
    subtitle, 
    trend, 
    icon 
}: { 
    label: string; 
    value: string | number; 
    unit?: string; 
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: string;
}) => (
    <div className="bg-secondary p-4 rounded-lg shadow-sm border border-border-primary hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3">
            {icon && <span className="text-2xl">{icon}</span>}
            {trend && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                    trend === 'up' ? 'bg-success/20 text-success' : 
                    trend === 'down' ? 'bg-danger/20 text-danger' : 
                    'bg-border-primary text-text-secondary'
                }`}>
                    {trend === 'up' ? '↗️ Up' : trend === 'down' ? '↘️ Down' : '→ Stable'}
                </span>
            )}
        </div>
        <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                {value}{unit}
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">{label}</div>
            {subtitle && <div className="text-xs text-text-secondary">{subtitle}</div>}
        </div>
    </div>
));

StatCard.displayName = 'StatCard';

const StatsCards = memo(({ performanceEntries }: StatsCardsProps) => {
    // Memoize all calculations to prevent recalculation on every render
    const stats = useMemo(() => {
        const totalEntries = performanceEntries.length;
        
        if (totalEntries === 0) {
            return {
                avgWpm: 0,
                avgAccuracy: 0,
                bestWpm: 0,
                bestAccuracy: 0,
                totalEntries: 0,
                wpmTrend: 'neutral' as const,
                accuracyTrend: 'neutral' as const,
                sessionsPerDay: '0',
                lastWpm: 0
            };
        }
        
        const avgWpm = Math.round(performanceEntries.reduce((sum, p) => sum + p.wpm, 0) / totalEntries);
        const avgAccuracy = Math.round(performanceEntries.reduce((sum, p) => sum + p.accuracy, 0) / totalEntries);
        const bestWpm = Math.max(...performanceEntries.map(p => p.wpm));
        const bestAccuracy = Math.max(...performanceEntries.map(p => p.accuracy));

        // Calculate trends (compare last 10 sessions with previous 10)
        const sortedSessions = [...performanceEntries].sort((a, b) => b.timestamp - a.timestamp);
        const recentSessions = sortedSessions.slice(0, Math.min(10, totalEntries));
        const olderSessions = sortedSessions.slice(10, Math.min(20, totalEntries));

        const getWpmTrend = () => {
            if (olderSessions.length === 0) return 'neutral' as const;
            const recentAvg = recentSessions.reduce((sum, p) => sum + p.wpm, 0) / recentSessions.length;
            const olderAvg = olderSessions.reduce((sum, p) => sum + p.wpm, 0) / olderSessions.length;
            const diff = recentAvg - olderAvg;
            return diff > 2 ? 'up' as const : diff < -2 ? 'down' as const : 'neutral' as const;
        };

        const getAccuracyTrend = () => {
            if (olderSessions.length === 0) return 'neutral' as const;
            const recentAvg = recentSessions.reduce((sum, p) => sum + p.accuracy, 0) / recentSessions.length;
            const olderAvg = olderSessions.reduce((sum, p) => sum + p.accuracy, 0) / olderSessions.length;
            const diff = recentAvg - olderAvg;
            return diff > 2 ? 'up' as const : diff < -2 ? 'down' as const : 'neutral' as const;
        };

        // Calculate time-based stats
        const timestamps = performanceEntries.map(p => p.timestamp);
        const timeSpan = totalEntries > 1 ? 
            Math.ceil((Math.max(...timestamps) - Math.min(...timestamps)) / (1000 * 60 * 60 * 24)) : 1;
        const sessionsPerDay = (totalEntries / Math.max(timeSpan, 1)).toFixed(1);

        return {
            avgWpm,
            avgAccuracy,
            bestWpm,
            bestAccuracy,
            totalEntries,
            wpmTrend: getWpmTrend(),
            accuracyTrend: getAccuracyTrend(),
            sessionsPerDay,
            lastWpm: recentSessions[0]?.wpm || 0
        };
    }, [performanceEntries]);

    if (stats.totalEntries === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Average WPM" value={0} icon="⚡" />
                <StatCard label="Average Accuracy" value="0%" icon="🎯" />
                <StatCard label="Personal Best" value={0} unit=" WPM" icon="🏆" />
                <StatCard label="Total Sessions" value={0} icon="📝" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
                label="Average WPM" 
                value={stats.avgWpm} 
                icon="⚡"
                trend={stats.wpmTrend}
                subtitle={stats.lastWpm > 0 ? `Last: ${stats.lastWpm} WPM` : undefined}
            />
            <StatCard 
                label="Accuracy" 
                value={`${stats.avgAccuracy}%`} 
                icon="🎯"
                trend={stats.accuracyTrend}
                subtitle={`Best: ${stats.bestAccuracy}%`}
            />
            <StatCard 
                label="Personal Best" 
                value={stats.bestWpm} 
                unit=" WPM" 
                icon="🏆"
                subtitle="Top speed"
            />
            <StatCard 
                label="Total Sessions" 
                value={stats.totalEntries} 
                icon="📝"
                subtitle={`${stats.sessionsPerDay}/day avg`}
            />
        </div>
    );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
