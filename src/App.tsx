import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Diamond, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Quote, 
  BrainCircuit, 
  Target, 
  Calculator, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { WealthStrategist } from './components/WealthStrategist';
import { TheMatrix } from './components/TheMatrix';
import { ArbitrageLens } from './components/ArbitrageLens';
import { CompoundEngine } from './components/CompoundEngine';
import { cn } from './lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [wisdom, setWisdom] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchWisdom = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Provide one short, profound piece of financial or productivity wisdom (max 20 words). Inspired by stoics or successful modern entrepreneurs.",
        });
        setWisdom(response.text || "Wealth is the ability to fully experience life.");
      } catch (err) {
        setWisdom("The best investment you can make is in yourself.");
      }
    };
    fetchWisdom();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Strategist', icon: BrainCircuit, id: 'strategist' },
    { name: 'Priority Matrix', icon: Target, id: 'matrix' },
    { name: 'Arbitrage', icon: Calculator, id: 'arbitrage' },
    { name: 'Growth Engine', icon: TrendingUp, id: 'compound' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden selection:bg-gold/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 lg:px-12 lg:py-6",
        isScrolled ? "bg-paper/80 backdrop-blur-xl border-b border-ink/5" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Diamond className="text-paper w-4 h-4" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Forge</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                className="text-xs uppercase tracking-widest font-semibold hover:text-gold transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-ink/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-paper flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif font-bold">Forge</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.id)}
                  className="text-3xl font-serif block w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-12 border-t border-ink/5 space-y-6">
               <button className="w-full premium-btn premium-btn-primary py-4 text-lg font-serif">Get Started</button>
               <div className="flex justify-center gap-6 opacity-30">
                 <Twitter className="w-5 h-5" />
                 <Github className="w-5 h-5" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 lg:pt-48 pb-24 max-w-5xl mx-auto px-6 lg:px-12 space-y-32">
        {/* Hero Section */}
        <header className="space-y-12 max-w-4xl">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-[0.3em]"
            >
              <Sparkles className="w-3 h-3" />
              Strategic Optimization Intelligence
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] tracking-tight"
            >
              Building <br/> <span className="italic text-ink/20">Digital</span> Wealth.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-ink/60 font-light leading-relaxed max-w-2xl"
            >
              A high-precision strategist designed for individuals who value ROI. 
              Optimize your actions, analyze markets, and forge your blueprint for exponential growth.
            </motion.p>
          </div>

          {/* Wisdom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 py-4 px-6 rounded-full bg-ink text-paper w-fit max-w-full"
          >
            <Quote className="w-4 h-4 text-gold flex-shrink-0" />
            <p className="text-xs md:text-sm font-medium italic opacity-90 truncate">
              {wisdom || "Crafting intelligence for your wealth journey..."}
            </p>
          </motion.div>
        </header>

        <WealthStrategist />
        <TheMatrix />
        <ArbitrageLens />
        <CompoundEngine />

        {/* Footer */}
        <footer className="pt-24 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-40">
            <Diamond className="w-4 h-4" />
            <span className="font-serif font-bold text-sm">Forge Strategic Tools</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30 text-center">
            Precision over luck. Strategy over hope. <br className="md:hidden" /> © 2026 Forge Intelligence.
          </p>
          <div className="flex gap-6 opacity-40">
            <span className="text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity">Privacy</span>
            <span className="text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity">Terms</span>
          </div>
        </footer>
      </main>

      {/* Floating Vertical Rail Text */}
      <div className="fixed right-6 bottom-32 hidden xl:block pointer-events-none">
        <span className="vertical-rail">SYSTEM STATUS: OPTIMIZING WEALTH BLUEPRINTS</span>
      </div>
      <div className="fixed left-6 bottom-32 hidden xl:block pointer-events-none">
        <span className="vertical-rail">VERSION 1.0.4 - PRECISION ENGINE ACTIVE</span>
      </div>
    </div>
  );
}
