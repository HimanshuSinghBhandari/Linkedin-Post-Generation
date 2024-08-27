"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RainbowBorder from './color-border';
import image1 from '../../../public/img-background.png'

const DashboardImage: React.FC = () => {
  return (
    <div className="w-full py-8 md:py-16 flex justify-center items-center">
      <RainbowBorder>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-6xl aspect-video rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.5)]"
        >
          <Image
            src={image1}
            alt="Dashboard Preview"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 85vw, 80vw"
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
        </motion.div>
      </RainbowBorder>
    </div>
  );
};

export default DashboardImage;