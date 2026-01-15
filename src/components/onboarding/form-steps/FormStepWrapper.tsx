import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FORM_STEPS } from '@/types/onboarding';

interface FormStepWrapperProps {
  stepIndex: number;
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  canProceed?: boolean;
  isLastStep?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  isExtracted?: boolean;
}

const FormStepWrapper = ({
  stepIndex,
  title,
  description,
  children,
  onNext,
  onBack,
  canProceed = true,
  isLastStep = false,
  showSkip = false,
  onSkip,
  isExtracted = false,
}: FormStepWrapperProps) => {
  const step = FORM_STEPS[stepIndex];
  const totalSteps = FORM_STEPS.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Mobile Progress */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            {step?.section}
          </span>
          <span>{stepIndex + 1} / {totalSteps}</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-primary/80"
            initial={{ width: 0 }}
            animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        {children}
      </motion.div>

      {/* Navigation */}
      <motion.div 
        className="flex items-center justify-between pt-6 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-3">
          {showSkip && onSkip && (
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-muted-foreground"
            >
              Skip for now
            </Button>
          )}
          
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={`btn-primary-gradient px-6 py-2.5 ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLastStep ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FormStepWrapper;
