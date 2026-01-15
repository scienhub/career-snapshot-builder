import { motion } from 'framer-motion';
import { Circle, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
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
      return <CheckCircle2 className="w-5 h-5 text-primary" />;
    case 'current':
      return (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
        >
          <Circle className="w-2 h-2 fill-primary-foreground text-primary-foreground" />
        </motion.div>
      );
    case 'available':
      return <Circle className="w-5 h-5 text-muted-foreground" />;
    case 'locked':
      return <Lock className="w-4 h-4 text-muted-foreground/50" />;
  }
};

export const ProgressMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="card-premium p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Your Growth Path</h3>
          <p className="text-sm text-muted-foreground">Multiple directions, your choice</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
          View all paths
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Path Visualization */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {pathNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center shrink-0"
            >
              {/* Node */}
              <motion.div
                whileHover={{ scale: node.status !== 'locked' ? 1.05 : 1 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer",
                  node.status === 'current' && "bg-accent border-primary/30 shadow-sm",
                  node.status === 'completed' && "bg-card border-border/50 hover:border-primary/30",
                  node.status === 'available' && "bg-card border-border/50 hover:border-primary/30",
                  node.status === 'locked' && "bg-muted/30 border-border/30 opacity-60 cursor-not-allowed",
                  node.branch === 'optional' && "border-dashed"
                )}
              >
                <NodeIcon status={node.status} />
                <span className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  node.status === 'locked' ? "text-muted-foreground" : "text-foreground"
                )}>
                  {node.label}
                </span>
                {node.branch === 'optional' && (
                  <span className="text-xs text-muted-foreground">(optional)</span>
                )}
              </motion.div>

              {/* Connector */}
              {index < pathNodes.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5 mx-2",
                  pathNodes[index + 1].status === 'locked' 
                    ? "bg-border/30" 
                    : "bg-border"
                )} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
