"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaBars, FaPencilAlt, FaGlobe, FaYoutube, FaFilePdf, FaTimes, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [credits, setCredits] = useState(20);
  const router = useRouter();
  const { data: session } = useSession();

  // Check screen size and set mobile state
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768);
      // If switching from mobile to desktop, ensure sidebar is open
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    // Check initial screen size
    checkMobileView();

    // Add event listener for resize
    window.addEventListener('resize', checkMobileView);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

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
      
      // On mobile, close sidebar after navigation
      if (isMobile) {
        setIsOpen(false);
      }
    } else {
      alert("Not enough credits!");
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle - Only visible on mobile */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`
          fixed top-0 left-0 h-full bg-zinc-900 text-white shadow-lg 
          transform transition-transform duration-300 ease-in-out z-50
          w-64 
          ${(isMobile && !isOpen) ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Mobile Close Button */}
          <div className="flex justify-between items-center p-4">
            <motion.div>
              <Image src="/logo-1.png" alt="Logo" width={48} height={48} />
            </motion.div>
            
            {/* Close button only on mobile */}
            {isMobile && (
              <motion.button
                onClick={toggleSidebar}
                className="text-2xl focus:outline-none text-teal-500"
              >
                <FaTimes />
              </motion.button>
            )}
          </div>

          {/* Menu Items */}
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
                    {(isMobile ? isOpen : true) && (
                      <span>{item.text}</span>
                    )}
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
              className={`bg-gray-800 rounded-xl p-2 text-center ${(isMobile ? isOpen : true) ? '' : 'w-12 h-12 flex items-center justify-center'}`}
              whileHover={{ scale: 1.05 }}
            >
              {(isMobile ? isOpen : true) ? (
                <span className="text-sm font-bold">Credits: {credits}</span>
              ) : (
                <span className="text-sm font-bold">{credits}</span>
              )}
            </motion.div>
          </div>

          {/* Logout Button */}
          <motion.button
            className={`mt-2 mx-4 mb-4 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200 ${(isMobile ? isOpen : true) ? '' : 'w-12 h-12'}`}
            onClick={() => signOut({ callbackUrl: '/' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className={`${(isMobile ? isOpen : true) ? 'text-lg' : 'text-xl'}`} />
            {(isMobile ? isOpen : true) && (
              <span className="ml-2">Logout</span>
            )}
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
              {(isMobile ? isOpen : true) && (
                <span className="text-sm">
                  {session?.user?.name || "User"}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;