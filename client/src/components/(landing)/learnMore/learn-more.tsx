import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaGlobe, FaYoutube, FaPencilAlt, FaCog } from 'react-icons/fa';

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-2">
      <Icon className="text-teal-400 text-2xl mr-3" />
      <h3 className="text-xl font-semibold text-zinc-300">{title}</h3>
    </div>
    <p className="text-zinc-400 ml-9">{description}</p>
  </motion.div>
);

const LearnMore = () => {
  const features = [
    { icon: FaFileAlt, title: "PDF Generation", description: "Transform PDF documents into engaging LinkedIn posts. Our AI analyzes the content and extracts key insights to create compelling narratives." },
    { icon: FaGlobe, title: "Blog URL Conversion", description: "Turn your blog posts into LinkedIn-ready content. Simply paste the URL, and our system will generate a post that captures the essence of your article." },
    { icon: FaYoutube, title: "YouTube Insights", description: "Convert YouTube video content into text-based posts. Our AI transcribes the video, identifies key points, and crafts a post that resonates with your audience." },
    { icon: FaPencilAlt, title: "Custom Post Creation", description: "Start from scratch with our AI-powered writing assistant. Provide a topic or outline, and watch as it generates a tailored post aligned with your brand voice." },
    { icon: FaCog, title: "Advanced Customization", description: "Fine-tune every aspect of your post with our comprehensive set of options. From tone to length, ensure your content perfectly matches your communication goals." },
  ];

  const customizationOptions = [
    { option: "Post Length", description: "Choose from short-form updates to long-form articles" },
    { option: "Post Tone", description: "Set the mood from professional to casual and everything in between" },
    { option: "Post Type", description: "Select from various formats like how-to guides, listicles, or thought leadership pieces" },
    { option: "Industry Focus", description: "Tailor content to specific sectors or niches" },
    { option: "Audience Targeting", description: "Optimize for different professional demographics" },
    { option: "Content Focus", description: "Emphasize aspects like problem-solving, trends, or case studies" },
    { option: "Hashtag Suggestions", description: "Get AI-powered hashtag recommendations to boost visibility" }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Large half-circle teal effect */}
      <div className="absolute top-0 left-0 w-[150vw] h-[150vw] bg-teal-500 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      {/* Existing background effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-5xl font-bold text-center mb-8 text-zinc-400"
        >
          Discover Linkepost
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-center mb-16 text-zinc-400"
        >
          Elevate your LinkedIn presence with AI-powered post generation
        </motion.p>

        <div className="mb-16">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-6 text-zinc-300">Customization Options</h2>
          <ul className="space-y-4">
            {customizationOptions.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-teal-400 mb-2">{item.option}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-6 text-zinc-300">Ready to Transform Your LinkedIn Presence?</h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LearnMore;