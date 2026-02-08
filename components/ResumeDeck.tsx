
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wand2, ScanLine, Download, MoreHorizontal, 
  Briefcase, Sparkles, AlertCircle, CheckCircle2, X, ChevronRight,
  GraduationCap, User
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

// --- MOCK DATA ---
const RESUME_VERSIONS = [
  {
    id: 'v1',
    name: '设计版 (Design Ver.)',
    role: '高级 UI/UX 设计师',
    theme: 'gold', // Orbit Gold
    atsScore: 92,
    color: 'from-amber-500/20 to-orange-600/20 border-amber-500/50',
    tags: ['视觉优先', '作品集强化', '感性叙事']
  },
  {
    id: 'v2',
    name: '逻辑版 (Logic Ver.)',
    role: '产品经理 / 策略',
    theme: 'blue',
    atsScore: 88,
    color: 'from-blue-500/20 to-cyan-600/20 border-blue-500/50',
    tags: ['数据驱动', '项目管理', 'STAR法则']
  },
  {
    id: 'v3',
    name: '通用版 (General Ver.)',
    role: '互联网综合岗',
    theme: 'gray',
    atsScore: 75,
    color: 'from-zinc-500/20 to-slate-600/20 border-white/20',
    tags: ['均衡展示', '标准格式']
  }
];

const CONTENT_BLOCKS = [
  {
    id: 'b1',
    section: '个人总结 (Summary)',
    content: '拥有 3 年跨界经验的产品设计师，擅长将数据逻辑转化为感性视觉。曾主导...',
    status: 'perfect', // green
    aiSuggestion: null
  },
  {
    id: 'b2',
    section: '工作经历 (Experience)',
    title: '高级交互设计师 @ 字节跳动',
    content: '负责飞书文档的协作体验优化，日活提升 20%...',
    status: 'warning', // yellow
    aiSuggestion: '建议增加具体的量化数据，例如“日活提升”的具体计算维度。'
  },
  {
    id: 'b3',
    section: '项目经历 (Projects)',
    title: 'Orbit 职业引力场 0-1',
    content: '独立负责前端架构与设计系统搭建...',
    status: 'perfect',
    aiSuggestion: null
  }
];

