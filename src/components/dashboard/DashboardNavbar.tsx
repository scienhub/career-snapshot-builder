import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Settings, Shield, Eye, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
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

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => onTabChange('home')}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:block">GrowthCharters</span>
          </motion.div>

          {/* Primary Tabs - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.div
              className={cn(
                "relative hidden sm:flex items-center transition-all duration-300",
                searchFocused ? "w-64" : "w-48"
              )}
            >
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skills, roles, projects…"
                className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground">Professional Profile</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  Employer View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-lg",
                  activeTab === tab.id
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
