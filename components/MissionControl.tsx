
import React from 'react';
import { LayoutGrid, Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  activeTab: 'overview' | 'explore' | 'me';
  onTabChange: (tab: 'overview' | 'explore' | 'me') => void;
}

const MissionControl: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 pb-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
       <div className="flex items-center justify-around h-full max-w-md mx-auto px-6">
          
          {/* Dashboard (Overview) */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange('overview')}
            className={`flex flex-col items-center justify-center gap-1 w-16 group transition-colors ${activeTab === 'overview' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
             <div className={`${activeTab === 'overview' ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
               <LayoutGrid size={26} strokeWidth={activeTab === 'overview' ? 2 : 1.5} />
             </div>
             <span className="text-[10px] font-medium tracking-wide">概览</span>
          </motion.button>

          {/* Explore */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange('explore')}
            className={`flex flex-col items-center justify-center gap-1 w-16 group transition-colors ${activeTab === 'explore' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
             <div className={`${activeTab === 'explore' ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
               <Compass size={26} strokeWidth={activeTab === 'explore' ? 2 : 1.5} />
             </div>
             <span className="text-[10px] font-medium tracking-wide">探索</span>
          </motion.button>

          {/* Profile (Me) */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange('me')}
            className={`flex flex-col items-center justify-center gap-1 w-16 group transition-colors ${activeTab === 'me' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
             <div className={`${activeTab === 'me' ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
               <User size={26} strokeWidth={activeTab === 'me' ? 2 : 1.5} />
             </div>
             <span className="text-[10px] font-medium tracking-wide">我的</span>
          </motion.button>

       </div>
    </div>
  );
};

export default MissionControl;
