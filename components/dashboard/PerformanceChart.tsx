import { useMemo } from 'react';
import type { DrillPerformance } from '../../types';

interface PerformanceChartProps {
    performanceEntries: DrillPerformance[];
}

const PerformanceChart = ({ performanceEntries }: PerformanceChartProps) => {
    const sortedData = useMemo(() => {
        return [...performanceEntries].sort((a, b) => a.timestamp - b.timestamp);
    }, [performanceEntries]);

    if (sortedData.length < 2) {
        return (
             <div className="bg-secondary p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-text-primary mb-2">Performance Over Time</h3>
                <p className="text-text-secondary">Complete at least two drills to see your progress chart.</p>
            </div>
        );
    }
    
    const maxWpm = Math.max(...sortedData.map(d => d.wpm), 100);
    
    // SVG dimensions
    const width = 800;
    const height = 300;
    const padding = 50;

    const getX = (index: number) => padding + (index / (sortedData.length - 1)) * (width - padding * 2);
    const getWpmY = (wpm: number) => height - padding - (wpm / maxWpm) * (height - padding * 2);
    const getAccY = (accuracy: number) => height - padding - (accuracy / 100) * (height - padding * 2);

    const wpmPath = sortedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getWpmY(d.wpm)}`).join(' ');
    const accPath = sortedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getAccY(d.accuracy)}`).join(' ');

    return (
        <div className="bg-secondary p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-4">Performance Over Time</h3>
            <div className="w-full overflow-x-auto">
                <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[600px]">
                    {/* Y Axis Grid Lines */}
                    {[0, 25, 50, 75, 100].map(val => (
                        <g key={val}>
                           <line x1={padding} y1={getAccY(val)} x2={width-padding} y2={getAccY(val)} className="stroke-border-primary/50" />
                           <text x={padding-10} y={getAccY(val)+5} className="fill-text-secondary" textAnchor="end" fontSize="10">{val}%</text>
                        </g>
                    ))}
                    {/* WPM Y axis Label */}
                     <text x={width-padding+10} y={getWpmY(maxWpm / 2)} className="fill-success/70" fontSize="10" transform={`rotate(90, ${width-padding+10}, ${getWpmY(maxWpm / 2)})`}>WPM</text>


                    {/* Data Paths */}
                    <path d={accPath} stroke="hsl(var(--color-text-warning))" fill="none" strokeWidth="2" />
                    <path d={wpmPath} stroke="hsl(var(--color-text-success))" fill="none" strokeWidth="2" />
                    
                    {/* Data Points and Tooltips */}
                    {sortedData.map((d, i) => (
                        <g key={d.timestamp}>
                            {/* Accuracy point */}
                            <circle cx={getX(i)} cy={getAccY(d.accuracy)} r="3" fill="hsl(var(--color-text-warning))" />
                             {/* WPM point */}
                            <circle cx={getX(i)} cy={getWpmY(d.wpm)} r="3" fill="hsl(var(--color-text-success))" />
                        </g>
                    ))}
                </svg>
            </div>
             <div className="flex justify-center gap-6 mt-4 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>WPM</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Accuracy</span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceChart;
