'use client';

import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Users, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI algorithms analyze your skills, interests, and goals to provide personalized career recommendations.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Target,
    title: 'Personalized Roadmaps',
    description: 'Get step-by-step career roadmaps tailored to your unique profile and aspirations.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Access real-time job market data, salary ranges, and industry growth trends.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Interactive Chat',
    description: 'Ask questions and get instant advice from our AI career counselor anytime.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get comprehensive career analysis and recommendations in under 60 seconds.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and private. We never share your personal information.',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our AI-powered platform can transform your career journey with cutting-edge technology and personalized insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 neon-glow`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-lg neon-glow hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try It Now - It&apos;s Free!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}