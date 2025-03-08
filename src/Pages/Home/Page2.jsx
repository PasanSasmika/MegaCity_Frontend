import React from 'react';
import { IoHeart, IoShieldCheckmark } from 'react-icons/io5';
import { MdHealthAndSafety } from 'react-icons/md';

function Page2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="flex flex-col w-full items-center pt-20 pb-12">
        <h1 className="text-primary text-[23px] mb-3 font-secondary tracking-wider">What We Offer For You</h1>
        <h1 className="text-6xl text-accent font-primary font-extrabold text-center leading-tight">
          We Offer The Best For You{' '}
          <span className="text-primary relative">
            .
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full transform scale-x-50 origin-left transition-transform duration-300 hover:scale-x-100"></span>
          </span>
        </h1>
      </div>

      {/* Cards Section */}
      <div className="flex w-full items-center justify-center gap-10 mt-24 px-6 flex-wrap">
        {/* Card 1 - Safety Service */}
        <div className="w-[390px] h-[260px] bg-white shadow-lg rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-5">
              <div className="text-[32px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white shadow-md transform hover:rotate-12 transition-transform duration-300">
                <MdHealthAndSafety />
              </div>
              <h1 className="font-primary font-[900] text-[28px] text-accent">Safety Service</h1>
            </div>
            <p className="text-lg font-secondary text-gray-600 mt-4 text-center leading-relaxed">
              We prioritize your safety with every step, ensuring peace of mind.
            </p>
            <div className="w-16 h-[2px] mt-6 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Card 2 - Top Security */}
        <div className="w-[390px] h-[260px] bg-white shadow-lg rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-5">
              <div className="text-[32px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white shadow-md transform hover:rotate-12 transition-transform duration-300">
                <IoShieldCheckmark />
              </div>
              <h1 className="font-primary font-[900] text-[28px] text-accent">Top Security</h1>
            </div>
            <p className="text-lg font-secondary text-gray-600 mt-4 text-center leading-relaxed">
              Ensuring top-notch protection with cutting-edge solutions.
            </p>
            <div className="w-16 h-[2px] mt-6 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Card 3 - Customer Care (Kept Similar Structure) */}
        <div className="w-[390px] h-[260px] bg-white shadow-lg rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-5">
              <div className="text-[32px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white shadow-md transform hover:rotate-12 transition-transform duration-300">
                <IoHeart />
              </div>
              <h1 className="font-primary font-[900] text-[28px] text-accent">Customer Care</h1>
            </div>
            <p className="text-lg font-secondary text-gray-600 mt-4 text-center leading-relaxed">
              Your satisfaction is our priority, delivered with heart.
            </p>
            <div className="w-16 h-[2px] mt-6 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;