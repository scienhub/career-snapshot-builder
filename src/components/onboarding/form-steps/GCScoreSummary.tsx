import { motion } from 'framer-motion';
import { 
  Target, 
  Lightbulb, 
  Zap, 
  Heart, 
  BookOpen, 
  Shield,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GCScoreBreakdown } from '@/types/onboarding';

interface GCScoreSummaryProps {
  scoreBreakdown: GCScoreBreakdown;
  userName: string;
  onContinue: () => void;
}

const pillars = [
  { key: 'careerClarity', label: 'Career Clarity & Vision', icon: Target, weight: '20%', color: 'from-blue-500 to-cyan-500' },
  { key: 'skillReadiness', label: 'Skill Readiness', icon: Lightbulb, weight: '25%', color: 'from-purple-500 to-pink-500' },
  { key: 'execution', label: 'Execution & Work Behaviour', icon: Zap, weight: '15%', color: 'from-orange-500 to-red-500' },
  { key: 'motivationPurpose', label: 'Motivation & Purpose', icon: Heart, weight: '15%', color: 'from-pink-500 to-rose-500' },
  { key: 'learningAgility', label: 'Learning Agility', icon: BookOpen, weight: '15%', color: 'from-green-500 to-emerald-500' },
  { key: 'commitment', label: 'Commitment & Ownership', icon: Shield, weight: '10%', color: 'from-indigo-500 to-violet-500' },
] as const;

const getBandInfo = (band: GCScoreBreakdown['band']) => {
  const bands = {
    'high-clarity': { label: 'High Clarity', description: 'Strong readiness for your next level', color: 'text-green-500', bg: 'bg-green-500/10' },
    'good-potential': { label: 'Good Potential', description: 'Focused development will accelerate growth', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'direction-forming': { label: 'Direction Forming', description: 'Your path is becoming clearer', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    'exploration': { label: 'Exploration Stage', description: 'Building your foundation', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    'low-clarity': { label: 'Discovery Phase', description: 'Every journey starts with a first step', color: 'text-slate-500', bg: 'bg-slate-500/10' },
  };
  return bands[band];
};

const GCScoreSummary = ({ scoreBreakdown, userName, onContinue }: GCScoreSummaryProps) => {
  const bandInfo = getBandInfo(scoreBreakdown.band);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Profile Complete
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Your GC Score, {userName.split(' ')[0]}
        </h2>
        <p className="text-muted-foreground">
          Here's your complete career readiness breakdown — no hidden scores, full transparency.
        </p>
      </motion.div>

      {/* Main Score Card */}
      <motion.div 
        className="card-premium p-8 mb-8 bg-gradient-to-br from-background via-background to-primary/5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Score Circle */}
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                className="fill-none stroke-secondary"
                strokeWidth="12"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                className="fill-none stroke-primary"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ strokeDasharray: 553, strokeDashoffset: 553 }}
                animate={{ strokeDashoffset: 553 - (553 * scoreBreakdown.totalScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-5xl font-bold text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {scoreBreakdown.totalScore}
              </motion.span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>

          {/* Score Context */}
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bandInfo.bg} mb-4`}>
              <Award className={`w-5 h-5 ${bandInfo.color}`} />
              <span className={`font-semibold ${bandInfo.color}`}>{bandInfo.label}</span>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              {bandInfo.description}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  Top <span className="font-semibold text-foreground">{100 - scoreBreakdown.percentile}%</span> in your peer group
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pillar Breakdown */}
      <motion.div 
        className="card-premium p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Score Breakdown by Pillar
        </h3>

        <div className="space-y-4">
          {pillars.map((pillar, index) => {
            const data = scoreBreakdown[pillar.key as keyof typeof scoreBreakdown] as { score: number; maxScore: number; details: string[] };
            const percentage = (data.score / data.maxScore) * 100;
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{pillar.label}</p>
                      <p className="text-xs text-muted-foreground">Weight: {pillar.weight}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{data.score}</p>
                    <p className="text-xs text-muted-foreground">of {data.maxScore}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${pillar.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                </div>

                {/* Details */}
                {data.details.length > 0 && (
                  <div className="space-y-1">
                    {data.details.map((detail, i) => (
                      <p key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Transparency Note */}
      <motion.div 
        className="card-premium p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Full Transparency — No Hidden Scores
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Your GC Score is calculated based on verified inputs across 6 pillars. We never use hidden factors 
          or arbitrary adjustments. Every point is earned through the information you've provided.
        </p>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
            <span className="text-muted-foreground">Career clarity based on your 10-year vision</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
            <span className="text-muted-foreground">Skills scored by self-assessment confidence</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
            <span className="text-muted-foreground">Execution based on discipline & consistency</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
            <span className="text-muted-foreground">Commitment reflects your growth pledge</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onContinue}
          className="btn-primary-gradient px-8 py-6 text-lg rounded-xl"
        >
          Continue to Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Your Growth Charter journey begins now. You can always improve your score.
        </p>
      </motion.div>
    </div>
  );
};

export default GCScoreSummary;
