import React from 'react';
import videoPath from '/img.jpg'; // Ensure this path is correct in your project
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background Video */}
      <img
        src={videoPath}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover transform scale-105" 
      />

      {/* Overlay with Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/90 via-black/50 to-black/90 z-10">
        <div className="flex flex-col justify-center items-center h-full text-center z-20 px-4">
          {/* Content Container */}
          <div className="w-full max-w-[900px] mt-16 bg-[#0b0505ea] rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col justify-center items-center transform transition-all duration-700 ease-out animate-fadeIn">
            {/* Main Heading */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-primary font-extrabold tracking-wider leading-tight">
              Enjoy Your Comfortable Trip{' '}
              <span className="text-primary relative">
                .
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-white font-secondary text-lg md:text-[22px] mt-6 max-w-lg leading-relaxed opacity-90">
              Experience a seamless journey with our reliable, top-tier service.
            </p>

            {/* Call to Action Button */}
            <div className="mt-10">
              <Link to="/ride">
                <button className=" border-2 border-primary text-white font-secondary py-3 px-8 rounded-full text-lg md:text-xl shadow-lg hover:bg-transparent hover:text-primary hover:border-secondery transition-all duration-300">
                  Book a Ride
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;