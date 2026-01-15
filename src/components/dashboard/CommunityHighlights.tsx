import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Heart, ArrowRight, Crown, Sparkles, UserPlus, TrendingUp, Flame, Eye, Clock, ArrowUpRight, Bookmark, Star, Zap } from 'lucide-react';
import { Card3D } from './PremiumCard';

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
}

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  xp: number;
  league: string;
  activity: string;
}

const discussions: Discussion[] = [
  { 
    id: '1', 
    title: 'How to negotiate equity as a Series B hire?', 
    replies: 24, 
    likes: 48, 
    views: 342,
    author: 'Mark T.', 
    authorAvatar: 'MT',
    tag: 'Negotiation', 
    tagColor: 'from-violet-500 to-purple-600',
    timeAgo: '2h ago',
    isHot: true 
  },
  { 
    id: '2', 
    title: 'Transitioning from Engineering to Product', 
    replies: 18, 
    likes: 32, 
    views: 256,
    author: 'Lisa K.', 
    authorAvatar: 'LK',
    tag: 'Career Move', 
    tagColor: 'from-emerald-500 to-teal-600',
    timeAgo: '4h ago'
  },
  { 
    id: '3', 
    title: 'How I increased my GC Score from 52 to 78', 
    replies: 42, 
    likes: 89, 
    views: 567,
    author: 'David P.', 
    authorAvatar: 'DP',
    tag: 'Success Story', 
    tagColor: 'from-amber-500 to-orange-600',
    timeAgo: '6h ago',
    isHot: true
  },
];

const members: Member[] = [
  { id: '1', name: 'Sarah Chen', role: 'Product Leader', avatar: 'SC', xp: 4520, league: 'Leader II', activity: 'Mentored 5 members' },
  { id: '2', name: 'James Miller', role: 'Tech Lead', avatar: 'JM', xp: 3210, league: 'Accelerator', activity: 'Verified 3 skills' },
  { id: '3', name: 'Priya Sharma', role: 'Growth Expert', avatar: 'PS', xp: 2840, league: 'Builder III', activity: 'Shared roadmap' },
];

export const CommunityHighlights = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'members'>('discussions');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <Card3D depth="medium">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Users className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Community Pulse</h3>
              <p className="text-xs text-muted-foreground">1,247 active this week</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold rounded-xl shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Join
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-5 p-1 bg-secondary/40 rounded-xl">
          {(['discussions', 'members'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
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
              className="space-y-3"
            >
              {discussions.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative p-4 rounded-xl bg-gradient-to-r from-secondary/50 to-transparent hover:from-accent border border-transparent hover:border-border/50 transition-all cursor-pointer"
                >
                  {/* Hot Badge */}
                  {item.isHot && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full shadow-lg"
                    >
                      <Flame className="w-3 h-3" />
                      Hot
                    </motion.div>
                  )}

                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.tagColor} flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0`}>
                      {item.authorAvatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-semibold text-white px-2 py-0.5 bg-gradient-to-r ${item.tagColor} rounded-full`}>
                          {item.tag}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timeAgo}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-8">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {item.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {item.views}
                        </span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); toggleSave(item.id); }}
                      className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                        savedItems.has(item.id) ? 'bg-primary/20 text-primary' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedItems.has(item.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="members"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 3 }}
                  className="group relative p-4 rounded-xl bg-gradient-to-r from-secondary/50 to-transparent hover:from-accent border border-transparent hover:border-border/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                      {member.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{member.name}</h4>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                        <Zap className="w-4 h-4 text-primary" />
                        {member.xp.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">{member.league}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          Explore Community
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </Card3D>
  );
};
