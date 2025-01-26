import React from 'react'
import logo from '/Group 2.svg'
import { IoCall, IoLocation, IoMail } from 'react-icons/io5'


function Header() {
  return (
    <div className='flex justify-center w-full h-[7vw] bg-slate-900 top-0 left-0 right-0 fixed z-50'>
      <div className='flex absolute gap-8 items-center top-4 left-8 text-sm'>
  <div className='flex items-center gap-2'>
    <IoMail className='text-primary text-lg' />
    <h1 className='font-secondery text-white text-[14px] font-medium'>abcdef@gmail.com</h1>
  </div>
  <div className='flex items-center gap-2'>
    <IoCall className='text-primary text-lg' />
    <h1 className='font-secondery text-white text-[14px] font-medium'>077-8987866</h1>
  </div>
  <div className='flex items-center gap-2'>
    <IoLocation className='text-primary text-lg' />
    <p className='font-secondery text-white text-[14px] font-medium'>123, Colombo 5</p>
  </div>
</div>
    <div className='flex w-[75vw] h-[8vw] bg-white mt-12 rounded-2xl items-center justify-between'>
      <div className='w-[220px] h-[220px] object-cover pl-8'>
        <img src={logo} alt="Logo" className='w-full h-full object-contain' />
      </div>
      <div className='flex items-center justify-center w-full h-full'>
      <nav className='flex space-x-8 font-secondery items-center justify-center text-[17px]'>
        <a href='#home' className='text-slate-900 hover:text-primary'>Home</a>
        <a href='#about' className='text-slate-900 hover:text-primary'>About</a>
        <a href='#services' className='text-slate-900 hover:text-primary'>Services</a>
        <a href='#contact' className='text-slate-900 hover:text-primary'>Contact</a>
      </nav>
      
      </div>
      <div className='w-52 h-14 flex justify-center items-center mr-10 rounded-lg font-secondery text-[17px]  bg-primary hover:bg-slate-900 hover:text-primary'>
      <button>Let's Ride now !</button>
      </div>
      
    </div>
  </div>
  )
}

export default Header