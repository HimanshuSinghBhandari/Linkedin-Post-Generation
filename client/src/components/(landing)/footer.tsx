"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="w-full py-4 px-8 flex items-center justify-between text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Company Name */}
      <motion.div
        className="text-lg font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Linkepost
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        © 2024 Copyright reserved
      </motion.div>

      {/* Social Media Icons */}
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FaTwitter className="cursor-pointer hover:text-teal-400" />
        <FaLinkedin className="cursor-pointer hover:text-teal-400" />
        <FaYoutube className="cursor-pointer hover:text-teal-400" />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
