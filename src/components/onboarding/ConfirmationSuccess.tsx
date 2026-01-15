import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Shield, Sparkles, Target, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface ConfirmationSuccessProps {
  userName: string;
  careerStage: string;
  gcScore?: number;
}

const ConfirmationSuccess = ({ userName, careerStage, gcScore = 72 }: ConfirmationSuccessProps) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'celebration' | 'score-reveal' | 'content'>('celebration');
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    // Phase 1: Celebration animation
    const timer1 = setTimeout(() => setPhase('score-reveal'), 1500);
    // Phase 2: Score reveal
    const timer2 = setTimeout(() => setPhase('content'), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Animate score counting up
  useEffect(() => {
    if (phase === 'score-reveal') {
      const duration = 2000;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayedScore(Math.round(eased * gcScore));
        if (progress >= 1) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [phase, gcScore]);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.cos((i * Math.PI * 2) / 12) * (80 + Math.random() * 40),
    y: Math.sin((i * Math.PI * 2) / 12) * (80 + Math.random() * 40),
    delay: i * 0.08,
    size: 6 + Math.random() * 10,
    color: i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-amber-400' : 'bg-emerald-400',
  }));

  const stars = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.cos((i * Math.PI * 2) / 6 + Math.PI / 6) * 120,
    y: Math.sin((i * Math.PI * 2) / 6 + Math.PI / 6) * 120,
    delay: 0.5 + i * 0.1,
    rotation: i * 60,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <AnimatePresence mode="wait">
        {/* Phase 1: Initial Celebration */}
        {phase === 'celebration' && (
          <motion.div 
            key="celebration"
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div 
              className="w-32 h-32 rounded-3xl bg-success/10 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(52, 211, 153, 0.3)",
                  "0 0 0 30px rgba(52, 211, 153, 0)",
                  "0 0 0 0 rgba(52, 211, 153, 0)"
                ] 
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div 
                className="w-24 h-24 rounded-2xl bg-success flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-14 h-14 text-success-foreground" strokeWidth={3} />
              </motion.div>
            </motion.div>
            
            {/* Celebration particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${particle.color}`}
                style={{ width: particle.size, height: particle.size }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 64 - particle.size / 2, 
                  y: 64 - particle.size / 2 
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: 64 - particle.size / 2 + particle.x,
                  y: 64 - particle.size / 2 + particle.y,
                }}
                transition={{ 
                  delay: 0.3 + particle.delay, 
                  duration: 1,
                  ease: "easeOut"
                }}
              />
            ))}

            <motion.p
              className="mt-8 text-xl font-medium text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Profile Complete!
            </motion.p>
          </motion.div>
        )}

        {/* Phase 2: Score Reveal */}
        {phase === 'score-reveal' && (
          <motion.div 
            key="score-reveal"
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-lg text-muted-foreground mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Career Readiness Score
            </motion.p>

            {/* Large Score Circle */}
            <div className="relative w-56 h-56 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#revealGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 565, strokeDashoffset: 565 }}
                  animate={{ strokeDashoffset: 565 - (565 * gcScore) / 100 }}
                  transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="revealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(160 70% 50%)" />
                    <stop offset="100%" stopColor="hsl(158 64% 48%)" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className="text-6xl font-bold text-foreground tabular-nums"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {displayedScore}
                </motion.span>
                <span className="text-sm text-muted-foreground mt-1">out of 100</span>
              </div>

              {/* Floating stars around score */}
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="absolute"
                  style={{ 
                    left: 112 + star.x - 12, 
                    top: 112 + star.y - 12 
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.8], 
                    scale: [0, 1.2, 1],
                    rotate: star.rotation + 360
                  }}
                  transition={{ 
                    delay: star.delay, 
                    duration: 1,
                    ease: "easeOut"
                  }}
                >
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">Good Potential</span>
              <span className="text-muted-foreground">• Top 22% in your stage</span>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 3: Final Content */}
        {phase === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Welcome, {userName.split(' ')[0]}!
              </h2>
              <p className="text-lg text-muted-foreground">
                Your GC Score of <span className="font-semibold text-primary">{gcScore}</span> places you in the 
                <span className="font-semibold text-foreground"> top 22%</span> of professionals at your stage.
              </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div 
              className="card-premium p-6 mb-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-5 pb-4 border-b border-border">
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
                {[
                  { icon: Shield, color: 'text-success', bg: 'bg-success/10', text: 'Profile verified and secured' },
                  { icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10', text: 'AI analysis complete' },
                  { icon: Target, color: 'text-amber-500', bg: 'bg-amber-500/10', text: 'Growth roadmap ready' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={handleContinue}
                className="btn-primary-gradient px-10 py-6 text-lg rounded-xl group w-full sm:w-auto"
              >
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
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your baseline is set. Everything you do from here builds on this foundation.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationSuccess;
