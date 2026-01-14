import { useState, useCallback } from 'react';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import ResumeUpload from '@/components/onboarding/ResumeUpload';
import AIProcessing from '@/components/onboarding/AIProcessing';
import CorrectionVerification from '@/components/onboarding/CorrectionVerification';
import ConfirmationSuccess from '@/components/onboarding/ConfirmationSuccess';
import ManualEntryForm from '@/components/onboarding/ManualEntryForm';

type OnboardingStep = 'upload' | 'processing' | 'verification' | 'manual' | 'success';

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
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('upload');
  const [confirmedData, setConfirmedData] = useState<{ name: string; stage: string } | null>(null);

  const getStepIndex = (step: OnboardingStep): number => {
    const stepMap: Record<OnboardingStep, number> = {
      upload: 0,
      processing: 0,
      manual: 0,
      verification: 1,
      success: 2,
    };
    return stepMap[step];
  };

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
