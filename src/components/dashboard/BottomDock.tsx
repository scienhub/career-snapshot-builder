import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, Compass, Users, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  gradient: string;
}

const dockItems: DockItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home', gradient: 'from-primary to-emerald-600' },
  { id: 'improve', icon: <TrendingUp className="w-5 h-5" />, label: 'Improve', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'explore', icon: <Compass className="w-5 h-5" />, label: 'Explore', gradient: 'from-violet-500 to-purple-600' },
  { id: 'collaborate', icon: <Users className="w-5 h-5" />, label: 'Collaborate', gradient: 'from-amber-500 to-orange-500' },
  { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile', gradient: 'from-pink-500 to-rose-500' },
];

interface BottomDockProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export const BottomDock = ({ activeItem, onItemClick }: BottomDockProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none"
    >
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      <div className="relative flex justify-center pointer-events-auto">
        <motion.div 
          className="flex items-center gap-2 p-2 bg-card/90 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl shadow-black/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {dockItems.map((item, index) => {
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative outline-none focus:outline-none"
                initial={false}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                    >
                      {item.label}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : isHovered ? 1.15 : 1,
                    y: isActive ? -4 : isHovered ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-colors duration-200",
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg` 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {/* Icon */}
                  {item.icon}
                  
                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      layoutId="dockActiveGlow"
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-50`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </motion.div>
              </motion.button>
            );
          })}
          
          {/* Quick Action Button */}
          <div className="w-px h-8 bg-border mx-1" />
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-emerald-600 text-white shadow-lg shadow-primary/30"
          >
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
