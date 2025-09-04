'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Star } from 'lucide-react';
import { CareerRecommendation } from '../app/page';

interface ResultDashboardProps {
  recommendations: CareerRecommendation[];
  onStartOver: () => void;
}

export default function ResultDashboard({ recommendations, onStartOver }: ResultDashboardProps) {
  const topRecommendation = recommendations[0];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Your Career Recommendations
          </h2>
          <p className="text-gray-300 text-lg">
            Based on your profile, here are the best career paths for you
          </p>
        </motion.div>

        {/* Top Recommendation Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 rounded-2xl mb-8 border-2 border-purple-400/30"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Top Match</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-xl font-bold text-yellow-400">
                {topRecommendation.match}% Match
              </span>
            </div>
          </div>

          <h4 className="text-3xl font-bold gradient-text mb-4">
            {topRecommendation.title}
          </h4>
          
          <p className="text-gray-300 text-lg mb-6">
            {topRecommendation.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-lg font-semibold text-purple-300 mb-3">
                Why This Suits You
              </h5>
              <p className="text-gray-400">
                {topRecommendation.whySuitable}
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold text-purple-300 mb-3">
                Key Skills Required
              </h5>
              <div className="flex flex-wrap gap-2">
                {topRecommendation.keySkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass p-6 rounded-xl hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold text-cyan-400">
                  {rec.match}%
                </span>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3">
                {rec.title}
              </h4>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {rec.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Demand:</span>
                  <span className="text-green-400">{rec.marketInsights.demand}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Salary:</span>
                  <span className="text-cyan-400">{rec.marketInsights.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Growth:</span>
                  <span className="text-purple-400">{rec.marketInsights.growth}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-x-4"
        >
          <motion.button
            onClick={onStartOver}
            className="px-6 py-3 glass border-2 border-purple-400 rounded-xl text-purple-300 font-medium hover:bg-purple-400/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Over
          </motion.button>
          
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Report
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}