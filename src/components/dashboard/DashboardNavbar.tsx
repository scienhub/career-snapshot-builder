import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Settings, Shield, Eye, ChevronDown, Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import logo from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
}

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'growth', label: 'Growth' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Community' },
  { id: 'insights', label: 'Insights' },
];

export const DashboardNavbar = ({ activeTab, onTabChange, userName }: DashboardNavbarProps) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border/50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange('home')}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={logo} 
                alt="GrowthCharters" 
                className="w-10 h-10 object-contain"
              />
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-foreground tracking-tight">
                GrowthCharters
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
                Career Command Center
              </span>
            </div>
          </motion.div>

          {/* Primary Tabs - Desktop */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-secondary/30 rounded-2xl p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.div
              className={cn(
                "relative hidden md:flex items-center transition-all duration-500 ease-out",
                searchFocused ? "w-72" : "w-56"
              )}
            >
              <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground z-10" />
              <input
                type="text"
                placeholder="Search skills, roles, projects…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 text-sm bg-secondary/50 border rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-300",
                  searchFocused 
                    ? "border-primary/50 ring-2 ring-primary/20 bg-background shadow-lg" 
                    : "border-border/50 hover:border-border"
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-3 flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">⌘K</kbd>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-secondary/50 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-xl flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block transition-transform group-data-[state=open]:rotate-180" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 p-2 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl"
                sideOffset={8}
              >
                <div className="px-3 py-3 mb-2 bg-gradient-to-r from-primary/10 to-transparent rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{userName}</p>
                      <p className="text-xs text-muted-foreground">Professional Profile</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-accent">
                  <User className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-accent">
                  <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-accent">
                  <Shield className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>Privacy</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-accent">
                  <Eye className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>Employer View</span>
                  <Sparkles className="w-3 h-3 ml-auto text-primary" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden border-t border-border/30">
        <div className="max-w-7xl mx-auto px-2 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center gap-1 py-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-xl",
                  activeTab === tab.id
                    ? "text-primary-foreground bg-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
