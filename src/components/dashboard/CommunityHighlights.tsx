import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, ArrowRight, Crown, Sparkles, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activity: string;
  isNew?: boolean;
}

interface Discussion {
  id: string;
  title: string;
  replies: number;
  likes: number;
  author: string;
  tag: string;
}

const featuredMembers: CommunityMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Product Leader', avatar: 'SC', activity: 'Shared career roadmap', isNew: true },
  { id: '2', name: 'James Miller', role: 'Tech Lead', avatar: 'JM', activity: 'Verified 3 skills' },
  { id: '3', name: 'Priya Sharma', role: 'Growth Expert', avatar: 'PS', activity: 'Mentored 5 members' },
];

const discussions: Discussion[] = [
  { id: '1', title: 'Tips for transitioning from IC to Leadership', replies: 24, likes: 48, author: 'Mark T.', tag: 'Leadership' },
  { id: '2', title: 'Best certifications for 2024', replies: 18, likes: 32, author: 'Lisa K.', tag: 'Skills' },
];

export const CommunityHighlights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
    >
      {/* Decorative background */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-violet-500/5 to-transparent blur-3xl" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Community Highlights</h3>
              <p className="text-sm text-muted-foreground">Connect with peers at your stage</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold rounded-lg shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Join
          </motion.button>
        </div>

        {/* Featured Members */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Active This Week</span>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative flex flex-col items-center p-3 min-w-[100px] bg-gradient-to-b from-accent/50 to-transparent rounded-xl border border-border/50 cursor-pointer hover:shadow-md transition-all"
              >
                {member.isNew && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                )}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold mb-2">
                  {member.avatar}
                </div>
                <span className="text-xs font-semibold text-foreground text-center truncate w-full">{member.name}</span>
                <span className="text-[10px] text-muted-foreground text-center truncate w-full">{member.role}</span>
              </motion.div>
            ))}
            
            {/* View More */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-3 min-w-[80px] h-[88px] border border-dashed border-border rounded-xl cursor-pointer hover:border-primary/30 transition-all"
            >
              <span className="text-xs font-medium text-muted-foreground">+42</span>
              <span className="text-[10px] text-muted-foreground">more</span>
            </motion.div>
          </div>
        </div>

        {/* Hot Discussions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Hot Discussions</span>
          </div>
          
          <div className="space-y-2">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group p-3 rounded-xl hover:bg-accent/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-primary px-2 py-0.5 bg-primary/10 rounded-full">{discussion.tag}</span>
                      <span className="text-[10px] text-muted-foreground">by {discussion.author}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">{discussion.title}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {discussion.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {discussion.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Community */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-4 py-3.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 border border-violet-500/20 rounded-xl hover:border-violet-500/40 transition-all flex items-center justify-center gap-2"
        >
          Explore Community
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
