import { motion } from 'framer-motion';
import { TrendingUp, Clock, ChevronRight, Sparkles, Target, ArrowUpRight, Plus, Award } from 'lucide-react';
import { GCScoreBreakdown } from '@/types/onboarding';
import { Card3D } from './PremiumCard';

interface GCScoreCardProps {
  score: GCScoreBreakdown;
}

const getBandInfo = (band: GCScoreBreakdown['band']) => {
  const bands = {
    'high-clarity': {
      label: 'High Clarity',
      description: 'Strong readiness for next-level opportunities',
      gradient: 'from-emerald-500 to-teal-500'
    },
    'good-potential': {
      label: 'Good Potential',
      description: 'Focused development will unlock growth',
      gradient: 'from-primary to-emerald-500'
    },
    'direction-forming': {
      label: 'Direction Forming',
      description: 'Building foundations for career advancement',
      gradient: 'from-amber-500 to-orange-500'
    },
    'exploration': {
      label: 'Exploration Stage',
      description: 'Discovering your professional path',
      gradient: 'from-blue-500 to-indigo-500'
    },
    'low-clarity': {
      label: 'Guided Discovery',
      description: 'Beginning your growth journey',
      gradient: 'from-purple-500 to-pink-500'
    }
  };
  return bands[band] || bands['exploration'];
};

const ScorePillar = ({ label, score, maxScore, color, delay }: { label: string; score: number; maxScore: number; color: string; delay: number }) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group relative"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/{maxScore}</span>
        </div>
      </div>
      <div className="h-3 bg-muted/30 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className={`h-full rounded-full relative ${color}`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const GCScoreCard = ({ score }: GCScoreCardProps) => {
  const bandInfo = getBandInfo(score.band);
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (score.totalScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Main GC Score Card */}
      <Card3D className="lg:col-span-7" depth="medium">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Resume Analysis Complete</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="relative flex-shrink-0">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <svg className="w-36 h-36 -rotate-90 relative z-10" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-4xl font-black text-foreground"
                >
                  {score.totalScore}
                </motion.span>
                <span className="text-xs text-muted-foreground font-medium">/100</span>
              </div>
            </div>

            {/* Score Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl lg:text-4xl font-black text-foreground mb-2"
              >
                GC Score: {score.totalScore}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mb-4"
              >
                You are in the top <span className="font-bold text-primary">{100 - score.percentile}%</span> of Product Managers.
              </motion.p>
              
              {/* Score breakdown mini */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                {[
                  { label: 'Experience', value: score.careerClarity.score * 5, color: 'text-violet-500' },
                  { label: 'Skills', value: score.skillReadiness.score * 4, color: 'text-emerald-500' },
                  { label: 'Impact', value: score.execution.score * 5, color: 'text-amber-500' }
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg">
                    <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                    <span className="text-xs text-muted-foreground uppercase">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Score Booster Card */}
      <Card3D className="lg:col-span-5 bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950 border-zinc-700/50" depth="shallow">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Score Booster</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Add SQL Certification</h3>
          <p className="text-sm text-zinc-400 mb-6 flex-1">
            Uploading this credential will boost your Skills score by <span className="text-primary font-semibold">+15 pts</span>.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white text-zinc-900 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Proof
          </motion.button>
        </div>
      </Card3D>

      {/* Score Velocity Card */}
      <Card3D className="lg:col-span-4" depth="shallow">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase">Score Velocity</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-foreground">+14</span>
            <span className="text-sm text-muted-foreground">pts in 30 days</span>
          </div>
          <div className="mt-3 h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full"
            />
          </div>
        </div>
      </Card3D>

      {/* Streak Card */}
      <Card3D className="lg:col-span-4" depth="shallow">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl">🔥</span>
            </motion.div>
            <div>
              <span className="text-3xl font-black text-foreground">12</span>
              <p className="text-xs text-muted-foreground uppercase font-medium">Day Streak</p>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Rank Card */}
      <Card3D className="lg:col-span-4" depth="shallow">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
              whileHover={{ scale: 1.1 }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-black text-foreground">Top 5%</span>
              <p className="text-xs text-muted-foreground uppercase font-medium">Peer Rank</p>
            </div>
          </div>
        </div>
      </Card3D>
    </div>
  );
};
