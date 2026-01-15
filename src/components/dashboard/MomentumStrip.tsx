import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, TrendingUp } from 'lucide-react';

interface MomentumCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  delay: number;
}

const MomentumCard = ({ icon, label, value, subtext, delay }: MomentumCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -2, transition: { duration: 0.2 } }}
    className="flex-1 min-w-[140px] p-4 bg-card border border-border/50 rounded-2xl cursor-pointer transition-shadow hover:shadow-md"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
        {subtext && (
          <p className="text-xs text-muted-foreground">{subtext}</p>
        )}
      </div>
    </div>
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
      className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
    >
      <MomentumCard
        icon={<TrendingUp className="w-5 h-5 text-primary" />}
        label="Weekly Momentum"
        value={momentum.weeklyProgress}
        subtext="This week"
        delay={0.3}
      />
      
      <MomentumCard
        icon={<Flame className="w-5 h-5 text-orange-500" />}
        label="Current Streak"
        value={`${momentum.streak} days`}
        delay={0.4}
      />
      
      <MomentumCard
        icon={<Trophy className="w-5 h-5 text-amber-500" />}
        label="League"
        value={momentum.league}
        subtext="Same-stage peers"
        delay={0.5}
      />
      
      <MomentumCard
        icon={<Zap className="w-5 h-5 text-primary" />}
        label="Growth XP"
        value={momentum.xp.toLocaleString()}
        delay={0.6}
      />
    </motion.div>
  );
};
