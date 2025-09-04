'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, BarChart3, Globe, Zap } from 'lucide-react';
import { CareerRecommendation } from '../app/page';

interface MarketInsightsProps {
  recommendations: CareerRecommendation[];
}

export default function MarketInsights({ recommendations }: MarketInsightsProps) {
  const topRecommendation = recommendations[0];

  const insights = [
    {
      icon: TrendingUp,
      title: "Market Demand",
      value: topRecommendation.marketInsights.demand,
      description: "Current job market demand for this role",
      color: "text-green-400"
    },
    {
      icon: DollarSign,
      title: "Salary Range",
      value: topRecommendation.marketInsights.salaryRange,
      description: "Expected salary range in the market",
      color: "text-cyan-400"
    },
    {
      icon: BarChart3,
      title: "Growth Potential",
      value: topRecommendation.marketInsights.growth,
      description: "Career growth and advancement opportunities",
      color: "text-purple-400"
    }
  ];

  const marketStats = [
    { label: "Job Openings", value: "15,000+", icon: Users },
    { label: "Companies Hiring", value: "2,500+", icon: Globe },
    { label: "Avg. Time to Hire", value: "3-4 weeks", icon: Zap }
  ];

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
            Market Insights
          </h2>
          <p className="text-gray-300 text-lg">
            Real-time market data for {topRecommendation.title} positions
          </p>
        </motion.div>

        {/* Main Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center neon-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {insight.title}
                </h3>
                
                <div className={`text-2xl font-bold mb-2 ${insight.color}`}>
                  {insight.value}
                </div>
                
                <p className="text-gray-400 text-sm">
                  {insight.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Market Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass p-8 rounded-2xl mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Current Market Statistics
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {marketStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Career Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            How Your Top Recommendations Compare
          </h3>
          
          <div className="space-y-4">
            {recommendations.slice(0, 3).map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{rec.title}</h4>
                    <p className="text-sm text-gray-400">Match: {rec.match}%</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-cyan-400 font-semibold">
                    {rec.marketInsights.salaryRange}
                  </div>
                  <div className="text-sm text-gray-400">
                    {rec.marketInsights.demand}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}