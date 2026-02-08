
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Sparkles, Clock, ArrowLeft, Filter, Building2, ChevronDown, SlidersHorizontal, X, Check, Navigation, Flame, RefreshCcw } from 'lucide-react';

interface Props {
  initialKeyword?: string;
  onBack: () => void;
}

const MOCK_AGGREGATED_JOBS = [
  {
    id: 'a1',
    title: '文创产品经理 (用户方向)',
    company: '字节跳动',
    city: '北京',
    exp: '3-5年',
    salary: '30k-50k',
    match: 94,
    source: 'Boss直聘',
    tags: ['C端', '文娱', 'AIGC'],
    aiReason: '核心技能重合度 92% | 你的 "视觉敏锐度" 特质完美匹配该岗位对审美的要求。',
    time: '10分钟前',
    isNew: true
  },
  {
    id: 'a2',
    title: '高级产品经理',
    company: '小红书',
    city: '上海',
    exp: '3-5年',
    salary: '35k-60k',
    match: 88,
    source: 'LinkedIn',
    tags: ['社区', '增长'],
    aiReason: '技能匹配度 85% | 需补充 "SQL" 技能以提升竞争力。',
    time: '2小时前',
    isNew: true
  },
  {
    id: 'a3',
    title: '创意技术专家 (Creative Technologist)',
    company: '腾讯 NExT Studios',
    city: '深圳',
    exp: '1-3年',
    salary: '25k-45k',
    match: 91,
    source: '前程无忧',
    tags: ['Unity', '交互艺术'],
    aiReason: '特质匹配度 95% | 你的 "逻辑+艺术" 双螺旋基因是该岗位的稀缺资源。',
    time: '刚刚',
    isNew: true
  },
  {
    id: 'a4',
    title: 'AI 产品经理 (策略)',
    company: '米哈游',
    city: '上海',
    exp: '校招/实习',
    salary: '20k-35k',
    match: 78,
    source: '官网',
    tags: ['NLP', '游戏'],
    aiReason: '潜力匹配 | 建议加强 "Python" 实战经验。',
    time: '1天前',
    isNew: false
  },
  {
    id: 'a5',
    title: '交互设计师',
    company: '蔚来汽车',
    city: '上海',
    exp: '3年+',
    salary: '28k-40k',
    match: 82,
    source: 'Boss直聘',
    tags: ['HMI', '车载'],
    aiReason: '行业匹配度高 | 你的 "共情力" 特质适合车内体验设计。',
    time: '3小时前',
    isNew: true
  }
];

const HOT_CITIES = ['全国', '北京', '上海', '深圳', '杭州', '广州', '成都', '武汉'];

