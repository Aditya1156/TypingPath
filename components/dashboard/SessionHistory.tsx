import { useState } from 'react';
import type { Progress } from '../../types';

interface SessionHistoryProps {
    progress: Progress;
    onSelectDrill: (lesson: any, drillIndex: number) => void;
}

const SessionHistory = ({ progress, onSelectDrill }: SessionHistoryProps) => {
    const [sortBy, setSortBy] = useState<'date' | 'wpm' | 'accuracy'>('date');
    const [filterTier, setFilterTier] = useState<'all' | 'mastered' | 'proficient' | 'needs-practice'>('all');

    // Process progress entries into session history
    const sessions = Object.entries(progress)
        .map(([key, performance]) => {
            const [lessonId, drillIndexStr] = key.split('-');
            const drillIndex = parseInt(drillIndexStr) || 0;
            return {
                key,
                lessonId,
                drillIndex,
                ...performance,
                date: new Date(performance.timestamp)
            };
        })
        .filter(session => filterTier === 'all' || session.tier === filterTier)
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return b.timestamp - a.timestamp;
                case 'wpm':
                    return b.wpm - a.wpm;
                case 'accuracy':
                    return b.accuracy - a.accuracy;
                default:
                    return b.timestamp - a.timestamp;
            }
        });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'mastered': return 'text-green-400 bg-green-900/20';
            case 'proficient': return 'text-blue-400 bg-blue-900/20';
            case 'needs-practice': return 'text-yellow-400 bg-yellow-900/20';
            default: return 'text-text-secondary bg-tertiary';
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

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
                    Session History ({sessions.length} sessions)
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'wpm' | 'accuracy')}
                        className="px-3 py-2 bg-tertiary text-text-primary rounded-md border border-tertiary focus:border-accent focus:outline-none"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="wpm">Sort by WPM</option>
                        <option value="accuracy">Sort by Accuracy</option>
                    </select>
                    
                    <select
                        value={filterTier}
                        onChange={(e) => setFilterTier(e.target.value as 'all' | 'mastered' | 'proficient' | 'needs-practice')}
                        className="px-3 py-2 bg-tertiary text-text-primary rounded-md border border-tertiary focus:border-accent focus:outline-none"
                    >
                        <option value="all">All Tiers</option>
                        <option value="mastered">Mastered</option>
                        <option value="proficient">Proficient</option>
                        <option value="needs-practice">Needs Practice</option>
                    </select>
                </div>
            </div>

            {sessions.length === 0 ? (
                <p className="text-text-secondary text-center py-8">
                    {filterTier === 'all' 
                        ? 'No sessions recorded yet. Start typing to see your history!' 
                        : `No sessions found for ${filterTier.replace('-', ' ')} tier.`
                    }
                </p>
            ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {sessions.map((session) => (
                        <div
                            key={session.key}
                            className="flex items-center justify-between p-3 bg-tertiary rounded-md hover:bg-tertiary/80 transition-colors cursor-pointer"
                            onClick={() => {
                                const mockLesson = { 
                                    id: session.lessonId, 
                                    name: `Lesson ${session.lessonId}`, 
                                    texts: [] 
                                };
                                onSelectDrill(mockLesson, session.drillIndex);
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">{getTierIcon(session.tier)}</span>
                                <div>
                                    <p className="font-medium text-text-primary">
                                        Lesson {session.lessonId} - Drill {session.drillIndex + 1}
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        {formatDate(session.date)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-text-primary">
                                        {session.wpm} WPM
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        {session.accuracy}% accuracy
                                    </p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(session.tier)}`}>
                                    {session.tier.charAt(0).toUpperCase() + session.tier.slice(1).replace('-', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionHistory;
