
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ArrowRight, Sparkles, Wind, Briefcase, Zap } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { SCENARIO_QUESTIONS } from '../constants';
import DigitalTwin from './DigitalTwin';
import { CareerGenome, TraitRadar, ScenarioOption } from '../types';

interface Props {
  onComplete: (data: { 
    traits: TraitRadar;
    genome: CareerGenome;
  }) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'scenario' | 'result'>('intro');
  const [qIndex, setQIndex] = useState(0);
  
  // O-P-D-I Scoring State
  const [traits, setTraits] = useState<TraitRadar>({
    visual: 50, logic: 50, empathy: 50, grit: 50, ambition: 50, creativity: 50
  });

  // Job Cloud State (Keywords floating)
  const [jobCloud, setJobCloud] = useState<string[]>([]);

  const handleStart = () => {
    setPhase('scenario');
  };

  const handleOptionSelect = (option: ScenarioOption) => {
    // 1. Update Traits
    const traitMods = option.traits;
    setTraits(prev => {
      const next = { ...prev };
      (Object.keys(traitMods) as Array<keyof TraitRadar>).forEach(key => {
        if (traitMods[key]) {
           next[key] = Math.max(0, Math.min(100, next[key] + traitMods[key]!));
        }
      });
      return next;
    });

    // 2. Update Job Cloud (Add new keywords, keep last 8)
    const newKeywords = [...option.keywords, ...jobCloud].slice(0, 10);
    setJobCloud(newKeywords);

    // 3. Move to Next Question
    if (qIndex < SCENARIO_QUESTIONS.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      setTimeout(() => setPhase('result'), 500);
    }
  };

  const getCareerCluster = () => {
    const sortedTraits = Object.entries(traits).sort((a, b) => (b[1] as number) - (a[1] as number));
    const t1 = sortedTraits[0][0];
    const t2 = sortedTraits[1][0];

    // Logic for Broad Clusters
    let archetype = "全能探索者 (Generalist)";
    let description = "你拥有均衡的适应力，能够胜任多变的角色。";
    let coreTrack = "项目管理 / 运营";
    let surpriseTrack = "咨询顾问";

    // High Empathy + Ambition -> People Leader
    if (['empathy', 'ambition'].includes(t1) && ['empathy', 'ambition'].includes(t2)) {
        archetype = "引力领袖 (The Influencer)";
        description = "你擅长处理'人'的问题。无论是销售谈判还是团队激励，你都能游刃有余。";
        coreTrack = "大客户销售 / HRBP";
        surpriseTrack = "公关 (PR) / 投资者关系";
    }
    // High Logic + Grit -> Tech/Engineering
    else if (['logic', 'grit'].includes(t1) && ['logic', 'grit'].includes(t2)) {
        archetype = "坚毅架构师 (The Builder)";
        description = "你喜欢处理'事'和'数据'。混乱的局面在你手中会变得井井有条。";
        coreTrack = "后端开发 / 供应链管理";
        surpriseTrack = "法务合规 / 审计";
    }
    // High Visual/Creative + Empathy -> Design/User
    else if (['visual', 'creativity', 'empathy'].includes(t1) && ['visual', 'creativity', 'empathy'].includes(t2)) {
        archetype = "灵魂设计师 (Soul Designer)";
        description = "你对'体验'和'美'有极高的敏感度。你能创造出打动人心的产品。";
        coreTrack = "产品经理 / UI设计";
        surpriseTrack = "活动策划 / 编辑";
    }
    // High Logic + Ambition -> Strategy
    else if (['logic', 'ambition'].includes(t1)) {
        archetype = "破局战略家 (The Strategist)";
        description = "你拥有宏观视野和逻辑穿透力，适合解决复杂的商业问题。";
        coreTrack = "商业分析 / 战略咨询";
        surpriseTrack = "金融投资";
    }

    return { archetype, description, coreTrack, surpriseTrack };
  };

  const { archetype, description, coreTrack, surpriseTrack } = getCareerCluster();

  const handleFinish = () => {
    onComplete({
        traits: traits,
        genome: { primary: archetype, secondary: coreTrack, hidden: surpriseTrack }
    });
  };

