import React from 'react'
import {  IoHeart, IoShieldCheckmark} from 'react-icons/io5'
import { MdHealthAndSafety } from 'react-icons/md'


function Page2() {
  return (
    <div className='min-h-screen bg-white'>
    <div className='flex flex-col w-full items-center pt-20'>
      <h1 className="text-primary text-xl font-main">What we offer for you</h1>
      <h1 className='text-6xl font-main font-bold leading-tight'>We Offer The Best For You <span className='text-primary'>.</span></h1>
    </div>
    <div className='flex w-full items-center justify-center gap-8 mt-24'>
  {/* Card 1 */}
  <div className='w-[390px] h-[240px] bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300'>
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center gap-5'>
        <div className='text-[28px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white'>
        <MdHealthAndSafety />

        </div>
        <h1 className='font-main font-bold text-[28px] text-gray-800'>Safety Service</h1>
      </div>
      <p className='text-lg font-main text-gray-600 mt-4 text-center'>We prioritize your safety with every step.</p>
      <div className='w-full h-[2px] mt-6 bg-gray-200'></div>
    </div>
  </div>

  {/* Card 2 */}
  <div className='w-[390px] h-[240px] bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300'>
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center gap-5'>
        <div className='text-[28px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white'>
          <IoShieldCheckmark />
        </div>
        <h1 className='font-main font-bold text-[28px] text-gray-800'>Top Security</h1>
      </div>
      <p className='text-lg font-main text-gray-600 mt-4 text-center'>Ensuring top-notch protection for all.</p>
      <div className='w-full h-[2px] mt-6 bg-gray-200'></div>
    </div>
  </div>

  {/* Card 3 */}
  <div className='w-[390px] h-[240px] bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300'>
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center gap-5'>
        <div className='text-[28px] w-16 h-16 rounded-full flex justify-center items-center bg-primary text-white'>
          <IoHeart />
        </div>
        <h1 className='font-main font-bold text-[28px] text-gray-800'>Customer Care</h1>
      </div>
      <p className='text-lg font-main text-gray-600 mt-4 text-center'>Your satisfaction is our priority.</p>
      <div className='w-full h-[2px] mt-6 bg-gray-200'></div>
    </div>
  </div>
</div>

  </div>
  
  )
}

export default Page2