import { useState } from 'react';
import type { Progress } from '../../types';

interface ExportResultsProps {
    progress: Progress;
}

const ExportResults = ({ progress }: ExportResultsProps) => {
    const [isExporting, setIsExporting] = useState(false);
    const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('csv');

    const performanceEntries = Object.entries(progress).map(([key, performance]) => {
        const [lessonId, drillIndexStr] = key.split('-');
        const drillIndex = parseInt(drillIndexStr) || 0;
        return {
            key,
            lessonId,
            drillIndex,
            ...performance,
            date: new Date(performance.timestamp).toISOString()
        };
    });

    const generateCSV = () => {
        const headers = ['Date', 'Lesson ID', 'Drill Index', 'WPM', 'Accuracy (%)', 'Tier'];
        const rows = performanceEntries.map(entry => [
            new Date(entry.timestamp).toLocaleDateString(),
            entry.lessonId,
            entry.drillIndex + 1,
            entry.wpm,
            entry.accuracy,
            entry.tier
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        return csvContent;
    };

    const generateJSON = () => {
        const exportData = {
            exportDate: new Date().toISOString(),
            totalSessions: performanceEntries.length,
            dateRange: {
                first: performanceEntries.length > 0 ? new Date(Math.min(...performanceEntries.map(p => p.timestamp))).toISOString() : null,
                last: performanceEntries.length > 0 ? new Date(Math.max(...performanceEntries.map(p => p.timestamp))).toISOString() : null
            },
            summary: {
                averageWPM: performanceEntries.length > 0 ? Math.round(performanceEntries.reduce((sum, p) => sum + p.wpm, 0) / performanceEntries.length) : 0,
                averageAccuracy: performanceEntries.length > 0 ? Math.round(performanceEntries.reduce((sum, p) => sum + p.accuracy, 0) / performanceEntries.length) : 0,
                bestWPM: performanceEntries.length > 0 ? Math.max(...performanceEntries.map(p => p.wpm)) : 0,
                bestAccuracy: performanceEntries.length > 0 ? Math.max(...performanceEntries.map(p => p.accuracy)) : 0,
                tierCounts: {
                    mastered: performanceEntries.filter(p => p.tier === 'mastered').length,
                    proficient: performanceEntries.filter(p => p.tier === 'proficient').length,
                    needsPractice: performanceEntries.filter(p => p.tier === 'needs-practice').length
                }
            },
            sessions: performanceEntries.map(entry => ({
                date: entry.date,
                lessonId: entry.lessonId,
                drillIndex: entry.drillIndex,
                wpm: entry.wpm,
                accuracy: entry.accuracy,
                tier: entry.tier
            }))
        };

        return JSON.stringify(exportData, null, 2);
    };

    const downloadFile = (content: string, filename: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExport = async () => {
        if (performanceEntries.length === 0) return;

        setIsExporting(true);
        
        try {
            const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            
            if (exportFormat === 'csv') {
                const csvContent = generateCSV();
                downloadFile(csvContent, `typingpath-results-${timestamp}.csv`, 'text/csv');
            } else {
                const jsonContent = generateJSON();
                downloadFile(jsonContent, `typingpath-results-${timestamp}.json`, 'application/json');
            }
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const getStats = () => {
        if (performanceEntries.length === 0) return null;

        const totalSessions = performanceEntries.length;
        const avgWpm = Math.round(performanceEntries.reduce((sum, p) => sum + p.wpm, 0) / totalSessions);
        const avgAccuracy = Math.round(performanceEntries.reduce((sum, p) => sum + p.accuracy, 0) / totalSessions);
        const dateRange = {
            first: new Date(Math.min(...performanceEntries.map(p => p.timestamp))),
            last: new Date(Math.max(...performanceEntries.map(p => p.timestamp)))
        };

        return { totalSessions, avgWpm, avgAccuracy, dateRange };
    };

    const stats = getStats();

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Export Results</h3>
            
            {!stats ? (
                <p className="text-text-secondary text-center py-8">
                    No data to export. Complete some typing sessions first!
                </p>
            ) : (
                <div className="space-y-6">
                    {/* Export Preview */}
                    <div className="bg-tertiary p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-text-primary mb-3">Export Preview</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-accent">{stats.totalSessions}</div>
                                <p className="text-xs text-text-secondary">Total Sessions</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-accent">{stats.avgWpm}</div>
                                <p className="text-xs text-text-secondary">Avg WPM</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-accent">{stats.avgAccuracy}%</div>
                                <p className="text-xs text-text-secondary">Avg Accuracy</p>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-accent">
                                    {Math.ceil((stats.dateRange.last.getTime() - stats.dateRange.first.getTime()) / (1000 * 60 * 60 * 24))}
                                </div>
                                <p className="text-xs text-text-secondary">Days Span</p>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <p className="text-sm text-text-secondary">
                                Data from {stats.dateRange.first.toLocaleDateString()} to {stats.dateRange.last.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Export Options */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Export Format
                            </label>
                            <select
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                                className="w-full px-3 py-2 bg-tertiary text-text-primary rounded-md border border-tertiary focus:border-accent focus:outline-none"
                            >
                                <option value="csv">CSV (Spreadsheet)</option>
                                <option value="json">JSON (Developer)</option>
                            </select>
                        </div>

                        <div className="bg-tertiary p-3 rounded-md">
                            <h5 className="text-sm font-medium text-text-primary mb-2">
                                {exportFormat === 'csv' ? 'CSV Format' : 'JSON Format'}
                            </h5>
                            <p className="text-xs text-text-secondary">
                                {exportFormat === 'csv' 
                                    ? 'Perfect for Excel, Google Sheets, or any spreadsheet application. Includes date, lesson info, WPM, accuracy, and tier for each session.'
                                    : 'Structured data format ideal for developers. Includes session details plus summary statistics and metadata.'
                                }
                            </p>
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={isExporting || !stats}
                            className="w-full px-6 py-3 bg-accent text-white rounded-md hover:bg-accent/80 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
                        </button>
                    </div>

                    {/* Format Details */}
                    <div className="text-xs text-text-secondary space-y-1">
                        <p><strong>Privacy:</strong> All data is exported locally - nothing is sent to external servers.</p>
                        <p><strong>File name:</strong> typingpath-results-{new Date().toISOString().split('T')[0]}.{exportFormat}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportResults;
