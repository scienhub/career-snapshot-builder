import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextActionCardProps {
  userName?: string;
}

export const NextActionCard = ({ userName }: NextActionCardProps) => {
  const nextAction = {
    title: 'Your Next Step',
    description: 'Adding verified proof to your Leadership skill will boost your credibility score.',
    cta: 'Add Skill Proof',
    reward: '+15 XP',
    progress: 65
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/95 to-emerald-600/95 shadow-xl shadow-primary/20"
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />
      
      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex items-start gap-4 flex-1">
            {/* Icon */}
            <motion.div 
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              {/* Notification dot */}
              <motion.div 
                className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-primary flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-[8px] font-bold text-amber-900">!</span>
              </motion.div>
            </motion.div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h3 className="text-lg font-bold text-white">
                  {nextAction.title}
                </h3>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-amber-900 rounded-full text-xs font-bold"
                >
                  <Zap className="w-3 h-3" />
                  {nextAction.reward}
                </motion.span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {nextAction.description}
              </p>
              
              {/* Progress bar */}
              <div className="mt-3 max-w-md">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${nextAction.progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.div 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Button 
              className="bg-white hover:bg-white/90 text-primary font-semibold px-5 py-2.5 h-auto rounded-xl shadow-lg gap-2"
            >
              {nextAction.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
