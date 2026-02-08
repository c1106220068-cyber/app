
import React from 'react';
import { UserProfile, Job } from '../types';
import ActivityRings from './ActivityRings';
import { TrendingUp, ArrowUpRight, Zap, Sparkles, Database } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  user: UserProfile;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onShowAllJobs: () => void;
}

const BentoDashboard: React.FC<Props> = ({ user, jobs, onSelectJob, onShowAllJobs }) => {
  // Stats Calculation
  const maxMatch = jobs.length > 0 ? Math.max(...jobs.map(j => j.matchScore)) : 0;
  const softSkills = 72; // Mock value
  const actionScore = 45; // Mock value

  // Date
  const today = new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'numeric', day: 'numeric' });

  return (
    <div className="w-full max-w-md mx-auto px-6 pt-12 pb-40 font-sans text-white">
       
       {/* HEADER SECTION (Areas A & B) */}
       <div className="flex justify-between items-start mb-8">
         {/* Area A: Text */}
         <div className="pt-2">
           <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{today}</div>
           <h1 className="text-5xl font-thin tracking-tight text-white leading-none">今日概览</h1>
         </div>
         
         {/* Area B: Activity Rings */}
         <div className="flex-shrink-0">
            <ActivityRings outerValue={maxMatch} middleValue={softSkills} innerValue={actionScore} size={110} />
         </div>
       </div>

       {/* GRID SECTION (Area C) */}
       <div className="space-y-4">
          
          {/* Card 1: Current Focus (Wide) */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900 rounded-[32px] p-6 border border-white/5 relative overflow-hidden cursor-pointer"
          >
             <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">当前聚焦</span>
                   <h3 className="text-xl font-medium text-white">SQL 数据分析</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                   <span className="text-xl">🔥</span>
                </div>
             </div>
             
             {/* Progress Bar */}
             <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '65%' }}
                   transition={{ duration: 1 }}
                   className="h-full bg-blue-500 w-[65%]" 
                />
             </div>
             <div className="flex justify-between text-xs text-zinc-500 font-medium">
                <span>第 3 章 / 共 5 章</span>
                <span>65%</span>
             </div>
          </motion.div>

          {/* Row 2: Trends & Insights */}
          <div className="grid grid-cols-2 gap-4">
             
             {/* Card 2: Trends (Square) */}
             <motion.div 
               whileTap={{ scale: 0.98 }}
               className="aspect-square bg-zinc-900 rounded-[32px] p-5 border border-white/5 flex flex-col justify-between cursor-pointer"
             >
                <div className="flex items-center gap-2 text-zinc-500">
                   <TrendingUp size={18} />
                   <span className="text-[10px] font-bold uppercase tracking-wider">趋势</span>
                </div>
                <div>
                   <div className="flex items-end gap-1">
                      <span className="text-4xl font-light tracking-tight text-white">+12%</span>
                      <ArrowUpRight size={20} className="text-emerald-500 mb-2" />
                   </div>
                   <p className="text-[10px] text-zinc-500 mt-2 font-medium">市场需求上升</p>
                </div>
             </motion.div>

             {/* Card 3: Insights (Square) */}
             <motion.div 
               whileTap={{ scale: 0.98 }}
               onClick={onShowAllJobs}
               className="aspect-square bg-zinc-900 rounded-[32px] p-5 border border-white/5 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
             >
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Sparkles size={40} className="text-white" />
                </div>
                
                <div className="flex items-center gap-2 text-zinc-500">
                   <Zap size={18} className="text-amber-500 fill-amber-500" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">洞察</span>
                </div>
                
                <p className="text-sm text-zinc-300 font-medium leading-snug pr-2">
                   你的跨界背景在产品经理岗极具<span className="text-white font-bold">优势</span>。
                </p>
             </motion.div>
          </div>

          {/* Optional: Job List Entry (Bottom) */}
          <motion.div
             whileTap={{ scale: 0.98 }}
             onClick={onShowAllJobs}
             className="bg-zinc-900 rounded-[32px] p-6 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-zinc-800 transition-colors"
          >
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                   <Database size={20} />
                </div>
                <div>
                   <h3 className="text-base font-medium text-white">查看机会</h3>
                   <p className="text-xs text-zinc-500">发现 {jobs.length} 个匹配岗位</p>
                </div>
             </div>
             <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                <ArrowUpRight size={16} />
             </div>
          </motion.div>

       </div>
    </div>
  );
};

export default BentoDashboard;
