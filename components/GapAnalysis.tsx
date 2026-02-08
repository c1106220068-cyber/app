
import React from 'react';
import { TraitRadar } from '../types';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface Props {
  userTraits: TraitRadar;
  jobTraits: TraitRadar;
}

const traitLabels: Record<keyof TraitRadar, string> = {
  visual: '敏锐度 (Visual)',
  logic: '逻辑力 (Logic)',
  empathy: '共情力 (Empathy)',
  grit: '抗压力 (Grit)',
  ambition: '企图心 (Ambition)',
  creativity: '创造力 (Create)',
};

const GapAnalysis: React.FC<Props> = ({ userTraits, jobTraits }) => {
  const keys = Object.keys(traitLabels) as Array<keyof TraitRadar>;

  return (
    <div className="space-y-4">
      {keys.map((key, index) => {
        const userVal = userTraits[key];
        const jobVal = jobTraits[key];
        const gap = jobVal - userVal;
        const hasGap = gap > 10; // Threshold for showing action button

        return (
          <div key={key} className="relative">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-bold text-slate-600">{traitLabels[key]}</span>
              {hasGap && (
                <span className="text-[10px] text-rose-500 flex items-center gap-1 font-medium">
                  差距 -{gap}% 
                </span>
              )}
            </div>
            
            <div className="relative h-6 w-full rounded-md bg-slate-200 overflow-hidden flex items-center border border-slate-300/50">
               {/* Background: Job Standard (Gray/Darker Line) */}
               <div 
                 className="absolute top-0 bottom-0 left-0 border-r-2 border-slate-400 border-dashed z-10"
                 style={{ width: `${jobVal}%` }}
               />
               
               {/* Foreground: User Status (Blue/Green) */}
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${userVal}%` }}
                 transition={{ duration: 1, delay: index * 0.1 }}
                 className={`absolute top-1 bottom-1 left-1 rounded-sm ${hasGap ? 'bg-blue-500' : 'bg-emerald-500'}`}
               />

               {/* Action Button Overlay */}
               {hasGap && (
                 <motion.button
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 + index * 0.1 }}
                   className="absolute right-1 top-1 bottom-1 px-2 flex items-center gap-1 bg-orbit-gold text-white text-[10px] font-bold rounded hover:bg-amber-600 transition-colors shadow-sm z-20"
                 >
                   <Zap size={10} /> 补齐
                 </motion.button>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GapAnalysis;
