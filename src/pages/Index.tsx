import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import ResumeUpload from '@/components/onboarding/ResumeUpload';
import AIProcessing from '@/components/onboarding/AIProcessing';
import CorrectionVerification from '@/components/onboarding/CorrectionVerification';
import ConfirmationSuccess from '@/components/onboarding/ConfirmationSuccess';
import ManualEntryForm from '@/components/onboarding/ManualEntryForm';
import ThemePreference from '@/components/onboarding/ThemePreference';

type OnboardingStep = 'theme' | 'upload' | 'processing' | 'verification' | 'manual' | 'success';

const mockExtractedData = {
  fullName: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 555 123 4567',
  currentRole: 'Senior Product Manager',
  industry: 'Technology / SaaS',
  experience: '8 years',
  skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping', 'Stakeholder Management'],
  education: 'MBA, Stanford University',
  location: 'San Francisco, CA',
};

const Index = () => {
  const { hasPreference, setHasPreference, setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(hasPreference ? 'upload' : 'theme');
  const [confirmedData, setConfirmedData] = useState<{ name: string; stage: string } | null>(null);

  const getStepIndex = (step: OnboardingStep): number => {
    const stepMap: Record<OnboardingStep, number> = {
      theme: -1,
      upload: 0,
      processing: 0,
      manual: 0,
      verification: 1,
      success: 2,
    };
    return stepMap[step];
  };

  const handleThemeSelect = useCallback((theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    setHasPreference(true);
    setCurrentStep('upload');
  }, [setTheme, setHasPreference]);

  const handleUpload = useCallback((file: File) => {
    console.log('File uploaded:', file.name);
    setCurrentStep('processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setCurrentStep('verification');
  }, []);

  const handleConfirm = useCallback((data: any, careerStage: string, status: string) => {
    console.log('Confirmed data:', { data, careerStage, status });
    setConfirmedData({ name: data.fullName, stage: careerStage });
    setCurrentStep('success');
  }, []);

  const handleManualEntry = useCallback(() => {
    setCurrentStep('manual');
  }, []);

  const handleManualSubmit = useCallback((data: any) => {
    console.log('Manual entry:', data);
    setConfirmedData({ name: data.fullName, stage: data.careerStage });
    setCurrentStep('success');
  }, []);

  const handleBackToUpload = useCallback(() => {
    setCurrentStep('upload');
  }, []);

  const stepLabels = ['Upload Resume', 'Verify Details', 'Complete'];

  // Show theme preference screen first
  if (currentStep === 'theme') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="theme"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <ThemePreference onSelect={handleThemeSelect} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <ResumeUpload 
            onUpload={handleUpload} 
            onManualEntry={handleManualEntry}
          />
        );
      case 'processing':
        return <AIProcessing onComplete={handleProcessingComplete} />;
      case 'verification':
        return (
          <CorrectionVerification
            extractedData={mockExtractedData}
            onConfirm={handleConfirm}
            onBack={handleBackToUpload}
          />
        );
      case 'manual':
        return (
          <ManualEntryForm
            onSubmit={handleManualSubmit}
            onBack={handleBackToUpload}
          />
        );
      case 'success':
        return (
          <ConfirmationSuccess
            userName={confirmedData?.name || 'User'}
            careerStage={confirmedData?.stage || 'builder'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={getStepIndex(currentStep)}
      totalSteps={3}
      stepLabels={stepLabels}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Index;
