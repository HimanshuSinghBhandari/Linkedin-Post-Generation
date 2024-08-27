// components/RainbowBorder.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface RainbowBorderProps {
  children: React.ReactNode;
}

const RainbowBorder: React.FC<RainbowBorderProps> = ({ children }) => {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-transparent via-teal-500 to-transparent"
          animate={{
            backgroundPosition: [
              '0% 50%', '100% 50%', 
              '100% 100%', '0% 100%', 
              '0% 50%'
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <div className="relative z-10 m-[3px] rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default RainbowBorder;
