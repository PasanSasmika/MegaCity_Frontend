import React from 'react';
import { IoCarSport, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const cars = [
  {
    id: 1,
    name: 'Tesla Model S',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '$120/day',
    seats: 4,
    available: true,
  },
  {
    id: 2,
    name: 'BMW X5',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '$150/day',
    seats: 5,
    available: false,
  },
  {
    id: 3,
    name: 'Mercedes-Benz C-Class',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '$130/day',
    seats: 4,
    available: true,
  },
  {
    id: 4,
    name: 'Mercedes-Benz C-Class',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '$130/day',
    seats: 4,
    available: true,
  },
];

function RideBook() {
    const navigate = useNavigate();
    const click = (car) => {
        navigate(`/bookform/`, {
          state: {
            name: car.name,
            price: car.price,
            seats: car.seats,
          },
        });
      };
  return (
    <div className='min-h-screen bg-white'>
      <div className='flex flex-col w-full items-center pt-20'>
        <h1 className='text-primary text-xl font-main'>Choose Your Ride</h1>
        <h1 className='text-6xl font-main font-bold leading-tight'>Book Your Perfect Car<span className='text-primary'>.</span></h1>
      </div>
      
      <div className='flex w-full items-center justify-center gap-8 mt-24 flex-wrap'>
        {cars.map((car) => (
          <div key={car.id} className='w-[390px] bg-gray-100 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300'>
            <img src={car.image} alt={car.name} className='w-full h-48 object-cover rounded-xl' />
            <div className='mt-4 flex flex-col items-center'>
              <h1 className='font-main font-bold text-2xl text-gray-800 flex items-center gap-2'>
                <IoCarSport /> {car.name}
              </h1>
              <p className='text-lg font-main text-gray-600 mt-2'>{car.price}</p>
              <p className='text-lg font-main text-gray-600 mt-1'>Seats: {car.seats}</p>
              <div className={`mt-4 px-4 py-2 rounded-full text-white ${car.available ? 'bg-green-500' : 'bg-red-500'} flex items-center gap-2`}>
                {car.available ? <IoCheckmarkCircle /> : <IoCloseCircle />} {car.available ? 'Available' : 'Unavailable'}
              </div>
              {car.available && (
              <button className='mt-4 px-6 py-2 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition duration-300'
               onClick={() => click(car)}
>
                  Book This
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RideBook;