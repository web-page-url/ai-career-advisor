'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, BookOpen, Heart, Target, Briefcase, Loader2 } from 'lucide-react';
import { StudentProfile } from '../app/page';

interface InputFormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<StudentProfile>({
    education: '',
    skills: [],
    interests: [],
    strengths: [],
    weaknesses: [],
    careerGoals: '',
    experience: ''
  });

  const steps = [
    { title: "Education & Experience", icon: BookOpen, fields: ['education', 'experience'] },
    { title: "Skills & Expertise", icon: Target, fields: ['skills'] },
    { title: "Interests & Passions", icon: Heart, fields: ['interests'] },
    { title: "Strengths & Weaknesses", icon: User, fields: ['strengths', 'weaknesses'] },
    { title: "Career Goals", icon: Briefcase, fields: ['careerGoals'] }
  ];

  const handleInputChange = (field: keyof StudentProfile, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInput = (field: 'skills' | 'interests' | 'strengths' | 'weaknesses', value: string) => {
    if (value.trim()) {
      const items = value.split(',').map(item => item.trim()).filter(Boolean);
      handleInputChange(field, items);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      const value = formData[field as keyof StudentProfile];
      return Array.isArray(value) ? value.length > 0 : value && value.toString().trim() !== '';
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Education Level
              </label>
              <select
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your education level</option>
                <option value="high-school">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Work Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Describe your work experience, internships, projects..."
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Skills
              </label>
              <textarea
                onChange={(e) => handleArrayInput('skills', e.target.value)}
                placeholder="Enter your skills separated by commas (e.g., JavaScript, Python, Design, Communication)"
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                Separate multiple skills with commas
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Interests & Passions
              </label>
              <textarea
                onChange={(e) => handleArrayInput('interests', e.target.value)}
                placeholder="What are you passionate about? (e.g., Technology, Art, Healthcare, Environment)"
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                Separate multiple interests with commas
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Strengths
              </label>
              <textarea
                onChange={(e) => handleArrayInput('strengths', e.target.value)}
                placeholder="What are your key strengths? (e.g., Problem-solving, Leadership, Creativity)"
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Areas for Improvement
              </label>
              <textarea
                onChange={(e) => handleArrayInput('weaknesses', e.target.value)}
                placeholder="What would you like to improve? (e.g., Public speaking, Time management)"
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Career Goals & Aspirations
              </label>
              <textarea
                value={formData.careerGoals}
                onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                placeholder="Describe your career goals, dream job, or what you want to achieve..."
                className="w-full p-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-40 resize-none"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="input-form" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3 md:mb-4">
            Tell Us About Yourself
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed px-4 md:px-0">
            Help us understand your background to provide personalized career guidance
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-center items-center mb-6 px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Icon */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      index <= currentStep
                        ? 'border-purple-400 bg-purple-400/20 text-purple-400'
                        : 'border-gray-500 text-gray-500'
                    }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 mx-2 md:mx-4 transition-all duration-300 ${
                        index < currentStep
                          ? 'bg-purple-400 w-8 md:w-16'
                          : 'bg-gray-500 w-8 md:w-16'
                      }`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </span>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass p-4 md:p-8 rounded-2xl mx-4 md:mx-0"
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 md:mt-8 gap-4">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-4 md:px-6 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                currentStep === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-purple-300 hover:text-white hover:bg-purple-500/20'
              }`}
              whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </motion.button>

            {currentStep < steps.length - 1 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center px-4 md:px-6 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white neon-glow'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isStepValid() ? { scale: 1.05 } : {}}
                whileTap={isStepValid() ? { scale: 0.95 } : {}}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={!isStepValid() || isLoading}
                className={`flex items-center px-6 md:px-8 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                  isStepValid() && !isLoading
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white neon-glow'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isStepValid() && !isLoading ? { scale: 1.05 } : {}}
                whileTap={isStepValid() && !isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get My Career Advice'
                )}
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default InputForm;