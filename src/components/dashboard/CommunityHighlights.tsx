import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Heart, ArrowRight, Crown, Sparkles, UserPlus, TrendingUp, Flame, Eye, Clock, ArrowUpRight, Bookmark } from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activity: string;
  isNew?: boolean;
  xp: number;
  league: string;
}

interface Discussion {
  id: string;
  title: string;
  replies: number;
  likes: number;
  views: number;
  author: string;
  authorAvatar: string;
  tag: string;
  tagColor: string;
  timeAgo: string;
  isHot?: boolean;
  isSaved?: boolean;
}

const featuredMembers: CommunityMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Product Leader', avatar: 'SC', activity: 'Shared career roadmap', isNew: true, xp: 2840, league: 'Builder III' },
  { id: '2', name: 'James Miller', role: 'Tech Lead', avatar: 'JM', activity: 'Verified 3 skills', xp: 3210, league: 'Accelerator I' },
  { id: '3', name: 'Priya Sharma', role: 'Growth Expert', avatar: 'PS', activity: 'Mentored 5 members', xp: 4520, league: 'Leader II' },
  { id: '4', name: 'Alex Johnson', role: 'Data Scientist', avatar: 'AJ', activity: 'Completed AI module', xp: 1890, league: 'Builder I' },
];

const discussions: Discussion[] = [
  { 
    id: '1', 
    title: 'Tips for transitioning from IC to Leadership role', 
    replies: 24, 
    likes: 48, 
    views: 342,
    author: 'Mark Thompson', 
    authorAvatar: 'MT',
    tag: 'Leadership', 
    tagColor: 'from-violet-500 to-purple-600',
    timeAgo: '2h ago',
    isHot: true 
  },
  { 
    id: '2', 
    title: 'Best certifications for 2024 tech career growth', 
    replies: 18, 
    likes: 32, 
    views: 256,
    author: 'Lisa Kumar', 
    authorAvatar: 'LK',
    tag: 'Skills', 
    tagColor: 'from-emerald-500 to-teal-600',
    timeAgo: '4h ago'
  },
  { 
    id: '3', 
    title: 'How I increased my GC Score from 52 to 78 in 3 months', 
    replies: 42, 
    likes: 89, 
    views: 567,
    author: 'David Park', 
    authorAvatar: 'DP',
    tag: 'Success Story', 
    tagColor: 'from-amber-500 to-orange-600',
    timeAgo: '6h ago',
    isHot: true
  },
];

export const CommunityHighlights = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'discussions'>('discussions');
  const [hoveredDiscussion, setHoveredDiscussion] = useState<string | null>(null);
  const [savedDiscussions, setSavedDiscussions] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedDiscussions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
    >
      {/* Decorative background */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-violet-500/10 to-transparent blur-3xl" />
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-radial from-primary/10 to-transparent blur-2xl" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Community</h3>
              <p className="text-sm text-muted-foreground">1,247 active this week</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <UserPlus className="w-4 h-4" />
            Join
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-secondary/50 rounded-xl">
          {(['discussions', 'members'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: activeTab !== tab ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === 'discussions' ? (
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Hot Topics
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4" />
                  Top Members
                </span>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'discussions' ? (
            <motion.div
              key="discussions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredDiscussion(discussion.id)}
                  onMouseLeave={() => setHoveredDiscussion(null)}
                  className="group relative p-4 rounded-xl bg-gradient-to-r from-accent/30 to-transparent hover:from-accent/60 border border-transparent hover:border-border/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Hot Badge */}
                  {discussion.isHot && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg"
                    >
                      <Flame className="w-3 h-3" />
                      Hot
                    </motion.div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${discussion.tagColor} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                        {discussion.authorAvatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[11px] font-semibold text-white px-2.5 py-0.5 bg-gradient-to-r ${discussion.tagColor} rounded-full shadow-sm`}>
                          {discussion.tag}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {discussion.timeAgo}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {discussion.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <span>by</span>
                        <span className="font-medium text-foreground/80">{discussion.author}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); toggleSave(discussion.id); }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          savedDiscussions.has(discussion.id) 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedDiscussions.has(discussion.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                          {discussion.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {discussion.views}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Action */}
                  <AnimatePresence>
                    {hoveredDiscussion === discussion.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-3 right-4 flex items-center gap-1 text-xs font-semibold text-primary"
                      >
                        Read more
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="members"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {featuredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group relative p-4 rounded-xl bg-gradient-to-r from-accent/30 to-transparent hover:from-accent/60 border border-transparent hover:border-border/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                        {member.avatar}
                      </div>
                      {member.isNew && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-md"
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{member.name}</h4>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-primary/80 mt-0.5">{member.activity}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        {member.xp.toLocaleString()} XP
                      </div>
                      <p className="text-xs text-muted-foreground">{member.league}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Community */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-5 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          Explore Community
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
