import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextActionCardProps {
  userName: string;
}

export const NextActionCard = ({ userName }: NextActionCardProps) => {
  const nextAction = {
    title: 'Verify 1 skill to strengthen your profile',
    description: 'Adding verified proof to your Leadership skill will boost your credibility score.',
    cta: 'Add Skill Proof',
    reward: '+15 XP'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
      className="relative overflow-hidden card-premium p-6 border-primary/20"
    >
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">Your Next Step</h3>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {nextAction.reward}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{nextAction.description}</p>
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="btn-primary-gradient gap-2 whitespace-nowrap">
            {nextAction.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '35%' }}
        transition={{ duration: 1, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
      />
    </motion.div>
  );
};
