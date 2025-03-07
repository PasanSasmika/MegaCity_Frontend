import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';

function PreLoader() {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the preloader after 4200ms
    }, 4200);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full bg-secondery'>
      <AnimatePresence>
        {isVisible && ( // Conditionally render the preloader
          <>
            <motion.div
              className='car-container'
              initial={{ x: '-190%' }}
              animate={{ x: '190%' }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <DotLottieReact
                src="https://lottie.host/a4925d0c-2552-4a88-91af-fb161452cf0a/GkgvlLxnbm.lottie"
                loop
                autoplay
                className='w-64 object-cover h-64'
              />
            </motion.div>

            <motion.div
              className='text-container mt-8'
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden and slightly below)
              animate={{ opacity: 1, y: 0 }} // Animate to visible and centered
              exit={{ opacity: 0, y: -20 }} // Exit state (hidden and slightly above)
              transition={{
                delay: 1, // Delay for the entry animation
                duration: 1, // Duration for the entry animation
                type: 'spring', // Spring animation for entry
                stiffness: 100,
                damping: 11,
                exit: { 
                  duration: 0.5, // Faster exit animation (0.5 seconds)
                  damping: 15, // Simple tween animation for exit
                },
              }}
            >
              <h1 className='text-3xl font-secondary font-bold text-white'>
                Almost there! Getting your ride ready…
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PreLoader;