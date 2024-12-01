"use client"
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf } from 'react-icons/fa';
import { extractTextFromPDF } from '../(pdf-extractor)/pdf-extract';
import { generateLinkedInThroughPDF } from '@/utils/pdf';
import LinkedInPostCard from '../(postCard)/post-card';

interface Options {
  postSize: string;
  postTone: string;
  postType: string;
  audience: string;
}

const PDFPostGenerator: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractionFocus, setExtractionFocus] = useState<string>('');
  const [options, setOptions] = useState<Options>({
    postSize: '',
    postTone: '',
    postType: '',
    audience: '',
  });
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleExtractionFocusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExtractionFocus(event.target.value);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleGeneratePost = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file');
      return;
    }

    setIsLoading(true);
    try {
      const pdfText = await extractTextFromPDF(pdfFile);
      const generatedPost = await generateLinkedInThroughPDF(pdfText, { ...options, extractionFocus });
      setGeneratedContent(generatedPost);
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedContent('An error occurred while generating the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 p-4 sm:p-8 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
      <div className="relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-zinc-100"
        >
          PDF LinkedIn Post Generator
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="space-y-2">
            <label className="block font-semibold text-zinc-300">Choose PDF File</label>
            <div className="flex items-center space-x-4">
              <FaFilePdf className="text-2xl sm:text-4xl text-teal-400" />
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-zinc-300">Extraction Focus</label>
            <input
              type="text"
              value={extractionFocus}
              onChange={handleExtractionFocusChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter what to extract from the PDF (e.g., key points, summary, statistics)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {(Object.keys(options) as Array<keyof Options>).map((option) => (
              <div key={option} className="space-y-2">
                <label className="block font-semibold text-zinc-300">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                <input
                  type="text"
                  name={option}
                  value={options[option]}
                  onChange={handleOptionChange}
                  className="w-full p-2 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Enter ${option}`}
                />
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 text-zinc-900 py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg w-full font-bold text-base sm:text-lg transition-colors hover:bg-teal-400"
            onClick={handleGeneratePost}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Post'}
          </motion.button>
        </motion.div>

        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 sm:mt-8"
          >
            <h3 className="font-semibold mb-4 text-lg sm:text-xl text-teal-400">Generated Content:</h3>
            <LinkedInPostCard
              content={generatedContent}
              profilePicture="https://picsum.photos/600/300?random=1"
              name="AI Generated Post"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PDFPostGenerator;