const ResumeDeck: React.FC<Props> = ({ onBack }) => {
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [isAiPolishing, setIsAiPolishing] = useState(false);

  const activeVersion = RESUME_VERSIONS[activeVersionIndex];

  const handleAiPolish = () => {
    setIsAiPolishing(true);
    setTimeout(() => setIsAiPolishing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative z-50">
      
      {/* 1. HEADER */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 pt-12 pb-4 flex items-center justify-between">
         <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-white" />
         </button>
         <h1 className="text-base font-bold tracking-wide">智能简历版本库</h1>
         <button className="p-2 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
         </button>
      </div>

      <div className="pt-32 pb-40 px-6 max-w-lg mx-auto">
         
         {/* 2. THE DECK (Cover Flow) */}
         <div className="relative mb-10">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide px-4 -mx-10">
               {RESUME_VERSIONS.map((ver, idx) => {
                 const isActive = idx === activeVersionIndex;
                 return (
                   <motion.div
                      key={ver.id}
                      onClick={() => setActiveVersionIndex(idx)}
                      animate={{ 
                         scale: isActive ? 1 : 0.9,
                         opacity: isActive ? 1 : 0.6
                      }}
                      className={`relative flex-shrink-0 w-[75vw] sm:w-[300px] aspect-[210/297] rounded-2xl border snap-center overflow-hidden transition-all duration-300 cursor-pointer ${
                         isActive ? ver.color : 'border-white/5 bg-zinc-900'
                      }`}
                   >
                      {/* Card Content */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${ver.color} opacity-20`} />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                         <div>
                            <div className="flex items-center justify-between mb-4">
                               <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center backdrop-blur-md">
                                  <Briefcase size={14} className="text-white" />
                               </div>
                               {isActive && (
                                 <div className="px-2 py-1 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                    <ScanLine size={10} /> ATS: {ver.atsScore}
                                 </div>
                               )}
                            </div>
                            <h2 className="text-2xl font-bold text-white leading-tight mb-1">{ver.role}</h2>
                            <p className="text-xs text-white/60 font-medium">{ver.name}</p>
                         </div>

                         {/* Thumbnail Lines */}
                         <div className="space-y-2 opacity-50">
                            <div className="h-2 bg-white/20 rounded w-1/3" />
                            <div className="h-1.5 bg-white/10 rounded w-full" />
                            <div className="h-1.5 bg-white/10 rounded w-full" />
                            <div className="h-1.5 bg-white/10 rounded w-5/6" />
                         </div>

                         {/* Tags */}
                         <div className="flex gap-2 flex-wrap">
                            {ver.tags.map(tag => (
                               <span key={tag} className="px-2 py-1 rounded text-[9px] bg-white/10 text-white/80 backdrop-blur-md border border-white/5">
                                  {tag}
                               </span>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                 );
               })}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-2">
               {RESUME_VERSIONS.map((_, idx) => (
                  <div 
                     key={idx} 
                     className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === activeVersionIndex ? 'bg-white' : 'bg-zinc-800'}`} 
                  />
               ))}
            </div>
         </div>

         {/* 3. TACTICAL BAR */}
         <div className="flex justify-center items-center gap-8 mb-10">
            <button 
               onClick={handleAiPolish}
               className="group flex flex-col items-center gap-2"
            >
               <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${isAiPolishing ? 'bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-zinc-900 border-white/10 group-hover:bg-zinc-800'}`}>
                  <Wand2 size={22} className={isAiPolishing ? 'text-black animate-spin-slow' : 'text-amber-500'} />
               </div>
               <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">AI 润色</span>
            </button>

            <button className="group flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <ScanLine size={22} className="text-emerald-500" />
               </div>
               <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">ATS 体检</span>
            </button>

            <button className="group flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                  <Download size={22} className="text-blue-500" />
               </div>
               <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">导出 PDF</span>
            </button>
         </div>

         {/* 4. CONTENT BLOCKS */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1 mb-2">内容积木 (Modular Blocks)</h3>
            
            {CONTENT_BLOCKS.map((block) => (
               <motion.div
                  layout
                  key={block.id}
                  onClick={() => setActiveBlock(block.id)}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5 cursor-pointer hover:bg-zinc-800/50 transition-colors group relative overflow-hidden"
               >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                     {block.status === 'perfect' ? (
                        <CheckCircle2 size={16} className="text-emerald-500/50" />
                     ) : (
                        <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[9px] text-amber-500 font-bold">需优化</span>
                        </div>
                     )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 rounded bg-white/5 text-zinc-400">
                         {block.section.includes('Summary') ? <User size={14} /> : 
                          block.section.includes('Experience') ? <Briefcase size={14} /> : <Sparkles size={14} />}
                      </div>
                      <h4 className="text-sm font-bold text-white">{block.section}</h4>
                  </div>

                  {block.title && <div className="text-xs font-bold text-zinc-300 mb-1">{block.title}</div>}
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{block.content}</p>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                        <ChevronRight size={14} />
                     </div>
                  </div>
               </motion.div>
            ))}

            <button className="w-full py-4 rounded-2xl border border-white/10 border-dashed text-zinc-500 text-xs font-bold hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
               + 添加新模块 (Add Block)
            </button>
         </div>

      </div>

      {/* 5. EDIT SHEET (iOS Style) */}
      <AnimatePresence>
         {activeBlock && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveBlock(null)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
               />
               <motion.div 
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 bg-[#1c1c1e] rounded-t-[32px] z-50 border-t border-white/10 max-h-[85vh] flex flex-col"
               >
                  {/* Handle */}
                  <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing" onClick={() => setActiveBlock(null)}>
                     <div className="w-12 h-1.5 bg-zinc-700 rounded-full" />
                  </div>

                  {/* Sheet Content */}
                  <div className="px-6 py-4 flex-1 overflow-y-auto">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">编辑积木</h3>
                        <div className="flex gap-2">
                           <button className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20 flex items-center gap-1">
                              <Wand2 size={12} /> AI 改写
                           </button>
                           <button onClick={() => setActiveBlock(null)} className="p-1.5 bg-zinc-800 rounded-full text-zinc-400">
                              <X size={18} />
                           </button>
                        </div>
                     </div>

                     {/* Mock Editor */}
                     <div className="bg-black/30 rounded-xl p-4 border border-white/5 min-h-[200px] text-sm text-zinc-300 leading-relaxed font-mono">
                        {CONTENT_BLOCKS.find(b => b.id === activeBlock)?.content}
                     </div>

                     {/* AI Suggestion Box */}
                     {CONTENT_BLOCKS.find(b => b.id === activeBlock)?.aiSuggestion && (
                        <div className="mt-4 bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex gap-3">
                           <div className="flex-shrink-0 mt-0.5">
                              <Sparkles size={16} className="text-amber-500" />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-amber-500 mb-1">Orbit AI 建议</div>
                              <p className="text-xs text-zinc-400 leading-relaxed">
                                 {CONTENT_BLOCKS.find(b => b.id === activeBlock)?.aiSuggestion}
                              </p>
                              <button className="mt-2 text-[10px] font-bold text-white bg-amber-500/20 px-2 py-1 rounded hover:bg-amber-500/30 transition-colors">
                                 一键采纳
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
                  
                  {/* Keyboard Accessory Bar Placeholder */}
                  <div className="p-4 border-t border-white/5 bg-zinc-900 flex justify-end">
                     <button onClick={() => setActiveBlock(null)} className="bg-white text-black font-bold px-6 py-2.5 rounded-full text-sm hover:bg-zinc-200">
                        完成
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    </div>
  );
};

export default ResumeDeck;
