import React, { useRef } from 'react';
import { HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  onWhyClick?: () => void;
  accentColor?: string;
  gradientTop?: 'blue' | 'red' | 'amber' | 'emerald' | 'cyan' | 'purple';
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  onWhyClick,
  gradientTop = 'blue'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const gradientBorders: Record<string, string> = {
    blue: 'from-blue-500 via-indigo-500 to-cyan-400',
    red: 'from-rose-500 via-red-500 to-orange-400',
    amber: 'from-amber-500 via-orange-500 to-yellow-400',
    emerald: 'from-emerald-500 via-teal-500 to-cyan-400',
    cyan: 'from-cyan-500 via-sky-500 to-blue-500',
    purple: 'from-purple-500 via-indigo-500 to-blue-500'
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY
      }}
      className="relative rounded-xl p-[1px] bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group flex flex-col justify-between"
    >
      {/* Top Gradient Highlight Bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradientBorders[gradientTop]} rounded-t-xl`} />

      <div className="bg-gradient-to-b from-white via-white to-slate-50/70 rounded-b-xl p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
          {onWhyClick && (
            <button
              onClick={onWhyClick}
              title="Inspect explainable calculation"
              className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50 group-hover:scale-110 active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 tabular-nums bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 bg-clip-text">
            {value}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500 truncate text-[11px] font-medium">{subtitle}</span>}
          {change && (
            <div
              className={`flex items-center gap-1 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                changeType === 'positive'
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
                  : changeType === 'negative'
                  ? 'text-red-700 bg-red-50 border border-red-200/60'
                  : 'text-slate-600 bg-slate-100'
              }`}
            >
              {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
              {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
