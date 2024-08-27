"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import image1 from "../../../public/pdf.png";
import image2 from "../../../public/blog.png";
import image3 from "../../../public/youtube.png";
import image4 from "../../../public/img-background.png";

const images = [image1, image2, image3, image4];

const options = [
  { title: 'Generate LinkedIn post from PDF', items: ['Quick creation', 'AI-powered content', 'Customizable output'] },
  { title: 'Generate LinkedIn post from Blog URL', items: ['Automatic summarization', 'Key points extraction', 'SEO-friendly content'] },
  { title: 'Generate LinkedIn post from YouTube URL', items: ['Video content to text', 'Highlight key moments', 'Engage video audience'] },
  { title: 'Generate LinkedIn post from Prompts', items: ['Document summarization', 'Extract main ideas', 'Professional formatting'] },
];

const LinkPostFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-black bg-opacity-80">
      <motion.h2 
        className="text-4xl font-bold text-center mb-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What you can use LinkPost For
      </motion.h2>
      <motion.p 
        className="text-center text-zinc-500 mb-10 text-xl" 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Extract from research and create engaging content
      </motion.p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />

        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {options.map((option, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBoxClick(index)}
            >
              <div className="h-64 relative">
                <Image
                  src={images[index]}
                  alt={option.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
              </div>
              <div className="p-6 bg-black bg-opacity-70">
                <motion.div 
                  className="flex items-center justify-between"
                  initial={false}
                  animate={{ backgroundColor: activeIndex === index ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-white">{option.title}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-white text-xl" />
                  </motion.div>
                </motion.div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2"
                    >
                      {option.items.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex}
                          className="flex items-center text-white"
                          initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkPostFeatures;