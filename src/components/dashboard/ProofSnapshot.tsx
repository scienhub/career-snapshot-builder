import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Calendar, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofItem {
  id: string;
  type: 'skill' | 'learning' | 'contribution';
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  xp: string;
}

const proofItems: ProofItem[] = [
  {
    id: '1',
    type: 'skill',
    title: 'Leadership Verified',
    description: 'Added proof from recent project delivery',
    date: '2 days ago',
    icon: <Award className="w-4 h-4" />,
    xp: '+25 XP'
  },
  {
    id: '2',
    type: 'learning',
    title: 'Completed Strategy Module',
    description: 'Applied learning in team presentation',
    date: '5 days ago',
    icon: <BookOpen className="w-4 h-4" />,
    xp: '+15 XP'
  },
  {
    id: '3',
    type: 'contribution',
    title: 'Mentored Junior Developer',
    description: 'Helped with career planning session',
    date: '1 week ago',
    icon: <Users className="w-4 h-4" />,
    xp: '+30 XP'
  }
];

const typeStyles = {
  skill: {
    bg: 'bg-gradient-to-br from-primary/20 to-emerald-500/20',
    text: 'text-primary',
    badge: 'bg-primary/10 text-primary border-primary/20'
  },
  learning: {
    bg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  },
  contribution: {
    bg: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  }
};

export const ProofSnapshot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
    >
      {/* Decorative background */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Recent Proof & Contributions</h3>
              <p className="text-sm text-muted-foreground">Your earned achievements</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 cursor-pointer"
            >
              {/* Timeline Line */}
              {index < proofItems.length - 1 && (
                <div className="absolute left-[31px] top-[52px] bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
              )}

              {/* Icon */}
              <div className={cn(
                "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                typeStyles[item.type].bg,
                typeStyles[item.type].text
              )}>
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <span className={cn(
                    "text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border",
                    typeStyles[item.type].badge
                  )}>
                    {item.type}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-primary ml-auto">
                    <Sparkles className="w-3 h-3" />
                    {item.xp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-4 py-3.5 text-sm font-semibold text-primary hover:text-primary/80 bg-gradient-to-r from-accent/50 via-accent to-accent/50 border border-border/50 rounded-xl hover:border-primary/30 transition-all flex items-center justify-center gap-2"
        >
          View Complete Timeline
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
