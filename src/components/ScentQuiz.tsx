import React, { useState } from 'react';
import { QuizQuestion, Perfume } from '../types';
import { OLFACTORY_PERSONALITY_QUIZ, PERFUMES_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Heart, Flame, Compass, BadgeCheck } from 'lucide-react';

interface ScentQuizProps {
  onSelectPerfume: (p: Perfume) => void;
  activePerfumeId: string;
}

export const ScentQuiz: React.FC<ScentQuizProps> = ({ onSelectPerfume, activePerfumeId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchedPerfume, setMatchedPerfume] = useState<Perfume | null>(null);

  const handleSelectOption = (value: string) => {
    const updatedAnswers = { ...answers, [currentStep]: value };
    setAnswers(updatedAnswers);

    if (currentStep < OLFACTORY_PERSONALITY_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate matching perfume
      // Simple heuristic: match the Olfactory Accord/Preference and matching attributes
      const prefFamily = updatedAnswers[0] || 'oriental'; // Ques 1
      const prefGender = updatedAnswers[1] || 'unisex'; // Ques 2
      const prefIngredient = updatedAnswers[2] || 'oriental'; // Ques 3

      // Filter and score perfumes
      let bestMatch = PERFUMES_DATA[0];
      let bestScore = -1;

      PERFUMES_DATA.forEach((p) => {
        let score = 0;
        // Check accords match
        if (p.accords.some(acc => acc.toLowerCase() === prefFamily.toLowerCase())) score += 3;
        if (p.accords.some(acc => acc.toLowerCase() === prefIngredient.toLowerCase())) score += 2;
        // Check gender match
        if (p.gender === prefGender || p.gender === 'unisex') score += 2;
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = p;
        }
      });

      setMatchedPerfume(bestMatch);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setQuizFinished(false);
    setMatchedPerfume(null);
  };

  return (
    <div className="bg-gradient-to-br from-[#120d09] to-[#0a0807] rounded-3xl border border-[#c5a85c]/35 p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.65)] relative overflow-hidden" id="olfactory-personality-quiz">
      
      {/* Decorative luxury gold backdrop glow */}
      <div className="absolute right-0 top-0 w-44 h-44 bg-[#c5a85c]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-rose-900/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Finished State Screen */}
      <AnimatePresence mode="wait">
        {quizFinished && matchedPerfume ? (
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-4 relative z-10"
          >
            {/* Crown Motif */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-600 via-[#e2c16a] to-yellow-500 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(197,168,92,0.3)] mb-4 animate-bounce-slow">
              <Compass className="w-8 h-8 text-[#1c140c]" />
            </div>

            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#dfc27d] font-bold">
              Diagnosis Completed
            </span>
            <h3 className="text-2xl font-serif text-white font-semibold tracking-wide mt-1">
              Your Olfactory Signature
            </h3>
            
            <p className="text-xs text-stone-400 max-w-[450px] mt-2 font-sans leading-relaxed">
              Based on your custom preference nodes, our Master Perfumer recommends the following J. masterpiece reflecting your cosmic spirit:
            </p>

            {/* Matching Product Card */}
            <div className="w-full max-w-sm bg-gradient-to-br from-[#1a1511] to-[#0c0908] p-5 rounded-2xl border border-[#c5a85c]/25 my-6 text-left flex gap-4 items-center relative overflow-hidden group">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/5 relative shadow-inner">
                <img 
                  src={matchedPerfume.imageUrl} 
                  alt={matchedPerfume.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent" />
              </div>
              
              <div className="flex-1 min-w-0">
                <span className="text-[8px] font-mono tracking-widest text-[#dfc27d] uppercase">{matchedPerfume.collection}</span>
                <h4 className="text-sm font-semibold text-[#f8fafc] tracking-wide truncate">{matchedPerfume.name}</h4>
                <p className="text-[10.5px] text-[#dfc27d] font-mono mt-0.5">{matchedPerfume.character}</p>
                <p className="text-[10px] text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {matchedPerfume.description}
                </p>
              </div>

              {/* Verified badge */}
              <div className="absolute right-4 top-4">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  onSelectPerfume(matchedPerfume);
                  const activeSection = document.getElementById('perfume-detail-workspace');
                  if (activeSection) {
                    activeSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-yellow-600 via-[#e2c16a] to-yellow-500 text-[#120a04] font-bold text-xs rounded-xl shadow-[0_6px_15px_rgba(217,119,6,0.3)] transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                id="adopt-quiz-sig-btn"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Adopt as My Signature Flacon</span>
              </button>
              
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-stone-300 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                id="retake-quiz-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`quiz-step-${currentStep}`}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {/* Header step counter */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#c5a85c] font-bold block">
                  Olfactory Profiling
                </span>
                <h3 className="text-xl font-serif text-white font-semibold tracking-wide">
                  Diagnose Your Scent Identity
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-500 font-bold bg-[#1d1611] px-2 py-1 rounded-lg border border-white/5">
                Step {currentStep + 1} of {OLFACTORY_PERSONALITY_QUIZ.length}
              </span>
            </div>

            {/* Question description */}
            <p className="text-sm font-sans text-stone-200 tracking-wide mb-6">
              {OLFACTORY_PERSONALITY_QUIZ[currentStep].text}
            </p>

            {/* Structured Options Grid list with descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OLFACTORY_PERSONALITY_QUIZ[currentStep].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full text-left p-4 rounded-2xl bg-black/35 border border-white/5 hover:border-[#c5a85c]/60 hover:bg-[#c5a85c]/5 transition-all text-stone-300 hover:text-white relative flex gap-3 group cursor-pointer"
                  id={`quiz-opt-${currentStep}-${oIdx}`}
                >
                  <span className="text-2xl bg-white/5 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-[#c5a85c]/10 transition-all flex items-center justify-center h-11 w-11 flex-shrink-0">
                    {opt.icon}
                  </span>
                  
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-[#f8fafc] block leading-snug tracking-wide">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5 leading-normal">
                      {opt.description}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-[#dfc27d] transition-all absolute right-4 top-1/2 -translate-y-1/2" />
                </button>
              ))}
            </div>

            {/* Step Progress indicators */}
            <div className="mt-8 flex gap-1.5 items-center justify-center">
              {OLFACTORY_PERSONALITY_QUIZ.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-6 bg-[#dfc27d]'
                      : idx < currentStep
                      ? 'w-1.5 bg-[#dfc27d]/40'
                      : 'w-1.5 bg-stone-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
