"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateLinkedInPost } from '@/utils/linkedin-generation';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronUp } from "react-icons/fa6";
import LinkedInPostCard from '../(postCard)/post-card';

type PostOption = {
  label: string;
  options: string[];
};

const postOptions: PostOption[] = [
  { label: 'Post Length', options: ['Short Post', 'Medium Post', 'Long Post'] },
  { label: 'Post Tone', options: ['Professional', 'Casual', 'Enthusiastic', 'Inspirational'] },
  { label: 'Post Type', options: ['Informative', 'Promotional', 'Personal Story', 'Motivational', 'Announcement', 'Question/Discussion Starter'] },
  { label: 'Industry/Category', options: ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Human Resources', 'Entrepreneurship'] },
  { label: 'Audience Targeting', options: ['General Audience', 'Colleagues/Peers', 'Potential Clients', 'Industry Experts', 'Job Seekers'] },
  { label: 'Content Focus', options: ['Latest Trends', 'Tips and Tricks', 'Success Stories', 'Case Studies', 'Personal Experience', 'Product/Service Highlight', 'Company News'] },
  { label: 'Call to Action (CTA)', options: ['Visit Website', 'Contact Us', 'Share Your Thoughts', 'Download Resource', 'Sign Up', 'Join Event'] },
  { label: 'Hashtag Suggestions', options: ['Auto-generate Hashtags', 'User-defined Hashtags'] },
  { label: 'Engagement Style', options: ['Encourage Comments', 'Ask for Likes', 'Ask for Shares'] }
];

const LinkedPostGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [customInputs, setCustomInputs] = useState<{ [key: string]: string }>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (optionLabel: string, optionValue: string) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionLabel]: optionValue,
    }));
  };

  const handleCustomInputChange = (optionLabel: string, value: string) => {
    setCustomInputs(prevState => ({
      ...prevState,
      [optionLabel]: value,
    }));
  };

  const handleGeneratePost = async () => {
    setIsLoading(true);
    try {
      const options = { ...selectedOptions };
      for (const [key, value] of Object.entries(customInputs)) {
        if (value) options[key] = value;
      }
      const generatedPost = await generateLinkedInPost(userInput, options);
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
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-zinc-100"
        >
          LinkedIn Post Generator
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postOptions.map((postOption) => (
              <motion.div
                key={postOption.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <label className="font-semibold text-zinc-300">{postOption.label}</label>
                <div className="relative">
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
                  <input
                    type="text"
                    placeholder="Custom input"
                    value={customInputs[postOption.label] || ''}
                    onChange={(e) => handleCustomInputChange(postOption.label, e.target.value)}
                    className="mt-2 w-full py-2 px-3 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-3"
          >
            <label className="font-semibold text-zinc-300">Post Content</label>
            <textarea
              className="w-full p-4 rounded-lg bg-gray-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="What kind of post do you want to generate?"
              rows={4}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 text-zinc-900 py-3 px-6 rounded-full shadow-lg w-full font-bold text-lg transition-colors hover:bg-teal-400"
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
            className="mt-8"
          >
            <h3 className="font-semibold mb-4 text-xl text-teal-400">Generated Content:</h3>
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

export default LinkedPostGenerator;