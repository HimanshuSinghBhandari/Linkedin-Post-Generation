"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { signInWithGoogle } from "@/lib/auth-actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import image1 from "../../../public/logo-1.png";

const Signup = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-black text-white overflow-hidden">
      {/* Left side with half grid */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Half grid background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h${i}`}
                className="absolute w-full h-[10vh] border-t border-white/10"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
                style={{ top: `${i * 10}vh` }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`v${i}`}
                className="absolute h-full w-[10vw] border-l border-white/10"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
                style={{ left: `${i * 5}vw` }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center mb-12 z-10">
          <Image src={image1} alt="Linkepost Logo" width={40} height={40} className="mr-4" />
          <h1 className="text-3xl font-bold">Linkepost</h1>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 z-10">Elevate Your LinkedIn Presence</h2>
        <p className="text-lg md:text-xl mb-12 z-10">AI-powered post generation to help you connect, engage, and grow your professional network effortlessly.</p>

        <motion.button
           onClick={() => {
            signInWithGoogle();
          }}
          className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors shadow-lg z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign up with Google
        </motion.button>
      </motion.div>

      {/* Right side with blurry teal background */}
      <motion.div
  className="relative hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-16 overflow-hidden"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.div
    className="absolute inset-0 bg-teal-500 opacity-50"
    initial={{ scale: 0, borderRadius: "100%" }}
    animate={{ scale: 2, borderRadius: "0%" }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  />
  <motion.div
    className="absolute inset-0 backdrop-blur-3xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  />
  <div className="relative text-center z-10">
    <motion.h2
      className="text-4xl font-bold mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      Welcome to Linkepost
    </motion.h2>
    <motion.p
      className="text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      Join thousands of professionals who are already leveraging AI to enhance their LinkedIn presence.
    </motion.p>
  </div>
  </motion.div>
    </div>
  );
};

export default Signup;