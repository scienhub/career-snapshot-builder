import { CompleteFormData, GCScoreBreakdown } from '@/types/onboarding';

export const calculateGCScore = (formData: CompleteFormData): GCScoreBreakdown => {
  // PILLAR 1: Career Clarity & Vision (20 Points)
  let careerClarity = 0;
  const careerClarityDetails: string[] = [];

  // 10-year vision (6 pts)
  if (formData.careerVision.tenYearVision.length > 50) {
    careerClarity += 6;
    careerClarityDetails.push('Clear 10-year vision articulated');
  } else if (formData.careerVision.tenYearVision.length > 20) {
    careerClarity += 3;
    careerClarityDetails.push('10-year vision needs more detail');
  }

  // 3 & 5 year target roles (5 pts)
  if (formData.careerMilestones.targetRole3Years && formData.careerMilestones.targetRole5Years) {
    careerClarity += 5;
    careerClarityDetails.push('Short and mid-term goals defined');
  } else if (formData.careerMilestones.targetRole3Years || formData.careerMilestones.targetRole5Years) {
    careerClarity += 2;
    careerClarityDetails.push('Partial milestone planning');
  }

  // Aspiration alignment (5 pts)
  if (formData.careerVision.primaryAspirations.length >= 1 && formData.careerVision.dreamRoles) {
    careerClarity += 5;
    careerClarityDetails.push('Aspirations aligned with dream roles');
  }

  // Leadership/career positioning (4 pts)
  if (formData.leadershipIndicators.fiveYearPosition) {
    careerClarity += 4;
    careerClarityDetails.push('5-year positioning clarity');
  }

  // PILLAR 2: Skill Readiness & Capability (25 Points)
  let skillReadiness = 0;
  const skillReadinessDetails: string[] = [];

  // Skill confidence index (10 pts - average of 8 skills)
  const skillConfidence = formData.skillVision.skillConfidence;
  const avgConfidence = (
    skillConfidence.technical +
    skillConfidence.functional +
    skillConfidence.problemSolving +
    skillConfidence.communication +
    skillConfidence.decisionMaking +
    skillConfidence.leadership +
    skillConfidence.businessAcumen +
    skillConfidence.digitalReadiness
  ) / 8;
  skillReadiness += Math.round((avgConfidence / 5) * 10);
  skillReadinessDetails.push(`Average skill confidence: ${avgConfidence.toFixed(1)}/5`);

  // Skill awareness (8 pts)
  if (formData.skillVision.areasToImprove.length >= 3) {
    skillReadiness += 5;
    careerClarityDetails.push('Clear improvement areas identified');
  }
  if (formData.skillVision.criticalNextRoleSkills.length > 20) {
    skillReadiness += 3;
    skillReadinessDetails.push('Next-role skills identified');
  }

  // Core skills to master (7 pts)
  if (formData.skillVision.coreSkillsToMaster.length >= 3) {
    skillReadiness += 7;
    skillReadinessDetails.push('Core mastery goals set');
  } else if (formData.skillVision.coreSkillsToMaster.length >= 1) {
    skillReadiness += 4;
    skillReadinessDetails.push('Some mastery goals defined');
  }

  // PILLAR 3: Execution & Work Behaviour (15 Points)
  let execution = 0;
  const executionDetails: string[] = [];

  // Discipline rating (5 pts)
  execution += formData.workStyle.disciplineRating;
  executionDetails.push(`Discipline rating: ${formData.workStyle.disciplineRating}/5`);

  // Consistency & deadline behavior (5 pts)
  if (formData.workStyle.consistency === '100% consistent' || formData.workStyle.consistency === 'Mostly consistent') {
    execution += 5;
    executionDetails.push('Strong consistency track record');
  } else if (formData.workStyle.consistency === 'Consistent only when motivated') {
    execution += 3;
    executionDetails.push('Motivation-driven consistency');
  } else {
    execution += 1;
  }

  // Stress management (5 pts)
  if (formData.wellbeingSustainability.stressManagement === 'Very well' || formData.wellbeingSustainability.stressManagement === 'Well') {
    execution += 5;
    executionDetails.push('Strong stress management');
  } else if (formData.wellbeingSustainability.stressManagement === 'Moderate') {
    execution += 3;
    executionDetails.push('Moderate stress handling');
  } else {
    execution += 1;
  }

  // PILLAR 4: Motivation, Purpose & Values (15 Points)
  let motivationPurpose = 0;
  const motivationDetails: string[] = [];

  // Clear motivation driver (5 pts)
  if (formData.motivationPurpose.primaryMotivation.length >= 1) {
    motivationPurpose += 5;
    motivationDetails.push('Primary motivation identified');
  }

  // Success definition (4 pts)
  if (formData.motivationPurpose.careerSuccessMeaning.length > 30) {
    motivationPurpose += 4;
    motivationDetails.push('Career success clearly defined');
  } else if (formData.motivationPurpose.careerSuccessMeaning.length > 10) {
    motivationPurpose += 2;
  }

  // Values clarity (4 pts)
  if (formData.purposeValues.workValues.length >= 3) {
    motivationPurpose += 4;
    motivationDetails.push('Core values articulated');
  }

  // Purpose consistency (2 pts)
  if (formData.purposeValues.longTermGoal.length > 20) {
    motivationPurpose += 2;
    motivationDetails.push('Long-term goal defined');
  }

  // PILLAR 5: Learning Agility & Future Readiness (15 Points)
  let learningAgility = 0;
  const learningDetails: string[] = [];

  // Learning speed & style clarity (4 pts)
  if (formData.learningPreferences.learningSpeed && formData.learningPreferences.preferredLearningStyle.length >= 2) {
    learningAgility += 4;
    learningDetails.push('Learning style understood');
  } else if (formData.learningPreferences.learningSpeed) {
    learningAgility += 2;
  }

  // Weekly learning commitment (4 pts)
  const timeMap: Record<string, number> = { '<2': 1, '2-5': 2, '5-8': 3, '8+': 4 };
  learningAgility += timeMap[formData.learningPreferences.weeklyLearningTime] || 0;
  if (formData.learningPreferences.weeklyLearningTime) {
    learningDetails.push(`${formData.learningPreferences.weeklyLearningTime}hrs/week learning commitment`);
  }

  // AI & future readiness (5 pts)
  learningAgility += formData.techReadiness.aiComfortLevel;
  if (formData.techReadiness.futureSkills.length >= 2) {
    learningAgility += Math.min(learningAgility + 2, 15) - learningAgility;
    learningDetails.push('Future skills identified');
  }

  // Gamification openness (2 pts)
  if (formData.gamificationTriggers.learningEngagement.length >= 2) {
    learningAgility += Math.min(learningAgility + 2, 15) - learningAgility;
    learningDetails.push('Engaged with growth triggers');
  }

  // PILLAR 6: Commitment & Growth Ownership (10 Points)
  let commitment = 0;
  const commitmentDetails: string[] = [];

  // Explicit commitment (4 pts)
  if (formData.commitmentStatement.isCommitted === true) {
    commitment += 4;
    commitmentDetails.push('Growth Charter commitment made');
  } else {
    commitment = Math.min(commitment + 2, 6); // Cap at 6 for explore mode
    commitmentDetails.push('Exploring mode - full points on commitment');
  }

  // Realistic constraint awareness (3 pts)
  if (formData.careerConstraints.currentConstraints.length >= 2) {
    commitment += 3;
    commitmentDetails.push('Self-aware of constraints');
  } else if (formData.careerConstraints.currentConstraints.length >= 1) {
    commitment += 2;
  }

  // Risk appetite aligned (3 pts)
  if (formData.careerConstraints.riskAppetite) {
    commitment += 3;
    commitmentDetails.push('Risk tolerance defined');
  }

  // Cap pillars at max values
  careerClarity = Math.min(careerClarity, 20);
  skillReadiness = Math.min(skillReadiness, 25);
  execution = Math.min(execution, 15);
  motivationPurpose = Math.min(motivationPurpose, 15);
  learningAgility = Math.min(learningAgility, 15);
  commitment = Math.min(commitment, 10);

  // Calculate total (weighted already built into pillar scores)
  const totalScore = careerClarity + skillReadiness + execution + motivationPurpose + learningAgility + commitment;

  // Determine band
  let band: GCScoreBreakdown['band'];
  if (totalScore >= 80) band = 'high-clarity';
  else if (totalScore >= 65) band = 'good-potential';
  else if (totalScore >= 50) band = 'direction-forming';
  else if (totalScore >= 35) band = 'exploration';
  else band = 'low-clarity';

  // Simulate percentile based on score (simplified)
  const percentile = Math.min(95, Math.max(5, Math.round((totalScore / 100) * 90 + 5)));

  return {
    careerClarity: { score: careerClarity, maxScore: 20, details: careerClarityDetails },
    skillReadiness: { score: skillReadiness, maxScore: 25, details: skillReadinessDetails },
    execution: { score: execution, maxScore: 15, details: executionDetails },
    motivationPurpose: { score: motivationPurpose, maxScore: 15, details: motivationDetails },
    learningAgility: { score: learningAgility, maxScore: 15, details: learningDetails },
    commitment: { score: commitment, maxScore: 10, details: commitmentDetails },
    totalScore,
    percentile,
    band,
  };
};

// Minimum score for completing basic profile (encouragement score)
export const calculateMinimumEncouragementScore = (hasName: boolean, hasEmail: boolean, hasPhone: boolean): number => {
  let score = 0;
  if (hasName) score += 5;
  if (hasEmail) score += 5;
  if (hasPhone) score += 3;
  return score;
};
