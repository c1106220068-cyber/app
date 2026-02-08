
import React, { useState } from 'react';
import { Job, UserProfile } from '../types';
import { X, Lightbulb, Flame, Zap, Sparkles, BookOpen, Video, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GapAnalysis from './GapAnalysis';

interface Props {
  job: Job;
  user?: UserProfile;
  onClose: () => void;
  mode?: 'view' | 'boost';
  onBoostComplete?: () => void;
  onShowAllJobs?: (keyword: string) => void;
}

// MOCK DATA GENERATOR for the "Decoder" functionality
// In a real app, this would come from the backend based on Job ID
const getJobDirections = (jobId: string) => {
  // Generic directions for demo purposes
  return ['业务/应用向', '数据/策略向', '研发/技术向'];
};

const getSkillsForDirection = (direction: string) => {
  // Return different skill priorities based on selected direction
  if (direction.includes('业务') || direction.includes('应用')) {
    return {
      must: [{ name: '用户旅程地图 (User Journey)', reason: '定义产品核心体验路径' }, { name: 'Figma 原型绘制', reason: '快速验证想法低保真方案' }],
      should: [{ name: 'SQL 数据查询', reason: '独立验证业务假设' }],
      nice: [{ name: 'AIGC 提示词工程', reason: '提升文档与素材产出效率' }]
    };
  } else if (direction.includes('数据')) {
    return {
      must: [{ name: 'Python 数据分析', reason: '处理海量业务数据' }, { name: 'A/B 测试设计', reason: '科学决策产品迭代' }],
      should: [{ name: 'Tableau 可视化', reason: '向管理层汇报数据洞察' }],
      nice: [{ name: '机器学习基础', reason: '理解推荐算法逻辑' }]
    };
  } else {
    return {
      must: [{ name: '系统架构设计', reason: '保证高并发下的稳定性' }],
      should: [{ name: 'Docker/K8s', reason: '容器化部署与运维' }],
      nice: [{ name: 'Rust', reason: '高性能模块重构' }]
    };
  }
};

const JobDetailPanel: React.FC<Props> = ({ job, user, onClose, mode = 'view', onShowAllJobs }) => {
  const [direction, setDirection] = useState(getJobDirections(job.id)[0]);
  const skills = getSkillsForDirection(direction);

  // Mock User traits if not provided
  const userTraits = user?.traits || {
     visual: 50, logic: 50, empathy: 50, grit: 50, ambition: 50, creativity: 50
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 bg-slate-50 text-slate-900 shadow-2xl overflow-y-auto font-sans flex flex-col"
      >
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md px-8 py-6 border-b border-slate-200 flex justify-between items-start flex-shrink-0">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold font-serif text-xl shadow-lg">
                  {job.title.charAt(0)}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-slate-900 tracking-tight">{job.title}</h2>
                   <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="font-bold text-orbit-gold">{job.salary}</span>
                      <span>@</span>
                      <span>{job.company}</span>
                   </div>
                </div>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-8 space-y-10 pb-32 flex-grow">
          
          {/* DIRECTION TOGGLE */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">岗位定位 (Orientation)</h3>
            <div className="flex p-1 bg-slate-200 rounded-lg">
               {getJobDirections(job.id).map(dir => (
                 <button
                   key={dir}
                   onClick={() => setDirection(dir)}
                   className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                     direction === dir 
                       ? 'bg-white text-slate-900 shadow-sm' 
                       : 'text-slate-500 hover:text-slate-700'
                   }`}
                 >
                   {dir}
                 </button>
               ))}
            </div>
          </section>

          {/* TRANSLATION CARD */}
          <section>
             <blockquote className="relative p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="absolute -top-3 left-6 px-2 bg-white text-xs font-bold text-slate-900 flex items-center gap-1 border border-slate-100 rounded-full">
                   <Lightbulb size={12} className="text-orbit-gold fill-orbit-gold" />
                   岗位翻译 (Decoder)
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  "{job.decodedDescription}"
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                   <span className="font-bold text-slate-500">⚠️ 压力预警:</span>
                   {job.pressurePoint}
                </div>
             </blockquote>
          </section>

          {/* SKILL HIERARCHY */}
          <section className="space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">技能权重阶梯 (Skill Hierarchy)</h3>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">基于 {direction} 视角</span>
             </div>

             {/* Must Have */}
             <div className="space-y-2">
                {skills.must.map((skill, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={skill.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 group hover:border-red-200 transition-colors"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                           <Flame size={16} className="fill-current" />
                        </div>
                        <span className="text-sm font-bold text-red-900">{skill.name}</span>
                     </div>
                     <span className="text-xs text-red-700/70 font-medium text-right max-w-[150px]">{skill.reason}</span>
                  </motion.div>
                ))}
             </div>

             {/* Should Have */}
             <div className="space-y-2">
                {skills.should.map((skill, i) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <Zap size={16} className="fill-current" />
                        </div>
                        <span className="text-sm font-bold text-blue-900">{skill.name}</span>
                     </div>
                     <span className="text-xs text-blue-700/70 font-medium text-right max-w-[150px]">{skill.reason}</span>
                  </div>
                ))}
             </div>

             {/* Nice to Have */}
             <div className="space-y-2">
                {skills.nice.map((skill, i) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                           <Sparkles size={16} className="fill-current" />
                        </div>
                        <span className="text-sm font-bold text-emerald-900">{skill.name}</span>
                     </div>
                     <span className="text-xs text-emerald-700/70 font-medium text-right max-w-[150px]">{skill.reason}</span>
                  </div>
                ))}
             </div>
          </section>

          {/* GAP ANALYSIS */}
          <section className="pt-6 border-t border-slate-200">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">当前匹配度分析</h3>
             <GapAnalysis userTraits={userTraits} jobTraits={job.requiredTraits} />
          </section>

          {/* RESOURCES (Mini) */}
          <section className="pt-6 border-t border-slate-200">
             <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <BookOpen size={80} />
                </div>
                <h4 className="font-serif text-lg mb-1">准备好开始了吗？</h4>
                <p className="text-slate-400 text-xs mb-4">已为你聚合 {job.resources.length} 个针对性提升资源</p>
                <div className="space-y-2 relative z-10">
                   {job.resources.slice(0, 2).map(r => (
                      <a href={r.url} key={r.id} className="block p-3 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            {r.type === 'video' ? <Video size={14} /> : <FileText size={14} />}
                            <span className="text-sm font-medium">{r.title}</span>
                         </div>
                         <ArrowRight size={14} className="opacity-50" />
                      </a>
                   ))}
                </div>
             </div>
          </section>
        </div>

        {/* STICKY FOOTER CTA */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 z-30">
           <button 
             onClick={() => onShowAllJobs && onShowAllJobs(job.title)}
             className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold shadow-lg shadow-amber-500/30 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
           >
              <span>查看全网 1,204 个 [校招] 机会</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </motion.div>
    </>
  );
};

export default JobDetailPanel;
