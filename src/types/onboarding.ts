// Complete Career Vision Board Form Types

export interface CandidateFoundation {
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say' | '';
  dateOfBirth: string;
  currentRole: string;
  industry: string;
  totalExperience: string;
  currentIndustry: string;
  pastKeyRoles: string;
  biggestAchievement: string;
  biggestChallenge: string;
  highestQualification: string;
  location: string;
  linkedinProfile: string;
  careerStage: 'explorer' | 'builder' | 'accelerator' | 'leader' | 'entrepreneur' | '';
  professionalStatus: 'employed' | 'self-employed' | 'entrepreneur' | 'student' | 'transitioning' | 'other' | '';
  topPriorities: string[];
  motivations: string[];
}

export interface CareerVision {
  tenYearVision: string;
  primaryAspirations: string[];
  dreamRoles: string;
  preferredImpactType: string[];
}

export interface CareerMilestones {
  targetRole3Years: string;
  targetRole5Years: string;
  careerMovementPreference: string[];
  aspiringOrganizations: string;
}

export interface SkillVision {
  areasToImprove: string[];
  coreSkillsToMaster: string[];
  skillConfidence: {
    technical: number;
    functional: number;
    problemSolving: number;
    communication: number;
    decisionMaking: number;
    leadership: number;
    businessAcumen: number;
    digitalReadiness: number;
  };
  criticalNextRoleSkills: string;
}

export interface LearningPreferences {
  learningSpeed: 'very-fast' | 'fast' | 'average' | 'slow-but-steady' | '';
  thinkingStyle: 'analytical' | 'creative' | 'balanced' | '';
  problemSolvingApproach: 'logic' | 'experience' | 'intuition' | 'collaboration' | '';
  preferredLearningStyle: string[];
  weeklyLearningTime: '<2' | '2-5' | '5-8' | '8+' | '';
  certificationImportance: 'very-important' | 'somewhat-important' | 'not-important' | '';
}

export interface CareerConstraints {
  currentConstraints: string[];
  riskAppetite: 'conservative' | 'balanced' | 'aggressive' | '';
}

export interface MotivationPurpose {
  primaryMotivation: string[];
  careerSuccessMeaning: string;
}

export interface CommitmentStatement {
  isCommitted: boolean | null;
}

export interface WorkIdentity {
  professionalIdentity: string;
  personalBrandAttributes: string[];
  visibilityPreferences: string[];
}

export interface PurposeValues {
  longTermGoal: string;
  stoppingFactors: string;
  ninetyDayChange: string;
  guidancePreference: string[];
  causesYouCare: string[];
  workValues: string[];
  dealBreakers: string[];
}

export interface WorkStyle {
  workingStyle: string;
  consistency: string;
  deadlineHandling: string;
  disciplineRating: number;
  preferredWorkModel: string;
  idealWorkRhythm: string;
  autonomyLevel: number;
  idealTeamStructure: string;
}

export interface WellbeingSustainability {
  currentEnergyLevel: number;
  stressTriggers: string[];
  performanceHelpers: string[];
  stressManagement: string;
  socialComfort: string;
  personalityDescription: string;
  conflictHandling: string;
  wellbeingCheckFrequency: string;
}

export interface GamificationTriggers {
  learningEngagement: string[];
  feedbackStyle: string;
  recognitionPreference: string;
}

export interface IncomeLifestyle {
  incomeGrowthExpectation: string;
  lifestylePriorities: string[];
  sideHustleComfort: string;
  priorityChoice: string;
}

export interface CommunityInfluence {
  careerInfluencer: string;
  communityLearning: string;
  peerBenchmarkingComfort: string;
}

export interface TechReadiness {
  aiComfortLevel: number;
  disappearingRoles: string;
  futureSkills: string[];
}

export interface LeadershipIndicators {
  enjoysLeading: boolean | null;
  advisorRole: boolean | null;
  delegationComfort: boolean | null;
  fiveYearPosition: string;
}

export interface FinalPreferences {
  communicationMode: string;
  wantsPersonalizedPreview: boolean | null;
  consentGranted: boolean | null;
}

