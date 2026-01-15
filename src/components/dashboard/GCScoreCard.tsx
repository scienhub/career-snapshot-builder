import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield, ChevronRight, Sparkles, Target } from 'lucide-react';
import { GCScoreBreakdown } from '@/types/onboarding';

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

const ScorePillar = ({ label, score, maxScore, delay }: { label: string; score: number; maxScore: number; delay: number }) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
        <span className="text-xs font-semibold text-foreground">{score}/{maxScore}</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export const GCScoreCard = ({ score }: GCScoreCardProps) => {
  const bandInfo = getBandInfo(score.band);
  const circumference = 2 * Math.PI * 72;
  const strokeDashoffset = circumference - (score.totalScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card border border-border/50 shadow-xl"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.05]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
      
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row items-center gap-8">
          {/* Score Circle - Left Side */}
          <div className="relative flex-shrink-0">
            {/* Outer glow ring */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <svg className="w-44 h-44 -rotate-90 relative z-10" viewBox="0 0 160 160">
              {/* Dotted track */}
              <circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 6"
                className="text-muted/20"
              />
              {/* Background Circle */}
              <circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted/10"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="url(#premiumScoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
              />
              {/* Glow effect */}
              <motion.circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="url(#premiumScoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                filter="url(#glow)"
                opacity={0.5}
              />
              <defs>
                <linearGradient id="premiumScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(158, 70%, 45%)" />
                  <stop offset="100%" stopColor="hsl(160, 80%, 50%)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* Score Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
                className="text-center"
              >
                <span className="text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {score.totalScore}
                </span>
                <p className="text-xs text-muted-foreground mt-1 font-medium">out of 100</p>
              </motion.div>
            </div>
          </div>

          {/* Score Details - Right Side */}
          <div className="flex-1 space-y-5 text-center xl:text-left">
            {/* Header */}
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center xl:justify-start gap-2 mb-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Career Readiness Signal</h2>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground max-w-md"
              >
                Based on verified skills, experience, and execution capability
              </motion.p>
            </div>

            {/* Band Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-accent via-accent to-accent/50 rounded-2xl border border-border/50"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{bandInfo.label}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-muted-foreground">{bandInfo.description}</span>
            </motion.div>

            {/* Meta Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center xl:justify-start gap-6"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-foreground font-medium">Top {100 - score.percentile}%</span>
                <span className="text-muted-foreground">in your stage</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Updated today</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Score Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Score Breakdown</h3>
            <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View Details
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <ScorePillar label="Career Clarity" score={score.careerClarity.score} maxScore={score.careerClarity.maxScore} delay={0.9} />
            <ScorePillar label="Skill Readiness" score={score.skillReadiness.score} maxScore={score.skillReadiness.maxScore} delay={1.0} />
            <ScorePillar label="Execution" score={score.execution.score} maxScore={score.execution.maxScore} delay={1.1} />
            <ScorePillar label="Motivation" score={score.motivationPurpose.score} maxScore={score.motivationPurpose.maxScore} delay={1.2} />
            <ScorePillar label="Learning Agility" score={score.learningAgility.score} maxScore={score.learningAgility.maxScore} delay={1.3} />
            <ScorePillar label="Commitment" score={score.commitment.score} maxScore={score.commitment.maxScore} delay={1.4} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
