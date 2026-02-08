
import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { UserProfile } from '../types';
import { Hexagon, Sparkles } from 'lucide-react';

interface Props {
  user: UserProfile;
}

const PersonalRadar: React.FC<Props> = ({ user }) => {
  const radarData = [
    { subject: '敏锐度', A: user.traits.visual, fullMark: 100 },
    { subject: '逻辑力', A: user.traits.logic, fullMark: 100 },
    { subject: '共情力', A: user.traits.empathy, fullMark: 100 },
    { subject: '抗压力', A: user.traits.grit, fullMark: 100 },
    { subject: '企图心', A: user.traits.ambition, fullMark: 100 },
    { subject: '创造力', A: user.traits.creativity, fullMark: 100 },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 shadow-xl">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Hexagon className="text-orbit-gold animate-spin-slow" size={120} />
      </div>

      <div className="text-center mb-2 z-10">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-gold/10 border border-orbit-gold/20 mb-2">
            <Sparkles size={12} className="text-orbit-gold" />
            <span className="text-[10px] font-mono text-orbit-gold tracking-widest uppercase">Identity Radar</span>
         </div>
         <h2 className="text-2xl font-serif text-white tracking-wide">{user.title}</h2>
         <p className="text-xs text-slate-400 mt-1 font-mono">Lv.{user.level} {user.name}</p>
      </div>

      <div className="flex-1 min-h-[300px] relative z-10 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="My Traits"
              dataKey="A"
              stroke="#F59E0B"
              strokeWidth={2}
              fill="#F59E0B"
              fillOpacity={0.3}
              className="drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
         <div className="bg-white/5 rounded p-3 text-center border border-white/5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">核心优势</div>
            <div className="text-orbit-gold font-bold text-sm">{user.genome?.primary || "N/A"}</div>
         </div>
         <div className="bg-white/5 rounded p-3 text-center border border-white/5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">潜能方向</div>
            <div className="text-blue-400 font-bold text-sm">{user.genome?.secondary || "N/A"}</div>
         </div>
      </div>
    </div>
  );
};

export default PersonalRadar;
