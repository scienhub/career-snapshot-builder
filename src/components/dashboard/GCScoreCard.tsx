import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield } from 'lucide-react';
import { GCScoreBreakdown } from '@/types/onboarding';

interface GCScoreCardProps {
  score: GCScoreBreakdown;
}

const getBandInfo = (band: GCScoreBreakdown['band']) => {
  const bands = {
    'high-clarity': {
      label: 'High Clarity',
      description: 'Strong readiness for next-level opportunities',
      color: 'text-primary'
    },
    'good-potential': {
      label: 'Good Potential',
      description: 'Focused development will unlock growth',
      color: 'text-primary'
    },
    'direction-forming': {
      label: 'Direction Forming',
      description: 'Building foundations for career advancement',
      color: 'text-primary'
    },
    'exploration': {
      label: 'Exploration Stage',
      description: 'Discovering your professional path',
      color: 'text-primary'
    },
    'low-clarity': {
      label: 'Guided Discovery',
      description: 'Beginning your growth journey',
      color: 'text-primary'
    }
  };
  return bands[band] || bands['exploration'];
};

export const GCScoreCard = ({ score }: GCScoreCardProps) => {
  const bandInfo = getBandInfo(score.band);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (score.totalScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="card-premium p-8"
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Score Circle */}
        <div className="relative">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 180 180">
            {/* Background Circle */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted/30"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(160 70% 50%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-5xl font-bold text-foreground"
            >
              {score.totalScore}
            </motion.span>
            <span className="text-sm text-muted-foreground mt-1">out of 100</span>
          </div>
        </div>

        {/* Score Details */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Career Readiness Signal</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Based on verified skills, experience, and execution capability
            </p>
          </div>

          {/* Band Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-xl"
          >
            <span className={`text-sm font-semibold ${bandInfo.color}`}>
              {bandInfo.label}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{bandInfo.description}</span>
          </motion.div>

          {/* Meta Info */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-sm"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Top {100 - score.percentile}% in your stage</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Clock className="w-4 h-4" />
              <span>Updated today</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
