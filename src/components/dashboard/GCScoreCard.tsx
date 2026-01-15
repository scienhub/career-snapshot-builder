import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, Target, ArrowUpRight, Crown, Shield, Star, Flame } from 'lucide-react';
import { GCScoreBreakdown } from '@/types/onboarding';
import { PremiumCard, Card3D } from './PremiumCard';

interface GCScoreCardProps {
  score: GCScoreBreakdown;
}

const getBandInfo = (band: GCScoreBreakdown['band']) => {
  const bands = {
    'high-clarity': { label: 'High Clarity', gradient: 'from-emerald-500 to-teal-500' },
    'good-potential': { label: 'Good Potential', gradient: 'from-primary to-emerald-500' },
    'direction-forming': { label: 'Direction Forming', gradient: 'from-amber-500 to-orange-500' },
    'exploration': { label: 'Exploration Stage', gradient: 'from-blue-500 to-indigo-500' },
    'low-clarity': { label: 'Guided Discovery', gradient: 'from-purple-500 to-pink-500' }
  };
  return bands[band] || bands['exploration'];
};

export const GCScoreCard = ({ score }: GCScoreCardProps) => {
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (score.totalScore / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Main Grid - 1:2 ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GC Score - Left Side (1 column) */}
        <Card3D className="lg:col-span-1" depth="medium">
          <div className="p-6 text-center">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Resume Analyzed</span>
            </motion.div>

            {/* Score Circle */}
            <div className="relative inline-flex justify-center mb-6">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <svg className="w-32 h-32 -rotate-90 relative z-10" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#gcScoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="gcScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

            <h2 className="text-xl font-bold text-foreground mb-1">GC Score</h2>
            <p className="text-sm text-muted-foreground mb-4">Career Readiness Signal</p>

            {/* Percentile */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-semibold text-primary">Top {100 - score.percentile}%</span>
            </div>
          </div>
        </Card3D>

        {/* Right Side - 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Badges & League Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* League Badge */}
            <PremiumCard variant="glass" className="p-4">
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Crown className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs text-muted-foreground mb-0.5">League</p>
                <p className="text-sm font-bold text-foreground">Builder II</p>
              </div>
            </PremiumCard>

            {/* XP Badge */}
            <PremiumCard variant="glass" className="p-4">
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs text-muted-foreground mb-0.5">XP</p>
                <p className="text-sm font-bold text-foreground">2,450</p>
              </div>
            </PremiumCard>

            {/* Streak Badge */}
            <PremiumCard variant="glass" className="p-4">
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs text-muted-foreground mb-0.5">Streak</p>
                <p className="text-sm font-bold text-foreground">12 days</p>
              </div>
            </PremiumCard>

            {/* Rank Badge */}
            <PremiumCard variant="glass" className="p-4">
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs text-muted-foreground mb-0.5">Peer Rank</p>
                <p className="text-sm font-bold text-foreground">Top 5%</p>
              </div>
            </PremiumCard>
          </div>

          {/* Score Breakdown */}
          <Card3D depth="shallow">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Score Breakdown</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Experience', value: score.careerClarity.score * 5, max: 100, color: 'from-violet-500 to-purple-600' },
                  { label: 'Skills', value: score.skillReadiness.score * 4, max: 100, color: 'from-emerald-500 to-teal-600' },
                  { label: 'Impact', value: score.execution.score * 5, max: 75, color: 'from-amber-500 to-orange-600' }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-14 h-14 mx-auto mb-2">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-muted/20"
                        />
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke={`url(#gradient-${item.label})`}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 24}
                          initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - item.value / item.max) }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                        />
                        <defs>
                          <linearGradient id={`gradient-${item.label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={item.label === 'Experience' ? '#8b5cf6' : item.label === 'Skills' ? '#10b981' : '#f59e0b'} />
                            <stop offset="100%" stopColor={item.label === 'Experience' ? '#a855f7' : item.label === 'Skills' ? '#14b8a6' : '#ea580c'} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">{item.value}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase font-medium">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card3D>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            <Card3D depth="shallow">
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Score Velocity</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-foreground">+14</span>
                    <span className="text-xs text-muted-foreground">pts/mo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </Card3D>

            <Card3D depth="shallow">
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Verified Skills</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-foreground">8</span>
                    <span className="text-xs text-muted-foreground">of 12</span>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </div>
  );
};
