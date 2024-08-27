"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { SlideNavTabs } from './navbar';
import LinkPostBeam from './link-post-beam';
const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[10vh] border-t border-white/5"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            style={{ top: `${i * 10}vh` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-[10vw] border-l border-white/5"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            style={{ left: `${i * 10}vw` }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full">
        <SlideNavTabs />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-zinc-400 px-4">
        <LinkPostBeam/>
        <motion.h1
          className="text-5xl md:text-[90px] font-bold mb-4 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Linkepost
        </motion.h1>
        
        <motion.p
          className="text-lg mb-12 text-center max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
           Your place for generating LinkedIn posts easily , Craft engaging content, boost your professional presence, and connect with your network effortlessly.
        </motion.p>
        
        <motion.div
          className="flex space-x-4 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
            Learn More
          </button>
        </motion.div>

      </div>

       
    </div>
  );
};

export default HeroSection;