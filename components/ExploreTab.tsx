
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, TrendingUp, Star, ArrowRight, Play, ChevronRight, Clock, Zap } from 'lucide-react';

// --- MOCK DATA ---

const HERO_ITEMS = [
  {
    id: 'h1',
    category: '跨界专题',
    title: '当程序员拿起画笔',
    subtitle: '技术美术 (TA) 转型全指南',
    image: 'bg-gradient-to-br from-purple-900 to-indigo-600', // Placeholder for image
    tag: 'FEATURED'
  },
  {
    id: 'h2',
    category: '技能黑马',
    title: 'AI 提示词工程',
    subtitle: '让 DeepSeek 成为你的第二大脑',
    image: 'bg-gradient-to-br from-amber-700 to-orange-900',
    tag: 'TRENDING'
  }
];

const FEED_ITEMS = [
  {
    id: 'f1',
    type: 'skill',
    title: 'Python 数据分析实战',
    subtitle: '适合：运营 / 财务 / 想要转行的人',
    provider: 'Coursera',
    rating: '4.9',
    icon: '🐍',
    color: 'bg-blue-500/20 text-blue-400'
  },
  {
    id: 'f2',
    type: 'insight',
    title: '2024 互联网薪资报告：算法岗为何还在涨？',
    summary: '通过对 5000+ 份 Offer 的数据分析，我们发现“业务+算法”的复合型人才溢价率高达 40%。',
    source: 'Orbit Intelligence',
    time: '3 min read',
    image: 'bg-emerald-900'
  },
  {
    id: 'f3',
    type: 'skill',
    title: 'Figma 高级原型设计',
    subtitle: '适合：产品经理 / UI 设计师',
    provider: 'Bilibili',
    rating: '4.8',
    icon: '🎨',
    color: 'bg-purple-500/20 text-purple-400'
  },
  {
    id: 'f4',
    type: 'insight',
    title: '面试官视角的“好简历”长什么样？',
    summary: '避开这 3 个常见的“自嗨”误区，让你的简历通过率提升 3 倍。',
    source: 'HR 联盟',
    time: '5 min read',
    image: 'bg-rose-900'
  },
  {
    id: 'f5',
    type: 'skill',
    title: '结构化思维训练',
    subtitle: '适合：所有职场人',
    provider: '得到',
    rating: '5.0',
    icon: '🧠',
    color: 'bg-amber-500/20 text-amber-400'
  }
];

const ExploreTab: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'skill' | 'insight'>('all');

  const filteredItems = FEED_ITEMS.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans pb-32">
      
      {/* HEADER SECTION */}
      <div className="pt-16 px-6 pb-6 space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
               </div>
               <h1 className="text-4xl font-bold tracking-tight">Explore</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
               <Star size={20} fill="currentColor" className="text-zinc-800 stroke-zinc-400" />
            </div>
         </div>

         {/* Search Bar */}
         <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
               <Search size={18} />
            </div>
            <input 
               type="text" 
               placeholder="搜索课程、技能或行业报告..." 
               className="w-full bg-zinc-900/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:bg-zinc-800 focus:border-white/20 transition-all"
            />
         </div>
      </div>

      {/* HERO CAROUSEL (Spotlight) */}
      <div className="overflow-x-auto pb-8 pl-6 scrollbar-hide flex gap-4 snap-x snap-mandatory">
         {HERO_ITEMS.map(item => (
            <motion.div 
               key={item.id}
               whileTap={{ scale: 0.98 }}
               className={`relative flex-shrink-0 w-[85vw] sm:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden snap-center cursor-pointer shadow-2xl border border-white/10 ${item.image}`}
            >
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
               
               <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 bg-white/10 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                     {item.tag}
                  </span>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">{item.category}</div>
                  <h2 className="text-2xl font-bold text-white leading-tight mb-1">{item.title}</h2>
                  <p className="text-sm text-zinc-300 line-clamp-1">{item.subtitle}</p>
               </div>
            </motion.div>
         ))}
      </div>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5 py-3 px-6">
         <div className="flex bg-zinc-900/80 p-1 rounded-xl w-full">
            {[
               { id: 'all', label: '全部' },
               { id: 'skill', label: '⚡️ 技能充电' },
               { id: 'insight', label: '📰 职场情报' }
            ].map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                     filter === tab.id 
                     ? 'bg-zinc-700 text-white shadow-lg' 
                     : 'text-zinc-500 hover:text-zinc-300'
                  }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      {/* CONTENT FEED */}
      <div className="px-6 py-6 space-y-6">
         <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
               <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
               >
                  {/* TYPE A: SKILL CELL (iOS List Style) */}
                  {item.type === 'skill' && (
                     <div className="group flex items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-2xl active:bg-zinc-800 transition-colors cursor-pointer">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner ${item.color || 'bg-zinc-800'}`}>
                           {item.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                           <h3 className="text-base font-bold text-white mb-0.5">{item.title}</h3>
                           <p className="text-xs text-zinc-500 truncate">{item.subtitle}</p>
                           <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[10px] text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">{item.provider}</span>
                              <div className="flex items-center text-[10px] text-amber-500 font-bold">
                                 <Star size={10} fill="currentColor" className="mr-0.5" /> {item.rating}
                              </div>
                           </div>
                        </div>

                        <button className="flex-shrink-0 px-4 py-1.5 bg-zinc-800 text-amber-500 text-xs font-bold rounded-full uppercase tracking-wider hover:bg-zinc-700 transition-colors">
                           GET
                        </button>
                     </div>
                  )}

                  {/* TYPE B: INSIGHT CELL (News Style) */}
                  {item.type === 'insight' && (
                     <div className="group flex justify-between gap-4 py-4 border-b border-white/5 last:border-0 cursor-pointer">
                        <div className="flex flex-col justify-between flex-1">
                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <TrendingUp size={12} className="text-zinc-400" />
                                 </div>
                                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{item.source}</span>
                              </div>
                              <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-500 transition-colors">
                                 {item.title}
                              </h3>
                              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                                 {item.summary}
                              </p>
                           </div>
                           <div className="flex items-center gap-2 mt-3 text-[10px] text-zinc-600 font-medium">
                              <span>{item.time}</span>
                              <span>•</span>
                              <span>#趋势</span>
                           </div>
                        </div>

                        {/* Thumbnail */}
                        <div className={`w-24 h-24 rounded-xl flex-shrink-0 border border-white/10 ${item.image}`} />
                     </div>
                  )}
               </motion.div>
            ))}
         </AnimatePresence>
         
         <div className="py-8 text-center">
            <button className="text-xs font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
               View All Resources <ChevronRight size={12} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ExploreTab;
