import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

function Error() {
  return (
    <div className="w-full h-screen bg-secondery flex flex-col items-center justify-center p-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          type: 'spring',
          stiffness: 120,
          damping: 8
        }}
      >
        <h1 className="text-6xl font-secondary md:text-8xl font-bold text-white mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Oops! You Missed the Turn!
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ 
          scale: 1.1,
          rotate: 0,
          transition: {
            type: 'spring',
            stiffness: 150,
            damping: 8,
            delay: 0.3
          }
        }}
        whileHover={{ scale: 1.2 }}
        className="mb-12"
      >
        <DotLottieReact
          src="https://lottie.host/c9759a4b-9118-43ae-9b68-2e2a511147c9/tsLxu81IT5.lottie"
          loop
          autoplay
          className="w-96 h-"
        />
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          transition: { 
            delay: 0.7,
            type: 'spring',
            stiffness: 100
          } 
        }}
      >
        <p className="text-white text-2xl font-secondary animate-pulse">
          Redirecting you back to the racetrack...
        </p>
      </motion.div>
    </div>
  );
}

export default Error;