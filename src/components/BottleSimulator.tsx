import React, { useState, useEffect } from 'react';
import { Perfume } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ShieldCheck, HelpCircle } from 'lucide-react';

interface BottleSimulatorProps {
  perfume: Perfume;
  engravingText: string;
  setEngravingText: (val: string) => void;
  engravingTypeface: 'serif' | 'italic' | 'arabic-gold';
  setEngravingTypeface: (val: 'serif' | 'italic' | 'arabic-gold') => void;
  laserIntensity: number;
  setLaserIntensity: (val: number) => void;
}

export const BottleSimulator: React.FC<BottleSimulatorProps> = ({
  perfume,
  engravingText,
  setEngravingText,
  engravingTypeface,
  setEngravingTypeface,
  laserIntensity,
  setLaserIntensity,
}) => {
  const [isEtching, setIsEtching] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 30 });

  // Simulate premium laser etching beam on text changes
  useEffect(() => {
    if (engravingText) {
      setIsEtching(true);
      const timer = setTimeout(() => setIsEtching(false), 900);
      return () => clearTimeout(timer);
    }
  }, [engravingText, engravingTypeface]);

  // Handle subtle tilt reflection mimicking physical glass
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x, y });
  };

  const getFontClass = () => {
    switch (engravingTypeface) {
      case 'italic':
        return 'font-serif italic tracking-[0.2em] font-light capitalize text-[#dfc27d]';
      case 'arabic-gold':
        return 'font-serif tracking-[0.4em] font-normal uppercase text-[#dfc27d] bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
      case 'serif':
      default:
        return 'font-serif uppercase tracking-[0.3em] font-medium text-[#f3e8ff]';
    }
  };

  return (
    <div className="bg-[#12100e]/85 rounded-3xl border border-[#c5a85c]/30 p-6 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]" id="bottle-simulator-container">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a85c] font-bold">J. Atelier Services</span>
          <h4 className="text-sm font-semibold text-white">Laser Engraving Flacon Simulator</h4>
        </div>
        <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[#dfc27d] font-mono">
          Complimentary
        </span>
      </div>

      {/* 3D Glass Bottle Stage */}
      <div 
        className="relative h-[340px] md:h-[380px] bg-radial from-[#1e1a15] to-[#0a0807] rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden cursor-crosshair group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGlarePosition({ x: 50, y: 30 })}
      >
        {/* Decorative Grid coordinates */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Dynamic Studio Spotlights */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#c5a85c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 right-1/4 w-36 h-36 bg-[#8a1c32]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Laser Cut Beam Simulation line */}
        <AnimatePresence>
          {isEtching && (
            <motion.div
              initial={{ top: '35%', opacity: 0 }}
              animate={{ top: ['35%', '65%', '45%'], opacity: [0.8, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/10 right-1/10 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] z-30 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Entire physical Bottle Assembly */}
        <div className="relative flex flex-col items-center">
          
          {/* Glass Stopper Cap */}
          <div className="relative w-16 h-10 rounded-t-lg bg-gradient-to-r from-amber-400 via-[#e0c068] to-amber-600 border border-[#c5a85c]/50 flex flex-col items-center shadow-lg">
            {/* Fine ridges */}
            <div className="w-full h-1 border-b border-[#000]/15" />
            <div className="w-full h-2 border-b border-[#000]/15" />
            <div className="w-full h-2 border-b border-[#2d2011]/15" />
            <span className="text-[7.5px] uppercase tracking-widest font-mono text-[#403010] mt-1 font-bold">J. PARIS</span>
            <div className="absolute -bottom-1 h-1.5 w-10 bg-[#3a2010] border-x border-[#c5a85c]/30" />
          </div>

          {/* Golden Collar Ribbon Ring */}
          <div className="w-12 h-2.5 bg-gradient-to-r from-amber-300 to-amber-700 border-x border-[#c5a85c] relative z-10 shadow-sm" />

          {/* Heavy Glass Flacon Body */}
          <div 
            className={`w-[155px] h-[210px] rounded-2xl bg-gradient-to-b ${perfume.bottleColor} border-2 border-white/20 p-3 relative flex flex-col justify-between items-center transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.85)]`}
            style={{
              boxShadow: `0 30px 60px rgba(0,0,0,0.85), inset 0 0 25px rgba(255,255,255,0.08), 0 0 10px ${perfume.accentColor}1d`
            }}
          >
            {/* Real Glass Shiny Glare reflection strip (Follows mouse cursor) */}
            <div 
              className="absolute inset-0.5 rounded-[14px] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40 pointer-events-none mix-blend-overlay z-10 duration-200"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
              }}
            />

            {/* Inner Liquid Chamber Depth outline */}
            <div className="absolute inset-2 bg-black/10 rounded-[10px] border border-white/5 pointer-events-none" />

            {/* Premium Gold Emblem Sticker */}
            <div className="w-full text-center mt-3 relative z-10">
              <span className="text-[7.5px] tracking-[0.25em] font-mono text-[#dfc27d]/75 uppercase block mb-0.5">
                {perfume.collection}
              </span>
              <h5 className="font-serif text-[13px] text-white tracking-widest uppercase font-semibold leading-tight px-1 text-center font-bold">
                {perfume.name}
              </h5>
              <div className="w-9 h-[0.5px] bg-[#dfc27d]/40 mx-auto mt-1" />
              <span className="text-[8px] font-mono text-[#dfc27d]/80 uppercase block mt-1">
                {perfume.concentration}
              </span>
            </div>

            {/* CUSTOM LASER ENGRAVED PLOT PLACEHOLDER */}
            <div className="w-full text-center py-2 relative z-20 flex flex-col items-center justify-center min-h-[50px] mb-3">
              {engravingText ? (
                <div className="relative">
                  {/* Dynamic laser burn glow */}
                  <motion.p 
                    className={`${getFontClass()} text-xs text-center break-words select-none transition-all`}
                    style={{
                      textShadow: `0 0 ${laserIntensity / 2}px ${perfume.accentColor}dd`,
                      opacity: Math.max(0.4, laserIntensity / 20)
                    }}
                    animate={isEtching ? { scale: [1, 1.06, 1], filter: 'brightness(1.5)' } : {}}
                  >
                    {engravingText}
                  </motion.p>
                  {isEtching && (
                    <span className="absolute -right-2 top-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[1px] animate-ping" />
                  )}
                </div>
              ) : (
                <div className="opacity-25 border border-dashed border-white/20 p-2 rounded-lg py-1.5">
                  <span className="text-[8px] tracking-wider uppercase font-mono text-white block">
                    No Monogram
                  </span>
                  <span className="text-[6.5px] text-stone-400 font-mono">Type lettering below</span>
                </div>
              )}
            </div>

            {/* Bottle Liquid Volume Indicator */}
            <div className="absolute bottom-4 text-[7px] font-mono text-white/30 tracking-widest">
              75% FL. OZ. • ATELIER J.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Customization Dashboard CONTROLS */}
      <div className="flex flex-col gap-4 bg-[#1a1613] p-4 rounded-2xl border border-white/5">
        {/* Custom words input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-stone-400 font-bold uppercase">Etching Text (Max 14 Chars)</span>
            <span className="text-[#dfc27d]">{engravingText.length}/14 chars</span>
          </div>
          <input
            type="text"
            value={engravingText}
            onChange={(e) => setEngravingText(e.target.value.slice(0, 14))}
            placeholder="e.g. EMERALD G."
            className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#0f0d0b] text-xs text-amber-100 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-[#c5a85c] focus:border-[#c5a85c] font-mono uppercase tracking-widest transition-all"
            id="engraving-text-input"
          />
        </div>

        {/* Typeface Selector buttons */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-mono text-stone-400 font-bold block">Typeface Calligraphy</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'serif', label: 'Classic Serif' },
              { id: 'italic', label: 'Cursive Script' },
              { id: 'arabic-gold', label: 'Majestic Gold' },
            ].map((font) => (
              <button
                key={font.id}
                onClick={() => setEngravingTypeface(font.id as any)}
                className={`py-2 px-1 rounded-xl border text-[9.5px] tracking-wider transition-all text-center cursor-pointer ${
                  engravingTypeface === font.id
                    ? 'bg-[#c5a85c]/10 text-[#dfc27d] border-[#c5a85c] font-bold shadow-[0_0_10px_rgba(197,168,92,0.15)]'
                    : 'bg-black/20 text-stone-400 border-white/5 hover:text-[#dfc27d]'
                }`}
                id={`font-btn-${font.id}`}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>

        {/* Laser Etch Energy slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-stone-400 font-bold uppercase">Etching Depth Intensity</span>
            <span className="text-[#dfc27d] font-bold">{laserIntensity * 4.5} Joules</span>
          </div>
          <input
            type="range"
            min={4}
            max={24}
            value={laserIntensity}
            onChange={(e) => setLaserIntensity(Number(e.target.value))}
            className="w-full h-1.5 bg-[#0d0b09] rounded-lg appearance-none cursor-pointer accent-[#c5a85c] border border-white/5"
            id="intensity-range-slider"
          />
          <div className="flex justify-between text-[8px] font-mono text-stone-500 uppercase mt-0.5">
            <span>Matte Frost</span>
            <span>Deep Gilded Solder</span>
          </div>
        </div>

        {/* Guarantees */}
        <div className="flex items-start gap-2 pt-1 border-t border-white/5 text-[9px] text-stone-400 font-sans leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            Laser-etched calligraphy is applied directly to the master-glass bottle by expert J. artisans. Non-volatile, completely resistant to wear or perfume oils.
          </p>
        </div>
      </div>
    </div>
  );
};
