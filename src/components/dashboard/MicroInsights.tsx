import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, ArrowRight, Brain, Sparkles, ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';

interface InsightItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  priority: 'high' | 'medium' | 'low';
  gradient: string;
  bgImage?: string;
}

const insights: InsightItem[] = [
  {
    id: '1',
    icon: <Brain className="w-6 h-6" />,
    title: 'Skill Gap Detected',
    description: 'Your Data Analytics skill is trending in your industry. Adding it to your growth plan could boost your GC Score by 5 points.',
    actionLabel: 'Add to Plan',
    priority: 'high',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700'
  },
  {
    id: '2',
    icon: <Target className="w-6 h-6" />,
    title: 'Goal Alignment',
    description: 'Your current progress aligns perfectly with your 3-year career target. Keep the momentum going!',
    actionLabel: 'View Details',
    priority: 'medium',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    id: '3',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Growth Opportunity',
    description: 'Projects in AI/ML are gaining traction. Your profile shows strong potential for this direction.',
    actionLabel: 'Explore',
    priority: 'low',
    gradient: 'from-orange-600 via-amber-600 to-yellow-600'
  },
  {
    id: '4',
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Weekly Milestone',
    description: 'You\'re on track to hit your weekly learning goal. Just 2 more hours to complete!',
    actionLabel: 'Continue',
    priority: 'medium',
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-700'
  }
];

export const MicroInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  useEffect(() => {
    if (isAutoPlaying && !isExpanded) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, isExpanded]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -50) {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    } else if (info.offset.x > 50) {
      setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
    }
  };

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % insights.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);

  const currentInsight = insights[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full"
    >
      {/* Story-like Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
          {insights.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: index < currentIndex ? '100%' : '0%' }}
                animate={{ 
                  width: index < currentIndex ? '100%' : index === currentIndex ? '100%' : '0%'
                }}
                transition={{ 
                  duration: index === currentIndex && isAutoPlaying ? 5 : 0.3,
                  ease: 'linear'
                }}
              />
            </div>
          ))}
        </div>

        {/* Main Story Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, opacity }}
          className={`relative h-48 md:h-56 cursor-grab active:cursor-grabbing bg-gradient-to-br ${currentInsight.gradient}`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1.2, 1, 1.2]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                scale: { duration: 5, repeat: Infinity }
              }}
              className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            />
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInsight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full flex flex-col justify-between p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {currentInsight.icon}
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1 px-2 py-0.5 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Insight
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">{currentInsight.title}</h3>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                  >
                    {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-lg">
                {currentInsight.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  {currentInsight.actionLabel}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {insights.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
