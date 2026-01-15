import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface ConfirmationSuccessProps {
  userName: string;
  careerStage: string;
}

const ConfirmationSuccess = ({ userName, careerStage }: ConfirmationSuccessProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.cos((i * Math.PI * 2) / 8) * 60,
    y: Math.sin((i * Math.PI * 2) / 8) * 60,
    delay: i * 0.1,
    size: 8 + Math.random() * 8,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* Success Animation */}
      <motion.div 
        className="relative mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div 
          className="w-28 h-28 rounded-3xl bg-success/10 flex items-center justify-center"
          animate={{ boxShadow: ["0 0 0 0 rgba(52, 211, 153, 0)", "0 0 0 20px rgba(52, 211, 153, 0)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-success flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 20 }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Check className="w-12 h-12 text-success-foreground" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Celebration particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary"
            style={{ width: particle.size, height: particle.size }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: 56 - particle.size / 2, 
              y: 56 - particle.size / 2 
            }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0.5],
              x: 56 - particle.size / 2 + particle.x,
              y: 56 - particle.size / 2 + particle.y,
            }}
            transition={{ 
              delay: 0.3 + particle.delay, 
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Welcome to GrowthCharters, {userName.split(' ')[0]}!
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Your career snapshot is ready. You're now set to begin your growth journey.
        </motion.p>

        {/* Summary Card */}
        <motion.div 
          className="card-premium p-6 max-w-md mx-auto mb-8 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
            <motion.div 
              className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <img src={logo} alt="GrowthCharters" className="w-10 h-10" />
            </motion.div>
            <div>
              <p className="font-semibold text-foreground">{userName}</p>
              <p className="text-sm text-primary capitalize">{careerStage.replace('-', ' ')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <motion.div 
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-success" />
              </div>
              <span className="text-foreground">Profile verified and secured</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">AI analysis complete</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-warning" />
              </div>
              <span className="text-foreground">Ready to set career goals</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Button className="btn-primary-gradient px-10 py-6 text-lg rounded-xl group">
            Continue to Dashboard
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Button>
        </motion.div>

        <motion.p 
          className="text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Your baseline is set. Everything you do from here builds on this foundation.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ConfirmationSuccess;
