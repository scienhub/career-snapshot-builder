import { motion } from 'framer-motion';
import { Check, Target, Rocket, TrendingUp, Lightbulb } from 'lucide-react';
import { FORM_STEPS, FormStepId } from '@/types/onboarding';

interface StepProgressProps {
  currentStepIndex: number;
  completedSteps: Set<FormStepId>;
}

const sectionIcons: Record<string, React.ElementType> = {
  'Foundation': Target,
  'Vision': Rocket,
  'Skills': Lightbulb,
  'Reality': TrendingUp,
  'Purpose': Target,
  'Identity': Target,
  'Style': Target,
  'Preferences': Target,
  'Future': Rocket,
  'Final': Check,
  'Complete': Check,
};

const StepProgress = ({ currentStepIndex, completedSteps }: StepProgressProps) => {
  // Group steps by section
  const sections = FORM_STEPS.reduce((acc, step, index) => {
    if (!acc[step.section]) {
      acc[step.section] = [];
    }
    acc[step.section].push({ ...step, index });
    return acc;
  }, {} as Record<string, Array<typeof FORM_STEPS[0] & { index: number }>>);

  const sectionNames = Object.keys(sections);

  const getEncouragementMessage = () => {
    if (currentStepIndex < 5) {
      return "Great start! Every detail helps build your personalized growth path.";
    } else if (currentStepIndex < 12) {
      return "You're doing great! Your profile is taking shape.";
    } else if (currentStepIndex < 18) {
      return "Almost there! Your Growth Charter is nearly complete.";
    } else {
      return "Final stretch! Your personalized score awaits.";
    }
  };

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-4">
        <div className="card-premium p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Your Progress</h3>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {currentStepIndex + 1} of {FORM_STEPS.length}</span>
              <span>{Math.round(((currentStepIndex + 1) / FORM_STEPS.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / FORM_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {sectionNames.map((sectionName, sectionIndex) => {
              const sectionSteps = sections[sectionName];
              const firstStepIndex = sectionSteps[0].index;
              const lastStepIndex = sectionSteps[sectionSteps.length - 1].index;
              const isActive = currentStepIndex >= firstStepIndex && currentStepIndex <= lastStepIndex;
              const isComplete = currentStepIndex > lastStepIndex;
              const SectionIcon = sectionIcons[sectionName] || Target;

              return (
                <motion.div
                  key={sectionName}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 border border-primary/30' 
                      : isComplete 
                        ? 'bg-success/10 border border-success/30'
                        : 'bg-secondary/30'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.05 }}
                >
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
                      }`}>
                        <SectionIcon className={`w-3 h-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                    )}
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isComplete ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {sectionName}
                    </span>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      className="mt-2 ml-7 space-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {sectionSteps.map((step) => (
                        <div 
                          key={step.id}
                          className={`text-xs ${
                            step.index === currentStepIndex 
                              ? 'text-primary font-medium' 
                              : step.index < currentStepIndex 
                                ? 'text-muted-foreground line-through' 
                                : 'text-muted-foreground'
                          }`}
                        >
                          {step.title}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Encouragement */}
        <motion.div 
          className="card-premium p-4 bg-gradient-to-br from-primary/5 to-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {getEncouragementMessage()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StepProgress;
