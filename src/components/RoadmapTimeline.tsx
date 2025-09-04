'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, ArrowRight, BookOpen, Code, Briefcase } from 'lucide-react';
import { CareerRecommendation } from '../app/page';

interface RoadmapTimelineProps {
  recommendations: CareerRecommendation[];
}

export default function RoadmapTimeline({ recommendations }: RoadmapTimelineProps) {
  const topRecommendation = recommendations[0];
  
  const getPhaseIcon = (phase: string) => {
    if (phase.toLowerCase().includes('learn') || phase.toLowerCase().includes('study')) {
      return BookOpen;
    }
    if (phase.toLowerCase().includes('practice') || phase.toLowerCase().includes('build')) {
      return Code;
    }
    return Briefcase;
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Your Career Roadmap
          </h2>
          <p className="text-gray-300 text-lg">
            Step-by-step path to become a {topRecommendation.title}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500"></div>

          {topRecommendation.roadmap.map((step, index) => {
            const Icon = getPhaseIcon(step.phase);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start mb-12"
              >
                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full neon-glow">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content Card */}
                <div className="ml-8 flex-1">
                  <motion.div
                    className="glass p-6 rounded-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {step.phase}
                      </h3>
                      <div className="flex items-center text-cyan-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-medium">{step.duration}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">
                          Key Tasks
                        </h4>
                        <ul className="space-y-2">
                          {step.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">
                          Skills to Develop
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow to next step */}
                {index < topRecommendation.roadmap.length - 1 && (
                  <motion.div
                    className="absolute left-12 -bottom-6 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index + 1) * 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass p-8 rounded-2xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              You&apos;re Ready to Start Your Journey!
            </h3>
            <p className="text-gray-300">
              Follow this roadmap consistently, and you&apos;ll be well on your way to becoming a successful {topRecommendation.title}.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}