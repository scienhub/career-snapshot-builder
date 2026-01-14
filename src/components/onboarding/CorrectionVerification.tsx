import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Pencil, Info, ChevronDown, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExtractedData {
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  industry: string;
  experience: string;
  skills: string[];
  education: string;
  location: string;
}

interface CorrectionVerificationProps {
  extractedData: ExtractedData;
  onConfirm: (data: ExtractedData, careerStage: string, status: string) => void;
  onBack: () => void;
}

const careerStages = [
  { value: 'explorer', label: 'Explorer', description: 'Student / Early Career' },
  { value: 'builder', label: 'Builder', description: '1–5 years experience' },
  { value: 'accelerator', label: 'Accelerator', description: '6–12 years' },
  { value: 'leader', label: 'Leader', description: '12+ years' },
  { value: 'entrepreneur', label: 'Entrepreneur / Consultant', description: 'Running own venture' },
];

const professionalStatuses = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'student', label: 'Student' },
  { value: 'transitioning', label: 'Transitioning' },
];

const CorrectionVerification = ({ extractedData, onConfirm, onBack }: CorrectionVerificationProps) => {
  const [data, setData] = useState<ExtractedData>(extractedData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [careerStage, setCareerStage] = useState('');
  const [professionalStatus, setProfessionalStatus] = useState('');
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  const handleFieldChange = (field: keyof ExtractedData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
    setModifiedFields(prev => new Set(prev).add(field));
    setEditingField(null);
  };

  const isFormComplete = careerStage && professionalStatus && data.fullName && data.email;

  const handleConfirm = () => {
    if (isFormComplete) {
      onConfirm(data, careerStage, professionalStatus);
    }
  };

  const FieldRow = ({ 
    label, 
    field, 
    value,
    placeholder = '',
    index = 0
  }: { 
    label: string; 
    field: keyof ExtractedData; 
    value: string;
    placeholder?: string;
    index?: number;
  }) => {
    const isEditing = editingField === field;
    const isModified = modifiedFields.has(field);
    const isExtracted = !isModified && value;

    return (
      <motion.div 
        className={`p-4 rounded-xl transition-all duration-300 ${
          isExtracted ? 'field-extracted' : isModified ? 'field-manual' : 'bg-secondary/30'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            {label}
            <AnimatePresence mode="wait">
              {isExtracted && (
                <motion.span 
                  className="tag-extracted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Sparkles className="w-3 h-3" />
                  Extracted
                </motion.span>
              )}
              {isModified && (
                <motion.span 
                  className="tag-manual"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <User className="w-3 h-3" />
                  Modified
                </motion.span>
              )}
            </AnimatePresence>
          </label>
          <motion.button
            onClick={() => setEditingField(isEditing ? null : field)}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
        
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="editing"
            >
              <input
                type="text"
                value={value}
                onChange={(e) => setData(prev => ({ ...prev, [field]: e.target.value }))}
                className="input-premium flex-1"
                placeholder={placeholder}
                autoFocus
              />
              <Button
                onClick={() => handleFieldChange(field, value)}
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                <Check className="w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.p 
              className="text-foreground"
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {value || <span className="text-muted-foreground italic">Not provided</span>}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const SkillsField = () => {
    const isModified = modifiedFields.has('skills');
    const isExtracted = !isModified && data.skills.length > 0;

    return (
      <motion.div 
        className={`p-4 rounded-xl transition-all duration-300 ${
          isExtracted ? 'field-extracted' : isModified ? 'field-manual' : 'bg-secondary/30'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Skills
            {isExtracted && (
              <span className="tag-extracted">
                <Sparkles className="w-3 h-3" />
                Extracted
              </span>
            )}
          </label>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <motion.span 
              key={index} 
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
          {data.skills.length === 0 && (
            <span className="text-muted-foreground italic">No skills extracted</span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Check className="w-4 h-4" />
          Resume Analyzed Successfully
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          Review & Verify Your Information
        </h2>
        <p className="text-muted-foreground">
          We've extracted the following details. Edit anything that needs correction.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Extracted Data */}
        <div className="space-y-4">
          <motion.div 
            className="card-premium p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <FieldRow label="Full Name" field="fullName" value={data.fullName} placeholder="John Doe" index={0} />
              <FieldRow label="Email" field="email" value={data.email} placeholder="john@example.com" index={1} />
              <FieldRow label="Phone" field="phone" value={data.phone} placeholder="+1 234 567 890" index={2} />
              <FieldRow label="Location" field="location" value={data.location} placeholder="City, Country" index={3} />
            </div>
          </motion.div>

          <motion.div 
            className="card-premium p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Professional Details
            </h3>
            <div className="space-y-3">
              <FieldRow label="Current Role" field="currentRole" value={data.currentRole} placeholder="Software Engineer" index={4} />
              <FieldRow label="Industry" field="industry" value={data.industry} placeholder="Technology" index={5} />
              <FieldRow label="Experience" field="experience" value={data.experience} placeholder="5 years" index={6} />
              <FieldRow label="Education" field="education" value={data.education} placeholder="B.Tech in Computer Science" index={7} />
            </div>
          </motion.div>

          <motion.div 
            className="card-premium p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SkillsField />
          </motion.div>
        </div>

        {/* Right Column - Status Confirmation */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-premium p-6 sticky top-28">
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Confirm Your Status
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              This helps us personalize your Growth Charter experience.
            </p>

            {/* Career Stage */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Career Stage <span className="text-destructive">*</span>
              </label>
              <div className="space-y-2">
                {careerStages.map((stage, index) => (
                  <motion.button
                    key={stage.value}
                    onClick={() => setCareerStage(stage.value)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      careerStage === stage.value
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50 bg-secondary/30'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{stage.label}</p>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                      <AnimatePresence>
                        {careerStage === stage.value && (
                          <motion.div 
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Professional Status */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm font-medium text-foreground mb-3 block">
                Professional Status <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <select
                  value={professionalStatus}
                  onChange={(e) => setProfessionalStatus(e.target.value)}
                  className="input-premium appearance-none cursor-pointer pr-10"
                >
                  <option value="">Select your status</option>
                  {professionalStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleConfirm}
                disabled={!isFormComplete}
                className="w-full btn-primary-gradient py-6 text-lg rounded-xl"
              >
                Confirm & Continue
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                You can update these details later, but this sets your baseline.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Back Button */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          whileHover={{ x: -5 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Upload a different resume</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CorrectionVerification;
