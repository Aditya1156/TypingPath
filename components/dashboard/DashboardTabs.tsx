import { useState } from 'react';
import type { Progress, Lesson } from '../../types';

// Dashboard Components
import StatsCards from './StatsCards';
import PerformanceChart from './PerformanceChart';
import RecentActivity from './RecentActivity';
import ProblemAreas from './ProblemAreas';
import Achievements from './Achievements';
import SessionHistory from './SessionHistory';
import ProgressStreak from './ProgressStreak';
import PersonalBests from './PersonalBests';
import ExportResults from './ExportResults';
import Leaderboard from './Leaderboard';
import TipsInsights from './TipsInsights';

interface DashboardTabsProps {
    progress: Progress;
    onSelectDrill: (lesson: Lesson, drillIndex: number) => void;
}

const DashboardTabs = ({ progress, onSelectDrill }: DashboardTabsProps) => {
    const [activeTab, setActiveTab] = useState('overview');

    const performanceEntries = Object.values(progress);

    const tabs = [
        { id: 'overview', name: 'Overview', icon: '📊' },
        { id: 'achievements', name: 'Achievements', icon: '🏆' },
        { id: 'history', name: 'History', icon: '📈' },
        { id: 'streaks', name: 'Streaks', icon: '🔥' },
        { id: 'bests', name: 'Personal Bests', icon: '⭐' },
        { id: 'leaderboard', name: 'Leaderboard', icon: '👑' },
        { id: 'tips', name: 'Tips', icon: '💡' },
        { id: 'export', name: 'Export', icon: '💾' }
    ];

    const TabButton = ({ tab, isActive, onClick }: { tab: any; isActive: boolean; onClick: () => void }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors font-medium ${
                isActive
                    ? 'bg-accent text-white'
                    : 'bg-tertiary text-text-secondary hover:bg-tertiary/80 hover:text-text-primary'
            }`}
        >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.name}</span>
        </button>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-8">
                        <StatsCards performanceEntries={performanceEntries} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <PerformanceChart performanceEntries={performanceEntries} />
                            <RecentActivity progress={progress} onSelectDrill={onSelectDrill} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <ProblemAreas progress={progress} onSelectDrill={onSelectDrill} />
                            <TipsInsights progress={progress} />
                        </div>
                    </div>
                );
            case 'achievements':
                return <Achievements progress={progress} />;
            case 'history':
                return <SessionHistory progress={progress} onSelectDrill={onSelectDrill} />;
            case 'streaks':
                return <ProgressStreak progress={progress} />;
            case 'bests':
                return <PersonalBests progress={progress} onSelectDrill={onSelectDrill} />;
            case 'leaderboard':
                return <Leaderboard progress={progress} />;
            case 'tips':
                return <TipsInsights progress={progress} />;
            case 'export':
                return <ExportResults progress={progress} />;
            default:
                return <div>Tab not found</div>;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-secondary rounded-lg">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        tab={tab}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default DashboardTabs;
