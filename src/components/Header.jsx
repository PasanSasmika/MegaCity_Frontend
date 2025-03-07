import React from 'react';
import logo from '/Group 2.svg';
import { IoCall, IoLocation, IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';

function Header() {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 w-full h-[7vw] bg-secondery'>
      {/* Top Contact Info */}
      <div className='flex absolute gap-8 items-center top-4 left-8 text-sm'>
        <div className='flex items-center gap-2'>
          <IoMail className='text-primary text-lg' />
          <h1 className='font-secondary text-white text-[14px] font-medium'>taxico@support.com</h1>
        </div>
        <div className='flex items-center gap-2'>
          <IoCall className='text-primary text-lg' />
          <h1 className='font-secondary text-white text-[14px] font-medium'>077-8987866</h1>
        </div>
        <div className='flex items-center gap-2'>
          <IoLocation className='text-primary text-lg' />
          <p className='font-secondary text-white text-[14px] font-medium'>123, Colombo 5</p>
        </div>
      </div>

      {/* Main Header */}
      <div className='flex w-[75vw] h-[8vw] bg-white mt-12 rounded-2xl items-center justify-between mx-auto shadow-lg'>
        {/* Logo */}
        <div className='w-[220px] h-[220px] object-cover pl-8'>
          <img src={logo} alt="Logo" className='w-full h-full object-contain' />
        </div>

        {/* Navigation Links */}
        <nav className='flex space-x-8 font-secondery items-center font-secondary justify-center text-[18px]'>
          <a href='#home' className='relative text-accent hover:text-primary transition duration-300 group'>
            Home
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a href='#about' className='relative text-accent hover:text-primary transition duration-300 group'>
            About
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a href='#services' className='relative text-accent hover:text-primary transition duration-300 group'>
            Services
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a href='#contact' className='relative text-accent hover:text-primary transition duration-300 group'>
            Contact
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
          </a>
          <Link to="/driver" className='relative text-accent hover:text-primary transition duration-300 group'>
            Become a Driver
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className='flex items-center gap-6 pr-8'>
          <Link to="/ride">
            <button className='w-52 h-14 flex justify-center items-center rounded-lg font-secondary text-[17px] bg-primary text-accent hover:scale-105 transition duration-300'>
              Let's Ride Now!
            </button>
          </Link>
          <Link to="/login" className='text-slate-900 hover:text-primary transition duration-300'>
            <FaRegUser className='text-2xl' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;