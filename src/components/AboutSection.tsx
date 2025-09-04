'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, Award } from 'lucide-react';

const stats = [
  { number: '10,000+', label: 'Students Guided', icon: Users },
  { number: '95%', label: 'Success Rate', icon: CheckCircle },
  { number: '500+', label: 'Career Paths', icon: Star },
  { number: '4.9/5', label: 'User Rating', icon: Award }
];

const teamMembers = [
  {
    name: 'Arpit',
    role: 'AI Research Lead',
    description: 'B.Tech from IIT Delhi, specializing in machine learning and AI-powered career analytics with expertise in building intelligent recommendation systems.',
    image: '👨‍💻'
  },
  {
    name: 'Anubhav',
    role: 'Backend Engineer',
    description: 'B.Tech from IIT Mandi, expert in scalable backend systems and API development, ensuring robust and efficient platform performance.',
    image: '👨‍💼'
  },
  {
    name: 'Akriti',
    role: 'Frontend Developer',
    description: 'B.Tech from IIT Mandi, passionate about creating beautiful and intuitive user experiences that make career planning accessible to everyone.',
    image: '👩‍💻'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Main About Content */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
            About AI Career Advisor
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We&apos;re on a mission to democratize career guidance by combining cutting-edge AI technology 
              with expert career counseling insights. Our platform helps students and professionals 
              discover their ideal career paths through personalized analysis and actionable roadmaps.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded in 2024, we&apos;ve already helped thousands of students navigate their career 
              decisions with confidence. Our AI-powered recommendations are backed by real market 
              data and validated by career counseling experts.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-6">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To empower every student and professional with AI-driven career insights, 
              making personalized career guidance accessible, affordable, and actionable 
              for everyone, regardless of their background or resources.
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-6">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              A world where career decisions are made with confidence, backed by 
              data-driven insights and personalized guidance, leading to more 
              fulfilling careers and a more skilled global workforce.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold gradient-text text-center mb-12">
            Meet Our Team
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-card p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-neon font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to Discover Your Perfect Career?
          </h3>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-lg neon-glow hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}