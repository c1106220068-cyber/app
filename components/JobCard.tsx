
import React from 'react';
import { Job } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Wallet } from 'lucide-react';

interface Props {
  job: Job;
  onClick: () => void;
  index: number;
}

const JobCard: React.FC<Props> = ({ job, onClick, index }) => {
  // Styles based on Match Score (Simplified for Apple Minimalist)
  // We use subtle text colors instead of big badges
  const isHighMatch = job.matchScore >= 85;
  const accentColor = isHighMatch ? 'text-emerald-400' : 'text-amber-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 cursor-pointer overflow-hidden transition-all duration-300 active:bg-white/10"
    >
      <div className="flex items-center justify-between">
        
        {/* Left Info */}
        <div className="flex-1 min-w-0 pr-4">
           <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-base font-sans font-medium text-white truncate leading-tight">
                {job.title}
              </h3>
           </div>
           
           <p className="text-sm text-slate-400 font-light mb-3">{job.company}</p>

           <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold ${accentColor}`}>
                 {job.matchScore}% Match
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-300 font-mono">
                 {job.salary}
              </span>
           </div>
        </div>

        {/* Right Action (Chevron in circle) */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
            <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
