
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AI_SCRIPTS } from '../constants';

interface Props {
  step: number;
}

const AIDialogue: React.FC<Props> = ({ step }) => {
  const [displayedText, setDisplayedText] = useState('');
  const script = AI_SCRIPTS[step as keyof typeof AI_SCRIPTS];
  
  useEffect(() => {
    setDisplayedText('');
    
    if (!script) return;

    let textIndex = 0;
    const textTimer = setInterval(() => {
      setDisplayedText(script.text.slice(0, textIndex + 1));
      textIndex++;
      if (textIndex >= script.text.length) {
        clearInterval(textTimer);
      }
    }, 20); // Faster, smoother typing

    return () => {
      clearInterval(textTimer);
    };
  }, [step, script]);

  if (!script) return null;

  return (
    <div className="w-full max-w-lg mx-auto mb-16 relative z-20 px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        className="inline-block"
      >
        {/* Minimalist Glass Card */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">
           <p className="text-sm md:text-base text-zinc-200 font-light leading-relaxed tracking-wide">
             {displayedText}
             <span className="inline-block w-0.5 h-4 ml-1 bg-white/50 animate-pulse align-middle" />
           </p>
        </div>
        
        {/* Subtext Action - Extremely subtle */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-[10px] text-zinc-500 uppercase tracking-[0.2em]"
        >
            {script.action}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AIDialogue;
