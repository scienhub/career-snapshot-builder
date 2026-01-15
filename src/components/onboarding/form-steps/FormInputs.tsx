import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles, User } from 'lucide-react';
import { useState } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  isExtracted?: boolean;
  type?: 'text' | 'email' | 'tel' | 'date';
  multiline?: boolean;
  rows?: number;
}

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  isExtracted,
  type = 'text',
  multiline,
  rows = 3,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
        {isExtracted && (
          <span className="tag-extracted">
            <Sparkles className="w-3 h-3" />
            Extracted
          </span>
        )}
      </div>
      
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`input-premium resize-none transition-all duration-200 ${
            isFocused ? 'ring-2 ring-primary/30' : ''
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`input-premium transition-all duration-200 ${
            isFocused ? 'ring-2 ring-primary/30' : ''
          }`}
        />
      )}
    </motion.div>
  );
};

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
  placeholder?: string;
  required?: boolean;
}

export const SelectInput = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required,
}: SelectInputProps) => {
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-premium appearance-none cursor-pointer pr-10"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
    </motion.div>
  );
};

interface OptionCardProps {
  value: string;
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const OptionCard = ({
  label,
  description,
  isSelected,
  onClick,
  icon,
}: OptionCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        isSelected
          ? 'border-primary bg-accent shadow-md'
          : 'border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50'
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <p className="font-medium text-foreground">{label}</p>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <AnimatePresence>
          {isSelected && (
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
  );
};

interface MultiSelectChipsProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
  maxSelections?: number;
}

export const MultiSelectChips = ({
  label,
  options,
  selected,
  onChange,
  required,
  maxSelections,
}: MultiSelectChipsProps) => {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      if (maxSelections && selected.length >= maxSelections) {
        // Replace the last selected with new one
        onChange([...selected.slice(0, -1), value]);
      } else {
        onChange([...selected, value]);
      }
    }
  };

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
        {maxSelections && (
          <span className="text-xs text-muted-foreground">
            Select up to {maxSelections}
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary border border-border'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  labels?: string[];
}

export const SliderInput = ({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  labels,
}: SliderInputProps) => {
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-lg font-semibold text-primary">{value}/{max}</span>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        
        {labels && (
          <div className="flex justify-between text-xs text-muted-foreground">
            {labels.map((l, i) => (
              <span key={i} className={i + 1 === value ? 'text-primary font-medium' : ''}>
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface BooleanToggleProps {
  label: string;
  description?: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const BooleanToggle = ({
  label,
  description,
  value,
  onChange,
}: BooleanToggleProps) => {
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="text-sm font-medium text-foreground">{label}</label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      
      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
            value === true
              ? 'border-primary bg-accent'
              : 'border-border hover:border-primary/50 bg-secondary/30'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Check className={`w-5 h-5 ${value === true ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${value === true ? 'text-primary' : 'text-foreground'}`}>Yes</span>
          </div>
        </motion.button>
        
        <motion.button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
            value === false
              ? 'border-primary bg-accent'
              : 'border-border hover:border-primary/50 bg-secondary/30'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className={`font-medium ${value === false ? 'text-primary' : 'text-foreground'}`}>No</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
