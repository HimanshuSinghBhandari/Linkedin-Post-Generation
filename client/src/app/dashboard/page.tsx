"use client"

import React from "react";
import Sidebar from "@/components/(dashboard)/sidebar";
import { motion } from "framer-motion";
import { FaLink, FaYoutube, FaFilePdf, FaEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100">
      <Sidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        <div className="p-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6 text-teal-400"
          >
            Welcome to LinkPost Dashboard, {session?.user?.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-10 text-zinc-300"
          >
            Generate high-quality LinkedIn posts to drive engagement and grow your professional network.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold mb-6 text-teal-400"
          >
            Choose Your Post Type
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6 mb-10"
          >
            {[
              { icon: FaLink, title: "Post URL", description: "Share a link to an article, blog post, or website" },
              { icon: FaYoutube, title: "YouTube URL", description: "Share a video from YouTube" },
              { icon: FaFilePdf, title: "PDF", description: "Share a PDF document" },
              { icon: FaEdit, title: "Normal Post", description: "Create a text-only post" },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="flex items-center space-x-4 bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
              >
                <item.icon className="text-teal-400 text-2xl" />
                <div>
                  <h3 className="font-semibold text-lg text-zinc-100">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;