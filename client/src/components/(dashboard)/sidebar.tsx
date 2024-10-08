"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaGlobe, FaYoutube, FaFilePdf, FaTimes, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [credits, setCredits] = useState(20);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: FaHome, text: 'Dashboard', route: '/dashboard' },
    { icon: FaPencilAlt, text: 'Generate Post', route: '/dashboard/generatepost' },
    { icon: FaGlobe, text: 'Blog URL', route: '/generatefromblog' },
    { icon: FaYoutube, text: 'YouTube URL', route: '/generatefromyoutube' },
    { icon: FaFilePdf, text: 'PDF', route: '/generatefrompdf' },
  ];

  const handleMenuItemClick = (route: string) => {
    if (credits >= 2) {
      setCredits(prevCredits => prevCredits - 2);
      router.push(route);
    } else {
      alert("Not enough credits!");
    }
  };

  const sidebarVariants = {
    open: { width: '16rem', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '4rem', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const iconVariants = {
    open: { rotate: 0, transition: { duration: 0.3 } },
    closed: { rotate: 45, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-zinc-900 text-white shadow-lg rounded-r-xl overflow-hidden"
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
                <Image src="/logo-1.png" alt="Logo" width={48} height={48} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none text-teal-500"
            variants={iconVariants}
            animate={isOpen ? "open" : "closed"}
          >
            <FaTimes />
          </motion.button>
        </div>

        <div className="flex-grow">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="py-4 px-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200 rounded-xl m-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMenuItemClick(item.route)}
              >
                <div className="flex items-center space-x-4">
                  <item.icon className="text-xl text-teal-500" />
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
                <div className="border-b border-gray-700 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Credit Display */}
        <div className="p-4 border-t border-gray-700">
          <motion.div
            className={`bg-gray-800 rounded-xl p-2 text-center ${isOpen ? '' : 'w-12 h-12 flex items-center justify-center'}`}
            whileHover={{ scale: 1.05 }}
          >
            {isOpen ? (
              <span className="text-sm font-bold">Credits: {credits}</span>
            ) : (
              <span className="text-sm font-bold">{credits}</span>
            )}
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.button
          className={`mt-2 mx-4 mb-4 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200 ${isOpen ? '' : 'w-12 h-12'}`}
          onClick={() => signOut({ callbackUrl: '/' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt className={`${isOpen ? 'text-lg' : 'text-xl'}`} />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="ml-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <FaUser className="text-teal-500 text-xl" />
            )}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm"
                >
                  {session?.user?.name || "User"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;