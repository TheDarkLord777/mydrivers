import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface SuccessAnimationProps {
  duration?: number;
  onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  duration = 2000, 
  onComplete 
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-bounce">
        <div className="bg-green-500 p-8 rounded-full shadow-2xl">
          <Check 
            className="w-24 h-24 text-white" 
            strokeWidth={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;