export interface CompleteFormData {
  candidateFoundation: CandidateFoundation;
  careerVision: CareerVision;
  careerMilestones: CareerMilestones;
  skillVision: SkillVision;
  learningPreferences: LearningPreferences;
  careerConstraints: CareerConstraints;
  motivationPurpose: MotivationPurpose;
  commitmentStatement: CommitmentStatement;
  workIdentity: WorkIdentity;
  purposeValues: PurposeValues;
  workStyle: WorkStyle;
  wellbeingSustainability: WellbeingSustainability;
  gamificationTriggers: GamificationTriggers;
  incomeLifestyle: IncomeLifestyle;
  communityInfluence: CommunityInfluence;
  techReadiness: TechReadiness;
  leadershipIndicators: LeadershipIndicators;
  finalPreferences: FinalPreferences;
}

export interface GCScoreBreakdown {
  careerClarity: { score: number; maxScore: number; details: string[] };
  skillReadiness: { score: number; maxScore: number; details: string[] };
  execution: { score: number; maxScore: number; details: string[] };
  motivationPurpose: { score: number; maxScore: number; details: string[] };
  learningAgility: { score: number; maxScore: number; details: string[] };
  commitment: { score: number; maxScore: number; details: string[] };
  totalScore: number;
  percentile: number;
  band: 'high-clarity' | 'good-potential' | 'direction-forming' | 'exploration' | 'low-clarity';
}

export interface ExtractedResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  industry: string;
  experience: string;
  skills: string[];
  education: string;
  linkedinProfile?: string;
}

// Form step definitions
export type FormStepId = 
  | 'resume-review'
  | 'personal-info'
  | 'career-status'
  | 'priorities-motivations'
  | 'career-vision'
  | 'career-milestones'
  | 'skill-assessment'
  | 'learning-preferences'
  | 'constraints-risk'
  | 'motivation-purpose'
  | 'commitment'
  | 'work-identity'
  | 'values-purpose'
  | 'work-style'
  | 'wellbeing'
  | 'gamification'
  | 'income-lifestyle'
  | 'community'
  | 'tech-readiness'
  | 'leadership'
  | 'final-preferences'
  | 'score-summary';

export interface FormStep {
  id: FormStepId;
  title: string;
  description: string;
  section: string;
}

export const FORM_STEPS: FormStep[] = [
  { id: 'resume-review', title: 'Resume Review', description: 'Verify extracted information', section: 'Foundation' },
  { id: 'personal-info', title: 'Personal Details', description: 'Complete your profile', section: 'Foundation' },
  { id: 'career-status', title: 'Career Status', description: 'Current professional status', section: 'Foundation' },
  { id: 'priorities-motivations', title: 'Priorities', description: 'What drives you', section: 'Foundation' },
  { id: 'career-vision', title: 'Career Vision', description: 'Your 10-year vision', section: 'Vision' },
  { id: 'career-milestones', title: 'Milestones', description: '3-5 year goals', section: 'Vision' },
  { id: 'skill-assessment', title: 'Skills', description: 'Current capabilities', section: 'Skills' },
  { id: 'learning-preferences', title: 'Learning Style', description: 'How you learn best', section: 'Skills' },
  { id: 'constraints-risk', title: 'Constraints', description: 'Current challenges', section: 'Reality' },
  { id: 'motivation-purpose', title: 'Motivation', description: 'What success means', section: 'Purpose' },
  { id: 'commitment', title: 'Commitment', description: 'Your growth pledge', section: 'Purpose' },
  { id: 'work-identity', title: 'Work Identity', description: 'Professional brand', section: 'Identity' },
  { id: 'values-purpose', title: 'Values', description: 'What matters most', section: 'Identity' },
  { id: 'work-style', title: 'Work Style', description: 'How you work best', section: 'Style' },
  { id: 'wellbeing', title: 'Wellbeing', description: 'Energy & stress', section: 'Style' },
  { id: 'gamification', title: 'Engagement', description: 'What keeps you going', section: 'Preferences' },
  { id: 'income-lifestyle', title: 'Lifestyle', description: 'Income & balance', section: 'Preferences' },
  { id: 'community', title: 'Community', description: 'Social influence', section: 'Preferences' },
  { id: 'tech-readiness', title: 'Tech Readiness', description: 'Future orientation', section: 'Future' },
  { id: 'leadership', title: 'Leadership', description: 'Leadership potential', section: 'Future' },
  { id: 'final-preferences', title: 'Preferences', description: 'Communication & consent', section: 'Final' },
  { id: 'score-summary', title: 'Your GC Score', description: 'Complete breakdown', section: 'Complete' },
];

