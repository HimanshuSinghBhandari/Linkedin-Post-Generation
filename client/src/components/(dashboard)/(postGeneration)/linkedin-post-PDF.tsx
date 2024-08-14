"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { extractTextFromPDF } from '../(pdf-extractor)/pdf-extract';
import { generateLinkedInThroughPDF } from '@/utils/pdf';
import LinkedInPostCard from '../(postCard)/post-card';

const PDFPostGenerator: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractionFocus, setExtractionFocus] = useState('');
  const [options, setOptions] = useState({
    postSize: '',
    postTone: '',
    postType: '',
    audience: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleExtractionFocusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtractionFocus(event.target.value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="min-h-screen bg-zinc-900 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-extrabold mb-8 text-center text-zinc-100"
        >
          PDF LinkedIn Post Generator
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4"
        >
          <label className="block font-semibold text-zinc-300">Choose PDF File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-2 rounded-lg bg-zinc-800 text-zinc-100"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-2"
        >
          <label className="block font-semibold text-zinc-300">Extraction Focus</label>
          <input
            type="text"
            value={extractionFocus}
            onChange={handleExtractionFocusChange}
            className="w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter what to extract from the PDF (e.g., key points, summary, statistics)"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(options).map((option) => (
            <motion.div
              key={option}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <label className="block font-semibold text-zinc-300">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
              <input
                type="text"
                name={option}
                value={options[option as keyof typeof options]}
                onChange={handleOptionChange}
                className="w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={`Enter ${option}`}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-500 text-zinc-900 py-3 px-6 rounded-full shadow-lg w-full font-bold text-lg transition-colors hover:bg-teal-400"
          onClick={handleGeneratePost}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Post'}
        </motion.button>

        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h2 className="font-semibold mb-4 text-xl text-teal-400">Generated Content:</h2>
            <LinkedInPostCard
              content={generatedContent}
              profilePicture="https://picsum.photos/600/300?random=1" // Replace with an actual profile picture
              name="AI Generated Post"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PDFPostGenerator;