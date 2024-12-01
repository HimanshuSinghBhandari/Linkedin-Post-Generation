"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import image1 from "../../../public/pdf.png";

const Button: React.FC<{ text: string; primary?: boolean; onClick?: () => void }> = ({ text, primary = false, onClick }) => (
    <motion.button
        className={`px-6 py-2 rounded-full text-sm font-semibold ${
            primary ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'
        } shadow-md`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
    >
        {text}
    </motion.button>
);

const LinkedLaunchingSoon: React.FC = () => {
    const router = useRouter();
    const handleSignup = () => {
        router.push('/signup');
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-6xl h-auto md:h-4/5 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
                {/* Teal half-circle with blur effect - hidden on mobile */}
                <div className="hidden md:block absolute top-1/2 left-0 w-1/2 h-full bg-teal-500 rounded-r-full opacity-20 blur-3xl transform -translate-y-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row w-full">
                    {/* Left side content - full width on mobile, half width on desktop */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center text-center md:text-left">
                        <motion.h2
                            className="text-teal-400 text-xl md:text-2xl font-bold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Launching Soon
                        </motion.h2>
                        <motion.h1
                            className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Your go-to tool for LinkedIn post generation
                        </motion.h1>
                        <motion.p
                            className="text-gray-300 mb-8 text-sm md:text-base"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Create engaging and professional LinkedIn posts effortlessly. 
                            Stand out from the crowd and boost your online presence.
                        </motion.p>
                        <motion.div
                            className="flex justify-center md:justify-start space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button text="Sign Up" primary onClick={handleSignup} />
                            <Button text="Join Waitlist" />
                        </motion.div>
                    </div>
                    
                    {/* Right side content - full width on mobile, half width on desktop */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
                        <Image
                            src={image1}
                            alt="PDF Icon"
                            className="w-full max-h-64 md:max-h-full object-contain rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedLaunchingSoon;