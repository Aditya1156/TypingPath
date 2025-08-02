import type { Progress } from '../../types';

interface PersonalBestsProps {
    progress: Progress;
    onSelectDrill: (lesson: any, drillIndex: number) => void;
}

const PersonalBests = ({ progress, onSelectDrill }: PersonalBestsProps) => {
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

    // Calculate various personal bests
    const bests = {
        wpm: {
            value: Math.max(...performanceEntries.map(p => p.wpm), 0),
            session: performanceEntries.find(p => p.wpm === Math.max(...performanceEntries.map(s => s.wpm)))
        },
        accuracy: {
            value: Math.max(...performanceEntries.map(p => p.accuracy), 0),
            session: performanceEntries.find(p => p.accuracy === Math.max(...performanceEntries.map(s => s.accuracy)))
        },
        masteredInDay: {
            value: 0,
            date: '',
            sessions: [] as any[]
        },
        perfectAccuracy: {
            count: performanceEntries.filter(p => p.accuracy === 100).length,
            sessions: performanceEntries.filter(p => p.accuracy === 100).slice(0, 3)
        },
        consistentWpm: {
            value: 0,
            sessions: [] as any[]
        }
    };

    // Calculate most mastered drills in a single day
    const dailyMastered = performanceEntries
        .filter(p => p.tier === 'mastered')
        .reduce((acc, performance) => {
            const date = new Date(performance.timestamp).toDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(performance);
            return acc;
        }, {} as Record<string, any[]>);

    const bestDay = Object.entries(dailyMastered)
        .reduce((best, [date, sessions]) => {
            if (sessions.length > best.value) {
                return { value: sessions.length, date, sessions };
            }
            return best;
        }, bests.masteredInDay);

    bests.masteredInDay = bestDay;

    // Find most consistent WPM (sessions within 5 WPM of each other)
    const wpmRanges = performanceEntries
        .sort((a, b) => b.wpm - a.wpm)
        .reduce((ranges, session) => {
            let foundRange = false;
            for (const range of ranges) {
                if (Math.abs(range.avgWpm - session.wpm) <= 5) {
                    range.sessions.push(session);
                    range.avgWpm = range.sessions.reduce((sum: number, s: any) => sum + s.wpm, 0) / range.sessions.length;
                    foundRange = true;
                    break;
                }
            }
            if (!foundRange) {
                ranges.push({
                    avgWpm: session.wpm,
                    sessions: [session]
                });
            }
            return ranges;
        }, [] as any[]);

    const mostConsistent = wpmRanges
        .filter(range => range.sessions.length >= 3)
        .sort((a, b) => b.sessions.length - a.sessions.length)[0];

    if (mostConsistent) {
        bests.consistentWpm = {
            value: Math.round(mostConsistent.avgWpm),
            sessions: mostConsistent.sessions.slice(0, 3)
        };
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const BestCard = ({ title, value, unit, description, session, onClick }: any) => (
        <div 
            className={`bg-tertiary p-4 rounded-lg ${onClick ? 'cursor-pointer hover:bg-tertiary/80 transition-colors' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-text-primary">{title}</h4>
                <span className="text-2xl font-bold text-accent">{value}{unit}</span>
            </div>
            <p className="text-sm text-text-secondary mb-2">{description}</p>
            {session && (
                <p className="text-xs text-text-secondary">
                    Lesson {session.lessonId} - Drill {session.drillIndex + 1} • {formatDate(session.timestamp)}
                </p>
            )}
        </div>
    );

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Personal Bests</h3>
            
            {performanceEntries.length === 0 ? (
                <p className="text-text-secondary text-center py-8">
                    Complete some drills to see your personal bests!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BestCard
                        title="Fastest WPM"
                        value={bests.wpm.value}
                        unit=" WPM"
                        description="Your highest words per minute"
                        session={bests.wpm.session}
                        onClick={bests.wpm.session ? () => {
                            const session = bests.wpm.session!;
                            const mockLesson = { id: session.lessonId, name: `Lesson ${session.lessonId}`, texts: [] };
                            onSelectDrill(mockLesson, session.drillIndex);
                        } : null}
                    />

                    <BestCard
                        title="Best Accuracy"
                        value={bests.accuracy.value}
                        unit="%"
                        description="Your highest accuracy score"
                        session={bests.accuracy.session}
                        onClick={bests.accuracy.session ? () => {
                            const session = bests.accuracy.session!;
                            const mockLesson = { id: session.lessonId, name: `Lesson ${session.lessonId}`, texts: [] };
                            onSelectDrill(mockLesson, session.drillIndex);
                        } : null}
                    />

                    <BestCard
                        title="Perfect Sessions"
                        value={bests.perfectAccuracy.count}
                        unit=""
                        description="Sessions with 100% accuracy"
                        session={null}
                    />

                    {bests.masteredInDay.value > 0 && (
                        <BestCard
                            title="Best Day"
                            value={bests.masteredInDay.value}
                            unit=" mastered"
                            description={`Most drills mastered in one day (${new Date(bests.masteredInDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`}
                            session={null}
                        />
                    )}

                    {bests.consistentWpm.value > 0 && (
                        <BestCard
                            title="Consistency"
                            value={bests.consistentWpm.value}
                            unit=" WPM"
                            description={`Most consistent speed (${bests.consistentWpm.sessions.length} similar sessions)`}
                            session={null}
                        />
                    )}
                </div>
            )}

            {/* Recent Perfect Accuracy Sessions */}
            {bests.perfectAccuracy.sessions.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-lg font-medium text-text-primary mb-3">
                        Recent Perfect Sessions ({bests.perfectAccuracy.count} total)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {bests.perfectAccuracy.sessions.map((session: any) => (
                            <div
                                key={session.key}
                                className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-md cursor-pointer hover:bg-green-900/30 transition-colors"
                                onClick={() => {
                                    const mockLesson = { id: session.lessonId, name: `Lesson ${session.lessonId}`, texts: [] };
                                    onSelectDrill(mockLesson, session.drillIndex);
                                }}
                            >
                                <div>
                                    <p className="font-medium text-green-400">💎 Perfect!</p>
                                    <p className="text-xs text-text-secondary">
                                        Lesson {session.lessonId} - Drill {session.drillIndex + 1}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-text-primary">{session.wpm} WPM</p>
                                    <p className="text-xs text-text-secondary">{formatDate(session.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalBests;
