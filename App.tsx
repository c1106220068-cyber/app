
import React, { useState } from 'react';
import Stepper from './components/Stepper';
import BentoDashboard from './components/BentoDashboard';
import JobDetailPanel from './components/JobDetailPanel';
import MissionControl from './components/MissionControl';
import AIDialogue from './components/AIDialogue';
import Onboarding from './components/Onboarding';
import AggregatedJobList from './components/AggregatedJobList'; 
import ExploreTab from './components/ExploreTab';
import ProfileHub from './components/ProfileHub';
import ResumeDeck from './components/ResumeDeck'; // Import ResumeDeck
import BackgroundShader from './components/BackgroundShader'; // Import BackgroundShader
import { MOCK_USER, JOB_POOL } from './constants';
import { Job, UserProfile, CareerGenome, TraitRadar } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Diagnosis (Onboarding), 2+: Main App
  const [activeTab, setActiveTab] = useState<'overview' | 'explore' | 'me'>('overview');
  
  // Sub-page state
  const [activeSubPage, setActiveSubPage] = useState<'none' | 'resume-deck'>('none');

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAggregatedSearch, setShowAggregatedSearch] = useState(false); 
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // State for dynamic data
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [jobs, setJobs] = useState<Job[]>([]);

  // STAGE 1: Onboarding Complete -> Calculate Matches -> Go to Stage 2
  const handleOnboardingComplete = (data: { 
    traits: TraitRadar;
    genome: CareerGenome;
  }) => {
    // 1. Update User Profile with Genome & Traits
    const updatedUser = {
      ...user,
      traits: data.traits,
      genome: data.genome,
      title: `${data.genome.primary}`,
      hiddenPotential: [data.genome.secondary, "多元引力"]
    };
    setUser(updatedUser);

    // 2. Score and Filter Jobs using Trait Gravity Algorithm
    const scoredJobs = JOB_POOL.map(job => {
      let totalDiffSq = 0;
      let keys = Object.keys(job.requiredTraits) as Array<keyof TraitRadar>;
      
      keys.forEach(key => {
        const diff = (job.requiredTraits[key] || 50) - (data.traits[key] || 50);
        totalDiffSq += diff * diff;
      });

      const maxDistSq = 6 * 2500; 
      const dist = Math.sqrt(totalDiffSq);
      const maxDist = Math.sqrt(maxDistSq);
      
      let matchScore = 100 - (dist / maxDist) * 100;
      matchScore = Math.max(10, Math.min(98, Math.round(matchScore)));

      if (job.requiredTraits.creativity > 80 && data.traits.creativity > 80) matchScore += 5;
      if (job.requiredTraits.logic > 80 && data.traits.logic > 80) matchScore += 5;

      return { ...job, matchScore: Math.min(100, matchScore) };
    });

    const topJobs = scoredJobs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
    setJobs(topJobs);

    setStep(2);
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setStep(3);
  };

  const handleBoostComplete = () => {
     setTimeout(() => setStep(4), 2000);
  };

  const closeJobPanel = () => {
    setSelectedJob(null);
    setStep(2); 
  };

  const handleShowAllJobs = (keyword: string = '') => {
    setSearchKeyword(keyword);
    setShowAggregatedSearch(true);
    setSelectedJob(null);
  };

  const handleBackFromAggregated = () => {
    setShowAggregatedSearch(false);
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black relative overflow-hidden text-white">
      
      {/* Dynamic Background */}
      <BackgroundShader />

      {/* Global Stepper - Only for Onboarding */}
      {!showAggregatedSearch && activeSubPage === 'none' && step === 1 && <Stepper currentStep={step} />}

      <main className="relative z-10 w-full min-h-screen flex flex-col pb-32">
        
        {/* SUB-PAGES (OVERLAYS) */}
        <AnimatePresence>
          {activeSubPage === 'resume-deck' && (
             <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-50 overflow-y-auto bg-black"
             >
                <ResumeDeck onBack={() => setActiveSubPage('none')} />
             </motion.div>
          )}
        </AnimatePresence>

        {/* AGGREGATED JOB LIST VIEW */}
        {showAggregatedSearch ? (
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 overflow-y-auto bg-black"
            >
               <AggregatedJobList 
                 initialKeyword={searchKeyword} 
                 onBack={handleBackFromAggregated} 
               />
            </motion.div>
        ) : (
            <>
                {/* AI Guided Dialogue only in Step 1 */}
                {step === 1 && (
                    <div className="max-w-4xl mx-auto w-full pt-20 px-4">
                        <AIDialogue step={step} />
                    </div>
                )}

                {/* STAGE 1: DIAGNOSIS (Onboarding) */}
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                    key="stage-1"
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto w-full pt-4"
                    >
                    <Onboarding onComplete={handleOnboardingComplete} />
                    </motion.div>
                )}
                </AnimatePresence>

                {/* STAGE 2+: MAIN TABS (DASHBOARD / EXPLORE / ME) */}
                {step >= 2 && activeSubPage === 'none' && (
                   <>
                      {/* TAB: OVERVIEW (Dashboard) */}
                      {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <BentoDashboard 
                                user={user} 
                                jobs={jobs} 
                                onSelectJob={handleJobSelect} 
                                onShowAllJobs={() => handleShowAllJobs()}
                            />
                        </motion.div>
                      )}

                      {/* TAB: EXPLORE (New) */}
                      {activeTab === 'explore' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <ExploreTab />
                        </motion.div>
                      )}

                       {/* TAB: ME (Profile Hub) */}
                       {activeTab === 'me' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                           <ProfileHub user={user} onOpenResumeDeck={() => setActiveSubPage('resume-deck')} />
                        </motion.div>
                      )}
                   </>
                )}

                {/* STAGE 3: BOOSTING PANEL (Job Detail - Overlay) */}
                <AnimatePresence>
                {selectedJob && (
                    <JobDetailPanel 
                    job={selectedJob} 
                    user={user}
                    onClose={closeJobPanel} 
                    mode={step === 3 ? 'boost' : 'view'}
                    onBoostComplete={handleBoostComplete}
                    onShowAllJobs={handleShowAllJobs} 
                    />
                )}
                </AnimatePresence>

                {/* STAGE 4: LANDING (Success) */}
                {step === 4 && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
                        <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center p-8 border border-white/10 bg-zinc-900 rounded-[32px] max-w-md mx-4"
                        >
                        <h1 className="text-3xl font-light text-white mb-2">Orbit Established</h1>
                        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                            Your career trajectory has been recalibrated.
                        </p>
                        <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors">
                            Launch
                        </button>
                        </motion.div>
                    </div>
                )}
            </>
        )}

      </main>

      {/* Floating Dock - Visible in Dashboard */}
      {step >= 2 && !showAggregatedSearch && activeSubPage === 'none' && (
         <MissionControl activeTab={activeTab} onTabChange={setActiveTab} />
      )}

    </div>
  );
};

export default App;
