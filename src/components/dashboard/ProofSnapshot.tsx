import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofItem {
  id: string;
  type: 'skill' | 'learning' | 'contribution';
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

const proofItems: ProofItem[] = [
  {
    id: '1',
    type: 'skill',
    title: 'Leadership Verified',
    description: 'Added proof from recent project delivery',
    date: '2 days ago',
    icon: <Award className="w-4 h-4" />
  },
  {
    id: '2',
    type: 'learning',
    title: 'Completed Strategy Module',
    description: 'Applied learning in team presentation',
    date: '5 days ago',
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: '3',
    type: 'contribution',
    title: 'Mentored Junior Developer',
    description: 'Helped with career planning session',
    date: '1 week ago',
    icon: <Users className="w-4 h-4" />
  }
];

const typeColors = {
  skill: 'bg-primary/10 text-primary',
  learning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  contribution: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
};

export const ProofSnapshot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="card-premium p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recent Proof & Contributions</h3>
          <p className="text-sm text-muted-foreground">Your earned achievements</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-1">
        {proofItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
          >
            {/* Timeline Line */}
            {index < proofItems.length - 1 && (
              <div className="absolute left-[27px] top-14 bottom-0 w-px bg-border" />
            )}

            {/* Icon */}
            <div className={cn(
              "relative z-10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              typeColors[item.type]
            )}>
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-foreground truncate">{item.title}</h4>
                <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Calendar className="w-3 h-3" />
              {item.date}
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 text-sm font-medium text-primary hover:text-primary/80 border border-border rounded-xl hover:border-primary/30 transition-all"
      >
        View Complete Timeline
      </motion.button>
    </motion.div>
  );
};
