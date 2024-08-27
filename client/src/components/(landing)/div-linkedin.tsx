"use client"

import React from 'react';
import { motion } from 'framer-motion';

const LinkedInCard: React.FC<{ content: string }> = ({ content }) => (
  <div className="bg-gray-200 shadow-lg rounded-lg p-4 w-64 h-48 absolute border border-gray-200">
    <div className="flex items-center mb-2">
      <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
      <div>
        <div className="text-sm text-gray-800 font-semibold">John Doe</div>
        <div className="text-xs text-gray-500">Software Engineer • 1d</div>
      </div>
    </div>
    <div className="text-sm text-gray-700">{content}</div>
    <div className="mt-4 flex justify-between text-gray-500 text-xs">
      <span>❤️ 42</span>
      <span>💬  5 comments</span>
    </div>
  </div>
);

const TextBox: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-4 mb-4 text-white text-sm">
    {text}
  </div>
);

const Linkeddiv: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-4/5 h-4/5 bg-black bg-opacity-80 rounded-xl overflow-hidden shadow-2xl relative backdrop-blur-sm border border-gray-800">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-teal-500 bg-opacity-20 rounded-l-full"></div>
          
          <div className="relative z-10 flex h-full">
            <div className="w-2/3 p-12 flex flex-col justify-center">
              <motion.h1 
                className="text-5xl font-bold mb-8 text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Create Your LinkedIn Post with Us
              </motion.h1>
              
              <div className="relative h-64">
                <motion.div
                  initial={{ rotate: -5, x: 0, y: 0 }}
                  animate={{ rotate: 5, x: 20, y: 20 }}
                  transition={{ duration: 2 }}
                >
                  <LinkedInCard content="Excited to announce our new product launch! #Innovation" />
                </motion.div>
                
                <motion.div
                  initial={{ rotate: 5, x: 40, y: 40 }}
                  animate={{ rotate: -5, x: 60, y: 60 }}
                  transition={{ duration: 2 }}
                >
                  <LinkedInCard content="Just completed an amazing workshop on AI. The future is here! #AIRevolution" />
                </motion.div>
              </div>
            </div>
            
            <div className="w-1/3 flex flex-col justify-center items-center">
              <TextBox text="Generate post with blog URL" />
              <TextBox text="Generate post with YouTube URL" />
              <TextBox text="Generate post with PDF" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linkeddiv;