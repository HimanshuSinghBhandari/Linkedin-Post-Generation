"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateThroughYoutubeUrl } from '@/utils/youtube-url-generation';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronUp } from "react-icons/fa6";
import LinkedInPostCard from '../(postCard)/post-card';
import axios from 'axios';

type PostOption = {
  label: string;
  options: string[];
};

const postOptions: PostOption[] = [
  { label: 'Post Size', options: ['Short', 'Medium', 'Long'] },
  { label: 'Post Tone', options: ['Professional', 'Casual', 'Enthusiastic', 'Informative'] },
  { label: 'Post Type', options: ['Summary', 'Analysis', 'Opinion', 'How-To'] },
  { label: 'Audience', options: ['General', 'Professionals', 'Students', 'Experts'] },
];

const YoutubeUrlPostGenerator: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [customOptions, setCustomOptions] = useState<{ [key: string]: string }>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (optionLabel: string, optionValue: string) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionLabel]: optionValue,
    }));
  };

  const handleCustomOptionChange = (optionLabel: string, optionValue: string) => {
    setCustomOptions(prevState => ({
      ...prevState,
      [optionLabel]: optionValue,
    }));
  };

  const handleGeneratePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3002/youtube-content', { url: youtubeUrl });
      const youtubeContent = response.data;
  
      const combinedContent = `Title: ${youtubeContent.title}\n\nDescription: ${youtubeContent.description}\n\nSubtitles: ${youtubeContent.subtitles}`;
  
      const finalOptions = { ...selectedOptions };
      for (const [key, value] of Object.entries(customOptions)) {
        if (value.trim() !== '') {
          finalOptions[key] = value.trim();
        }
      }
  
      const generatedPost = await generateThroughYoutubeUrl(combinedContent, finalOptions);
      setGeneratedContent(generatedPost);
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedContent('An error occurred while generating the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden">
    <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
    <div className="relative z-10">
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
          YouTube URL Post Generator
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-3"
        >
          <label className="font-semibold text-zinc-300">YouTube URL</label>
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter the YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {postOptions.map((postOption) => (
            <motion.div
              key={postOption.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 flex flex-col"
            >
              <label className="font-semibold text-zinc-300">{postOption.label}</label>
              <div className="relative flex-grow">
                <Listbox value={selectedOptions[postOption.label] || ''} onChange={(value) => handleOptionChange(postOption.label, value)}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <span className="block truncate">{selectedOptions[postOption.label] || 'Select an option'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FaChevronUp className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={React.Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {postOption.options.map((option, optionIdx) => (
                          <Listbox.Option
                            key={optionIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-teal-600 text-zinc-100' : 'text-zinc-300'
                              }`
                            }
                            value={option}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {option}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <input
                type="text"
                className="w-full p-2 mt-2 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={`Custom ${postOption.label}`}
                value={customOptions[postOption.label] || ''}
                onChange={(e) => handleCustomOptionChange(postOption.label, e.target.value)}
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
    </div>
  );
};

export default YoutubeUrlPostGenerator;