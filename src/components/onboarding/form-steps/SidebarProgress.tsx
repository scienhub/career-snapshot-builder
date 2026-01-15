import { motion } from 'framer-motion';
import { Check, ChevronDown, Target, Rocket, Lightbulb, TrendingUp, Heart, Fingerprint, Palette, Settings, Cpu, Flag, Circle } from 'lucide-react';
import { FORM_STEPS, FormStepId } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface SidebarProgressProps {
  currentStepIndex: number;
  completedSteps: Set<FormStepId>;
}

const sectionConfig: Record<string, { icon: React.ElementType; color: string }> = {
  'Foundation': { icon: Target, color: 'from-emerald-500 to-teal-600' },
  'Vision': { icon: Rocket, color: 'from-violet-500 to-purple-600' },
  'Skills': { icon: Lightbulb, color: 'from-amber-500 to-orange-600' },
  'Reality': { icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
  'Purpose': { icon: Heart, color: 'from-rose-500 to-pink-600' },
  'Identity': { icon: Fingerprint, color: 'from-indigo-500 to-violet-600' },
  'Style': { icon: Palette, color: 'from-fuchsia-500 to-pink-600' },
  'Preferences': { icon: Settings, color: 'from-slate-500 to-zinc-600' },
  'Future': { icon: Cpu, color: 'from-cyan-500 to-blue-600' },
  'Final': { icon: Flag, color: 'from-emerald-500 to-green-600' },
  'Complete': { icon: Check, color: 'from-primary to-emerald-600' },
};

const SidebarProgress = ({ currentStepIndex }: SidebarProgressProps) => {
  // Group steps by section
  const sections = FORM_STEPS.reduce((acc, step, index) => {
    if (!acc[step.section]) {
      acc[step.section] = [];
    }
    acc[step.section].push({ ...step, index });
    return acc;
  }, {} as Record<string, Array<typeof FORM_STEPS[0] & { index: number }>>);

  const sectionNames = Object.keys(sections);

  return (
    <div className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24">
        {/* Progress indicator line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-muted to-muted/20" />
        
        <div className="relative space-y-1">
          {sectionNames.map((sectionName, sectionIndex) => {
            const sectionSteps = sections[sectionName];
            const firstStepIndex = sectionSteps[0].index;
            const lastStepIndex = sectionSteps[sectionSteps.length - 1].index;
            const isActive = currentStepIndex >= firstStepIndex && currentStepIndex <= lastStepIndex;
            const isComplete = currentStepIndex > lastStepIndex;
            const config = sectionConfig[sectionName] || sectionConfig['Foundation'];
            const SectionIcon = config.icon;

            return (
              <motion.div
                key={sectionName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.05 }}
              >
                {/* Section Header */}
                <motion.div
                  className={cn(
                    "relative flex items-start gap-3 p-3 rounded-xl transition-all duration-300",
                    isActive && "bg-gradient-to-r from-accent to-transparent border-l-2 border-primary",
                    !isActive && !isComplete && "opacity-60 hover:opacity-80"
                  )}
                >
                  {/* Icon */}
                  <div className="relative z-10">
                    {isComplete ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br",
                          config.color
                        )}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                          config.color
                        )}
                      >
                        <SectionIcon className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-muted border border-border">
                        <SectionIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Section Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-semibold text-sm",
                        isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {sectionName}
                      </span>
                      {isActive && (
                        <ChevronDown className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    
                    {/* Steps within active section */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 space-y-1"
                      >
                        {sectionSteps.map((step) => {
                          const isCurrentStep = step.index === currentStepIndex;
                          const isStepComplete = step.index < currentStepIndex;
                          
                          return (
                            <motion.div
                              key={step.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={cn(
                                "flex items-center gap-2 py-1.5 pl-2 rounded-lg transition-colors",
                                isCurrentStep && "bg-primary/10",
                                !isCurrentStep && !isStepComplete && "opacity-50"
                              )}
                            >
                              {isStepComplete ? (
                                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-primary" />
                                </div>
                              ) : isCurrentStep ? (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                                >
                                  <Circle className="w-1.5 h-1.5 text-white fill-white" />
                                </motion.div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
                              )}
                              <span className={cn(
                                "text-xs",
                                isCurrentStep ? "text-primary font-medium" : 
                                isStepComplete ? "text-muted-foreground" : "text-muted-foreground/70"
                              )}>
                                {step.title}
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarProgress;
