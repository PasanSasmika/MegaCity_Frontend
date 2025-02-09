import React, { useState } from 'react';

function BecomeDriver() {
    const [formData, setFormData] = useState({
        name: '',
        nicNo: '',
        area: '',
        telephone: '',
        email: '',
        vehicleNo: '',
        vehicleType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };

    return (
        <div className='relative min-h-screen bg-cover bg-center' style={{ backgroundImage: 'url(https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative z-10 flex items-center justify-center min-h-screen px-4'>
                <div className='bg-white bg-opacity-70 p-6 rounded-3xl shadow-2xl w-full max-w-3xl'>
                    <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-4'>Become a Driver with Us</h1>
                    <p className='text-lg text-gray-700 text-center mb-6'>Fill out the form below to apply and start driving with us. It's easy and quick!</p>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        {/* Row 1 */}
                        <div className='flex gap-6'>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='name'>Full Name <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your full name'
                                    required
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='nicNo'>NIC No <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    id='nicNo'
                                    name='nicNo'
                                    value={formData.nicNo}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your NIC number'
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className='flex gap-6'>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='area'>Area Name <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    id='area'
                                    name='area'
                                    value={formData.area}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your area name'
                                    required
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='telephone'>Telephone <span className='text-red-500'>*</span></label>
                                <input
                                    type='tel'
                                    id='telephone'
                                    name='telephone'
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your telephone number'
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className='flex  gap-6'>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='email'>Email <span className='text-red-500'>*</span></label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your email address'
                                    required
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='vehicleNo'>Vehicle No <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    id='vehicleNo'
                                    name='vehicleNo'
                                    value={formData.vehicleNo}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    placeholder='Enter your vehicle number'
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className='flex flex-wrap gap-6'>
                            <div className='w-full'>
                                <label className='block text-gray-700 font-medium mb-2' htmlFor='vehicleType'>Vehicle Type <span className='text-red-500'>*</span></label>
                                <select
                                    id='vehicleType'
                                    name='vehicleType'
                                    value={formData.vehicleType}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    required
                                >
                                    <option value=''>Select Vehicle Type</option>
                                    <option value='Tuk'>Tuk</option>
                                    <option value='Nano'>Nano</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='City'>City</option>
                                    <option value='Sedan'>Sedan</option>
                                    <option value='Mini Van'>Mini Van</option>
                                    <option value='Van'>Van</option>
                                    <option value='Non AC Van'>Non AC Van</option>
                                    <option value='Dual AC Van'>Dual AC Van</option>
                                    <option value='Batta'>Batta</option>
                                    <option value='Lorry'>Lorry</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='w-full flex justify-center mt-6'>
                            <button
                                type='submit'
                                className='bg-yellow-500 text-white text-lg font-bold px-8 py-3 rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105'
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeDriver;
