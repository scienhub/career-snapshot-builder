import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  hoverEffect?: boolean;
  glowColor?: string;
}

export const PremiumCard = ({ 
  children, 
  className, 
  variant = 'default',
  hoverEffect = true,
  glowColor = 'primary'
}: PremiumCardProps) => {
  const variants = {
    default: "bg-card border border-border/50",
    glass: "bg-card/80 backdrop-blur-xl border border-white/10",
    gradient: "bg-gradient-to-br from-card via-card to-accent/20 border border-border/30",
    elevated: "bg-card border border-border/50 shadow-xl"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2 } 
      } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300",
        variants[variant],
        hoverEffect && "hover:shadow-2xl hover:shadow-primary/10 cursor-pointer",
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* 3D Shine effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
          transform: 'translateX(-100%)'
        }}
        whileHover={{
          transform: 'translateX(100%)',
          transition: { duration: 0.6 }
        }}
      />
      
      {/* Top gradient line */}
      <div className={cn(
        "absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"
      )} />
      
      {/* Subtle corner glow */}
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20",
        `bg-${glowColor}`
      )} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const Card3D = ({ 
  children, 
  className,
  depth = 'medium'
}: { 
  children: ReactNode; 
  className?: string;
  depth?: 'shallow' | 'medium' | 'deep';
}) => {
  const depthConfig = {
    shallow: { rotateX: 2, rotateY: 2 },
    medium: { rotateX: 5, rotateY: 5 },
    deep: { rotateX: 10, rotateY: 10 }
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50",
        "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]",
        "dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]",
        className
      )}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.02,
        rotateX: depthConfig[depth].rotateX,
        rotateY: depthConfig[depth].rotateY,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Layered shadow for 3D effect */}
      <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none" />
      
      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Bottom shadow */}
      <div className="absolute -bottom-px left-2 right-2 h-4 bg-gradient-to-b from-transparent to-black/5 blur-sm rounded-b-2xl" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
