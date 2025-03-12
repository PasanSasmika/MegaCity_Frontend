import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Error() {
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Animation Container */}
      <div className="w-[2000px] max-w-md mb-8">
        <DotLottieReact
          src="https://lottie.host/828689a7-8fd0-4300-b535-16fa9d9deaeb/dcqoQvq7BM.lottie"
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>

      {/* Text Content */}
      <div className="text-center space-y-4">
        <h1 className="font-secondary text-4xl md:text-5xl font-bold text-gray-800">
          404 - Taxi Took a Wrong Turn!
        </h1>
        <p className="font-secondary text-lg md:text-xl text-gray-600 max-w-lg">
          Oops! Looks like our driver got lost in the digital highway. Don't worry, we'll get you back on track!
        </p>
        
        {/* Home Button */}
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-secondary rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Take Me Home
        </a>
      </div>

      {/* Optional Decorative Element */}
    </div>
  );
}

export default Error;