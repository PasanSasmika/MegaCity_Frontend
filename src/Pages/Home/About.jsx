import React from 'react';
import image from '/new.jpg'
function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-8 lg:px-16">
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Image or Graphic */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}// Replace with your image URL
            alt="About Taxico"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Trusted Cab Services In <span className="text-primary">All Over The Country</span><span className='text-primary'>.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum socis natoque penatibus.
          </p>

          {/* Services Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Service 1: Long Distance Trip */}
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Long Distance Trip</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consect adipiscing elit, sed doreeop elusmod tempor incididunt labore etect dolore.
              </p>
            </div>

            {/* Service 2: Taxi Tour Services */}
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Taxi Tour Services</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consect adipiscing elit, sed doreeop elusmod tempor incididunt labore etect dolore.
              </p>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-12 bg-primary p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">We Are Available 24 Hours</h2>
            <p className="text-lg mb-6">
              For Booking: <span className="font-bold">(+62) 8896-2220</span>
            </p>
            <p className="italic">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore”.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;