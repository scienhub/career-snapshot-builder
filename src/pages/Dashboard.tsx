import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GCScoreBreakdown } from '@/types/onboarding';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { GCScoreCard } from '@/components/dashboard/GCScoreCard';
import { MomentumStrip } from '@/components/dashboard/MomentumStrip';
import { NextActionCard } from '@/components/dashboard/NextActionCard';
import { ProgressMap } from '@/components/dashboard/ProgressMap';
import { ProofSnapshot } from '@/components/dashboard/ProofSnapshot';
import { BottomDock } from '@/components/dashboard/BottomDock';

interface DashboardProps {
  userData?: {
    name: string;
    gcScore: GCScoreBreakdown;
  };
}

const Dashboard = ({ userData }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [activeDockItem, setActiveDockItem] = useState('home');
  
  // Default mock data if no userData provided
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar - Strategic Layer */}
      <DashboardNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userName={defaultData.name}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 overflow-auto pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-8"
              >
                {/* Section 1: Career Signal (GC Score) */}
                <GCScoreCard score={defaultData.gcScore} />

                {/* Section 2: Momentum Strip */}
                <MomentumStrip />

                {/* Section 3: The One Next Action */}
                <NextActionCard userName={defaultData.name} />

                {/* Section 4: Progress Map */}
                <ProgressMap />

                {/* Section 5: Proof & Contribution Snapshot */}
                <ProofSnapshot />
              </motion.div>
            )}

            {activeTab !== 'home' && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent rounded-2xl flex items-center justify-center">
                    <span className="text-2xl text-primary font-semibold capitalize">{activeTab.charAt(0)}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground capitalize">{activeTab}</h2>
                  <p className="text-muted-foreground">This section is coming soon</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Dock - Daily Habit Engine */}
      <BottomDock 
        activeItem={activeDockItem} 
        onItemClick={handleDockItemClick} 
      />
    </div>
  );
};

export default Dashboard;
