import { motion } from 'framer-motion';
import { Home, TrendingUp, Compass, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const dockItems: DockItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { id: 'improve', icon: <TrendingUp className="w-5 h-5" />, label: 'Improve' },
  { id: 'explore', icon: <Compass className="w-5 h-5" />, label: 'Explore' },
  { id: 'collaborate', icon: <Users className="w-5 h-5" />, label: 'Collaborate' },
  { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
];

interface BottomDockProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export const BottomDock = ({ activeItem, onItemClick }: BottomDockProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg">
        {dockItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => onItemClick(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative p-3 rounded-xl transition-all duration-200",
                  activeItem === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.icon}
                
                {/* Active Indicator */}
                {activeItem === item.id && (
                  <motion.div
                    layoutId="dockIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-card border border-border text-foreground"
            >
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
};
