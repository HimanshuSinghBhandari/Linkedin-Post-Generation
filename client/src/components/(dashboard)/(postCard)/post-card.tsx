import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaEllipsisH, FaCopy } from 'react-icons/fa';

interface LinkedInPostCardProps {
  content: string;
  profilePicture: string;
  name: string;
}

const LinkedInPostCard: React.FC<LinkedInPostCardProps> = ({ content, profilePicture, name }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatContent = (text: string) => {
    // Replace **text** with <strong> tags
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace • with a styled bullet point
    formattedText = formattedText.replace(/•/g, '<span class="bullet-point">•</span>');
    
    // Split the text into paragraphs
    const paragraphs = formattedText.split('\n');
    
    // Join paragraphs with <p> tags
    return paragraphs.map(p => `<p>${p}</p>`).join('');
  };

  const truncatedContent = content.split('\n').slice(0, 3).join('\n');
  const showSeeMore = content.split('\n').length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={profilePicture} alt={name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">LinkedIn Member</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-blue-500"
          >
            <FaStar />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500"
          >
            <FaEllipsisH />
          </motion.button>
        </div>
      </div>
      <div className="mb-4">
        <div
          dangerouslySetInnerHTML={{
            __html: formatContent(expanded ? content : truncatedContent)
          }}
          className="text-gray-700 whitespace-pre-wrap"
        />
        {showSeeMore && !expanded && (
          <button
            onClick={toggleExpanded}
            className="text-blue-500 hover:underline mt-2"
          >
            ...See more
          </button>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
      >
        <FaCopy />
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </motion.button>
    </motion.div>
  );
};

export default LinkedInPostCard;