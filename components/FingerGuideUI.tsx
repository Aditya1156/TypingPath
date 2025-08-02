

interface FingerGuideUIProps {
  fingers: string[];
}

const FingerGuideUI = ({ fingers }: FingerGuideUIProps) => {
  if (fingers.length === 0) {
    return null;
  }

  return (
    <div className="text-text-secondary flex flex-col sm:flex-row justify-center items-baseline gap-x-3 gap-y-1">
      <p>Use Finger(s):</p>
      <span className="font-bold text-rose-400 text-xl sm:text-2xl animate-pulse">
        {fingers.join(' + ')}
      </span>
    </div>
  );
};

export default FingerGuideUI;