  // --- INTRO PHASE ---
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] relative z-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
         <DigitalTwin 
            user={{
              name: "Visitor",
              title: "Initializing...",
              level: 0,
              traits: traits,
              hiddenPotential: [],
              activeMission: ""
            }} 
            variant="hero" 
            onDiagnose={handleStart} 
         />
         <div className="mt-16 text-center space-y-4">
            <h2 className="text-3xl font-light text-white tracking-tight">Orbit <span className="text-zinc-600">Scan</span></h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-8 bg-zinc-800" />
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-medium">Life-Metaphor Assessment</p>
                <div className="h-[1px] w-8 bg-zinc-800" />
            </div>
         </div>
      </div>
    );
  }

  // --- RESULT PHASE (Cluster View) ---
  if (phase === 'result') {
    const radarData = [
        { subject: 'Visual', A: traits.visual, fullMark: 100 },
        { subject: 'Logic', A: traits.logic, fullMark: 100 },
        { subject: 'Empathy', A: traits.empathy, fullMark: 100 },
        { subject: 'Grit', A: traits.grit, fullMark: 100 },
        { subject: 'Ambition', A: traits.ambition, fullMark: 100 },
        { subject: 'Create', A: traits.creativity, fullMark: 100 },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-xl mx-auto px-4 pb-20">
         <motion.div 
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="w-full bg-zinc-900 rounded-[40px] p-8 border border-white/5 relative overflow-hidden"
         >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 blur-[80px]" />

            <div className="relative z-10">
                <div className="text-center mb-6">
                    <div className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2">Cluster Identification</div>
                    <h2 className="text-2xl font-medium text-white tracking-wide">{archetype}</h2>
                    <p className="text-zinc-400 text-xs mt-2 font-light px-4">{description}</p>
                </div>

                <div className="h-[200px] w-full relative mb-6">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="My Traits" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Career Tracks */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">推荐赛道 (Core)</div>
                            <div className="text-white font-medium">{coreTrack}</div>
                         </div>
                         <Briefcase className="text-zinc-600" size={20} />
                    </div>
                    <div className="bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <div className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                <Sparkles size={10} /> 跨界惊喜 (Surprise)
                            </div>
                            <div className="text-amber-100 font-medium">{surpriseTrack}</div>
                         </div>
                         <Wind className="text-amber-500" size={20} />
                    </div>
                </div>

                <button 
                    onClick={handleFinish}
                    className="w-full py-4 bg-white text-black font-medium rounded-2xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                    <Fingerprint size={18} /> Enter Dashboard
                </button>
            </div>
         </motion.div>
      </div>
    );
  }

  // --- SCENARIO PHASE (New) ---
  const currentQ = SCENARIO_QUESTIONS[qIndex];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full relative px-6 max-w-2xl mx-auto">
       
       {/* Progress Pill */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-zinc-900/80 border border-white/10 px-4 py-1 rounded-full backdrop-blur-md z-20">
          <span className="text-[10px] font-mono text-zinc-400">SCENARIO {qIndex + 1} / {SCENARIO_QUESTIONS.length}</span>
       </div>

       {/* Scenario Card */}
       <AnimatePresence mode="wait">
         <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full"
         >
            {/* Context Header */}
            <div className="text-center mb-8">
               <h3 className="text-2xl font-light text-white mb-4 leading-snug">
                  {currentQ.context}
               </h3>
               <p className="text-zinc-500 text-sm">{currentQ.question}</p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {currentQ.options.map((opt, idx) => (
                  <motion.button
                     key={opt.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     onClick={() => handleOptionSelect(opt)}
                     className="group relative flex flex-col items-start p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl transition-all text-left"
                  >
                     <div className="absolute top-4 right-4 text-zinc-600 group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                     </div>
                     <span className="text-white font-medium text-lg mb-2 group-hover:text-blue-200 transition-colors">
                        {opt.text}
                     </span>
                     <span className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                        {opt.description}
                     </span>
                  </motion.button>
               ))}
            </div>
         </motion.div>
       </AnimatePresence>

       {/* Job Cloud (Floating Feedback) */}
       <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="relative w-full h-full max-w-3xl mx-auto">
             {jobCloud.map((word, i) => (
                <motion.div
                   key={`${word}-${i}`}
                   initial={{ opacity: 0, y: 50, x: (Math.random() - 0.5) * 100 }}
                   animate={{ opacity: [0, 1, 0], y: -50 }}
                   transition={{ duration: 4, ease: "easeOut" }}
                   className="absolute bottom-10 text-zinc-500 text-sm font-bold whitespace-nowrap"
                   style={{ left: `${(i * 20) % 80 + 10}%` }}
                >
                   {word}
                </motion.div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Onboarding;
