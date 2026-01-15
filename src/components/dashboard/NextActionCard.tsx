import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextActionCardProps {
  userName: string;
}

export const NextActionCard = ({ userName }: NextActionCardProps) => {
  const nextAction = {
    title: 'Your Next Step',
    description: 'Adding verified proof to your Leadership skill will boost your credibility score.',
    cta: 'Add Skill Proof',
    reward: '+15 XP'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.005 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-card to-card border border-primary/20 shadow-xl"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-primary/10 to-transparent blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-primary/5 to-transparent blur-2xl" />
      
      <div className="relative p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Icon with animation */}
          <motion.div 
            className="relative"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center"
            >
              <Star className="w-2.5 h-2.5 text-amber-900 fill-current" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{nextAction.title}</h3>
              <motion.span 
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-3 h-3" />
                {nextAction.reward}
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{nextAction.description}</p>
          </div>

          {/* CTA Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white shadow-lg shadow-primary/25 gap-2 px-6 py-2.5 h-auto rounded-xl font-semibold">
              {nextAction.cta}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Button>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '35%' }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-full relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
