import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

interface ThemePreferenceProps {
  onSelect: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemePreference = ({ onSelect }: ThemePreferenceProps) => {
  const themes = [
    {
      id: 'light' as const,
      name: 'Light Mode',
      description: 'Clean and bright for daytime use',
      icon: Sun,
      gradient: 'from-amber-100 to-orange-100',
      iconColor: 'text-amber-500',
      preview: 'bg-white',
    },
    {
      id: 'dark' as const,
      name: 'Dark Mode',
      description: 'Easy on the eyes in low light',
      icon: Moon,
      gradient: 'from-slate-800 to-slate-900',
      iconColor: 'text-blue-400',
      preview: 'bg-slate-900',
    },
    {
      id: 'system' as const,
      name: 'System Default',
      description: 'Automatically match your device',
      icon: Monitor,
      gradient: 'from-slate-200 to-slate-300',
      iconColor: 'text-slate-600',
      preview: 'bg-gradient-to-r from-white to-slate-900',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo & Welcome */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="relative inline-block mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
            <img src={logo} alt="GrowthCharters" className="relative h-20 w-20" />
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to GrowthCharters
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Before we begin, choose your preferred visual experience
          </motion.p>
        </motion.div>

        {/* Theme Options */}
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {themes.map((theme, index) => (
            <motion.button
              key={theme.id}
              onClick={() => onSelect(theme.id)}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-premium p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30">
                {/* Preview Window */}
                <div className={`w-full h-24 rounded-xl mb-4 ${theme.preview} border border-border/50 flex items-center justify-center overflow-hidden`}>
                  <div className={`w-3/4 h-16 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                    <theme.icon className={`w-8 h-8 ${theme.iconColor}`} />
                  </div>
                </div>
                
                {/* Label */}
                <h3 className="font-semibold text-foreground mb-1 text-left">
                  {theme.name}
                </h3>
                <p className="text-sm text-muted-foreground text-left">
                  {theme.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Trust Indicator */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          You can change this anytime from the header
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ThemePreference;
