import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CompleteFormData, ExtractedResumeData, FORM_STEPS, getDefaultFormData } from '@/types/onboarding';
import { calculateGCScore } from '@/utils/gcScoreCalculator';
import FormStepWrapper from './form-steps/FormStepWrapper';
import StepProgress from './form-steps/StepProgress';
import GCScoreSummary from './form-steps/GCScoreSummary';
import { TextInput, SelectInput, OptionCard, MultiSelectChips, SliderInput, BooleanToggle } from './form-steps/FormInputs';

interface MultiStepVerificationProps {
  extractedData?: ExtractedResumeData;
  onComplete: (data: CompleteFormData) => void;
  onBack: () => void;
}

const MultiStepVerification = ({ extractedData, onComplete, onBack }: MultiStepVerificationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CompleteFormData>(() => {
    const defaults = getDefaultFormData();
    if (extractedData) {
      defaults.candidateFoundation = {
        ...defaults.candidateFoundation,
        fullName: extractedData.fullName,
        email: extractedData.email,
        phone: extractedData.phone,
        location: extractedData.location,
        currentRole: extractedData.currentRole,
        industry: extractedData.industry,
        totalExperience: extractedData.experience,
        highestQualification: extractedData.education,
        linkedinProfile: extractedData.linkedinProfile || '',
      };
    }
    return defaults;
  });

  const updateFoundation = (field: keyof CompleteFormData['candidateFoundation'], value: any) => {
    setFormData(prev => ({
      ...prev,
      candidateFoundation: { ...prev.candidateFoundation, [field]: value }
    }));
  };

  const updateVision = (field: keyof CompleteFormData['careerVision'], value: any) => {
    setFormData(prev => ({
      ...prev,
      careerVision: { ...prev.careerVision, [field]: value }
    }));
  };

  const updateMilestones = (field: keyof CompleteFormData['careerMilestones'], value: any) => {
    setFormData(prev => ({
      ...prev,
      careerMilestones: { ...prev.careerMilestones, [field]: value }
    }));
  };

  const updateSkills = (field: keyof CompleteFormData['skillVision'], value: any) => {
    setFormData(prev => ({
      ...prev,
      skillVision: { ...prev.skillVision, [field]: value }
    }));
  };

  const updateLearning = (field: keyof CompleteFormData['learningPreferences'], value: any) => {
    setFormData(prev => ({
      ...prev,
      learningPreferences: { ...prev.learningPreferences, [field]: value }
    }));
  };

  const updateConstraints = (field: keyof CompleteFormData['careerConstraints'], value: any) => {
    setFormData(prev => ({
      ...prev,
      careerConstraints: { ...prev.careerConstraints, [field]: value }
    }));
  };

  const updateMotivation = (field: keyof CompleteFormData['motivationPurpose'], value: any) => {
    setFormData(prev => ({
      ...prev,
      motivationPurpose: { ...prev.motivationPurpose, [field]: value }
    }));
  };

  const updateCommitment = (field: keyof CompleteFormData['commitmentStatement'], value: any) => {
    setFormData(prev => ({
      ...prev,
      commitmentStatement: { ...prev.commitmentStatement, [field]: value }
    }));
  };

  const updateWorkStyle = (field: keyof CompleteFormData['workStyle'], value: any) => {
    setFormData(prev => ({
      ...prev,
      workStyle: { ...prev.workStyle, [field]: value }
    }));
  };

  const updateWellbeing = (field: keyof CompleteFormData['wellbeingSustainability'], value: any) => {
    setFormData(prev => ({
      ...prev,
      wellbeingSustainability: { ...prev.wellbeingSustainability, [field]: value }
    }));
  };

  const updateTech = (field: keyof CompleteFormData['techReadiness'], value: any) => {
    setFormData(prev => ({
      ...prev,
      techReadiness: { ...prev.techReadiness, [field]: value }
    }));
  };

  const updateLeadership = (field: keyof CompleteFormData['leadershipIndicators'], value: any) => {
    setFormData(prev => ({
      ...prev,
      leadershipIndicators: { ...prev.leadershipIndicators, [field]: value }
    }));
  };

  const updateGamification = (field: keyof CompleteFormData['gamificationTriggers'], value: any) => {
    setFormData(prev => ({
      ...prev,
      gamificationTriggers: { ...prev.gamificationTriggers, [field]: value }
    }));
  };

  const updateFinal = (field: keyof CompleteFormData['finalPreferences'], value: any) => {
    setFormData(prev => ({
      ...prev,
      finalPreferences: { ...prev.finalPreferences, [field]: value }
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
  const prevStep = () => currentStep === 0 ? onBack() : setCurrentStep(prev => prev - 1);

  const step = FORM_STEPS[currentStep];

  // Show score summary on last step
  if (step.id === 'score-summary') {
    const score = calculateGCScore(formData);
    return (
      <div className="flex gap-8">
        <StepProgress currentStepIndex={currentStep} completedSteps={new Set()} />
        <div className="flex-1">
          <GCScoreSummary 
            scoreBreakdown={score} 
            userName={formData.candidateFoundation.fullName} 
            onContinue={() => onComplete(formData)} 
          />
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (step.id) {
      case 'resume-review':
      case 'personal-info':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <TextInput label="Full Name" value={formData.candidateFoundation.fullName} onChange={v => updateFoundation('fullName', v)} required isExtracted={!!extractedData?.fullName} />
            <TextInput label="Email" type="email" value={formData.candidateFoundation.email} onChange={v => updateFoundation('email', v)} required isExtracted={!!extractedData?.email} />
            <TextInput label="Phone" type="tel" value={formData.candidateFoundation.phone} onChange={v => updateFoundation('phone', v)} required isExtracted={!!extractedData?.phone} />
            <TextInput label="Location" value={formData.candidateFoundation.location} onChange={v => updateFoundation('location', v)} isExtracted={!!extractedData?.location} placeholder="City, State, Country" />
            <TextInput label="Current Role" value={formData.candidateFoundation.currentRole} onChange={v => updateFoundation('currentRole', v)} isExtracted={!!extractedData?.currentRole} />
            <TextInput label="Industry" value={formData.candidateFoundation.industry} onChange={v => updateFoundation('industry', v)} isExtracted={!!extractedData?.industry} />
            <TextInput label="Total Experience" value={formData.candidateFoundation.totalExperience} onChange={v => updateFoundation('totalExperience', v)} placeholder="e.g., 5 years" />
            <TextInput label="Highest Qualification" value={formData.candidateFoundation.highestQualification} onChange={v => updateFoundation('highestQualification', v)} />
          </div>
        );

      case 'career-status':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Career Stage <span className="text-destructive">*</span></label>
              {[
                { value: 'explorer', label: 'Explorer', description: 'Student / Early Career' },
                { value: 'builder', label: 'Builder', description: '1–5 years experience' },
                { value: 'accelerator', label: 'Accelerator', description: '6–12 years' },
                { value: 'leader', label: 'Leader', description: '12+ years' },
                { value: 'entrepreneur', label: 'Entrepreneur / Consultant', description: 'Running own venture' },
              ].map(opt => (
                <OptionCard key={opt.value} value={opt.value} label={opt.label} description={opt.description} isSelected={formData.candidateFoundation.careerStage === opt.value} onClick={() => updateFoundation('careerStage', opt.value)} />
              ))}
            </div>
            <SelectInput label="Professional Status" value={formData.candidateFoundation.professionalStatus} onChange={v => updateFoundation('professionalStatus', v)} required options={[
              { value: 'employed', label: 'Employed' },
              { value: 'self-employed', label: 'Self-employed' },
              { value: 'entrepreneur', label: 'Entrepreneur' },
              { value: 'student', label: 'Student' },
              { value: 'transitioning', label: 'Transitioning' },
            ]} />
          </div>
        );

      case 'priorities-motivations':
        return (
          <div className="space-y-6">
            <MultiSelectChips label="Top 3 Priorities Right Now" options={[
              { value: 'career-growth', label: 'Career Growth' },
              { value: 'skill-development', label: 'Skill Development' },
              { value: 'leadership', label: 'Leadership Development' },
              { value: 'personal-clarity', label: 'Personal Clarity' },
              { value: 'work-execution', label: 'Better Work Execution' },
              { value: 'higher-income', label: 'Higher Income' },
              { value: 'confidence', label: 'Confidence / Mindset' },
              { value: 'purpose', label: 'Finding Purpose' },
            ]} selected={formData.candidateFoundation.topPriorities} onChange={v => updateFoundation('topPriorities', v)} maxSelections={3} required />
            <MultiSelectChips label="What Motivates You Most?" options={[
              { value: 'achievement', label: 'Achievement' },
              { value: 'money', label: 'Money' },
              { value: 'stability', label: 'Stability' },
              { value: 'growth', label: 'Growth' },
              { value: 'impact', label: 'Creating Impact' },
              { value: 'recognition', label: 'Recognition' },
              { value: 'learning', label: 'Learning' },
              { value: 'freedom', label: 'Freedom' },
            ]} selected={formData.candidateFoundation.motivations} onChange={v => updateFoundation('motivations', v)} />
          </div>
        );

      case 'career-vision':
        return (
          <div className="space-y-6">
            <TextInput label="10-Year Career Vision" value={formData.careerVision.tenYearVision} onChange={v => updateVision('tenYearVision', v)} multiline rows={4} placeholder="Where do you see yourself professionally in 10 years?" required />
            <MultiSelectChips label="Primary Career Aspiration" options={[
              { value: 'functional-expert', label: 'Functional Expert' },
              { value: 'people-leader', label: 'People Leader' },
              { value: 'business-leader', label: 'Business Leader' },
              { value: 'entrepreneur', label: 'Entrepreneur / Founder' },
              { value: 'consultant', label: 'Consultant / Advisor' },
              { value: 'specialist', label: 'Specialist / Niche Expert' },
            ]} selected={formData.careerVision.primaryAspirations} onChange={v => updateVision('primaryAspirations', v)} maxSelections={2} />
            <TextInput label="Dream Role(s)" value={formData.careerVision.dreamRoles} onChange={v => updateVision('dreamRoles', v)} placeholder="e.g., CTO, Product Leader, Strategy Consultant" />
          </div>
        );

      case 'career-milestones':
        return (
          <div className="space-y-6">
            <TextInput label="Target Role in 3 Years" value={formData.careerMilestones.targetRole3Years} onChange={v => updateMilestones('targetRole3Years', v)} required />
            <TextInput label="Target Role in 5 Years" value={formData.careerMilestones.targetRole5Years} onChange={v => updateMilestones('targetRole5Years', v)} />
            <MultiSelectChips label="Career Movement Preference" options={[
              { value: 'vertical', label: 'Vertical Growth (Promotion)' },
              { value: 'lateral', label: 'Lateral Growth (Role Expansion)' },
              { value: 'domain-shift', label: 'Domain Shift' },
              { value: 'industry-shift', label: 'Industry Shift' },
              { value: 'entrepreneurship', label: 'Entrepreneurship' },
            ]} selected={formData.careerMilestones.careerMovementPreference} onChange={v => updateMilestones('careerMovementPreference', v)} />
          </div>
        );

      case 'skill-assessment':
        return (
          <div className="space-y-6">
            <MultiSelectChips label="Areas You Want to Improve" options={[
              { value: 'focus', label: 'Focus & Discipline' },
              { value: 'communication', label: 'Communication' },
              { value: 'consistency', label: 'Consistency' },
              { value: 'stress', label: 'Stress Management' },
              { value: 'leadership', label: 'Leadership' },
              { value: 'decision', label: 'Decision Making' },
              { value: 'emotional', label: 'Emotional Strength' },
              { value: 'planning', label: 'Planning & Organisation' },
              { value: 'people', label: 'People Skills' },
              { value: 'technical', label: 'Technical Skills' },
            ]} selected={formData.skillVision.areasToImprove} onChange={v => updateSkills('areasToImprove', v)} />
            <MultiSelectChips label="Core Skills to Master" maxSelections={5} options={[
              { value: 'leadership', label: 'Leadership' },
              { value: 'strategy', label: 'Strategy' },
              { value: 'data', label: 'Data & Analytics' },
              { value: 'technology', label: 'Technology / Digital' },
              { value: 'sales', label: 'Sales & Growth' },
              { value: 'operations', label: 'Operations' },
              { value: 'finance', label: 'Finance' },
              { value: 'hr', label: 'HR & People' },
              { value: 'product', label: 'Product / Innovation' },
              { value: 'consulting', label: 'Consulting Skills' },
            ]} selected={formData.skillVision.coreSkillsToMaster} onChange={v => updateSkills('coreSkillsToMaster', v)} />
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <SliderInput label="Technical Skills" value={formData.skillVision.skillConfidence.technical} onChange={v => updateSkills('skillConfidence', { ...formData.skillVision.skillConfidence, technical: v })} />
              <SliderInput label="Communication" value={formData.skillVision.skillConfidence.communication} onChange={v => updateSkills('skillConfidence', { ...formData.skillVision.skillConfidence, communication: v })} />
              <SliderInput label="Leadership" value={formData.skillVision.skillConfidence.leadership} onChange={v => updateSkills('skillConfidence', { ...formData.skillVision.skillConfidence, leadership: v })} />
              <SliderInput label="Problem Solving" value={formData.skillVision.skillConfidence.problemSolving} onChange={v => updateSkills('skillConfidence', { ...formData.skillVision.skillConfidence, problemSolving: v })} />
            </div>
          </div>
        );

      case 'learning-preferences':
        return (
          <div className="space-y-6">
            <SelectInput label="Learning Speed" value={formData.learningPreferences.learningSpeed} onChange={v => updateLearning('learningSpeed', v as any)} options={[
              { value: 'very-fast', label: 'Very Fast' },
              { value: 'fast', label: 'Fast' },
              { value: 'average', label: 'Average' },
              { value: 'slow-but-steady', label: 'Slow but Steady' },
            ]} />
            <SelectInput label="Weekly Time for Learning" value={formData.learningPreferences.weeklyLearningTime} onChange={v => updateLearning('weeklyLearningTime', v as any)} options={[
              { value: '<2', label: 'Less than 2 hours' },
              { value: '2-5', label: '2-5 hours' },
              { value: '5-8', label: '5-8 hours' },
              { value: '8+', label: '8+ hours' },
            ]} />
            <MultiSelectChips label="Preferred Learning Style" options={[
              { value: 'videos', label: 'Videos' },
              { value: 'reading', label: 'Reading' },
              { value: 'mentorship', label: 'Mentorship / Coaching' },
              { value: 'trial-error', label: 'Trial & Error' },
              { value: 'courses', label: 'Structured Courses' },
              { value: 'projects', label: 'Projects & Simulations' },
              { value: 'case-studies', label: 'Case Studies' },
            ]} selected={formData.learningPreferences.preferredLearningStyle} onChange={v => updateLearning('preferredLearningStyle', v)} />
          </div>
        );

      case 'constraints-risk':
        return (
          <div className="space-y-6">
            <MultiSelectChips label="Current Constraints" options={[
              { value: 'time', label: 'Time' },
              { value: 'financial', label: 'Financial' },
              { value: 'family', label: 'Family Responsibilities' },
              { value: 'location', label: 'Location' },
              { value: 'skill-gaps', label: 'Skill Gaps' },
              { value: 'confidence', label: 'Confidence / Clarity' },
            ]} selected={formData.careerConstraints.currentConstraints} onChange={v => updateConstraints('currentConstraints', v)} />
            <SelectInput label="Risk Appetite for Career Moves" value={formData.careerConstraints.riskAppetite} onChange={v => updateConstraints('riskAppetite', v as any)} options={[
              { value: 'conservative', label: 'Conservative' },
              { value: 'balanced', label: 'Balanced' },
              { value: 'aggressive', label: 'Aggressive' },
            ]} />
          </div>
        );

      case 'motivation-purpose':
        return (
          <div className="space-y-6">
            <MultiSelectChips label="Primary Motivation" options={[
              { value: 'money', label: 'Money & Financial Growth' },
              { value: 'recognition', label: 'Recognition & Status' },
              { value: 'learning', label: 'Learning & Mastery' },
              { value: 'stability', label: 'Stability' },
              { value: 'impact', label: 'Impact & Purpose' },
            ]} selected={formData.motivationPurpose.primaryMotivation} onChange={v => updateMotivation('primaryMotivation', v)} />
            <TextInput label="What does career success mean to you?" value={formData.motivationPurpose.careerSuccessMeaning} onChange={v => updateMotivation('careerSuccessMeaning', v)} multiline rows={3} />
          </div>
        );

      case 'commitment':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <p className="text-lg font-medium text-foreground mb-2">"I commit to actively working on my Growth Charter and taking ownership of my career progression."</p>
              <p className="text-sm text-muted-foreground">This commitment helps us personalize your experience.</p>
            </div>
            <BooleanToggle label="Are you ready to commit?" value={formData.commitmentStatement.isCommitted} onChange={v => updateCommitment('isCommitted', v)} />
          </div>
        );

      case 'work-style':
        return (
          <div className="space-y-6">
            <SelectInput label="Working Style" value={formData.workStyle.workingStyle} onChange={v => updateWorkStyle('workingStyle', v)} options={[
              { value: 'structured', label: 'Structured' },
              { value: 'flexible', label: 'Flexible' },
              { value: 'fast-paced', label: 'Fast-paced' },
              { value: 'slow-thoughtful', label: 'Slow & Thoughtful' },
              { value: 'collaborative', label: 'Collaborative' },
              { value: 'independent', label: 'Independent' },
            ]} />
            <SelectInput label="Consistency Level" value={formData.workStyle.consistency} onChange={v => updateWorkStyle('consistency', v)} options={[
              { value: '100% consistent', label: '100% Consistent' },
              { value: 'Mostly consistent', label: 'Mostly Consistent' },
              { value: 'Consistent only when motivated', label: 'Consistent When Motivated' },
              { value: 'Inconsistent but capable', label: 'Inconsistent but Capable' },
            ]} />
            <SliderInput label="Discipline Rating" value={formData.workStyle.disciplineRating} onChange={v => updateWorkStyle('disciplineRating', v)} labels={['Low', '', 'Medium', '', 'High']} />
          </div>
        );

      case 'wellbeing':
        return (
          <div className="space-y-6">
            <SliderInput label="Current Energy Level at Work" value={formData.wellbeingSustainability.currentEnergyLevel} onChange={v => updateWellbeing('currentEnergyLevel', v)} labels={['Very Low', '', 'Medium', '', 'Very High']} />
            <MultiSelectChips label="Top Stress Triggers" maxSelections={3} options={[
              { value: 'workload', label: 'Workload' },
              { value: 'clarity', label: 'Lack of Clarity' },
              { value: 'micromanagement', label: 'Micromanagement' },
              { value: 'leadership', label: 'Poor Leadership' },
              { value: 'insecurity', label: 'Job Insecurity' },
              { value: 'culture', label: 'Toxic Culture' },
            ]} selected={formData.wellbeingSustainability.stressTriggers} onChange={v => updateWellbeing('stressTriggers', v)} />
            <SelectInput label="Stress Management" value={formData.wellbeingSustainability.stressManagement} onChange={v => updateWellbeing('stressManagement', v)} options={[
              { value: 'Very well', label: 'Very Well' },
              { value: 'Well', label: 'Well' },
              { value: 'Moderate', label: 'Moderate' },
              { value: 'Struggle', label: 'Struggle' },
            ]} />
          </div>
        );

      case 'gamification':
        return (
          <div className="space-y-6">
            <MultiSelectChips label="What Keeps You Engaged in Learning?" options={[
              { value: 'streaks', label: 'Progress Streaks' },
              { value: 'badges', label: 'Badges & Achievements' },
              { value: 'projects', label: 'Real-world Projects' },
              { value: 'competition', label: 'Peer Competition' },
              { value: 'validation', label: 'Social Validation' },
            ]} selected={formData.gamificationTriggers.learningEngagement} onChange={v => updateGamification('learningEngagement', v)} />
            <SelectInput label="Preferred Feedback Style" value={formData.gamificationTriggers.feedbackStyle} onChange={v => updateGamification('feedbackStyle', v)} options={[
              { value: 'instant', label: 'Instant Micro-feedback' },
              { value: 'weekly', label: 'Weekly Summaries' },
              { value: 'monthly', label: 'Monthly Deep Reviews' },
            ]} />
          </div>
        );

      case 'tech-readiness':
        return (
          <div className="space-y-6">
            <SliderInput label="Comfort Level with AI & Automation" value={formData.techReadiness.aiComfortLevel} onChange={v => updateTech('aiComfortLevel', v)} labels={['Not Comfortable', '', 'Neutral', '', 'Very Comfortable']} />
            <MultiSelectChips label="Future Skills You Want to Develop" options={[
              { value: 'ai-literacy', label: 'AI Literacy' },
              { value: 'data-fluency', label: 'Data Fluency' },
              { value: 'systems-thinking', label: 'Systems Thinking' },
              { value: 'creativity', label: 'Creativity' },
              { value: 'leadership', label: 'Leadership' },
              { value: 'entrepreneurship', label: 'Entrepreneurship' },
            ]} selected={formData.techReadiness.futureSkills} onChange={v => updateTech('futureSkills', v)} />
          </div>
        );

      case 'leadership':
        return (
          <div className="space-y-6">
            <BooleanToggle label="Do you enjoy taking the lead?" value={formData.leadershipIndicators.enjoysLeading} onChange={v => updateLeadership('enjoysLeading', v)} />
            <BooleanToggle label="Do people come to you for advice?" value={formData.leadershipIndicators.advisorRole} onChange={v => updateLeadership('advisorRole', v)} />
            <SelectInput label="Where do you see yourself in 5 years?" value={formData.leadershipIndicators.fiveYearPosition} onChange={v => updateLeadership('fiveYearPosition', v)} options={[
              { value: 'manager', label: 'Manager' },
              { value: 'senior-leader', label: 'Senior Leader' },
              { value: 'entrepreneur', label: 'Entrepreneur' },
              { value: 'domain-expert', label: 'Domain Expert' },
              { value: 'not-sure', label: 'Not Sure' },
            ]} />
          </div>
        );

      case 'final-preferences':
        return (
          <div className="space-y-6">
            <SelectInput label="Preferred Communication Mode" value={formData.finalPreferences.communicationMode} onChange={v => updateFinal('communicationMode', v)} options={[
              { value: 'whatsapp', label: 'WhatsApp' },
              { value: 'email', label: 'Email' },
              { value: 'sms', label: 'SMS' },
              { value: 'phone', label: 'Phone' },
            ]} />
            <BooleanToggle label="Would you like a personalized Growth Charter preview?" value={formData.finalPreferences.wantsPersonalizedPreview} onChange={v => updateFinal('wantsPersonalizedPreview', v)} />
            <BooleanToggle label="I consent to personalized scoring & profile processing" description="We use your data only to create your personalized career roadmap." value={formData.finalPreferences.consentGranted} onChange={v => updateFinal('consentGranted', v)} />
          </div>
        );

      default:
        return <div>Step not implemented</div>;
    }
  };

  const canProceed = () => {
    switch (step.id) {
      case 'resume-review':
      case 'personal-info':
        return formData.candidateFoundation.fullName && formData.candidateFoundation.email;
      case 'career-status':
        return formData.candidateFoundation.careerStage && formData.candidateFoundation.professionalStatus;
      case 'career-vision':
        return formData.careerVision.tenYearVision.length > 10;
      case 'career-milestones':
        return formData.careerMilestones.targetRole3Years;
      case 'final-preferences':
        return formData.finalPreferences.consentGranted === true;
      default:
        return true;
    }
  };

  return (
    <div className="flex gap-8">
      <StepProgress currentStepIndex={currentStep} completedSteps={new Set()} />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <FormStepWrapper
            key={step.id}
            stepIndex={currentStep}
            title={step.title}
            description={step.description}
            onNext={nextStep}
            onBack={prevStep}
            canProceed={canProceed()}
            isLastStep={currentStep === FORM_STEPS.length - 2}
          >
            {renderStepContent()}
          </FormStepWrapper>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepVerification;
