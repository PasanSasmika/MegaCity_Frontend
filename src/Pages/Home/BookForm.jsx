import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaCar, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

function BookForm() {
    const location = useLocation();
    const { name, price, seats } = location.state || {};

    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
    const [startLocation, setStartLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');

    return (
        <motion.div 
            className='min-h-screen flex items-center justify-center bg-slate-200 px-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className='bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl'>
                <h2 className='text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide'>Book Your Ride</h2>
                <form className='flex flex-wrap gap-6'>
                    {/* Start Location Dropdown */}
                    <div className='flex-1 min-w-[250px]'>
                        <label className='block text-gray-700 font-medium mb-2'>Start Location</label>
                        <div className='flex items-center border rounded-lg p-3 bg-gray-100 shadow-md'>
                            <FaMapMarkerAlt className='text-yellow-600 mr-3' />
                            <select 
                                className='w-full bg-transparent focus:outline-none text-gray-800' 
                                value={startLocation} 
                                onChange={(e) => setStartLocation(e.target.value)}
                            >
                                <option value='' disabled>Select start location</option>
                                {locations.map((loc, index) => (
                                    <option key={index} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Drop Location Dropdown */}
                    <div className='flex-1 min-w-[250px]'>
                        <label className='block text-gray-700 font-medium mb-2'>Drop Location</label>
                        <div className='flex items-center border rounded-lg p-3 bg-gray-100 shadow-md'>
                            <FaMapMarkerAlt className='text-yellow-600 mr-3' />
                            <select 
                                className='w-full bg-transparent focus:outline-none text-gray-800' 
                                value={dropLocation} 
                                onChange={(e) => setDropLocation(e.target.value)}
                            >
                                <option value='' disabled>Select drop location</option>
                                {locations.map((loc, index) => (
                                    <option key={index} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Car Details */}
                    <motion.div 
                        className='flex-1 min-w-[250px]'
                        whileHover={{ scale: 1.05 }}
                    >
                        <label className='block text-gray-700 font-medium mb-2'>Car Details</label>
                        <div className='border rounded-lg p-6 bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center text-center shadow-lg'>
                            <FaCar className='text-yellow-600 text-5xl mb-3' />
                            <p className='text-2xl font-semibold text-gray-900'>{name || 'No Car Selected'}</p>
                            <p className='text-gray-700 flex items-center gap-1 text-lg'><FaDollarSign className='text-green-500' /> {price || 'N/A'}</p>
                            <p className='text-gray-700 text-lg'>Seats: {seats || 'N/A'}</p>
                        </div>
                    </motion.div>

                    {/* Book Now Button */}
                    <div className='w-full flex justify-center mt-8'>
                        <button 
                            className='bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-lg font-bold px-10 py-3 rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400'
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default BookForm;
