import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, ArrowRight, Brain, Sparkles } from 'lucide-react';

interface InsightItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  priority: 'high' | 'medium' | 'low';
}

const insights: InsightItem[] = [
  {
    id: '1',
    icon: <Brain className="w-4 h-4" />,
    title: 'Skill Gap Detected',
    description: 'Your Data Analytics skill is trending in your industry. Consider adding it to your growth plan.',
    actionLabel: 'Add to Plan',
    priority: 'high'
  },
  {
    id: '2',
    icon: <Target className="w-4 h-4" />,
    title: 'Goal Alignment',
    description: 'Your current progress aligns well with your 3-year career target. Keep the momentum!',
    actionLabel: 'View Details',
    priority: 'medium'
  },
  {
    id: '3',
    icon: <TrendingUp className="w-4 h-4" />,
    title: 'Growth Opportunity',
    description: 'Projects in AI/ML are gaining traction. Your profile shows potential for this direction.',
    actionLabel: 'Explore',
    priority: 'low'
  }
];

const priorityStyles = {
  high: {
    border: 'border-l-primary',
    bg: 'from-primary/10 to-transparent',
    icon: 'bg-primary/20 text-primary'
  },
  medium: {
    border: 'border-l-amber-500',
    bg: 'from-amber-500/10 to-transparent',
    icon: 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
  },
  low: {
    border: 'border-l-blue-500',
    bg: 'from-blue-500/10 to-transparent',
    icon: 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
  }
};

export const MicroInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-amber-500/5 to-transparent blur-3xl" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </motion.div>
            <div>
              <h3 className="text-base font-bold text-foreground">Micro Insights</h3>
              <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
          >
            <Sparkles className="w-3 h-3" />
            <span>3 New</span>
          </motion.div>
        </div>

        {/* Insights List */}
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className={`group relative p-4 rounded-xl border-l-4 ${priorityStyles[insight.priority].border} bg-gradient-to-r ${priorityStyles[insight.priority].bg} hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${priorityStyles[insight.priority].icon}`}>
                  {insight.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-0.5">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>

                {/* Action */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  {insight.actionLabel}
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-dashed border-border rounded-xl hover:border-primary/30 transition-all flex items-center justify-center gap-2"
        >
          View All Insights
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
