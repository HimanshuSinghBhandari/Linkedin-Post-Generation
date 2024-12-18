"use client"
import React, {useEffect, useState} from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { FaLink, FaYoutube, FaFilePdf, FaEdit, FaChartLine, FaBell, FaCog } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from "@/components/(dashboard)/sidebar";

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-teal-900 min-h-screen text-white">
      <Sidebar/>
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl lg:text-4xl font-bold text-zinc-300 mb-4 lg:mb-0"
          >
           Welcome, {user?.user_metadata?.full_name ?? 'User'}
          </motion.h1>
          <div className="flex space-x-4">
            <FaBell className="text-2xl text-zinc-400 cursor-pointer hover:text-teal-500 transition-colors" />
            <FaCog className="text-2xl text-zinc-400 cursor-pointer hover:text-teal-500 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 bg-gray-800 bg-opacity-50 p-4 lg:p-6 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">Generate LinkedIn Posts</h2>
              <p className="text-zinc-300 mb-4 lg:mb-6 text-sm lg:text-base">Create engaging content to boost your professional presence:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 text-sm lg:text-base">
                <li>Craft compelling headlines that grab attention</li>
                <li>Share industry insights and thought leadership</li>
                <li>Showcase your achievements and milestones</li>
                <li>Engage your network with interactive polls and questions</li>
              </ul>
              <button className="mt-4 lg:mt-6 bg-teal-500 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-teal-600 transition-colors text-sm lg:text-base">
                Start Creating
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-800 bg-opacity-50 p-4 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-2">Engagement Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#14B8A6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-zinc-300"
        >
          Choose Your Post Type
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
        >
          {[
            { icon: FaLink, title: "Post URL", description: "Share a link to an article, blog post, or website" },
            { icon: FaYoutube, title: "YouTube URL", description: "Share a video from YouTube" },
            { icon: FaFilePdf, title: "PDF", description: "Share a PDF document" },
            { icon: FaEdit, title: "Normal Post", description: "Create a text-only post" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 bg-opacity-50 p-4 lg:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:bg-opacity-70 backdrop-filter backdrop-blur-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
              <div className="relative z-10">
                <item.icon className="text-2xl lg:text-4xl mb-2 lg:mb-4 text-teal-400" />
                <h3 className="text-lg lg:text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm lg:text-base">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 lg:mt-12 bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-zinc-100">Have an idea in mind?</h2>
            <p className="text-base lg:text-xl mb-4 lg:mb-6 text-zinc-300">Create perfect LinkedIn posts fast with AI. Boost your professional presence effortlessly.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-500 text-white px-6 lg:px-8 py-2 lg:py-3 rounded-full text-base lg:text-lg font-semibold hover:bg-teal-600 transition-colors"
              style={{ boxShadow: '0 4px 14px 0 rgba(20, 184, 166, 0.39)' }}
            >
              Use AI Now
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 lg:mt-12 bg-gray-800 bg-opacity-50 p-4 lg:p-6 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-teal-500 opacity-10 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Recent Performance</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="value" fill="#14B8A6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;