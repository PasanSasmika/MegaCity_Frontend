import React from 'react';
import { IoHeartOutline } from 'react-icons/io5'; // Using an outline icon for a lighter touch
import img from '/img2.jpg';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="flex flex-col w-full items-center pt-20 pb-16">
        <h1 className="text-primary text-[23px] mb-4 font-secondary tracking-widest uppercase">Who We Are</h1>
        <h1 className="text-6xl text-accent font-primary font-extrabold text-center leading-tight max-w-4xl">
          Crafting Excellence With Passion{' '}
          <span className="text-primary relative">
            .
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full transform scale-x-50 origin-left transition-transform duration-300 hover:scale-x-100"></span>
          </span>
        </h1>
        <p className="text-lg font-secondary text-gray-600 mt-6 max-w-2xl text-center leading-relaxed">
          We’re a dedicated team committed to delivering exceptional experiences, blending innovation with care to exceed your expectations.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex w-full items-center justify-center gap-12 px-8 pb-20 flex-wrap">
        {/* Left: Image/Illustration Placeholder */}
        <div className="w-full max-w-[500px] h-[400px] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-secondary text-lg">
            {/* Placeholder for an image */}
            <span>
                <img src={img} alt="" className='w-[500px] h-[400px] object-cover' />
            </span>
          </div>
        </div>

        {/* Right: Mission & Values */}
        <div className="max-w-lg flex flex-col gap-8">
          {/* Mission */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[24px]">
                <IoHeartOutline />
              </div>
              <h2 className="text-2xl font-primary font-bold text-accent">Our Mission</h2>
            </div>
            <p className="text-gray-600 font-secondary mt-3 leading-relaxed">
              To empower our community with unparalleled service, safety, and support, creating lasting value every day.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[24px]">
                <IoHeartOutline />
              </div>
              <h2 className="text-2xl font-primary font-bold text-accent">Our Values</h2>
            </div>
            <ul className="text-gray-600 font-secondary mt-3 space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Integrity in every action
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Passion for excellence
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Customer-first mindset
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Optional Team Quote */}
      <div className="w-full bg-primary/5 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-secondary text-gray-700 italic leading-relaxed">
            “We believe in building trust through every interaction, turning ideas into impactful realities.”
          </p>
          <p className="text-primary font-primary font-bold mt-4">— Our Team</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;