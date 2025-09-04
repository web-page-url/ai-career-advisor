'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import InputForm from '../components/InputForm';
import ResultDashboard from '../components/ResultDashboard';
import RoadmapTimeline from '../components/RoadmapTimeline';
import MarketInsights from '../components/MarketInsights';
import ChatAdvisor from '../components/ChatAdvisor';
import Footer from '../components/Footer';

export interface StudentProfile {
  education: string;
  skills: string[];
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  careerGoals: string;
  experience: string;
}

export interface CareerRecommendation {
  title: string;
  match: number;
  description: string;
  whySuitable: string;
  keySkills: string[];
  roadmap: RoadmapStep[];
  marketInsights: {
    demand: string;
    salaryRange: string;
    growth: string;
  };
}

export interface RoadmapStep {
  phase: string;
  duration: string;
  tasks: string[];
  skills: string[];
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'input' | 'results'>('input');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (profile: StudentProfile) => {
    setIsLoading(true);
    setStudentProfile(profile);

    try {
      // Call Gemini API
      const response = await fetch('/api/career-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error getting career advice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('input');
    setStudentProfile(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {currentStep === 'input' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <div id="input-form">
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </motion.div>
      )}

      {currentStep === 'results' && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ResultDashboard
            recommendations={recommendations}
            onStartOver={handleStartOver}
          />
          <RoadmapTimeline recommendations={recommendations} />
          <MarketInsights recommendations={recommendations} />
          <ChatAdvisor studentProfile={studentProfile} />
        </motion.div>
      )}

      <Footer />
    </div>
  );
}