import React, { useState, useEffect } from 'react';
import { Perfume, CartItem, OlfactoryFamily, Review } from './types';
import { PERFUMES_DATA, SCENT_ACCORDS_LIST } from './data';
import { BottleSimulator } from './components/BottleSimulator';
import { ScentQuiz } from './components/ScentQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Compass, 
  Sparkles, 
  Layers, 
  Star, 
  ChevronRight, 
  Check, 
  Truck, 
  Inbox, 
  RotateCcw,
  Plus,
  Minus,
  MessageSquare,
  Gift,
  Flame,
  Info
} from 'lucide-react';

export default function App() {
  // --- STATE MOTIFS ---
  const [perfumes, setPerfumes] = useState<Perfume[]>(PERFUMES_DATA);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume>(PERFUMES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFamily, setActiveFamily] = useState<OlfactoryFamily>('all');
  
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [engravingText, setEngravingText] = useState('');
  const [engravingTypeface, setEngravingTypeface] = useState<'serif' | 'italic' | 'arabic-gold'>('serif');
  const [laserIntensity, setLaserIntensity] = useState<number>(12);
  const [giftWrapped, setGiftWrapped] = useState(false);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Review form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  // Scent explorer visual tab
  const [activeNotesSubTab, setActiveNotesSubTab] = useState<'all' | 'top' | 'heart' | 'base'>('all');

  // Checkout interactive progress steps
  const [checkoutStage, setCheckoutStage] = useState<'idle' | 'maceration' | 'etching' | 'dispatch' | 'completed'>('idle');

  // --- DERIVED METRICS ---
  const filteredPerfumes = perfumes.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.accords.some(acc => acc.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.notes.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFamily === 'all') return matchesSearch;
    return matchesSearch && p.accords.some(acc => acc.toLowerCase() === activeFamily.toLowerCase());
  });

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.size === '50ml' ? item.perfume.price50ml : item.perfume.price100ml;
    const extra = item.giftWrapped ? 15 : 0;
    return sum + (price + extra) * item.quantity;
  }, 0);

  // --- ACTIONS ---
  const handleAddToCart = () => {
    const price = selectedSize === '50ml' ? selectedPerfume.price50ml : selectedPerfume.price100ml;
    const hash = `${selectedPerfume.id}-${selectedSize}-${engravingText}-${giftWrapped}`;
    
    const existing = cart.find(item => item.id === hash);
    if (existing) {
      setCart(cart.map(item => item.id === hash ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, {
        id: hash,
        perfume: selectedPerfume,
        size: selectedSize,
        engravingText,
        giftWrapped,
        quantity: 1
      }]);
    }
    
    // Clear customizing states but keep engraving text of bottle
    setGiftWrapped(false);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      setReviewMessage('Please provide your name and some fragrance logs.');
      return;
    }

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Today'
    };

    // Update active review list
    const updatedPerfumes = perfumes.map(perf => {
      if (perf.id === selectedPerfume.id) {
        const nextReviews = [createdReview, ...perf.reviews];
        const nextRating = Number(((nextReviews.reduce((sum, r) => sum + r.rating, 0)) / nextReviews.length).toFixed(2));
        return {
          ...perf,
          reviews: nextReviews,
          reviewsCount: nextReviews.length,
          rating: nextRating
        };
      }
      return perf;
    });

    setPerfumes(updatedPerfumes);
    // Sync UI selection
    const target = updatedPerfumes.find(p => p.id === selectedPerfume.id);
    if (target) setSelectedPerfume(target);

    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewMessage('Your olfactory log has been cast! Thank you.');
    setTimeout(() => setReviewMessage(''), 4000);
  };

  // Simulating the physical maceration kiln order submission
  const triggerSimulationOrder = () => {
    setCheckoutStage('maceration');
    
    setTimeout(() => {
      setCheckoutStage('etching');
    }, 2000);

    setTimeout(() => {
      setCheckoutStage('dispatch');
    }, 4000);

    setTimeout(() => {
      setCheckoutStage('completed');
    }, 6000);
  };

  const handleSelectPerfumeFromNotes = (perf: Perfume) => {
    setSelectedPerfume(perf);
    setEngravingText('');
    const simSection = document.getElementById('perfume-detail-workspace');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] text-stone-200 selection:bg-amber-900/60 selection:text-amber-100 flex flex-col font-sans relative" id="j-fragrances-app">
      
      {/* GOLD FILAMENT BACKDROP OVERLAYS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-black pointer-events-none z-0" />

      {/* TOP NOTIFICATION COUTURE TICKER BAR */}
      <div className="bg-gradient-to-r from-[#8a6a25] via-[#dfc27d] to-[#8a6a25] py-2 text-center text-[10px] sm:text-xs font-mono font-bold tracking-[0.18em] text-[#1a1202] z-40 relative shadow-md">
        <Sparkles className="w-3.5 h-3.5 inline mr-1 animate-spin-slow" />
        COMPLIMENTARY WORLDWIDE COUTURE DELIVERY & PRECISION ENGRAVING ABOVE $150 • CODE: ATELIER_J
      </div>

      {/* MAIN NAVIGATION BAR */}
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#080706]/90 backdrop-blur-md px-4 py-3 sm:px-6 shadow-xl leading-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#dfc27d] via-[#8a6a25] to-[#403010] flex items-center justify-center text-black border border-[#dfc27d]/40 shadow-[0_4px_16px_rgba(197,168,92,0.25)]">
              <span className="font-serif text-xl tracking-tight font-extrabold select-none italic text-stone-900">J.</span>
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-serif font-bold tracking-widest text-[#f5f5f7] flex items-center gap-1.5 uppercase">
                <span>J. Fragrances</span>
                <span className="text-[9px] font-mono border border-[#dfc27d]/40 text-[#dfc27d] px-2 py-0.5 rounded-full tracking-wider bg-amber-500/15">
                  Haute Atelier v4.0
                </span>
              </h1>
              <p className="text-[10px] text-stone-500 font-mono tracking-wider mt-0.5 uppercase">
                Oriental Agarwoods, Imperial Musks, and Custom Laser Engravings
              </p>
            </div>
          </div>

          {/* Quick Action elements */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Search Input bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes or rose oils..."
                className="pl-9 pr-4 py-2 bg-black/45 border border-white/10 rounded-xl text-xs text-[#dfc27d] placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-[#c5a85c] focus:border-[#c5a85c] font-mono tracking-wide transition-all w-[180px] sm:w-[240px]"
                id="search-accords-input"
              />
            </div>

            {/* Procurement Tray Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-[#1a1410] hover:bg-[#251d16] text-[#dfc27d] border border-[#c5a85c]/35 rounded-xl relative transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.4)] text-xs font-mono font-bold"
              id="open-procurement-tray-btn"
            >
              <ShoppingBag className="w-4 h-4 text-[#dfc27d]" />
              <span className="hidden sm:inline">Procurement Tray</span>
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-stone-900 text-[10px] font-extrabold h-5 w-5 rounded-full flex items-center justify-center border border-[#1a1410] animate-pulse-slow">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CORE HERO ACCORD SPLASH BANNER */}
      <section className="relative w-full border-b border-white/5 bg-[#120e0a]/40" id="hero-marketing-banner">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 text-left">
            <span className="text-xs font-mono tracking-[0.3em] text-[#dfc27d] uppercase font-bold flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#dfc27d]" />
              Olfactory Masterpieces by J.
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight tracking-wide font-extralight italic">
              Where Ancient mystic <span className="text-[#dfc27d] font-normal not-italic">Ouds</span> meet <span className="text-rose-400 font-normal">French Floral</span> craftsmanship.
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed max-w-[580px]">
              Our luxury atelier fuses pure hand-sourced Cambodian Dehn Al Oud, velvety Damascan Red Roses, and crystal white musks. Every fragrance flacon is chiseled to absolute perfection and laser-engraved with your unique monogram coordinates.
            </p>
            
            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-stone-300">
              <div>
                <span className="text-lg font-serif text-[#dfc27d] font-semibold">100% Certified</span>
                <p className="text-[10px] text-stone-500 font-mono uppercase mt-0.5">Sustainably Wild Sourced</p>
              </div>
              <div>
                <span className="text-lg font-serif text-[#dfc27d] font-semibold">14+ Hours sillage</span>
                <p className="text-[10px] text-stone-500 font-mono uppercase mt-0.5">High Essential Oil Maceration</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-lg font-serif text-[#dfc27d] font-semibold">Laser Precision</span>
                <p className="text-[10px] text-stone-500 font-mono uppercase mt-0.5">Signature Gold Foil Monogramming</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Elegant preview layout */}
            <div className="bg-gradient-to-br from-[#1c140e] to-[#0c0908] rounded-3xl border border-[#c5a85c]/35 p-6 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a85c]/10 rounded-full blur-[40px]" />
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-[#dfc27d]" />
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#dfc27d] font-bold">Featured Olfactory Sensation</span>
              </div>
              <h3 className="text-xl font-serif text-white tracking-wide font-semibold">Janis Imperial Extrait</h3>
              <p className="text-xs text-stone-400 mt-2 font-sans leading-relaxed">
                Experience woodsy birchwood smoke blended with juicy cold-pressed pineapple. Select this work space masterwork or complete your custom signature test.
              </p>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  onClick={() => {
                    const janis = perfumes.find(p => p.id === 'janis-imperial');
                    if (janis) handleSelectPerfumeFromNotes(janis);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#dfc27d] to-[#8a6a25] text-stone-950 font-bold text-[10px] uppercase font-mono tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  id="adopt-quick-janis-btn"
                >
                  Configure Flacon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED ACTIVE SECTION LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 w-full flex flex-col gap-10">
        
        {/* INTERACTIVE OLFACTORY ROAD FILTERING BAR */}
        <div className="flex flex-col gap-6" id="scent-filter-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#dfc27d] font-bold block">
                Luxury Fragrance Selection
              </span>
              <h3 className="text-2xl font-serif text-white font-medium tracking-wide">
                Explore Olfactory Masterworks
              </h3>
            </div>

            {/* Olfactory Accord categories */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-black/45 border border-white/5 rounded-2xl">
              {[
                { id: 'all', label: 'All Aromas', icon: '💎' },
                { id: 'oriental', label: 'Oriental Oud', icon: '✨' },
                { id: 'fresh', label: 'Fresh Citrus', icon: '❄️' },
                { id: 'floral', label: 'Floral Rose', icon: '🌹' },
                { id: 'woody', label: 'Woody Cedar', icon: '🪵' },
              ].map((fam) => (
                <button
                  key={fam.id}
                  onClick={() => setActiveFamily(fam.id as any)}
                  className={`px-3.5 py-2 text-xs rounded-xl transition-all font-mono tracking-wide whitespace-nowrap cursor-pointer ${
                    activeFamily === fam.id
                      ? 'bg-gradient-to-r from-yellow-600 via-[#e2c16a] to-yellow-500 text-stone-900 font-bold shadow-md'
                      : 'text-stone-400 hover:text-[#dfc27d] hover:bg-white/5'
                  }`}
                  id={`accord-filter-${fam.id}`}
                >
                  <span className="mr-1">{fam.icon}</span>
                  {fam.label}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC SCENT CARDS SHOWCASE (GRID layout with visual feedback) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPerfumes.length === 0 ? (
                <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-2xl bg-[#0f0d0c]">
                  <Inbox className="w-10 h-10 text-stone-600 mx-auto mb-2" />
                  <p className="text-xs italic text-stone-400">No fragrance coordinates matched your query.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveFamily('all'); }} 
                    className="mt-3 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-[#dfc27d] text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                filteredPerfumes.map((p) => {
                  const isCuratedSelected = selectedPerfume.id === p.id;
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleSelectPerfumeFromNotes(p)}
                      className={`rounded-2xl border text-left flex flex-col justify-between overflow-hidden relative cursor-pointer group transition-all duration-300 ${
                        isCuratedSelected
                          ? 'bg-[#1c1511]/90 border-[#c5a85c] shadow-[0_12px_24px_rgba(197,168,92,0.15)] ring-1 ring-[#c5a85c]/30'
                          : 'bg-gradient-to-b from-[#12100e] to-[#0a0908] border-white/5 hover:border-[#c5a85c]/50'
                      }`}
                      id={`perfume-card-${p.id}`}
                    >
                      {/* Interactive hover scale image frame */}
                      <div className="h-48 overflow-hidden relative bg-black">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Premium concentration tag */}
                        <div className="absolute top-3 left-3 bg-[#0c0908]/90 border border-[#dfc27d]/40 px-2 py-0.5 rounded text-[8.5px] font-mono tracking-widest text-[#dfc27d] uppercase shadow-md">
                          {p.concentration}
                        </div>
                        {/* Rating block */}
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/5 flex items-center gap-1 text-[9.5px] text-white">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-mono font-bold">{p.rating}</span>
                        </div>
                        {/* Gradient shade overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
                      </div>

                      {/* Info payload */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[8.5px] font-mono tracking-widest text-[#dfc27d]/80 uppercase block">
                                {p.collection}
                              </span>
                              <h4 className="text-md font-serif text-[#f8fafc] tracking-medium uppercase font-bold mt-0.5 group-hover:text-[#dfc27d] transition-colors">
                                {p.name}
                              </h4>
                            </div>
                            <span className="text-xs font-mono font-extrabold text-[#dfc27d] bg-[#1a1410] border border-[#c5a85c]/20 px-2 py-0.5 rounded">
                              From ${p.price50ml}
                            </span>
                          </div>

                          <span className="text-[9.5px] font-mono tracking-wide italic text-[#dfc27d]/80 block mt-1 leading-none">
                            {p.character}
                          </span>

                          <p className="text-[11px] text-stone-400 font-sans mt-2 line-clamp-3 leading-relaxed">
                            {p.description}
                          </p>
                        </div>

                        {/* Note badges footer snippet */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1 items-center">
                          <span className="text-[8.5px] uppercase font-mono text-stone-500 mr-1.5 font-bold">Main Accords:</span>
                          {p.accords.slice(0, 3).map((accVal, idx) => (
                            <span 
                              key={idx}
                              className="text-[8.5px] font-mono tracking-wider text-stone-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md uppercase"
                            >
                              {accVal}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COMPREHENSIVE FLACON PERSONALIZATION ATELIER DRAWER */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-white/5 scroll-mt-24" 
          id="perfume-detail-workspace"
        >
          {/* LEFT PANEL: SELECTOR CONTROLS & SPECIFICATION SCHEME */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Active perfume main overview */}
            <div className="bg-[#12100e]/60 rounded-3xl border border-white/5 p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-36 h-36 bg-amber-600/5 rounded-full blur-[60px]" />
              
              <span className="text-[9.5px] uppercase font-mono tracking-[0.25em] text-[#dfc27d] font-bold block">
                Active Perfume Masterwork
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-normal mt-1 flex flex-wrap items-center gap-3">
                <span>{selectedPerfume.name}</span>
                <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-stone-300 font-bold tracking-normal uppercase">
                  {selectedPerfume.concentration}
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-450 font-serif italic tracking-wide mt-2 leading-relaxed">
                "{selectedPerfume.lore}"
              </p>

              {/* Scent note profiling visual elements */}
              <div className="mt-6 border-t border-white/5 pt-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block">
                    Olfactory Ingredients Pyramid
                  </span>
                  
                  {/* Subtle sub-filtering within the pyramid */}
                  <div className="flex gap-1 bg-black/45 p-1 rounded-xl border border-white/5">
                    {['all', 'top', 'heart', 'base'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveNotesSubTab(tab as any)}
                        className={`px-2.5 py-1 text-[8.5px] font-mono tracking-wide rounded-lg uppercase cursor-pointer ${
                          activeNotesSubTab === tab 
                            ? 'bg-[#c5a85c]/10 text-[#dfc27d] border border-[#c5a85c]/35 font-bold' 
                            : 'text-stone-500 hover:text-stone-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scent notes breakdown columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Top Notes */}
                  {(activeNotesSubTab === 'all' || activeNotesSubTab === 'top') && (
                    <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 flex flex-col gap-1.5">
                      <span className="text-[8.5px] tracking-widest font-mono text-amber-300 uppercase font-semibold">
                        Top Notes (Opening)
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPerfume.notes.top.map((no, idx) => (
                          <span key={idx} className="text-[9.5px] font-mono text-stone-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                            {no}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Heart Notes */}
                  {(activeNotesSubTab === 'all' || activeNotesSubTab === 'heart') && (
                    <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 flex flex-col gap-1.5">
                      <span className="text-[8.5px] tracking-widest font-mono text-rose-400 uppercase font-semibold">
                        Heart Notes (Core)
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPerfume.notes.heart.map((no, idx) => (
                          <span key={idx} className="text-[9.5px] font-mono text-stone-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                            {no}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Base Notes */}
                  {(activeNotesSubTab === 'all' || activeNotesSubTab === 'base') && (
                    <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 flex flex-col gap-1.5">
                      <span className="text-[8.5px] tracking-widest font-mono text-[#dfc27d] uppercase font-semibold">
                        Base Notes (Dry Down)
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPerfume.notes.base.map((no, idx) => (
                          <span key={idx} className="text-[9.5px] font-mono text-stone-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                            {no}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Custom sizing & packaging selections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bottle size selectors */}
              <div className="p-4 rounded-2xl border border-white/5 bg-[#12100e]/40 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfc27d] font-bold block">
                  Select Bottle Magnitude
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {[
                    { size: '50ml', price: selectedPerfume.price50ml, label: 'Standard Couture (50ml)' },
                    { size: '100ml', price: selectedPerfume.price100ml, label: 'Grand Opulence (100ml)' }
                  ].map((si) => (
                    <button
                      key={si.size}
                      onClick={() => setSelectedSize(si.size as any)}
                      className={`flex flex-col p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedSize === si.size 
                          ? 'border-[#c5a85c] bg-[#c5a85c]/10 text-white font-bold shadow-[0_0_10px_rgba(197,168,92,0.15)]'
                          : 'border-white/5 bg-black/35 hover:border-white/20 text-stone-400'
                      }`}
                      id={`size-btn-${si.size}`}
                    >
                      <span className="text-xs font-semibold uppercase">{si.size}</span>
                      <span className="text-md font-serif font-extrabold text-[#dfc27d] mt-1">${si.price}</span>
                      <span className="text-[8px] text-stone-500 font-mono mt-0.5 leading-none">{si.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Wrap option with premium satin box simulation */}
              <div className="p-4 rounded-2xl border border-white/5 bg-[#12100e]/40 flex flex-col justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfc27d] font-bold block">
                    Luxury Satin Presentation Box?
                  </span>
                  <p className="text-[10px] text-stone-500 font-sans mt-1">
                    Adds hand-crafted emerald green velvet box wrapped in high-gold silk satin ribbon. Includes custom parchment note.
                  </p>
                </div>
                
                <button
                  onClick={() => setGiftWrapped(!giftWrapped)}
                  className={`w-full py-2.5 px-4 rounded-xl border transition-all text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer ${
                    giftWrapped
                      ? 'bg-rose-950/20 border-rose-500/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.1)]'
                      : 'border-white/5 bg-black/40 text-stone-400 hover:text-white hover:border-white/10'
                  }`}
                  id="gift-wrap-toggle-btn"
                >
                  <Gift className="w-4 h-4" />
                  <span>{giftWrapped ? 'Velvet Presentation Selected (+$15)' : 'Add Presentation Box (+$15)'}</span>
                </button>
              </div>

            </div>

            {/* Procurement trigger submit button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4.5 bg-gradient-to-r from-yellow-600 via-[#e2c16a] to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-stone-950 font-bold text-xs font-mono tracking-[0.16em] uppercase rounded-2xl shadow-[0_12px_30px_rgba(217,119,6,0.35)] transition-all transform active:scale-95 flex items-center justify-center gap-2.5 border border-[#dfc27d]/40 cursor-pointer"
              id="add-to-cart-action-btn"
            >
              <ShoppingBag className="w-4.5 h-4.5 animate-pulse text-stone-900" />
              <span>Adopt & Dispatch Flacon to Procurement Tray • ${(selectedSize === '50ml' ? selectedPerfume.price50ml : selectedPerfume.price100ml) + (giftWrapped ? 15 : 0)}</span>
            </button>

            {/* LEAVE AN ARTISAN OLFACTORY LOG (CUSTOMER PRAISE & REVIEW SCHEME) */}
            <div className="p-5 rounded-3xl border border-white/5 bg-[#12100e]/45 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfc27d] font-bold block">
                  Atelier Praise Logs ({selectedPerfume.reviewsCount})
                </span>
                <span className="text-xs font-mono font-bold text-stone-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 text-xs" />
                  <span>{selectedPerfume.rating} / 5</span>
                </span>
              </div>

              {/* Praise review list (Scrollable) */}
              <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-luxury">
                {selectedPerfume.reviews.map((r) => (
                  <div key={r.id} className="p-3 bg-black/45 border border-white/5 rounded-xl text-left">
                    <div className="flex justify-between text-[10px] font-mono text-[#dfc27d] mb-1">
                      <span className="font-semibold text-[#f8fafc]">{r.userName}</span>
                      <span>{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-[11.5px] text-stone-300 font-sans leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* WRITE NEW MOLECULAR REVIEW */}
              <form onSubmit={handleAddReview} className="flex flex-col gap-3.5 border-t border-white/5 pt-4">
                <span className="text-[10.5px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
                  Log Your Olfactory Praise
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#0c0908] text-[#dfc27d] font-mono placeholder-stone-600 focus:outline-none"
                    id="praise-reviewer-input"
                  />
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#0c0908] text-stone-400 font-mono focus:outline-none"
                    id="praise-rating-select"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Record description of sillage, lingering notes, amber dry-downs..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#0c0908] text-stone-200 font-sans placeholder-stone-600 focus:outline-none resize-none"
                  id="praise-comment-textarea"
                />

                {reviewMessage && (
                  <p className="text-[10.5px] font-mono text-[#dfc27d] animate-pulse bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 text-center">
                    {reviewMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="py-2.5 bg-white/5 hover:bg-[#dfc27d] hover:text-stone-900 border border-white/10 rounded-xl text-[10px] font-mono tracking-widest uppercase font-extrabold cursor-pointer transition-all"
                  id="submit-praise-log-btn"
                >
                  Anchor praise in olfactory archive
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT PANEL: BOTTLE ENGRAVING GRAPHICS SIMULATOR (DRAWER INTEGRATOR) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <BottleSimulator
              perfume={selectedPerfume}
              engravingText={engravingText}
              setEngravingText={setEngravingText}
              engravingTypeface={engravingTypeface}
              setEngravingTypeface={setEngravingTypeface}
              laserIntensity={laserIntensity}
              setLaserIntensity={setLaserIntensity}
            />

            {/* INGREDIENT LORE BLOCK */}
            <div className="bg-[#12100e]/40 rounded-3xl border border-white/5 p-5 text-left relative overflow-hidden flex flex-col gap-2.5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Compass className="w-4 h-4 text-[#dfc27d] animate-spin-slow" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">
                  Scent lore & philosophy
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                Every J. fragrance undergoes a strict double-maceration aging cycle. Hand-extracted ambergris is infused with pure rose petals over forty days inside our custom-heated kiln.
              </p>
              
              <div className="p-2.5 bg-[#dfc27d]/5 border border-[#dfc27d]/15 rounded-xl">
                <h5 className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#dfc27d]">
                  Atelier Security Guarantee
                </h5>
                <p className="text-[10px] text-stone-500 font-sans mt-0.5 leading-relaxed">
                  Genuine flacons are fitted with a micro-sealed copper ring, ensuring evaporation-free transport while defending the volatile molecular top accords.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIANOSTIC PROFILE PERSONALITY INTERACTIVE MATCHING PORT */}
        <div className="pt-8 border-t border-white/5" id="molecular-profile-test">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#dfc27d] bg-[#1a1410] border border-[#c5a85c]/35 px-4 py-1.5 rounded-full inline-block">
                Interactive Scent Matchmaker
              </span>
              <p className="text-xs text-stone-500 font-mono mt-2 tracking-wide uppercase">
                Find your signature raw material with our diagnostic mixer
              </p>
            </div>
            
            <ScentQuiz 
              onSelectPerfume={(perf) => setSelectedPerfume(perf)}
              activePerfumeId={selectedPerfume.id}
            />
          </div>
        </div>

      </main>

      {/* FOOTER METRICS BAR */}
      <footer className="mt-auto relative z-10 border-t border-white/5 bg-[#050403] py-10 text-stone-500 font-mono text-[11px] text-center" id="j-atelier-footer">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left">
          <div>
            <span className="font-serif text-lg tracking-tight font-extrabold italic text-stone-300 block mb-1">J. Fragrances</span>
            <p className="text-stone-600 font-sans max-w-[260px] leading-relaxed text-[10px] uppercase justify-start">
              Exquisite haute parfeumerie embodying royal eastern heritage chiseled with absolute geometric gold precision.
            </p>
          </div>
          
          <div className="flex flex-col gap-1 uppercase text-stone-500 text-[10px]">
            <span className="text-stone-300 font-semibold mb-1">Interactive Scribe Coordinates</span>
            <p>Atelier Inbound: Port 3000 Secured</p>
            <p>Sillage Volume: High Density Maceration</p>
            <p>Laser System: Carbon Etcher active</p>
          </div>

          <div className="text-left md:text-right uppercase text-[10px] flex flex-col gap-1">
            <span className="text-stone-300 font-semibold mb-1">Atelier Protection</span>
            <p>© 2026 J. Fragrances Inc. Paris - Lahore.</p>
            <p>Secure SSL Molecular Encryption</p>
            <p className="text-stone-650">Made of Cambodia Oud Oils</p>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT PROCUREMENTS DETAIL DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            {/* Procurement Drawer panel with computations */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0f0d0b] border-l border-white/10 p-6 z-50 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between text-stone-200 overflow-y-auto"
              id="procurement-tray-slide-drawer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#dfc27d]" />
                    <span>Your Procurement Tray</span>
                  </h3>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStage('idle');
                    }}
                    className="px-3 py-1.5 text-xs border border-white/10 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white transition-all font-mono cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Items container */}
                <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1 scrollbar-luxury">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-stone-500">
                      <ShoppingBag className="w-12 h-12 text-stone-700 mb-2" />
                      <p className="text-xs italic font-mono text-stone-450">Procurement tray is currently empty.</p>
                      <p className="text-[10px] text-stone-600 mt-2 max-w-[280px]">
                        Select a majestic Cambodia Oud or pure White Musk flacon, type your initials, and laser enscribe it into existence.
                      </p>
                    </div>
                  ) : (
                    cart.map((item, idx) => {
                      const basePrice = item.size === '50ml' ? item.perfume.price50ml : item.perfume.price100ml;
                      const extraCost = item.giftWrapped ? 15 : 0;
                      return (
                        <div
                          key={item.id}
                          className="p-4 bg-black/45 border border-white/5 rounded-2xl relative block text-left"
                        >
                          <div className="flex gap-4 items-start">
                            <div className="w-14 h-14 rounded-lg bg-black overflow-hidden relative flex-shrink-0 border border-white/5">
                              <img
                                src={item.perfume.imageUrl}
                                alt={item.perfume.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#f8fafc] truncate">{item.perfume.name}</h4>
                              <p className="text-[10px] text-[#dfc27d] font-mono mt-0.5 uppercase">
                                {item.size} • {item.perfume.concentration}
                              </p>
                              
                              {/* Custom details */}
                              <div className="flex flex-col gap-1 mt-1.5">
                                {item.engravingText && (
                                  <span className="inline-block text-[9px] font-mono text-stone-300 bg-white/5 px-2 py-0.5 rounded leading-none">
                                    Laser Monogram: <span className="text-[#dfc27d] uppercase">{item.engravingText}</span>
                                  </span>
                                )}
                                {item.giftWrapped && (
                                  <span className="inline-block text-[9px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded leading-none w-max">
                                    Velvet Presentation Wrapped
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-right flex flex-col justify-between h-full">
                              <span className="text-xs font-extrabold text-[#dfc27d] font-mono">
                                ${((basePrice + extraCost) * item.quantity).toFixed(2)}
                              </span>
                              
                              {/* Quantity manipulators */}
                              <div className="flex items-center gap-1.5 mt-4 bg-[#141210] p-1 rounded-lg border border-white/5">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  className="w-4.5 h-4.5 rounded bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-all"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-[10.5px] font-mono font-bold px-1">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  className="w-4.5 h-4.5 rounded bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-all"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Discard anchor */}
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-[9.5px] text-stone-500 hover:text-red-400 underline absolute top-2 right-4 tracking-wider uppercase font-mono cursor-pointer"
                          >
                            Discard
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Submitting order checkpoint stepper */}
                {checkoutStage !== 'idle' && (
                  <div className="my-5 p-4 bg-[#14110e] border border-[#dfc27d]/40 rounded-2xl text-left">
                    <span className="text-[9px] uppercase font-mono text-[#dfc27d] font-bold block mb-1">
                      Maceration Stage Tracker
                    </span>
                    
                    {/* Progress checkpoints indicators */}
                    <div className="flex items-center justify-between text-[8px] font-mono text-stone-400 uppercase">
                      <span className={checkoutStage !== 'idle' ? 'text-[#dfc27d] font-bold' : ''}>Maceration</span>
                      <span className={['etching', 'dispatch', 'completed'].includes(checkoutStage) ? 'text-[#dfc27d] font-bold' : ''}>Monogramming</span>
                      <span className={['dispatch', 'completed'].includes(checkoutStage) ? 'text-[#dfc27d] font-bold' : ''}>Courier Gate</span>
                    </div>

                    <div className="h-1 bg-stone-800 rounded-full mt-2 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-700"
                        style={{
                          width: checkoutStage === 'maceration' ? '33%' :
                                 checkoutStage === 'etching' ? '66%' :
                                 checkoutStage === 'dispatch' ? '90%' : '100%'
                        }}
                      />
                    </div>

                    <p className="text-[10px] text-stone-300 mt-2 italic font-sans">
                      {checkoutStage === 'maceration' && '🔄 Adjusting essential oils maceration blend within kiln...'}
                      {checkoutStage === 'etching' && '⚡ Applying precision 24-Joule gold laser calligraphy onto flacon...'}
                      {checkoutStage === 'dispatch' && '📦 Velvet wrapping parcel and handing coordinates to secure transport courier...'}
                      {checkoutStage === 'completed' && '✨ Your precious J. shipment has been dispatched. Check inbox details!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer actions and total calculations */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-4 mt-4 bg-gradient-to-t from-black/80">
                  <div className="flex justify-between items-center text-xs font-mono font-bold mb-4">
                    <span className="text-stone-500 uppercase tracking-widest text-[10px]">Couture Procurement Total</span>
                    <span className="text-lg text-[#dfc27d] font-serif">${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCart([]);
                        setCheckoutStage('idle');
                      }}
                      className="py-3 px-4 border border-white/10 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer bg-black/40 uppercase"
                    >
                      Clear Tray
                    </button>
                    
                    <button
                      onClick={triggerSimulationOrder}
                      className="flex-1 py-3 bg-gradient-to-r from-yellow-600 via-[#e2c16a] to-yellow-500 text-stone-900 font-bold text-xs uppercase font-mono tracking-widest rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      id="submit-procure-to-kiln-btn"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse text-stone-900" />
                      <span>Submit order to Kiln</span>
                    </button>
                  </div>
                  
                  <div className="mt-4 flex gap-1.5 justify-center items-center text-[10px] text-stone-500 font-mono">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Couture Premium Delivery across the Globe</span>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
