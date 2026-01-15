import { motion } from 'framer-motion';
import { Circle, CheckCircle2, Lock, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathNode {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'available' | 'locked';
  branch?: 'main' | 'optional';
}

const pathNodes: PathNode[] = [
  { id: '1', label: 'Profile Complete', status: 'completed', branch: 'main' },
  { id: '2', label: 'First Skill Verified', status: 'completed', branch: 'main' },
  { id: '3', label: 'Career Vision Set', status: 'current', branch: 'main' },
  { id: '4', label: 'Project Started', status: 'available', branch: 'main' },
  { id: '5', label: 'Community Joined', status: 'available', branch: 'optional' },
  { id: '6', label: 'Mentorship Ready', status: 'locked', branch: 'main' },
];

const NodeIcon = ({ status }: { status: PathNode['status'] }) => {
  switch (status) {
    case 'completed':
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-md shadow-primary/30"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
        </motion.div>
      );
    case 'current':
      return (
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-md" />
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center ring-4 ring-primary/20">
            <Circle className="w-2.5 h-2.5 fill-white text-white" />
          </div>
        </motion.div>
      );
    case 'available':
      return (
        <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 bg-muted/50 flex items-center justify-center">
          <Circle className="w-2.5 h-2.5 text-muted-foreground/50" />
        </div>
      );
    case 'locked':
      return (
        <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center opacity-50">
          <Lock className="w-3 h-3 text-muted-foreground/50" />
        </div>
      );
  }
};

export const ProgressMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Your Growth Path</h3>
              <p className="text-sm text-muted-foreground">Multiple directions, your choice</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, x: 2 }}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all paths
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Path Visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-muted to-muted/30 rounded-full" />
          
          <div className="relative flex items-start gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
            {pathNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                className="flex flex-col items-center shrink-0"
              >
                {/* Node button */}
                <motion.div
                  whileHover={{ scale: node.status !== 'locked' ? 1.08 : 1 }}
                  className={cn(
                    "relative flex flex-col items-center gap-3 px-5 py-4 rounded-2xl border transition-all cursor-pointer min-w-[140px]",
                    node.status === 'current' && "bg-gradient-to-b from-accent to-accent/50 border-primary/40 shadow-lg shadow-primary/10",
                    node.status === 'completed' && "bg-card border-border/50 hover:border-primary/30 hover:shadow-md",
                    node.status === 'available' && "bg-card/50 border-border/50 hover:border-primary/30 hover:shadow-md",
                    node.status === 'locked' && "bg-muted/20 border-border/30 opacity-60 cursor-not-allowed",
                    node.branch === 'optional' && "border-dashed"
                  )}
                >
                  {/* Current indicator */}
                  {node.status === 'current' && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-primary rounded-full"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Now</span>
                    </motion.div>
                  )}
                  
                  <NodeIcon status={node.status} />
                  
                  <span className={cn(
                    "text-xs font-medium text-center leading-tight",
                    node.status === 'locked' ? "text-muted-foreground/60" : "text-foreground"
                  )}>
                    {node.label}
                  </span>
                  
                  {node.branch === 'optional' && (
                    <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted rounded-full">optional</span>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
