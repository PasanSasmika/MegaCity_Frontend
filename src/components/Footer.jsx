import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import logo from '/Group 2.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Animation variants for the car
  const carAnimation = {
    animate: {
      x: ['-50%', '50%'], // Move from left edge to right edge of the footer
      transition: {
        x: {
          repeat: Infinity, // Loop infinitely
          repeatType: 'loop', // Loop back to the start
          duration: 5, // Duration of one left-to-right cycle (adjust for speed)
          ease: 'linear', // Smooth, constant speed
        },
      },
    },
  };

  return (
    <footer className="bg-secondery text-white p-12 rounded-xl border border-green-500 shadow-lg relative">
    {/* Top section */}
    <div className="mb-8">
      {/* Logo/Initials */}
      <div className="mb-6 flex justify-center md:justify-start">
        <img
          src={logo}
          alt="Logo"
          className="w-40 h-40 md:w-48 md:h-48 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Left part: navigation columns */}
        <div className="flex flex-col md:flex-row md:space-x-16 mb-10 md:mb-0">
          {/* Column 1: Websites */}
          <div className='font-secondary text-xl'>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2: Academy */}
          <div className='font-secondary text-xl'>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  Become a driver
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3: FAQs */}
          <div className='font-secondary text-xl'>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  Book a Ride
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-green-400 transition-colors duration-200">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Right part: call-to-action */}
        <div className="text-center md:text-right">
          <p className="text-xl mb-4 font-secondary text-gray-300 tracking-wider">Got a destination in mind?</p>
          <h2 className="text-9xl md:text-8xl font-secondary font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary animate-pulse">
            Pick, Ride, Smile!
          </h2>
        </div>
      </div>
    </div>
  
    {/* Middle section: Animated car */}
    {/* Middle section: Animated car */}
<div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
  <motion.div
    variants={carAnimation}
    animate="animate"
    className="w-full"
    style={{ transformOrigin: 'center', zIndex: 0, pointerEvents: 'none' }}
  >
    <div className="flex justify-center" style={{ pointerEvents: 'none' }}>
      <DotLottieReact
        src="https://lottie.host/a4925d0c-2552-4a88-91af-fb161452cf0a/GkgvlLxnbm.lottie"
        loop
        autoplay
        className="w-64 h-64 object-contain"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  </motion.div>
</div>
  
    {/* Horizontal line */}
    <hr className="border-t border-gray-400 opacity-50 mb-10" />
  
    {/* Bottom section */}
    <div className="flex flex-col md:flex-row md:justify-between items-center" style={{ zIndex: 2 }}>
      {/* Legal links */}
      <div className="mb-6 md:mb-0">
        <a
          href="https://cookieman.com.au"
          className="mr-4 text-gray-300 hover:text-green-400 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookies Policy
        </a>
        <span className="mx-2 text-gray-400">|</span>
        <Link to="/bookform">
          <a href="#" className="mr-4 text-gray-300 hover:text-green-400 transition-colors duration-200">
            Legal Terms
          </a>
        </Link>
        <span className="mx-2 text-gray-400">|</span>
        <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
          Privacy Policy
        </a>
      </div>
      {/* Branding and social media */}
      <div className="flex items-center">
        <span className="mr-6 text-sm text-gray-300 font-secondary">© 2025 Mega CIty. · All Right Reserved. </span>
        {/* Social media icons */}
        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-green-400 hover:scale-110 transition-all duration-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-green-400 hover:scale-110 transition-all duration-200">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-green-400 hover:scale-110 transition-all duration-200">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-green-400 hover:scale-110 transition-all duration-200">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;