import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GCScoreBreakdown } from '@/types/onboarding';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { GCScoreCard } from '@/components/dashboard/GCScoreCard';
import { NextActionCard } from '@/components/dashboard/NextActionCard';
import { ProgressMap } from '@/components/dashboard/ProgressMap';
import { ProofSnapshot } from '@/components/dashboard/ProofSnapshot';
import { MicroInsights } from '@/components/dashboard/MicroInsights';
import { CommunityHighlights } from '@/components/dashboard/CommunityHighlights';
import { BottomDock } from '@/components/dashboard/BottomDock';

interface DashboardProps {
  userData?: {
    name: string;
    gcScore: GCScoreBreakdown;
  };
}

const Dashboard = ({ userData }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeDockItem, setActiveDockItem] = useState('home');
  
  const defaultData = {
    name: userData?.name || 'Professional',
    gcScore: userData?.gcScore || {
      careerClarity: { score: 16, maxScore: 20, details: ['Clear 10-year vision', 'Goals defined'] },
      skillReadiness: { score: 20, maxScore: 25, details: ['Strong skill confidence'] },
      execution: { score: 12, maxScore: 15, details: ['Good discipline'] },
      motivationPurpose: { score: 13, maxScore: 15, details: ['Purpose clear'] },
      learningAgility: { score: 12, maxScore: 15, details: ['Learning agile'] },
      commitment: { score: 8, maxScore: 10, details: ['Committed to growth'] },
      totalScore: 72,
      percentile: 78,
      band: 'good-potential' as const
    }
  };

  const handleDockItemClick = (item: string) => {
    setActiveDockItem(item);
    if (item === 'home') {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col">
      <DashboardNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userName={defaultData.name}
      />

      <main className="flex-1 overflow-auto pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
              >
                {/* Next Action Card - Premium CTA */}
                <NextActionCard userName={defaultData.name} />

                {/* GC Score with 1:2 Grid Layout */}
                <GCScoreCard score={defaultData.gcScore} />
                
                {/* Growth Path Section */}
                <ProgressMap />
                
                {/* Two Column Layout - Insights & Community */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Micro Insights */}
                  <MicroInsights />
                  
                  {/* Community Highlights */}
                  <CommunityHighlights />
                </div>
                
                {/* Proof Snapshot */}
                <ProofSnapshot />
              </motion.div>
            )}

            {activeTab !== 'home' && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-3xl text-primary font-bold capitalize">{activeTab.charAt(0)}</span>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground capitalize">{activeTab}</h2>
                  <p className="text-muted-foreground">This section is coming soon</p>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    In Development
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <BottomDock 
        activeItem={activeDockItem} 
        onItemClick={handleDockItemClick} 
      />
    </div>
  );
};

export default Dashboard;
