"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import image1 from "../../../public/pdf.png";
import image2 from "../../../public/blog.png";
import image3 from "../../../public/youtube.png";
import image4 from "../../../public/img-background.png";

// Use the imported images
const images = [image1, image2, image3, image4];

const options = [
  { title: 'Generate LinkedIn post from prompts', items: ['Quick creation', 'AI-powered content', 'Customizable output'] },
  { title: 'Generate LinkedIn post from Blog URL', items: ['Automatic summarization', 'Key points extraction', 'SEO-friendly content'] },
  { title: 'Generate LinkedIn post from YouTube URL', items: ['Video content to text', 'Highlight key moments', 'Engage video audience'] },
  { title: 'Generate LinkedIn post from PDF', items: ['Document summarization', 'Extract main ideas', 'Professional formatting'] },
];

const LinkPostFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h2 
        className="text-3xl font-bold text-center mb-4 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What you can use LinkPost For
      </motion.h2>
      <motion.p 
        className="text-center text-zinc-500 mb-6" 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Extract from research and create engaging content
      </motion.p>

      <div className="relative h-96"> {/* Increased height for boxes */}
        {/* Horizontal line with gradient effect */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        {/* Vertical line with increased height */}
        <div className={`absolute top-0 left-1/2 w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent ${activeIndex !== null ? 'h-full' : 'h-1/2'}`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full"> {/* Increased gap */}
          {options.map((option, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden flex flex-col justify-end h-full cursor-pointer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBoxClick(index)}
            >
              <div className="absolute inset-0">
                <Image
                  src={images[index]}
                  alt={option.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
              </div>
              {activeIndex === index ? (
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.h3 
                    className="text-xl font-semibold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {option.title}
                  </motion.h3>
                  <ul>
                    {option.items.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex}
                        className="flex items-center mb-2 text-white"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 + 0.3 }}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" /> {/* Small circle instead of tick */}
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex items-center mt-4 text-white">
                    <span className="mr-2">Show More</span>
                    <FaArrowRight />
                  </div>
                </div>
              ) : (
                <motion.h3 
                  className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white opacity-0"
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5 }}
                >
                  {option.title}
                </motion.h3>
              )}
              {activeIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
                  <p className="text-white text-lg">Additional content for {option.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkPostFeatures;
