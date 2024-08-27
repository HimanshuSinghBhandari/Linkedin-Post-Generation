"use client"

import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <motion.div
    className="bg-gray-200 border-4 border-teal-600 rounded-xl p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeatureShowcase: React.FC = () => {
  const features = [
    { icon: "🚀", title: "Lightning Fast", description: "Experience blazing speeds with our optimized algorithms." },
    { icon: "🔒", title: "Secure", description: "Bank-level encryption keeps your data safe and private." },
    { icon: "🔍", title: "Smart Search", description: "Find exactly what you need with our AI-powered search." },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.h1
          className="text-5xl font-bold text-zinc-500 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our Amazing Features
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureShowcase;