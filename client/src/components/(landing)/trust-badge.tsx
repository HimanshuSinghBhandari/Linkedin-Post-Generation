"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TrustBadge: React.FC = () => {
  const text = "Trusted by over 2,000 Developers at tier 1 institutions";

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center p-4 text-white">
      <motion.div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <span className="text-lg font-semibold text-center md:text-left">{text}</span>
        <div className="flex items-center justify-center md:justify-start space-x-2">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: Math.sin(index * 0.5) * 5 }}
              transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
            >
              <FaStar className="text-yellow-400 text-xl mx-0.5" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TrustBadge;
