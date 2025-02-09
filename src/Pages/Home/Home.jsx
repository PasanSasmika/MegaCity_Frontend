import React from 'react'
import videoPath from '/taxi.mp4'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
    {/* Background Video */}
    <video
      src={videoPath} // Replace `videoPath` with the actual path to your video
      autoPlay
      loop
      muted
      className="w-full h-full object-cover"
    ></video>

    {/* Overlay for Transparency */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/95 via-transparent to-black/95 z-10">
      <div className="flex flex-col justify-center items-center h-full space-y-4 text-center z-20">
        {/* Main Heading */}
        <div className='w-[900px] mt-16 h-[330px] flex flex-col justify-center items-center rounded-lg bg-[#0b0505ea]'>
        <h1 className="text-white text-5xl md:text-6xl font-main font-bold leading-tight px-4 sm:px-12">
        Enjoy your comfortable trip <span className='text-primary'>.</span>
        </h1>
        <p className="text-white  font-secondery text-xl mt-9">
          Enjoy Your Comfortable Trip with Our Reliable Service
        </p>
       
        <div>
         <Link><button className="bg-secondary border-2 border-primary mt-9  text-white py-3 px-6 rounded-full text-[16x]">
            Book a Ride
          </button></Link> 
        </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Home