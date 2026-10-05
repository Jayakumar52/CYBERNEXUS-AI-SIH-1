import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Play, ShieldAlert, TrendingUp, Layers, CheckCircle2, ChevronRight, Activity, DollarSign, Sparkles, Shield, Cpu, Lock } from 'lucide-react';
import { PageId } from '../types/index.js';

interface Props {
  onEnter: () => void;
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnter, onLaunchDemo }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values for Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery parallax motion
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Different parallax depth transforms
  const backgroundX = useTransform(springX, [-0.5, 0.5], ['20px', '-20px']);
  const backgroundY = useTransform(springY, [-0.5, 0.5], ['20px', '-20px']);

  const midgroundX = useTransform(springX, [-0.5, 0.5], ['-35px', '35px']);
  const midgroundY = useTransform(springY, [-0.5, 0.5], ['-35px', '35px']);

  const foregroundX = useTransform(springX, [-0.5, 0.5], ['-60px', '60px']);
  const foregroundY = useTransform(springY, [-0.5, 0.5], ['-60px', '60px']);

  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 overflow-hidden relative"
    >
      {/* Dynamic Animated Gradient Mesh & Cyber Matrix Backdrops */}
      <div className="absolute inset-0 cyber-grid-dark opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[at_top_center] from-blue-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />
      
      {/* Animated glowing gradient orbs */}
      <motion.div
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
      />
      <motion.div
        style={{ x: midgroundX, y: midgroundY }}
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/20 via-blue-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
      />

      {/* Top Banner Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 sm:px-10 py-4 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-cyan-500/25">
            CN
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white text-base bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
              CYBERNEXUS AI
            </span>
            <span className="text-[11px] text-cyan-400 ml-2 hidden sm:inline font-mono border border-cyan-500/30 px-2 py-0.5 rounded-full bg-cyan-950/40">
              SIH 2026 PROTOTYPE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Enterprise Context:</span>
            <span className="text-cyan-300 font-semibold">Nexa Financial Services</span>
          </div>
          
          <button
            onClick={onLaunchDemo}
            className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-sm shadow-blue-500/30 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Executive Demo</span>
          </button>
        </div>
      </header>

      {/* Hero Section with Parallax Layers */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 flex-1 flex flex-col justify-center items-center text-center relative z-20">
        
        {/* Floating Parallax Telemetry Badges (Floating around the Hero) */}
        <motion.div
          style={{ x: foregroundX, y: foregroundY }}
          className="hidden md:flex absolute top-12 left-2 lg:left-8 bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl shadow-xl shadow-cyan-950/50 backdrop-blur-md items-center gap-3 animate-float-slow text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Cyber Exposure</div>
            <div className="text-sm font-bold font-mono text-cyan-300">₹18.4 Crore</div>
          </div>
        </motion.div>

        <motion.div
          style={{ x: midgroundX, y: midgroundY }}
          className="hidden md:flex absolute top-14 right-2 lg:right-8 bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl shadow-xl shadow-emerald-950/50 backdrop-blur-md items-center gap-3 animate-float-reverse text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">0/1 Knapsack ROSI</div>
            <div className="text-sm font-bold font-mono text-emerald-400">325% Verified</div>
          </div>
        </motion.div>

        <motion.div
          style={{ x: foregroundX, y: foregroundY }}
          className="hidden lg:flex absolute bottom-28 left-4 bg-slate-900/90 border border-indigo-500/30 p-2.5 rounded-xl shadow-xl shadow-indigo-950/50 backdrop-blur-md items-center gap-2.5 animate-float-reverse text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">RBI Framework</div>
            <div className="text-xs font-bold font-mono text-indigo-300">84% Readiness</div>
          </div>
        </motion.div>

        <motion.div
          style={{ x: midgroundX, y: midgroundY }}
          className="hidden lg:flex absolute bottom-28 right-4 bg-slate-900/90 border border-purple-500/30 p-2.5 rounded-xl shadow-xl shadow-purple-950/50 backdrop-blur-md items-center gap-2.5 animate-float-slow text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Incident Likelihood</div>
            <div className="text-xs font-bold font-mono text-purple-300">42% Annual Prob</div>
          </div>
        </motion.div>

        {/* SIH Pill Tag with gradient border */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium mb-6 shadow-md shadow-cyan-900/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Smart India Hackathon Prototype · Zero-Cost Open Source Stack</span>
        </div>

        {/* Main Parallax Headline with Radiant Gradient Fill */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="transition-transform duration-200"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl leading-tight">
            From Cyber Risk Ratings to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Financial Decision Intelligence.
            </span>
          </h1>
        </motion.div>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
          Continuously translates technical security telemetry into defensible Indian Rupee exposure, simulates attack paths, and algorithmically optimizes security budgets.
        </p>

        {/* High-Impact Action Buttons with Gradient Borders & Glows */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 group"
          >
            <span className="text-white font-extrabold tracking-wide">Enter Live Platform</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onLaunchDemo}
            className="w-full sm:w-auto px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 group"
          >
            <Play className="w-4 h-4 fill-current text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Run 3-Minute SIH Presentation</span>
          </button>
        </div>

        {/* 5 Core Pillars with Gradient Glassmorphism & Hover Lift */}
        <div className="mt-14 w-full max-w-5xl grid grid-cols-2 md:grid-cols-5 gap-3 text-left">
          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-cyan-950/30">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              1. Continuous
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">Dynamic risk recalculation as telemetry shifts.</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-blue-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-blue-950/30">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              2. Quantified
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">Expressed in Rupee financial exposure (₹ Cr).</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-purple-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-purple-950/30">
            <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              3. Explainable
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">Auditable math from raw CVEs to EAL.</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-emerald-950/30">
            <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              4. Actionable
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">Prioritized mitigations with verified ROSI.</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-amber-950/30 col-span-2 md:col-span-1">
            <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              5. Optimized
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">0/1 Knapsack capital allocation under budget caps.</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto w-full">
        <div>
          CYBERNEXUS AI · Synthetic Telemetry for Nexa Financial Services
        </div>
        <div className="font-mono text-[11px] text-cyan-400/80">
          Deterministic AI · FAIR Mathematical Model · Zero-Cost Prototype
        </div>
      </footer>
    </div>
  );
};
