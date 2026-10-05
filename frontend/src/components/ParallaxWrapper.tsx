import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ParallaxProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'purple' | 'emerald';
}

export const ParallaxCard: React.FC<ParallaxProps> = ({
  children,
  depth = 15,
  className = '',
  glowColor = 'blue'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${depth}deg`, `-${depth}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${depth}deg`, `${depth}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    cyan: 'hover:shadow-[0_10px_30px_rgba(6,182,212,0.18)]',
    blue: 'hover:shadow-[0_10px_30px_rgba(37,99,235,0.18)]',
    purple: 'hover:shadow-[0_10px_30px_rgba(147,51,234,0.18)]',
    emerald: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.18)]'
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
      className={`transition-shadow duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};
