import React from 'react';
import { Job } from '../types';
import { motion } from 'framer-motion';

interface Props {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

const PlanetSystem: React.FC<Props> = ({ jobs, onSelectJob }) => {
  // Styles for different planet types
  const getPlanetStyle = (index: number) => {
    switch (index % 3) {
      case 0: // Gas Giant (Banded)
        return {
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 20%), linear-gradient(135deg, #FF9966 0%, #FF5E62 50%, #A044FF 100%)',
          boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(255, 94, 98, 0.4)',
        };
      case 1: // Ice World (Textured Blue)
        return {
          background: 'radial-gradient(circle at 60% 20%, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0) 20%), conic-gradient(from 0deg, #24C6DC, #514A9D, #24C6DC)',
          boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(36, 198, 220, 0.4)',
        };
      case 2: // Terrestrial/Rocky (Darker)
        return {
          background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 10%), radial-gradient(circle, #434343 0%, #000000 100%)',
          boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.9), 0 0 15px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center my-8 overflow-hidden">
      {/* Background Orbit Rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5" />
      <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5" />

      {/* Center Sun/Core */}
      <div className="absolute w-6 h-6 rounded-full bg-orbit-gold shadow-[0_0_30px_rgba(255,191,0,0.8),0_0_10px_#fff] z-0 animate-pulse" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white/30 font-mono tracking-widest mt-10">
        YOU
      </div>

      {/* Jobs as Planets */}
      {jobs.length === 0 ? (
        <div className="text-center z-10 p-4 glass-panel rounded-xl">
          <p className="text-slate-400 text-sm">当前星域空旷，建议通过 [完善能力画像] 扩展搜索半径。</p>
        </div>
      ) : (
        jobs.map((job, index) => {
          // Calculate visual properties
          // Higher match score = Closer to center (smaller radius)
          // Higher salary = Larger planet size
          const radius = 180 - (job.matchScore * 1.2); 
          const size = 60 + (job.salaryValue / 2); // Increased base size for realism
          const angle = (index / jobs.length) * 2 * Math.PI; // Distribute evenly
          
          // Position calculation
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const planetStyle = getPlanetStyle(index);

          return (
            <motion.div
              key={job.id}
              className="absolute z-10 cursor-pointer group"
              style={{
                width: size,
                height: size,
                x: x,
                y: y,
              }}
              animate={{
                y: [y - 8, y + 8, y - 8], // Floating effect
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => onSelectJob(job)}
              layoutId={`planet-${job.id}`}
            >
               {/* Orbital Path Line (Decorative connection to center) */}
               <div 
                 className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-l from-white/10 to-transparent -z-10 origin-left"
                 style={{ 
                   width: radius, 
                   transform: `rotate(${angle + Math.PI}rad) translateX(-50%)`
                 }} 
               />

              {/* Planet Body with Realistic Style */}
              <div 
                className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-500 group-hover:scale-110"
                style={planetStyle}
              >
                {/* Rings for the first planet */}
                {index === 0 && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full border-[6px] border-white/10 blur-[1px] rotate-[70deg] scale-y-25 pointer-events-none mix-blend-screen" />
                )}

                {/* Match Score Badge (Floating outside or on top) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold font-mono text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {job.matchScore}%
                  </span>
                </div>
              </div>

              {/* Label (Only on hover) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <p className="text-sm text-white font-serif font-bold truncate drop-shadow-md">{job.title}</p>
                 <p className="text-xs text-orbit-gold font-mono">{job.salary}</p>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default PlanetSystem;
