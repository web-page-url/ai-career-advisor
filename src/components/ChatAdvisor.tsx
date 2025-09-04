'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, X } from 'lucide-react';
import { StudentProfile } from '../app/page';

interface ChatAdvisorProps {
  studentProfile: StudentProfile | null;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatAdvisor({ studentProfile }: ChatAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your AI Career Advisor. I've analyzed your profile and I'm here to answer any questions about your career path. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call AI-powered chat endpoint
      const response = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          studentProfile,
          conversationHistory: messages.slice(-6) // Send last 6 messages for context
        }),
      });
      
      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || generateFallbackResponse(currentInput, studentProfile),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to local response if API fails
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFallbackResponse(currentInput, studentProfile),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateFallbackResponse = (userInput: string, profile: StudentProfile | null): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('salary') || input.includes('pay')) {
      return "Based on your profile, entry-level positions typically start at $50,000-70,000, with senior roles reaching $120,000+. Your skills in technology and problem-solving position you well for higher-paying roles.";
    }
    
    if (input.includes('skill') || input.includes('learn')) {
      return `Given your current skills (${profile?.skills.join(', ') || 'your background'}), I'd recommend focusing on emerging technologies like AI/ML, cloud computing, and data analysis. These are in high demand and align with your interests.`;
    }
    
    if (input.includes('time') || input.includes('long')) {
      return "Typically, you can expect to see significant progress in 6-12 months with consistent effort. Entry-level positions are often achievable within 12-18 months, depending on your dedication to learning and building projects.";
    }
    
    if (input.includes('company') || input.includes('where')) {
      return "Great companies to target include tech giants (Google, Microsoft, Amazon), growing startups, and traditional companies undergoing digital transformation. I'd recommend starting with mid-size companies where you can have more impact and learning opportunities.";
    }
    
    return "That's a great question! Based on your profile, I'd recommend focusing on building a strong portfolio, networking with professionals in your target field, and continuously updating your skills. Would you like specific advice on any of these areas?";
  };

  const suggestedQuestions = [
    "What skills should I focus on next?",
    "How long will it take to get my first job?",
    "What companies should I target?",
    "What's the typical salary range?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center neon-glow z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] glass-dark rounded-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Career Advisor</h3>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-purple-600' 
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-200'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="space-y-1">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="block w-full text-left text-xs text-purple-300 hover:text-white transition-colors p-2 rounded hover:bg-white/5"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}