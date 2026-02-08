
import React from 'react';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FileText, Shield, Award, Heart, Settings, Zap, Layers, Lock, ChevronRight, Fingerprint, Activity, Hexagon } from 'lucide-react';

interface Props {
  user: UserProfile;
  onOpenResumeDeck?: () => void;
}

const ProfileHub: React.FC<Props> = ({ user, onOpenResumeDeck }) => {
  
  // Mock Data for Heatmap (30 days)
  const heatmapData = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    level: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0 // 0-4 intensity
  }));

  const radarData = [
    { subject: '敏锐度', A: user.traits.visual, fullMark: 100 },
    { subject: '逻辑力', A: user.traits.logic, fullMark: 100 },
    { subject: '共情力', A: user.traits.empathy, fullMark: 100 },
    { subject: '抗压力', A: user.traits.grit, fullMark: 100 },
    { subject: '企图心', A: user.traits.ambition, fullMark: 100 },
    { subject: '创造力', A: user.traits.creativity, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-16 px-6 font-sans">
      
      {/* HEADER: TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">角色成长面板</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest">Character Evolution System</p>
      </div>

      {/* 1. IDENTITY CARD (Apple Wallet Style) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full aspect-[1.8/1] rounded-[24px] relative overflow-hidden mb-8 shadow-2xl group"
      >
        {/* Background: Matte Black + Amber Glow */}
        <div className="absolute inset-0 bg-zinc-900">
           <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-to-bl from-amber-500/10 to-transparent blur-3xl rounded-full" />
           <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-gradient-to-tr from-blue-900/20 to-transparent blur-3xl rounded-full" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
           
           {/* Top Row */}
           <div className="flex justify-between items-start">
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <Fingerprint className="text-amber-500" size={20} />
                    <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Orbit 身份卡</span>
                 </div>
                 <h2 className="text-2xl font-bold text-white tracking-wide">{user.name}</h2>
                 <p className="text-xs text-zinc-400 font-medium mt-0.5">Lv.{user.level} {user.title}</p>
              </div>
              
              {/* Mini Radar */}
              <div className="w-24 h-24 -mr-2 -mt-2 opacity-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={false} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Traits" dataKey="A" stroke="#F59E0B" strokeWidth={1.5} fill="#F59E0B" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Bottom Row */}
           <div className="flex justify-between items-end">
              <div className="flex gap-1">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                 ))}
              </div>
              <div className="text-right">
                 <div className="text-[10px] text-zinc-500 uppercase tracking-widest">距离下一次进化</div>
                 <div className="text-sm font-mono text-white">840 / 1000 XP</div>
              </div>
           </div>
        </div>

        {/* Holographic Border Overlay */}
        <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>


      {/* 2. BENTO ASSET GRID */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         
         {/* CARD A: VERSIONS (Smart Resumes) - LARGE */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           onClick={onOpenResumeDeck} // Trigger navigation
           className="col-span-1 row-span-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[24px] p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:bg-zinc-800/50 transition-colors"
         >
            {/* Holographic Border Effect */}
            <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div>
               <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                  <Layers size={20} />
               </div>
               <h3 className="text-lg font-bold text-white leading-tight">多面版本库</h3>
               <p className="text-[10px] text-zinc-500 mt-1">数字孪生档案</p>
            </div>

            <div className="space-y-2 mt-4">
               {['设计版 (Design)', '逻辑版 (Logic)', '通用版 (General)'].map((ver, i) => (
                  <div key={ver} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                     <FileText size={12} className={i === 0 ? 'text-purple-400' : i === 1 ? 'text-blue-400' : 'text-zinc-400'} />
                     <span className="text-[9px] text-zinc-300 font-mono truncate">{ver}</span>
                  </div>
               ))}
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-bold bg-zinc-800 px-2 py-0.5 rounded flex items-center gap-1 group-hover:text-white transition-colors">
               3 Active <ChevronRight size={10} />
            </div>
         </motion.div>

         {/* CARD B: CREDIT SCORE - SMALL */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.15 }}
           className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[24px] p-5 flex flex-col justify-between"
         >
            <div className="flex justify-between items-start">
               <Shield size={18} className="text-emerald-500" />
               <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">极好</span>
            </div>
            <div>
               <div className="text-3xl font-light text-white tracking-tighter">780</div>
               <div className="text-[10px] text-zinc-500 uppercase tracking-wide">职业信用分</div>
            </div>
         </motion.div>

         {/* CARD C: FAVORITES - SMALL */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[24px] p-5 flex flex-col justify-between"
         >
            <Heart size={18} className="text-rose-500" />
            <div>
               <div className="text-3xl font-light text-white tracking-tighter">12</div>
               <div className="text-[10px] text-zinc-500 uppercase tracking-wide">心动岗位</div>
            </div>
         </motion.div>

         {/* CARD D: FORCE BADGES - LARGE (Wide) */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.25 }}
           className="col-span-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[24px] p-5 flex items-center justify-between relative overflow-hidden"
         >
            <div className="z-10">
               <div className="flex items-center gap-2 mb-1">
                  <Award className="text-amber-500" size={18} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">原力徽章墙</h3>
               </div>
               <p className="text-[10px] text-zinc-500">你的能力可视化资产。</p>
            </div>

            <div className="flex gap-3 z-10">
               {[
                  { icon: Hexagon, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                  { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                  { icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
               ].map((Badge, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full ${Badge.bg} ${Badge.border} border flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                     <Badge.icon size={20} className={Badge.color} />
                  </div>
               ))}
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
         </motion.div>
      </div>


      {/* 3. EVOLUTION HEATMAP */}
      <div className="mb-8">
         <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity size={12} /> 进化足迹 (Evolution Trace)
         </h3>
         <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max">
               {heatmapData.map((d, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.02 }}
                     className="w-3 h-8 rounded-sm"
                     style={{
                        backgroundColor: d.level === 0 ? '#27272a' : // zinc-800
                                         d.level === 1 ? '#451a03' : // amber-950
                                         d.level === 2 ? '#92400e' : // amber-800
                                         d.level === 3 ? '#d97706' : // amber-600
                                                         '#f59e0b'   // amber-500
                     }}
                  />
               ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-zinc-600 font-mono">
               <span>30天前</span>
               <span>今天</span>
            </div>
         </div>
      </div>

      {/* 4. SETTINGS LIST */}
      <div className="space-y-2">
         {[
            { label: 'AI 助手性格设置 (Personality)', icon: Zap },
            { label: '隐私隐身模式 (Stealth Mode)', icon: Lock },
            { label: '关于 Orbit (About)', icon: Fingerprint },
         ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-4 bg-zinc-900/20 border border-white/5 rounded-xl hover:bg-zinc-800 transition-colors group">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                     <item.icon size={14} />
                  </div>
                  <span className="text-sm text-zinc-300 font-medium group-hover:text-white">{item.label}</span>
               </div>
               <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400" />
            </button>
         ))}
      </div>

    </div>
  );
};

export default ProfileHub;
