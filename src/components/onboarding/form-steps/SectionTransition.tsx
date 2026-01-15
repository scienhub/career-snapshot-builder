import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Heart, Rocket, Check, ArrowRight } from 'lucide-react';

interface SectionTransitionProps {
  fromSection: string;
  toSection: string;
  completedSections: number;
  totalSections: number;
  onContinue: () => void;
}

const sectionMessages: Record<string, { title: string; subtitle: string; icon: React.ElementType; gradient: string }> = {
  'Foundation': {
    title: "Foundation Complete!",
    subtitle: "You've laid the groundwork for your growth journey",
    icon: Check,
    gradient: 'from-emerald-500 to-teal-600'
  },
  'Vision': {
    title: "Vision Captured!",
    subtitle: "Your career direction is now crystal clear",
    icon: Target,
    gradient: 'from-violet-500 to-purple-600'
  },
  'Skills': {
    title: "Skills Mapped!",
    subtitle: "We understand your capabilities and growth areas",
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600'
  },
  'Reality': {
    title: "Reality Checked!",
    subtitle: "Your constraints are now part of the equation",
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-600'
  },
  'Purpose': {
    title: "Purpose Defined!",
    subtitle: "Your motivation will drive your success",
    icon: Heart,
    gradient: 'from-rose-500 to-pink-600'
  },
  'Identity': {
    title: "Identity Established!",
    subtitle: "Your professional brand is taking shape",
    icon: Sparkles,
    gradient: 'from-indigo-500 to-violet-600'
  },
  'Style': {
    title: "Style Understood!",
    subtitle: "We know how you work best",
    icon: Check,
    gradient: 'from-slate-500 to-gray-600'
  },
  'Preferences': {
    title: "Preferences Saved!",
    subtitle: "Your engagement style will personalize your journey",
    icon: Heart,
    gradient: 'from-fuchsia-500 to-purple-600'
  },
  'Future': {
    title: "Future Ready!",
    subtitle: "You're prepared for what's coming next",
    icon: Rocket,
    gradient: 'from-cyan-500 to-blue-600'
  },
};

const encouragementMessages = [
  "You're doing amazing! Keep going!",
  "Every step brings you closer to clarity!",
  "Your dedication is inspiring!",
  "Almost there! The best is yet to come!",
  "You're building something meaningful!",
];

const SectionTransition = ({ fromSection, toSection, completedSections, totalSections, onContinue }: SectionTransitionProps) => {
  const sectionInfo = sectionMessages[fromSection] || sectionMessages['Foundation'];
  const Icon = sectionInfo.icon;
  const encouragement = encouragementMessages[completedSections % encouragementMessages.length];
  const progress = Math.round((completedSections / totalSections) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-6"
    >
      {/* Celebration Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${sectionInfo.gradient} flex items-center justify-center shadow-2xl mb-8`}
      >
        <Icon className="w-12 h-12 text-white" />
        
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{ 
              duration: 1.5,
              delay: 0.5 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="absolute w-3 h-3"
          >
            <Sparkles className="w-full h-full text-amber-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-foreground mb-2"
      >
        {sectionInfo.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-muted-foreground mb-6 max-w-md"
      >
        {sectionInfo.subtitle}
      </motion.p>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-xs mb-6"
      >
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${sectionInfo.gradient}`}
            initial={{ width: `${((completedSections - 1) / totalSections) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8"
      >
        <TrendingUp className="w-4 h-4" />
        {encouragement}
      </motion.div>

      {/* Next Section Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-muted-foreground mb-6"
      >
        Next up: <span className="font-semibold text-foreground">{toSection}</span>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={onContinue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${sectionInfo.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
      >
        Continue to {toSection}
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default SectionTransition;
