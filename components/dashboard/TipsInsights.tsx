import type { Progress } from '../../types';

interface TipsInsightsProps {
    progress: Progress;
}

const TipsInsights = ({ progress }: TipsInsightsProps) => {
    const performanceEntries = Object.values(progress);
    
    const generateInsights = () => {
        if (performanceEntries.length === 0) {
            return [
                {
                    type: 'tip',
                    icon: '💡',
                    title: 'Welcome to TypingPath!',
                    message: 'Start with the home row keys (asdf jkl;) to build a strong foundation for touch typing.'
                },
                {
                    type: 'tip',
                    icon: '🎯',
                    title: 'Focus on Accuracy First',
                    message: 'It\'s better to type slowly and accurately than fast and with errors. Speed will come naturally.'
                }
            ];
        }

        const insights = [];
        const totalSessions = performanceEntries.length;
        const avgWpm = performanceEntries.reduce((sum, p) => sum + p.wpm, 0) / totalSessions;
        const avgAccuracy = performanceEntries.reduce((sum, p) => sum + p.accuracy, 0) / totalSessions;
        const masteredCount = performanceEntries.filter(p => p.tier === 'mastered').length;
        const needsPracticeCount = performanceEntries.filter(p => p.tier === 'needs-practice').length;
        
        // Recent performance analysis
        const recentSessions = performanceEntries
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, Math.min(5, totalSessions));
        
        const recentAvgWpm = recentSessions.reduce((sum, p) => sum + p.wpm, 0) / recentSessions.length;
        const recentAvgAccuracy = recentSessions.reduce((sum, p) => sum + p.accuracy, 0) / recentSessions.length;

        // Accuracy insights
        if (avgAccuracy < 85) {
            insights.push({
                type: 'suggestion',
                icon: '🎯',
                title: 'Focus on Accuracy',
                message: 'Your accuracy could use some work. Try slowing down and focusing on hitting the right keys. Accuracy is more important than speed!'
            });
        } else if (avgAccuracy > 95) {
            insights.push({
                type: 'praise',
                icon: '🏆',
                title: 'Excellent Accuracy!',
                message: 'Your accuracy is outstanding! You can now focus on gradually increasing your typing speed.'
            });
        }

        // Speed insights
        if (avgWpm < 30) {
            insights.push({
                type: 'tip',
                icon: '⚡',
                title: 'Building Speed',
                message: 'Practice regularly to build muscle memory. Try to maintain a steady rhythm rather than rushing through difficult parts.'
            });
        } else if (avgWpm > 60) {
            insights.push({
                type: 'praise',
                icon: '🚀',
                title: 'Great Speed!',
                message: 'You\'re typing faster than the average person! Keep practicing to maintain consistency across all key combinations.'
            });
        }

        // Progress insights
        if (recentAvgWpm > avgWpm + 5) {
            insights.push({
                type: 'praise',
                icon: '📈',
                title: 'Improving Speed!',
                message: 'Your recent sessions show great improvement in speed. Keep up the excellent work!'
            });
        }

        if (recentAvgAccuracy > avgAccuracy + 3) {
            insights.push({
                type: 'praise',
                icon: '🎯',
                title: 'Accuracy Improving!',
                message: 'Your recent accuracy has improved significantly. Great attention to detail!'
            });
        }

        // Practice patterns
        if (needsPracticeCount > masteredCount * 2) {
            insights.push({
                type: 'suggestion',
                icon: '📚',
                title: 'Focus on Weak Areas',
                message: 'You have several drills that need practice. Consider revisiting these to strengthen your foundation.'
            });
        }

        // Consistency insights
        const wpmVariance = performanceEntries.reduce((sum, p) => sum + Math.pow(p.wpm - avgWpm, 2), 0) / totalSessions;
        if (wpmVariance > 100) {
            insights.push({
                type: 'tip',
                icon: '🎖️',
                title: 'Work on Consistency',
                message: 'Your speed varies quite a bit between sessions. Try to maintain steady practice habits for more consistent results.'
            });
        }

        // Practice frequency
        const daysSinceFirst = (Date.now() - Math.min(...performanceEntries.map(p => p.timestamp))) / (1000 * 60 * 60 * 24);
        const practiceFrequency = totalSessions / daysSinceFirst;
        
        if (practiceFrequency < 0.5 && totalSessions > 5) {
            insights.push({
                type: 'tip',
                icon: '📅',
                title: 'Practice More Regularly',
                message: 'Regular practice is key to improvement. Try to practice a little bit each day rather than long sessions occasionally.'
            });
        }

        // Advanced tips based on performance
        if (avgWpm > 40 && avgAccuracy > 90) {
            insights.push({
                type: 'tip',
                icon: '🎹',
                title: 'Advanced Techniques',
                message: 'You\'re ready for advanced techniques! Try practicing with different text types like code, numbers, or special characters.'
            });
        }

        // Motivational messages
        if (masteredCount > 10) {
            insights.push({
                type: 'praise',
                icon: '🌟',
                title: 'Dedicated Learner!',
                message: `You've mastered ${masteredCount} drills! Your dedication to improving is paying off.`
            });
        }

        return insights.slice(0, 4); // Return max 4 insights
    };

    const insights = generateInsights();

    const getInsightStyle = (type: string) => {
        switch (type) {
            case 'praise':
                return 'bg-green-900/20 border border-green-500/30';
            case 'suggestion':
                return 'bg-yellow-900/20 border border-yellow-500/30';
            case 'tip':
                return 'bg-blue-900/20 border border-blue-500/30';
            default:
                return 'bg-tertiary border border-tertiary';
        }
    };

    const typingTips = [
        "Keep your wrists straight and fingers curved",
        "Use the correct finger for each key - don't cheat!",
        "Look at the screen, not your keyboard",
        "Take breaks every 20-30 minutes",
        "Practice a little bit every day",
        "Focus on rhythm and consistency",
        "Don't rush - accuracy before speed"
    ];

    const randomTip = typingTips[Math.floor(Math.random() * typingTips.length)];

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Tips & Insights</h3>
            
            <div className="space-y-4">
                {/* Personal Insights */}
                {insights.map((insight, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${getInsightStyle(insight.type)}`}
                    >
                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">{insight.icon}</span>
                            <div>
                                <h4 className="font-medium text-text-primary mb-1">{insight.title}</h4>
                                <p className="text-sm text-text-secondary">{insight.message}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Daily Tip */}
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-start space-x-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h4 className="font-medium text-accent mb-1">Daily Tip</h4>
                            <p className="text-sm text-text-secondary">{randomTip}</p>
                        </div>
                    </div>
                </div>

                {/* General Typing Guidelines */}
                <div className="p-4 rounded-lg bg-tertiary">
                    <h4 className="font-medium text-text-primary mb-3">📋 Quick Reference</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                        <div>• WPM Goal: 40+ (Good), 60+ (Great)</div>
                        <div>• Accuracy Goal: 95%+ consistently</div>
                        <div>• Practice Time: 15-30 min daily</div>
                        <div>• Rest: 5-10 sec between drills</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipsInsights;
