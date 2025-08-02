import { useState } from 'react';
import type { Progress } from '../../types';

interface LeaderboardProps {
    progress: Progress;
}

const Leaderboard = ({ progress }: LeaderboardProps) => {
    const performanceEntries = Object.entries(progress).map(([key, performance]) => {
        const [lessonId, drillIndexStr] = key.split('-');
        const drillIndex = parseInt(drillIndexStr) || 0;
        return {
            key,
            lessonId,
            drillIndex,
            ...performance
        };
    });

    // Create different leaderboards
    const leaderboards = {
        wpm: performanceEntries
            .sort((a, b) => b.wpm - a.wpm)
            .slice(0, 10),
        accuracy: performanceEntries
            .sort((a, b) => b.accuracy - a.accuracy)
            .slice(0, 10),
        recent: performanceEntries
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10),
        mastered: performanceEntries
            .filter(p => p.tier === 'mastered')
            .sort((a, b) => b.wpm - a.wpm)
            .slice(0, 10)
    };

    const [activeBoard, setActiveBoard] = useState<keyof typeof leaderboards>('wpm');

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getMedalIcon = (position: number) => {
        switch (position) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return `#${position + 1}`;
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

    const LeaderboardEntry = ({ entry, index, showWpm = true, showAccuracy = true, showDate = false }: any) => (
        <div className="flex items-center justify-between p-3 bg-tertiary rounded-md hover:bg-tertiary/80 transition-colors">
            <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-accent min-w-[2rem]">
                    {getMedalIcon(index)}
                </span>
                <div>
                    <p className="font-medium text-text-primary">
                        Lesson {entry.lessonId} - Drill {entry.drillIndex + 1}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <span>{getTierIcon(entry.tier)}</span>
                        {showDate && <span>{formatDate(entry.timestamp)}</span>}
                    </div>
                </div>
            </div>
            <div className="text-right">
                {showWpm && (
                    <p className="font-medium text-text-primary">{entry.wpm} WPM</p>
                )}
                {showAccuracy && (
                    <p className="text-sm text-text-secondary">{entry.accuracy}% accuracy</p>
                )}
            </div>
        </div>
    );

    const boardConfigs = {
        wpm: { 
            title: 'Fastest Speeds', 
            description: 'Your top WPM achievements',
            showWpm: true,
            showAccuracy: true,
            showDate: false
        },
        accuracy: { 
            title: 'Most Accurate', 
            description: 'Your most precise sessions',
            showWpm: true,
            showAccuracy: true,
            showDate: false
        },
        recent: { 
            title: 'Recent Sessions', 
            description: 'Your latest typing activity',
            showWpm: true,
            showAccuracy: true,
            showDate: true
        },
        mastered: { 
            title: 'Mastered Drills', 
            description: 'Your best mastered performances',
            showWpm: true,
            showAccuracy: true,
            showDate: false
        }
    };

    const currentBoard = leaderboards[activeBoard as keyof typeof leaderboards];
    const currentConfig = boardConfigs[activeBoard as keyof typeof boardConfigs];

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Personal Leaderboards</h3>
            
            {performanceEntries.length === 0 ? (
                <p className="text-text-secondary text-center py-8">
                    Complete some drills to see your personal leaderboards!
                </p>
            ) : (
                <div className="space-y-6">
                    {/* Board Selector */}
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(boardConfigs).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setActiveBoard(key as keyof typeof leaderboards)}
                                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                                    activeBoard === key
                                        ? 'bg-accent text-white'
                                        : 'bg-tertiary text-text-secondary hover:bg-tertiary/80 hover:text-text-primary'
                                }`}
                            >
                                {config.title}
                            </button>
                        ))}
                    </div>

                    {/* Board Header */}
                    <div className="text-center">
                        <h4 className="text-lg font-medium text-text-primary">{currentConfig.title}</h4>
                        <p className="text-sm text-text-secondary">{currentConfig.description}</p>
                    </div>

                    {/* Board Content */}
                    {currentBoard.length === 0 ? (
                        <p className="text-text-secondary text-center py-4">
                            No entries for this category yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {currentBoard.map((entry: any, index: number) => (
                                <LeaderboardEntry
                                    key={entry.key}
                                    entry={entry}
                                    index={index}
                                    showWpm={currentConfig.showWpm}
                                    showAccuracy={currentConfig.showAccuracy}
                                    showDate={currentConfig.showDate}
                                />
                            ))}
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-tertiary">
                        <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                                {performanceEntries.length}
                            </div>
                            <p className="text-xs text-text-secondary">Total Entries</p>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                                {leaderboards.mastered.length}
                            </div>
                            <p className="text-xs text-text-secondary">Mastered</p>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                                {Math.max(...performanceEntries.map(p => p.wpm), 0)}
                            </div>
                            <p className="text-xs text-text-secondary">Best WPM</p>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                                {Math.max(...performanceEntries.map(p => p.accuracy), 0)}%
                            </div>
                            <p className="text-xs text-text-secondary">Best Accuracy</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
