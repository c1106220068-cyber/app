
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Scan, Zap, Send } from 'lucide-react';

interface Props {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'DIAGNOSIS', icon: Brain },
  { id: 2, label: 'TARGETING', icon: Scan },
  { id: 3, label: 'BOOSTING', icon: Zap },
  { id: 4, label: 'LANDING', icon: Send },
];

const Stepper: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="absolute top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1 flex items-center gap-1 shadow-2xl backdrop-saturate-150">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <motion.div
              key={step.id}
              layout
              initial={false}
              animate={{
                width: isActive ? 'auto' : 32,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`relative h-8 flex items-center justify-center rounded-full overflow-hidden ${
                 isActive ? 'px-3' : ''
              }`}
            >
              {/* Icon */}
              <div className={`z-10 flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'text-white' : 
                  isCompleted ? 'text-zinc-400' : 'text-zinc-700'
              }`}>
                 <step.icon size={14} strokeWidth={isActive ? 2 : 1.5} />
              </div>

              {/* Label (Only visible when active) */}
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  transition={{ delay: 0.1 }}
                  className="ml-2 text-[10px] font-bold tracking-widest text-white whitespace-nowrap"
                >
                  {step.label}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
