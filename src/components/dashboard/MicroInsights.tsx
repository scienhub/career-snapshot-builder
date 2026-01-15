import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { TrendingUp, Target, ArrowRight, Brain, Sparkles, ChevronLeft, ChevronRight, Pause, Play, Lightbulb, Rocket } from 'lucide-react';

interface InsightItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  gradient: string;
}

const insights: InsightItem[] = [
  {
    id: '1',
    icon: <Brain className="w-6 h-6" />,
    title: 'Skill Gap Detected',
    description: 'Your Data Analytics skill is trending. Adding it could boost your GC Score by 5 points.',
    actionLabel: 'Add to Plan',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700'
  },
  {
    id: '2',
    icon: <Target className="w-6 h-6" />,
    title: 'Goal Alignment',
    description: 'Your progress aligns perfectly with your 3-year career target. Keep going!',
    actionLabel: 'View Details',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    id: '3',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Growth Opportunity',
    description: 'AI/ML projects are gaining traction. Your profile shows strong potential here.',
    actionLabel: 'Explore',
    gradient: 'from-orange-600 via-amber-600 to-yellow-600'
  },
  {
    id: '4',
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Weekly Milestone',
    description: "You're on track for your weekly learning goal. Just 2 more hours to complete!",
    actionLabel: 'Continue',
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-700'
  }
];

export const MicroInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

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
      transition={{ duration: 0.5, delay: 0.7 }}
      className="relative w-full"
    >
      {/* Container with rounded corners */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1.5 p-4">
          {insights.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
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

        {/* Main Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className={`relative h-52 sm:h-48 cursor-grab active:cursor-grabbing bg-gradient-to-br ${currentInsight.gradient}`}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
              className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
              transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity } }}
              className="absolute -bottom-24 -left-24 w-56 h-56 bg-white/5 rounded-full blur-2xl"
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
              className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/10"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {currentInsight.icon}
                  </motion.div>
                  <div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 text-white rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10 w-fit mb-1"
                    >
                      <Lightbulb className="w-3 h-3" />
                      AI Insight
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{currentInsight.title}</h3>
                  </div>
                </div>

                {/* Controls */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 hover:bg-white/25 transition-colors"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm leading-relaxed max-w-xl">
                {currentInsight.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPrev}
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNext}
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Dots */}
                <div className="flex gap-1.5 items-center">
                  {insights.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  {currentInsight.actionLabel}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
