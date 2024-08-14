import React from 'react';
import { motion } from 'framer-motion';

const LinkPostBeam: React.FC = () => {
  return (
    <div className="relative mb-8 ">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent transform -translate-x-1/2 rotate-12"></div>
      </motion.div>
      <motion.div
        className="relative z-10 text-sm md:text-md font-bold text-white text-center py-1 px-2  border-2 border-white/20 rounded-2xl backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Introducing LinkPost
      </motion.div>
    </div>
  );
};

export default LinkPostBeam;