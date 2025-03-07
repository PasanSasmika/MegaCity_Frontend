import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {  IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function RideBook() {
  const [vehicals, setVehicals] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    if (pageStatus === "loading") {
      axios.get('http://localhost:8080/auth/alldrivers')
        .then((res) => {
          console.log(res.data);
          setVehicals(res.data);
          setPageStatus('loaded');
        })
        .catch(() => toast.error('Error loading vehicles'));
    }
  }, [pageStatus]);

  const navigate = useNavigate();
  
  const click = (vehical) => {
    navigate(`/bookform/`, {
      state: {
        name: vehical.vehicalName,
        type: vehical.vehicalType,
        seats: vehical.vehicalSeats,
        price: vehical.pricePerKm,
        Id: vehical.driverID
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col w-full items-center pt-20">
        <h1 className="text-primary font-secondary text-2xl font-main">Choose Your Ride</h1>
        <h1 className="text-7xl font-primary font-bold leading-tight text-gray-900">
          Book Your Perfect Car<span className="text-primary">.</span>
        </h1>
      </div>

      <div className="flex w-full items-center justify-center gap-8 mt-24 flex-wrap">
        {vehicals.map((vehical, index) => (
          <div key={vehical.id || index} className="w-[390px] bg-gray-100 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <img src={vehical.imageUrl} alt={vehical.vehicalName} className="w-full h-48 object-cover rounded-xl" />
            <div className="mt-4 flex flex-col items-center">
              <h1 className="font-primary font-bold text-3xl text-gray-900 flex items-center gap-2">
                {vehical.vehicalName}
              </h1>
              <h1 className="font-primary font-bold text-2xl text-gray-700 flex items-center gap-2">
               {vehical.vehicalType}
              </h1>
              <p className="text-lg font-secondary text-gray-600 mt-1">Seats: {vehical.vehicalSeats}</p>
              <p hidden >{vehical.driverID}</p>
              <p className="text-lg font-secondary text-gray-600 mt-1">Price per KM:  {vehical.pricePerKm}/=</p>
              <div className={`mt-4 px-4 py-2 rounded-full font-secondary text-white ${vehical.driverStatues ? 'bg-green-600' : 'bg-red-600'} flex items-center gap-2`}>
                {vehical.driverStatues ? <IoCheckmarkCircle /> : <IoCloseCircle />} {vehical.driverStatues ? 'Available' : 'Unavailable'}
              </div>
              {vehical.driverStatues && (
                <button className="mt-4 px-6 py-2 bg-primary text-white font-primary font-bold rounded-full hover:bg-primary/80 transition duration-300"
                  onClick={() => click(vehical)}
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