export const getDefaultFormData = (): CompleteFormData => ({
  candidateFoundation: {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    currentRole: '',
    industry: '',
    totalExperience: '',
    currentIndustry: '',
    pastKeyRoles: '',
    biggestAchievement: '',
    biggestChallenge: '',
    highestQualification: '',
    location: '',
    linkedinProfile: '',
    careerStage: '',
    professionalStatus: '',
    topPriorities: [],
    motivations: [],
  },
  careerVision: {
    tenYearVision: '',
    primaryAspirations: [],
    dreamRoles: '',
    preferredImpactType: [],
  },
  careerMilestones: {
    targetRole3Years: '',
    targetRole5Years: '',
    careerMovementPreference: [],
    aspiringOrganizations: '',
  },
  skillVision: {
    areasToImprove: [],
    coreSkillsToMaster: [],
    skillConfidence: {
      technical: 3,
      functional: 3,
      problemSolving: 3,
      communication: 3,
      decisionMaking: 3,
      leadership: 3,
      businessAcumen: 3,
      digitalReadiness: 3,
    },
    criticalNextRoleSkills: '',
  },
  learningPreferences: {
    learningSpeed: '',
    thinkingStyle: '',
    problemSolvingApproach: '',
    preferredLearningStyle: [],
    weeklyLearningTime: '',
    certificationImportance: '',
  },
  careerConstraints: {
    currentConstraints: [],
    riskAppetite: '',
  },
  motivationPurpose: {
    primaryMotivation: [],
    careerSuccessMeaning: '',
  },
  commitmentStatement: {
    isCommitted: null,
  },
  workIdentity: {
    professionalIdentity: '',
    personalBrandAttributes: [],
    visibilityPreferences: [],
  },
  purposeValues: {
    longTermGoal: '',
    stoppingFactors: '',
    ninetyDayChange: '',
    guidancePreference: [],
    causesYouCare: [],
    workValues: [],
    dealBreakers: [],
  },
  workStyle: {
    workingStyle: '',
    consistency: '',
    deadlineHandling: '',
    disciplineRating: 3,
    preferredWorkModel: '',
    idealWorkRhythm: '',
    autonomyLevel: 3,
    idealTeamStructure: '',
  },
  wellbeingSustainability: {
    currentEnergyLevel: 3,
    stressTriggers: [],
    performanceHelpers: [],
    stressManagement: '',
    socialComfort: '',
    personalityDescription: '',
    conflictHandling: '',
    wellbeingCheckFrequency: '',
  },
  gamificationTriggers: {
    learningEngagement: [],
    feedbackStyle: '',
    recognitionPreference: '',
  },
  incomeLifestyle: {
    incomeGrowthExpectation: '',
    lifestylePriorities: [],
    sideHustleComfort: '',
    priorityChoice: '',
  },
  communityInfluence: {
    careerInfluencer: '',
    communityLearning: '',
    peerBenchmarkingComfort: '',
  },
  techReadiness: {
    aiComfortLevel: 3,
    disappearingRoles: '',
    futureSkills: [],
  },
  leadershipIndicators: {
    enjoysLeading: null,
    advisorRole: null,
    delegationComfort: null,
    fiveYearPosition: '',
  },
  finalPreferences: {
    communicationMode: '',
    wantsPersonalizedPreview: null,
    consentGranted: null,
  },
});
