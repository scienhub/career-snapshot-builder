import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, TrendingUp, ArrowUpRight, Star, Target, Sparkles } from 'lucide-react';
import { Card3D } from './PremiumCard';

export const MomentumStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-2"
      >
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Momentum Signals</h2>
      </motion.div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weekly Momentum */}
        <Card3D depth="shallow">
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30"
                whileHover={{ rotate: [0, -5, 5, 0] }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-0.5 text-xs font-bold text-emerald-500"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                50%
              </motion.span>
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Weekly Momentum</p>
            <p className="text-2xl font-black text-foreground">3x</p>
            <p className="text-xs text-muted-foreground mt-1">progress this week</p>
          </div>
        </Card3D>

        {/* Streak */}
        <Card3D depth="shallow">
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-orange-500"
              />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Current Streak</p>
            <p className="text-2xl font-black text-foreground">7 days</p>
            <p className="text-xs text-muted-foreground mt-1">consecutive activity</p>
          </div>
        </Card3D>

        {/* League */}
        <Card3D depth="shallow">
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 rounded-full">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-500">II</span>
              </div>
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1">League</p>
            <p className="text-2xl font-black text-foreground">Builder</p>
            <p className="text-xs text-muted-foreground mt-1">same-stage peers</p>
          </div>
        </Card3D>

        {/* XP */}
        <Card3D depth="shallow">
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-0.5 text-xs font-bold text-violet-500"
              >
                <Sparkles className="w-3 h-3" />
                +120
              </motion.span>
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Growth XP</p>
            <p className="text-2xl font-black text-foreground">2,450</p>
            <p className="text-xs text-muted-foreground mt-1">total earned</p>
          </div>
        </Card3D>
      </div>
    </motion.div>
  );
};
