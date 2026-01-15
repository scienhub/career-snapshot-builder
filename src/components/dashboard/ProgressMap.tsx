import { motion } from 'framer-motion';
import { Circle, CheckCircle2, Lock, ArrowRight, Sparkles, MapPin, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card3D } from './PremiumCard';

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
          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/40"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
        </motion.div>
      );
    case 'current':
      return (
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-lg" />
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center ring-4 ring-primary/30 shadow-lg">
            <Circle className="w-3 h-3 fill-white text-white" />
          </div>
        </motion.div>
      );
    case 'available':
      return (
        <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/40 bg-background flex items-center justify-center hover:border-primary/50 transition-colors">
          <Circle className="w-3 h-3 text-muted-foreground/50" />
        </div>
      );
    case 'locked':
      return (
        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center opacity-60">
          <Lock className="w-3.5 h-3.5 text-muted-foreground/60" />
        </div>
      );
  }
};

export const ProgressMap = () => {
  return (
    <Card3D depth="shallow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Your Growth Path</h3>
              <p className="text-sm text-muted-foreground">Multiple directions, your choice</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, x: 2 }}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all paths
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Path Visualization - Horizontal Scroll */}
        <div className="relative overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex items-center gap-3 min-w-max">
            {pathNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="flex items-center"
              >
                {/* Node Card */}
                <motion.div
                  whileHover={{ scale: node.status !== 'locked' ? 1.03 : 1, y: node.status !== 'locked' ? -2 : 0 }}
                  className={cn(
                    "relative flex flex-col items-center gap-3 px-5 py-4 rounded-2xl border transition-all min-w-[130px]",
                    node.status === 'current' && "bg-gradient-to-b from-primary/10 to-accent border-primary/30 shadow-lg shadow-primary/10",
                    node.status === 'completed' && "bg-card border-border/50 hover:border-primary/40 hover:shadow-md cursor-pointer",
                    node.status === 'available' && "bg-card/70 border-border/40 hover:border-primary/40 hover:shadow-md cursor-pointer",
                    node.status === 'locked' && "bg-muted/30 border-border/20 opacity-60",
                    node.branch === 'optional' && "border-dashed"
                  )}
                >
                  {/* Current indicator */}
                  {node.status === 'current' && (
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-primary to-emerald-600 rounded-full shadow-md"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wide">Now</span>
                    </motion.div>
                  )}
                  
                  <NodeIcon status={node.status} />
                  
                  <span className={cn(
                    "text-xs font-semibold text-center leading-tight",
                    node.status === 'locked' ? "text-muted-foreground/60" : "text-foreground"
                  )}>
                    {node.label}
                  </span>
                  
                  {node.branch === 'optional' && (
                    <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted/50 rounded-full">optional</span>
                  )}
                </motion.div>

                {/* Connector */}
                {index < pathNodes.length - 1 && (
                  <div className="flex items-center mx-1">
                    <motion.div 
                      className={cn(
                        "w-8 h-0.5 rounded-full",
                        index < 2 ? "bg-gradient-to-r from-primary to-emerald-500" : "bg-muted/40"
                      )}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
};
