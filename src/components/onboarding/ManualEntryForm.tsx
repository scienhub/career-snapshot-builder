import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ManualEntryFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const ManualEntryForm = ({ onSubmit, onBack }: ManualEntryFormProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    currentRole: '',
    industry: '',
    experience: '',
    education: '',
    skills: '',
    careerStage: '',
    professionalStatus: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', required: true },
        { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', placeholder: '+1 234 567 890', type: 'tel', required: false },
        { name: 'location', label: 'Location', placeholder: 'City, State, Country', type: 'text', required: false },
      ],
    },
    {
      title: 'Professional Background',
      icon: Briefcase,
      fields: [
        { name: 'currentRole', label: 'Current Role / Designation', placeholder: 'Software Engineer', type: 'text', required: true },
        { name: 'industry', label: 'Industry / Domain', placeholder: 'Technology', type: 'text', required: true },
        { name: 'experience', label: 'Total Work Experience', placeholder: '5 years', type: 'text', required: true },
      ],
    },
    {
      title: 'Education & Skills',
      icon: GraduationCap,
      fields: [
        { name: 'education', label: 'Highest Qualification', placeholder: 'B.Tech in Computer Science', type: 'text', required: false },
        { name: 'skills', label: 'Key Skills (comma separated)', placeholder: 'Python, React, Leadership', type: 'text', required: false },
      ],
    },
    {
      title: 'Career Status',
      icon: MapPin,
      fields: [],
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const canProceed = () => {
    if (isLastStep) {
      return formData.careerStage && formData.professionalStatus;
    }
    const requiredFields = currentStep.fields.filter(f => f.required);
    return requiredFields.every(f => formData[f.name as keyof typeof formData]);
  };

  const handleNext = () => {
    if (isLastStep) {
      onSubmit({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });
    } else {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const careerStages = [
    { value: 'explorer', label: 'Explorer', description: 'Student / Early Career' },
    { value: 'builder', label: 'Builder', description: '1–5 years experience' },
    { value: 'accelerator', label: 'Accelerator', description: '6–12 years' },
    { value: 'leader', label: 'Leader', description: '12+ years' },
    { value: 'entrepreneur', label: 'Entrepreneur / Consultant', description: 'Running own venture' },
  ];

  const professionalStatuses = [
    'Employed', 'Self-employed', 'Entrepreneur', 'Student', 'Transitioning'
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div>
      {/* Step Progress */}
      <motion.div 
        className="flex items-center justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                i < step ? 'bg-primary text-primary-foreground' :
                i === step ? 'bg-primary text-primary-foreground shadow-glow' :
                'bg-muted text-muted-foreground'
              }`}
              animate={i === step ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: i === step ? Infinity : 0, repeatDelay: 2 }}
            >
              {i < step ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                <s.icon className="w-5 h-5" />
              )}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="w-12 h-1 mx-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: i < step ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Form Card */}
      <motion.div 
        className="card-premium p-8 max-w-xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center"
            key={step}
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <currentStep.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <div>
            <p className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</p>
            <h3 className="text-xl font-semibold text-foreground">{currentStep.title}</h3>
          </div>
        </div>

        {/* Form Fields */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-4 mb-8"
          >
            {currentStep.fields.map((field, index) => (
              <motion.div 
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="input-premium"
                />
              </motion.div>
            ))}

            {/* Career Status Step */}
            {isLastStep && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Career Stage <span className="text-destructive">*</span>
                  </label>
                  <div className="space-y-2">
                    {careerStages.map((stage, index) => (
                      <motion.button
                        key={stage.value}
                        onClick={() => handleChange('careerStage', stage.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formData.careerStage === stage.value
                            ? 'border-primary bg-accent'
                            : 'border-border hover:border-primary/50 bg-secondary/30'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{stage.label}</p>
                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                          </div>
                          <AnimatePresence>
                            {formData.careerStage === stage.value && (
                              <motion.div 
                                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Professional Status <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {professionalStatuses.map((status, index) => (
                      <motion.button
                        key={status}
                        onClick={() => handleChange('professionalStatus', status.toLowerCase())}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          formData.professionalStatus === status.toLowerCase()
                            ? 'border-primary bg-accent text-primary'
                            : 'border-border hover:border-primary/50 bg-secondary/30 text-foreground'
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handlePrev}
            variant="outline"
            className="flex-1 py-6 rounded-xl"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            {step === 0 ? 'Upload Resume' : 'Back'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 btn-primary-gradient py-6 rounded-xl"
          >
            {isLastStep ? 'Confirm & Continue' : 'Next'}
            {!isLastStep && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ManualEntryForm;
