
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ScanLine, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  user: UserProfile;
  variant: 'hero' | 'header';
  onDiagnose?: () => void;
}

const DigitalTwin: React.FC<Props> = ({ user, variant, onDiagnose }) => {
  const [showPotential, setShowPotential] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleDiagnosisClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      if (onDiagnose) onDiagnose();
    }, 2000);
  };

  // --- HERO VARIANT: Realistic Glass Sphere ---
  if (variant === 'hero') {
    return (
      <div className="flex flex-col items-center justify-center h-[55vh] relative z-20">
        
        {/* Sphere Container */}
        <motion.div 
          layoutId="digital-twin-orb"
          className="relative flex items-center justify-center py-12 cursor-pointer group"
          onClick={handleDiagnosisClick}
        >
          {/* Sphere Wrapper: 1:1 Aspect Ratio, Rounded Full */}
          <div className="relative w-72 aspect-square rounded-full">
            
            {/* --- Layer 1: Glass Body --- */}
            <div 
              className="absolute inset-0 rounded-full z-10 transition-transform duration-700 group-hover:scale-105"
              style={{
                backdropFilter: 'blur(16px)', 
                WebkitBackdropFilter: 'blur(16px)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                boxShadow: `
                  inset -5px -5px 20px rgba(255, 255, 255, 0.1), 
                  inset 5px 5px 20px rgba(0, 0, 0, 0.3),
                  0px 8px 20px rgba(0,0,0,0.3)
                `,
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }}
            />

            {/* --- Layer 2: Specular Highlight --- */}
            <div 
              className="absolute top-6 left-8 w-24 h-16 z-20 pointer-events-none"
              style={{
                borderRadius: '50%',
                transform: 'rotate(-35deg)',
                background: 'radial-gradient(farthest-corner at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
                filter: 'blur(6px)'
              }}
            />

            {/* --- Layer 3: Refraction Glow --- */}
            <div 
               className="absolute bottom-4 right-4 w-32 h-32 rounded-full z-15 opacity-40 mix-blend-overlay blur-xl pointer-events-none"
               style={{
                 background: 'radial-gradient(circle, rgba(14, 165, 233, 0.8) 0%, transparent 70%)'
               }}
            />

            {/* --- Content --- */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white drop-shadow-lg">
               {isScanning ? (
                 <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                 >
                   <ScanLine className="animate-pulse mb-2 opacity-80" size={40} />
                   <span className="text-xs font-bold uppercase tracking-widest opacity-70">Scanning...</span>
                 </motion.div>
               ) : (
                 <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                 >
                   <span className="text-5xl font-thin tracking-tighter">Start</span>
                   <span className="text-xs font-bold uppercase tracking-widest opacity-70 mt-1">Diagnosis</span>
                 </motion.div>
               )}
            </div>
            
            {/* Scanning Effect Overlay */}
            <AnimatePresence>
             {isScanning && (
               <div className="absolute inset-0 rounded-full overflow-hidden z-20 pointer-events-none">
                  <motion.div 
                     initial={{ top: '-10%' }}
                     animate={{ top: '110%' }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="absolute left-0 right-0 h-[1px] bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  />
               </div>
             )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-30 mt-4"
        >
          <button 
            onClick={handleDiagnosisClick}
            disabled={isScanning}
            className="group px-10 py-4 rounded-full bg-[#111]/80 backdrop-blur-md hover:bg-[#222] transition-all duration-300 shadow-2xl flex items-center gap-3 border border-white/10"
          >
             <span className="text-xs font-bold text-white tracking-[0.2em] font-mono">
                {isScanning ? 'INITIALIZING...' : 'START DIAGNOSIS'}
             </span>
             <ScanLine size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>
    );
  }

  // --- HEADER VARIANT (Mini Glass Orb) ---
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative z-20 mb-8"
    >
      <div 
        className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[24px] p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/40 transition-colors duration-300 group"
        onClick={() => setShowPotential(!showPotential)}
      >
        <div className="flex items-center gap-5">
          {/* Mini Glass Sphere */}
          <motion.div layoutId="digital-twin-orb" className="relative w-12 h-12">
             <div 
               className="absolute inset-0 rounded-full border border-white/20 overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                 boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.3)',
                 backdropFilter: 'blur(4px)'
               }}
             >
                {/* Highlight */}
                <div className="absolute top-1.5 left-2 w-4 h-2.5 rounded-[100%] bg-white/80 blur-[1px] rotate-[-45deg]" />
             </div>
             
             {/* Level Badge */}
             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center shadow-lg z-10">
                <span className="text-[9px] font-bold text-zinc-300">{user.level}</span>
             </div>
          </motion.div>

          <div>
            <h2 className="text-lg font-medium text-white tracking-wide group-hover:text-amber-400 transition-colors">{user.name}</h2>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{user.title}</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
           <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">System Status</span>
           <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse" />
             <span className="text-xs font-medium text-zinc-300">Online</span>
           </div>
        </div>
      </div>

      {/* Hidden Potential Popup */}
      <AnimatePresence>
        {showPotential && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
             <div className="bg-zinc-900/90 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-2xl">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles size={12} className="text-amber-500" />
                  Discovered Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.hiddenPotential.map((p, i) => (
                    <span key={i} className="text-[10px] font-medium text-zinc-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors">
                      {p}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DigitalTwin;
