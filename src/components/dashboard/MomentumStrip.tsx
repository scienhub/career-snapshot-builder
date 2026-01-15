import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, TrendingUp, ArrowUpRight } from 'lucide-react';

interface MomentumCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  delay: number;
}

const MomentumCard = ({ icon, iconBg, label, value, subtext, change, delay }: MomentumCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ 
      y: -4, 
      scale: 1.02,
      transition: { duration: 0.2 } 
    }}
    className="group relative flex-1 min-w-[160px] p-5 bg-card rounded-2xl border border-border/50 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
  >
    {/* Hover gradient */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />
    
    <div className="relative flex items-start gap-4">
      {/* Icon */}
      <motion.div 
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} shadow-lg`}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
      >
        {icon}
      </motion.div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <span className="flex items-center text-xs font-semibold text-primary">
              <ArrowUpRight className="w-3 h-3" />
              {change}
            </span>
          )}
        </div>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>
        )}
      </div>
    </div>

    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

export const MomentumStrip = () => {
  const momentum = {
    weeklyProgress: '3x',
    streak: 7,
    league: 'Builder II',
    xp: 2450
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-2 mb-4"
      >
        <Zap className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Momentum Signals</h2>
      </motion.div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MomentumCard
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          iconBg="bg-gradient-to-br from-primary to-emerald-600"
          label="Weekly Momentum"
          value={momentum.weeklyProgress}
          subtext="This week"
          change="+50%"
          delay={0.3}
        />
        
        <MomentumCard
          icon={<Flame className="w-5 h-5 text-white" />}
          iconBg="bg-gradient-to-br from-orange-500 to-red-500"
          label="Current Streak"
          value={`${momentum.streak}`}
          subtext="days active"
          delay={0.4}
        />
        
        <MomentumCard
          icon={<Trophy className="w-5 h-5 text-white" />}
          iconBg="bg-gradient-to-br from-amber-500 to-yellow-600"
          label="League"
          value={momentum.league}
          subtext="Same-stage peers"
          delay={0.5}
        />
        
        <MomentumCard
          icon={<Zap className="w-5 h-5 text-white" />}
          iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
          label="Growth XP"
          value={momentum.xp.toLocaleString()}
          change="+120"
          delay={0.6}
        />
      </div>
    </motion.div>
  );
};
