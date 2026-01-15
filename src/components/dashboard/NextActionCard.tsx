import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Zap, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card3D } from './PremiumCard';

interface NextActionCardProps {
  userName: string;
}

export const NextActionCard = ({ userName }: NextActionCardProps) => {
  const nextAction = {
    title: 'Strategic Leadership: Module 3',
    subtitle: "You're 15 minutes away from mastering",
    skill: 'Stakeholder Alignment',
    description: 'This skill is critical for your next promotion.',
    cta: 'Resume Learning',
    reward: '+15 XP',
    timeLeft: '~15 min remaining',
    progress: 85
  };

  return (
    <Card3D depth="medium">
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
        
        <div className="relative p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Left Section */}
            <div className="flex-1 space-y-4">
              {/* Priority Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full"
              >
                <Target className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-xs font-semibold text-violet-500 uppercase tracking-wider">Priority Action</span>
              </motion.div>

              {/* Title */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {nextAction.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {nextAction.subtitle} <span className="font-semibold text-primary">{nextAction.skill}</span>. {nextAction.description}
                </p>
              </div>

              {/* CTA and Meta */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white shadow-lg shadow-primary/25 gap-2 px-6 py-5 h-auto rounded-xl font-semibold">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {nextAction.cta}
                  </Button>
                </motion.div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{nextAction.timeLeft}</span>
                </div>
              </div>
            </div>

            {/* Right Section - Progress Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative flex-shrink-0"
            >
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - nextAction.progress / 100) }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">{nextAction.progress}%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Card3D>
  );
};
