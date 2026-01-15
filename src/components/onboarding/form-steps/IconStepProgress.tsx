import { motion } from 'framer-motion';
import { Check, User, Briefcase, GraduationCap, Target, Lightbulb, Heart, Shield, Brain, Rocket, Settings, Sparkles } from 'lucide-react';

interface IconStepProgressProps {
  currentStepIndex: number;
  totalSteps: number;
  sectionName: string;
}

const sectionConfig: Record<string, { icon: React.ElementType; color: string }> = {
  'Foundation': { icon: User, color: 'from-emerald-500 to-teal-600' },
  'Vision': { icon: Target, color: 'from-violet-500 to-purple-600' },
  'Skills': { icon: Lightbulb, color: 'from-amber-500 to-orange-600' },
  'Reality': { icon: Shield, color: 'from-blue-500 to-cyan-600' },
  'Purpose': { icon: Heart, color: 'from-rose-500 to-pink-600' },
  'Identity': { icon: Sparkles, color: 'from-indigo-500 to-violet-600' },
  'Style': { icon: Settings, color: 'from-slate-500 to-gray-600' },
  'Preferences': { icon: Brain, color: 'from-fuchsia-500 to-purple-600' },
  'Future': { icon: Rocket, color: 'from-cyan-500 to-blue-600' },
  'Final': { icon: Check, color: 'from-emerald-500 to-green-600' },
  'Complete': { icon: Check, color: 'from-emerald-500 to-green-600' },
};

const allSections = ['Foundation', 'Vision', 'Skills', 'Reality', 'Purpose', 'Identity', 'Style', 'Preferences', 'Future', 'Final'];

const getSectionIndex = (sectionName: string) => {
  const idx = allSections.indexOf(sectionName);
  return idx >= 0 ? idx : 0;
};

const IconStepProgress = ({ currentStepIndex, totalSteps, sectionName }: IconStepProgressProps) => {
  const currentSectionIndex = getSectionIndex(sectionName);

  return (
    <div className="w-full mb-8">
      {/* Main Progress Bar */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-primary to-primary/80"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Section Icons */}
      <div className="flex items-center justify-between px-2">
        {allSections.slice(0, 5).map((section, index) => {
          const config = sectionConfig[section] || sectionConfig['Foundation'];
          const SectionIcon = config.icon;
          const isComplete = currentSectionIndex > index;
          const isActive = currentSectionIndex === index;

          return (
            <div key={section} className="flex items-center">
              <div className="relative flex flex-col items-center">
                <motion.div 
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isComplete 
                      ? `bg-gradient-to-br ${config.color} text-white shadow-lg` 
                      : isActive 
                        ? `bg-gradient-to-br ${config.color} text-white shadow-lg ring-4 ring-primary/20` 
                        : 'bg-secondary text-muted-foreground'
                    }
                  `}
                  animate={isActive ? { 
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 0 0 rgba(var(--primary-rgb), 0)', '0 0 0 8px rgba(var(--primary-rgb), 0.1)', '0 0 0 0 rgba(var(--primary-rgb), 0)']
                  } : {}}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                >
                  {isComplete ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <SectionIcon className="w-6 h-6" />
                  )}
                </motion.div>
                
                {/* Section Label */}
                <motion.span 
                  className={`text-xs font-medium mt-2 transition-colors duration-300 ${
                    isComplete || isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {section}
                </motion.span>
              </div>

              {/* Connector Line */}
              {index < 4 && (
                <div className="relative w-8 sm:w-12 md:w-16 lg:w-20 h-1 mx-1 sm:mx-2">
                  <div className="absolute inset-0 bg-secondary rounded-full" />
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: isComplete ? '100%' : '0%' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconStepProgress;
