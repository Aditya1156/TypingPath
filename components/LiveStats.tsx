

interface LiveStatsProps {
  liveWpm: number;
  accuracy: number;
  errors: number;
}

const LiveStats = ({ liveWpm, accuracy, errors }: LiveStatsProps) => {
  return (
    <div className="w-full max-w-3xl p-3 bg-secondary rounded-lg shadow-md flex justify-around items-center transition-opacity duration-300 ease-in-out">
      <div className="text-center">
        <span className="text-3xl font-bold text-accent">{liveWpm}</span>
        <span className="text-sm text-text-secondary ml-1">WPM</span>
      </div>
      <div className="text-center">
        <span className="text-3xl font-bold text-success">{accuracy}%</span>
        <span className="text-sm text-text-secondary ml-1">Accuracy</span>
      </div>
      <div className="text-center">
        <span className="text-3xl font-bold text-danger">{errors}</span>
        <span className="text-sm text-text-secondary ml-1">Errors</span>
      </div>
    </div>
  );
};

export default LiveStats;
