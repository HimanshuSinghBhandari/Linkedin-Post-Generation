"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaPencilAlt, FaGlobe, FaYoutube, FaFilePdf, FaBars, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: FaHome, text:'Dashboard', route: '/dashboard'},
    { icon: FaPencilAlt, text: 'Generate Post', route: '/generatepost' },
    { icon: FaGlobe, text: 'Generate from Blog URL', route: '/generatefromblog' },
    { icon: FaYoutube, text: 'Generate from YouTube URL', route: '/generatefromyoutube' },
    { icon: FaFilePdf, text: 'Generate from PDF', route: '/generatefrompdf' },
  ];

  const sidebarVariants = {
    open: { width: '16rem', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '4rem', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const iconVariants = {
    open: { rotate: 0, transition: { duration: 0.3 } },
    closed: { rotate: 180, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-zinc-800 text-zinc-100 shadow-lg"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBuilding className="text-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
            variants={iconVariants}
            animate={isOpen ? "open" : "closed"}
          >
            <FaBars />
          </motion.button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="py-4 px-4 cursor-pointer hover:bg-teal-400 transition-colors duration-200"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(item.route)}
              >
                <div className="flex items-center space-x-4">
                  <item.icon className="text-xl" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              {index < menuItems.length - 1 && (
                <div className="border-b border-teal-700 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
