"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <motion.div
    className="bg-white backdrop-blur-md bg-opacity-80 border-2 border-teal-300 rounded-xl p-6 shadow-lg relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
  >
    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-teal-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-teal-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const FeatureShowcase: React.FC = () => {
  const features: FeatureCardProps[] = [
    { icon: "🚀", title: "Lightning Fast", description: "Experience blazing speeds with our optimized algorithms." },
    { icon: "🔒", title: "Secure", description: "Bank-level encryption keeps your data safe and private." },
    { icon: "🔍", title: "Smart Search", description: "Find exactly what you need with our AI-powered search." },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-6xl w-full relative">
        <div className="absolute inset-0 bg-teal-700 opacity-12 blur-3xl rounded-full" />
        <motion.h1
          className="text-5xl font-bold text-zinc-300 mb-12 text-center relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our Amazing Features
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;