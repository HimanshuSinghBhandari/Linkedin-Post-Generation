"use client"
import React from 'react';
import { motion } from 'framer-motion';

const LinkedInCard: React.FC<{ content: string }> = ({ content }) => (
  <div className="bg-gray-200 shadow-lg rounded-lg p-4 w-48 md:w-64 h-auto md:h-48 absolute border border-gray-200">
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 mr-2"></div>
      <div>
        <div className="text-xs md:text-sm text-gray-800 font-semibold">John Doe</div>
        <div className="text-[10px] md:text-xs text-gray-500">Software Engineer • 1d</div>
      </div>
    </div>
    <div className="text-xs md:text-sm text-gray-700">{content}</div>
    <div className="mt-2 md:mt-4 flex justify-between text-gray-500 text-[10px] md:text-xs">
      <span>❤️ 42</span>
      <span>💬  5 comments</span>
    </div>
  </div>
);

const TextBox: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3 md:p-4 mb-3 md:mb-4 text-white text-xs md:text-sm text-center md:text-left">
    {text}
  </div>
);

const Linkeddiv: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-0 overflow-hidden">
      <div className="w-full md:w-4/5 h-auto md:h-4/5 bg-black bg-opacity-80 rounded-xl overflow-hidden shadow-2xl relative backdrop-blur-sm border border-gray-800">
        {/* Half-circle now visible on mobile, positioned above content */}
        <div className="block md:hidden absolute top-0 right-0 w-1/2 h-1/2 bg-teal-500 bg-opacity-20 rounded-bl-full"></div>
        <div className="block md:hidden absolute top-0 left-0 w-1/2 h-1/2 bg-teal-500 bg-opacity-20 rounded-br-full"></div>
        
        {/* Desktop half-circle remains the same */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-teal-500 bg-opacity-20 rounded-l-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row h-full">
          {/* Left side content */}
          <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-center text-center md:text-left space-y-6 md:space-y-0">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Create Your LinkedIn Post with Us
            </motion.h1>
            
            <div className="relative h-40 md:h-64 flex justify-center md:block">
              <motion.div
                className="absolute top-0 left-1/4 md:left-0"
                initial={{ rotate: -5, x: 0, y: 0 }}
                animate={{ rotate: 5, x: 20, y: 20 }}
                transition={{ duration: 2 }}
              >
                <LinkedInCard content="Excited to announce our new product launch! #Innovation" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/4 left-1/2 md:left-0"
                initial={{ rotate: 5, x: 40, y: 40 }}
                animate={{ rotate: -5, x: 60, y: 60 }}
                transition={{ duration: 2 }}
              >
                <LinkedInCard content="Just completed an amazing workshop on AI. The future is here! #AIRevolution" />
              </motion.div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="w-full md:w-1/3 p-6 md:p-0 flex flex-col justify-center items-center space-y-4 md:space-y-0">
            <TextBox text="Generate post with blog URL" />
            <TextBox text="Generate post with YouTube URL" />
            <TextBox text="Generate post with PDF" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linkeddiv;