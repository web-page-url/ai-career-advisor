'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      className="fixed top-0 w-full z-50 glass-dark"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-neon" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AI Career Advisor</h1>
              <p className="text-xs text-gray-400">Your Future Starts Here</p>
            </div>
          </motion.div>

          <motion.nav 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#features" className="text-gray-300 hover:text-neon transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-neon transition-colors">
              About
            </a>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-medium neon-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}