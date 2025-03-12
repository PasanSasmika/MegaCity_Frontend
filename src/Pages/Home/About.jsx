import React from 'react';
import image from '/new.jpg'
import Footer from '../../components/Footer';
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
          <h1 className="text-4xl sm:text-5xl font-primary font-extrabold text-accent mb-6">
            Trusted Cab Services In <span className="text-primary">All Over The Country</span><span className='text-primary'>.</span>
          </h1>
          <p className=" font-secondary text-lg text-gray-600 mb-8">
          We provide reliable and comfortable cab services nationwide. Whether you're commuting to work, heading to the airport, or exploring a new city, our professional drivers ensure a safe and smooth journey. With easy booking, 
          affordable rates, and 24/7 availability, we make traveling convenient and stress-free.
          </p>

          {/* Services Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Service 1: Long Distance Trip */}
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-primary font-bold text-accent mb-2">Long Distance Trip</h2>
              <p className="text-gray-600 font-secondary">
              Enjoy a smooth and comfortable ride with our long-distance cab services. 
              Travel stress-free with experienced drivers, affordable rates, and a hassle-free booking process.</p>
            </div>

            {/* Service 2: Taxi Tour Services */}
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-primary font-bold text-accent mb-2">Taxi Tour Services</h2>
              <p className=" font-secondary text-gray-600">
              Explore the city's top attractions with our reliable taxi tour services. Enjoy a comfortable ride, 
              knowledgeable drivers, and a memorable travel experience.
              </p>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-12 bg-primary p-8 rounded-lg text-white">
            <h2 className="text-[28px] font-bold mb-4 font-primary">We Are Available 24 Hours</h2>
            <p className="text-lg mb-6 font-secondary">
              For Booking: <span className="font-bold">(+62) 8896-2220</span>
            </p>
            <p className="italic font-secondary">
              “Reliable and professional service, available anytime to take you wherever you need to go.”.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;