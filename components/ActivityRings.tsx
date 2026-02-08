
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  outerValue: number;  // Red: Hard Skills Match
  middleValue: number; // Green: Soft Skills / Cross-over
  innerValue: number;  // Blue: Action / Applications
  size?: number;
}

const ActivityRings: React.FC<Props> = ({ outerValue, middleValue, innerValue, size = 120 }) => {
  const center = size / 2;
  const strokeWidth = size * 0.12; // slightly thicker for the apple look
  const gap = 3;

  // Calculate Radii
  const r1 = (size - strokeWidth) / 2;
  const r2 = r1 - strokeWidth - gap;
  const r3 = r2 - strokeWidth - gap;

  // Calculate Circumferences
  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const c3 = 2 * Math.PI * r3;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        
        {/* Track Backgrounds */}
        <circle cx={center} cy={center} r={r1} fill="none" stroke="#27272a" strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
        <circle cx={center} cy={center} r={r2} fill="none" stroke="#27272a" strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
        <circle cx={center} cy={center} r={r3} fill="none" stroke="#27272a" strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />

        {/* Outer Ring: Red (Hard Skills) */}
        <motion.circle
          initial={{ strokeDashoffset: c1 }}
          animate={{ strokeDashoffset: c1 - (outerValue / 100) * c1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          cx={center} cy={center} r={r1}
          fill="none" 
          stroke="#EF4444" // Red-500
          strokeWidth={strokeWidth}
          strokeDasharray={c1}
          strokeLinecap="round"
        />

        {/* Middle Ring: Green (Soft Skills) */}
        <motion.circle
          initial={{ strokeDashoffset: c2 }}
          animate={{ strokeDashoffset: c2 - (middleValue / 100) * c2 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
          cx={center} cy={center} r={r2}
          fill="none" 
          stroke="#10B981" // Emerald-500
          strokeWidth={strokeWidth}
          strokeDasharray={c2}
          strokeLinecap="round"
        />

        {/* Inner Ring: Blue (Action) */}
        <motion.circle
          initial={{ strokeDashoffset: c3 }}
          animate={{ strokeDashoffset: c3 - (innerValue / 100) * c3 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
          cx={center} cy={center} r={r3}
          fill="none" 
          stroke="#3B82F6" // Blue-500
          strokeWidth={strokeWidth}
          strokeDasharray={c3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ActivityRings;
