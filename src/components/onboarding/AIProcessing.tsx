import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Sparkles, Map, Target } from 'lucide-react';
import logo from '@/assets/logo.png';

interface AIProcessingProps {
  onComplete: () => void;
}

const processingMessages = [
  { text: "Reading your resume...", Icon: FileText },
  { text: "Understanding your experience...", Icon: Brain },
  { text: "Identifying your skills...", Icon: Sparkles },
  { text: "Mapping your career journey...", Icon: Map },
  { text: "Preparing your profile...", Icon: Target },
];

const AIProcessing = ({ onComplete }: AIProcessingProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < processingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 120);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const CurrentIcon = processingMessages[currentMessageIndex].Icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Animated Logo */}
      <motion.div 
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-32 h-32 rounded-3xl bg-accent/50 flex items-center justify-center"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <motion.img 
            src={logo} 
            alt="Processing" 
            className="w-20 h-20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Orbital Rings */}
        <motion.div 
          className="absolute inset-0 -m-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-48 h-48 rounded-full border-2 border-primary/20" />
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
            style={{ marginTop: -6 }}
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 -m-12"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-56 h-56 rounded-full border border-primary/10" />
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60"
            style={{ marginTop: -4 }}
          />
        </motion.div>
      </motion.div>

      {/* Processing Message */}
      <div className="text-center mb-10 h-12">
        <motion.div 
          className="flex items-center justify-center gap-3 text-xl text-foreground"
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
          >
            <CurrentIcon className="w-5 h-5 text-primary" />
          </motion.div>
          <span>{processingMessages[currentMessageIndex].text}</span>
        </motion.div>
      </div>

      {/* Skeleton Progress */}
      <motion.div 
        className="w-full max-w-md px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Skeleton Preview */}
        <motion.div 
          className="card-premium p-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-muted"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="flex-1 space-y-2">
              <motion.div 
                className="h-5 bg-muted rounded-lg w-3/4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div 
                className="h-4 bg-muted rounded-lg w-1/2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="h-10 bg-muted rounded-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="h-10 bg-muted rounded-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className={`h-4 bg-muted rounded-lg ${i === 0 ? 'w-full' : i === 1 ? 'w-5/6' : 'w-4/6'}`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Reassurance */}
      <motion.p 
        className="text-muted-foreground text-sm mt-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        We're understanding your career journey, not judging it. 
        <br />
        This creates your personalized starting point.
      </motion.p>
    </div>
  );
};

export default AIProcessing;
