
import type { PerformanceTier } from '../types';

interface ProgressTickProps {
  tier: PerformanceTier | undefined;
}

const tierConfig = {
  mastered: {
    Icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    ),
    color: 'text-emerald-400',
    tooltip: 'Mastered: >= 98% accuracy & >= 50 WPM',
  },
  proficient: {
    Icon: (props: any) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    ),
    color: 'text-yellow-400',
    tooltip: 'Proficient: >= 95% accuracy & >= 30 WPM',
  },
  'needs-practice': {
    Icon: (props: any) => (
       <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    color: 'text-red-500',
    tooltip: 'Needs Practice: Did not meet proficiency standards.',
  },
};

const ProgressTick = ({ tier }: ProgressTickProps) => {
  if (!tier) {
    // Return a placeholder to maintain layout consistency
    return <div className="w-4 h-4"></div>;
  }

  const { Icon, color, tooltip } = tierConfig[tier];

  return (
    <div className="group relative">
      <Icon className={`inline-block ${color}`} />
      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 text-xs text-center text-white bg-slate-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {tooltip}
      </div>
    </div>
  );
};

export default ProgressTick;