const AggregatedJobList: React.FC<Props> = ({ initialKeyword = '', onBack }) => {
  const [activeType, setActiveType] = useState('社招');
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [isRefreshed, setIsRefreshed] = useState(false);
  
  // --- Filter States ---
  const [selectedCity, setSelectedCity] = useState('全国');
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  
  const [timeFilter, setTimeFilter] = useState<'Any' | '3Days' | 'Week'>('Any');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  
  // Drawer selections
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  // --- Filtering Logic ---
  const filteredJobs = MOCK_AGGREGATED_JOBS.filter(job => {
    // 1. City Filter
    if (selectedCity !== '全国' && !job.city.includes(selectedCity)) {
      return false;
    }
    // 2. Time Filter
    if (timeFilter === '3Days' && !job.isNew) {
      return false;
    }
    // 3. Search Term (Simple check)
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
    }
    return true;
  });

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowLocationSheet(false);
    triggerRefresh();
  };

  const handleTimeSelect = (time: 'Any' | '3Days' | 'Week') => {
    setTimeFilter(time);
    setShowTimeDropdown(false);
    triggerRefresh();
  };

  const triggerRefresh = () => {
    setIsRefreshed(true);
    setTimeout(() => setIsRefreshed(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans relative z-40">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/5 pb-2 pt-16 px-4 shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Row 1: Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-white hidden sm:block">全网职位雷达</h1>
                    
                    {/* Search Input */}
                    <div className="relative group flex-1 sm:w-64">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F59E0B]">
                            <Search size={14} />
                        </div>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="搜索职位/公司"
                            className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]/50 transition-all"
                        />
                    </div>
                </div>

                {/* Track Switcher */}
                <div className="flex bg-slate-800/50 p-1 rounded-lg self-start sm:self-auto w-full sm:w-auto overflow-x-auto">
                    {['社招', '校招', '实习'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                                activeType === type 
                                ? 'bg-[#F59E0B] text-black shadow-lg shadow-amber-500/20' 
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 2: Active Filters Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                
                {/* 1. Location Filter (Interactive) */}
                <button 
                  onClick={() => setShowLocationSheet(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                    selectedCity !== '全国'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                      : 'bg-zinc-800 text-zinc-400 border-transparent hover:border-zinc-600'
                  }`}
                >
                    {selectedCity !== '全国' && <MapPin size={10} className="fill-current" />}
                    {selectedCity} 
                    <ChevronDown size={12} className={`transition-transform ${showLocationSheet ? 'rotate-180' : ''}`} />
                </button>

                {/* 2. Time Filter (Interactive Dropdown) */}
                <div className="relative">
                    <button 
                        onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                            timeFilter !== 'Any' 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                            : 'bg-zinc-800 text-zinc-400 border-transparent hover:border-zinc-600'
                        }`}
                    >
                        {timeFilter === '3Days' ? '3天内发布' : timeFilter === 'Week' ? '本周发布' : '发布时间'} 
                        <ChevronDown size={12} className={`transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Time Dropdown Menu */}
                    <AnimatePresence>
                        {showTimeDropdown && (
                            <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowTimeDropdown(false)} />
                            <motion.div 
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                className="absolute top-full left-0 mt-2 w-36 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden"
                            >
                                <button 
                                  onClick={() => handleTimeSelect('Any')} 
                                  className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-white/5 flex justify-between items-center ${timeFilter === 'Any' ? 'text-blue-400' : 'text-slate-300'}`}
                                >
                                  不限 {timeFilter === 'Any' && <Check size={12} />}
                                </button>
                                <button 
                                  onClick={() => handleTimeSelect('3Days')} 
                                  className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-white/5 flex justify-between items-center ${timeFilter === '3Days' ? 'text-blue-400' : 'text-slate-300'}`}
                                >
                                  3天内 (最新) {timeFilter === '3Days' && <Check size={12} />}
                                </button>
                                <button 
                                  onClick={() => handleTimeSelect('Week')} 
                                  className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-white/5 flex justify-between items-center ${timeFilter === 'Week' ? 'text-blue-400' : 'text-slate-300'}`}
                                >
                                  本周 {timeFilter === 'Week' && <Check size={12} />}
                                </button>
                            </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-4 bg-white/10 flex-shrink-0 mx-1" />

                {/* More Filters Trigger */}
                <button 
                    onClick={() => setShowFilterDrawer(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 border border-transparent hover:border-zinc-600 text-xs font-bold text-zinc-400 hover:text-zinc-200 whitespace-nowrap transition-colors"
                >
                    <SlidersHorizontal size={12} /> 筛选
                </button>

                {/* AI Stats */}
                <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-500 whitespace-nowrap">
                    <Sparkles size={10} className="text-[#F59E0B]" />
                    <span>智能聚合 12k+ 岗位</span>
                </div>
            </div>
        </div>
      </div>

      {/* List Container */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4 pb-32 min-h-[60vh]">
        {isRefreshed ? (
           <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <RefreshCcw className="animate-spin mb-2" size={24} />
              <p className="text-xs">重新扫描星域...</p>
           </div>
        ) : filteredJobs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                 <Search size={24} className="opacity-50" />
              </div>
              <p className="text-sm font-bold text-slate-400">未找到匹配岗位</p>
              <p className="text-xs mt-1">试着调整筛选条件或扩大搜索范围</p>
              <button onClick={() => { setSelectedCity('全国'); setTimeFilter('Any'); setSearchTerm(''); }} className="mt-4 px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold text-white hover:bg-slate-700">
                 清除所有筛选
              </button>
           </div>
        ) : (
          filteredJobs.map((job, index) => (
            <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 rounded-xl p-5 cursor-pointer transition-all duration-300 overflow-hidden"
            >
                {/* AI Match Badge */}
                <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 rounded-bl-xl border-l border-b border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold font-mono ${job.match >= 90 ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                            {job.match}%
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Match</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-1 mb-3 pr-20">
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                        <span className="text-[#F59E0B] font-mono font-bold text-base">{job.salary}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                        <div className="flex items-center gap-1">
                            <Building2 size={14} /> {job.company}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{job.city}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{job.exp}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-white/5 text-slate-300">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300">{job.source}</span>
                        <span className={`flex items-center gap-1 ${
                            job.isNew ? 'text-emerald-400 font-bold' : ''
                        }`}>
                            <Clock size={10} /> {job.time}
                        </span>
                    </div>
                </div>

                {/* AI Insight Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1e293b] border-t border-blue-500/30 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400">
                        <Sparkles size={14} />
                    </div>
                    <p className="text-xs text-slate-200">
                        <span className="text-blue-400 font-bold">AI 洞察: </span>
                        {job.aiReason}
                    </p>
                </div>
            </motion.div>
          ))
        )}
      </div>

      {/* LOCATION BOTTOM SHEET */}
      <AnimatePresence>
        {showLocationSheet && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
               onClick={() => setShowLocationSheet(false)}
            />
            <motion.div 
               initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className="fixed bottom-0 left-0 right-0 bg-[#1c1c1e] rounded-t-[32px] z-50 border-t border-white/10 p-6 pb-12 max-h-[80vh] overflow-y-auto"
            >
               <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6" />
               
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">选择城市</h3>
                  <button onClick={() => setShowLocationSheet(false)} className="p-2 bg-zinc-800 rounded-full text-zinc-400">
                     <X size={18} />
                  </button>
               </div>

               {/* Current Location */}
               <div className="mb-6">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3">当前定位</h4>
                  <button 
                    onClick={() => handleCitySelect('北京')}
                    className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border border-blue-500/30 text-blue-400 rounded-xl w-full text-sm font-bold"
                  >
                     <Navigation size={14} className="fill-current" /> 北京市朝阳区
                  </button>
               </div>

               {/* Hot Cities Grid */}
               <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-1">
                     <Flame size={12} className="text-amber-500" /> 热门城市
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                     {HOT_CITIES.map(city => (
                        <button
                           key={city}
                           onClick={() => handleCitySelect(city)}
                           className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                              selectedCity === city
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                              : 'bg-zinc-800 border-transparent text-zinc-300 hover:bg-zinc-700'
                           }`}
                        >
                           {city}
                        </button>
                     ))}
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FILTER DRAWER (Existing) */}
      <AnimatePresence>
        {showFilterDrawer && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    onClick={() => setShowFilterDrawer(false)}
                />
                <motion.div 
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 rounded-t-3xl z-50 p-6 max-h-[85vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white">高级筛选</h2>
                        <button onClick={() => setShowFilterDrawer(false)} className="p-2 bg-slate-800 rounded-full text-slate-400">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Degree Section */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">学历要求</h3>
                            <div className="flex flex-wrap gap-2">
                                {['大专', '本科', '硕士', '博士'].map(deg => (
                                    <button 
                                        key={deg}
                                        onClick={() => {
                                            if (selectedDegrees.includes(deg)) setSelectedDegrees(selectedDegrees.filter(d => d !== deg));
                                            else setSelectedDegrees([...selectedDegrees, deg]);
                                        }}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                                            selectedDegrees.includes(deg) 
                                            ? 'bg-[#F59E0B] border-[#F59E0B] text-black' 
                                            : 'bg-slate-800 border-slate-700 text-slate-300'
                                        }`}
                                    >
                                        {deg}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Company Type Section */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">公司性质</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {['大厂/独角兽', '国企/事业单位', '外企', '早期创业'].map(type => (
                                    <button key={type} className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500">
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Work Mode */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">工作方式</h3>
                            <div className="space-y-2">
                                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
                                    <span className="text-sm text-slate-200">接受远程办公 (Remote)</span>
                                    <div className="w-5 h-5 rounded border border-slate-500" />
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Drawer Footer Actions */}
                    <div className="sticky bottom-0 mt-8 pt-4 border-t border-white/10 flex gap-4 bg-[#0F172A]">
                        <button className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm">重置</button>
                        <button 
                            onClick={() => setShowFilterDrawer(false)} 
                            className="flex-[2] py-3 rounded-xl bg-[#F59E0B] text-black font-bold text-sm shadow-lg shadow-amber-500/20"
                        >
                            确认筛选
                        </button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AggregatedJobList;
