'use client';

import { motion } from 'framer-motion';
import { Rocket, Sparkles, Target, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const floatingIcons = [
    { Icon: Rocket, delay: 0, x: 100, y: 50 },
    { Icon: Sparkles, delay: 0.5, x: -80, y: 80 },
    { Icon: Target, delay: 1, x: 120, y: -60 },
    { Icon: TrendingUp, delay: 1.5, x: -100, y: -40 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute opacity-20"
            style={{ left: `50%`, top: `50%` }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: [0, x, x * 0.5, x], 
              y: [0, y, y * 0.5, y],
              opacity: [0, 0.2, 0.1, 0.2]
            }}
            transition={{
              duration: 8,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Icon className="w-16 h-16 text-purple-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Find Your Future
            <br />
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Career Path 🚀
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Get personalized AI-powered career guidance with roadmaps, 
            skill analysis, and market insights tailored just for you.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold text-lg neon-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey
            </motion.button>
            
            <motion.button
              className="px-8 py-4 glass border-2 border-purple-400 rounded-full text-purple-300 font-semibold text-lg hover:bg-purple-400/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { number: "10K+", label: "Career Paths Analyzed" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "AI Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h3 
                className="text-3xl font-bold gradient-text mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + index * 0.2, type: "spring" }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}