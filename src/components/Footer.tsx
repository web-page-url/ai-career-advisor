'use client';

import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Roadmap']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Privacy', 'Terms']
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-black/50 to-transparent py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">AI Career Advisor</h3>
                <p className="text-xs text-gray-400">Your Future Starts Here</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Empowering students and professionals to discover their ideal career paths through AI-powered insights and personalized guidance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index + 1) * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass p-6 rounded-2xl mb-8"
        >
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Get the latest career insights and AI-powered tips delivered to your inbox.
              </p>
            </div>
            <div className="flex space-x-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium neon-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 AI Career Advisor. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>for your future success</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}