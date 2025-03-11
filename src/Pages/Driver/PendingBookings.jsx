import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaCar, FaMoneyBillWave, FaClock, FaInfoCircle } from 'react-icons/fa';

function PendingBookings() {
  const [myBooking, setMyBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [driverID, setDriverID] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const driverIDFromStorage = localStorage.getItem('userId');

    if (!driverIDFromStorage) {
      setError('Driver ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    setDriverID(driverIDFromStorage);

    axios.get(`http://localhost:8080/api/bookings/driver/${driverIDFromStorage}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      const bookings = Array.isArray(response.data) ? response.data : [];
      setMyBooking(bookings);
      setLoading(false);
    })
    .catch(error => {
      setError('Error fetching bookings.');
      setLoading(false);
      console.error('Error fetching bookings:', error);
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        {myBooking.length === 0 ? (
          <div className="text-center text-gray-600">No bookings found.</div>
        ) : (
          myBooking.map((booking) => (
            <div key={booking.bookingId} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 w-full">
              <div className="flex flex-row space-x-6">
                {/* Pickup Location */}
                <div className="flex-1 border-r pr-6">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Pick Location</h4>
                  </div>
                  <p className="text-sm font-secondary text-gray-600 mt-2">{booking.pickupLocation}</p>
                </div>

                {/* Drop Location */}
                <div className="flex-1 border-r pr-6">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Drop Location</h4>
                  </div>
                  <p className="text-sm font-secondary text-gray-600 mt-2">{booking.dropLocation}</p>
                </div>

                {/* Date & Time */}
                <div className="flex-1 border-r pr-6">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-purple-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Date & Time</h4>
                  </div>
                  <p className="text-sm font-secondary text-gray-600 mt-2">{booking.date} at {booking.time}</p>
                </div>

                {/* Trip Details */}
                <div className="flex-1 border-r pr-6">
                  <div className="flex items-center space-x-2">
                    <FaCar className="text-indigo-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Trip Details</h4>
                  </div>
                  <p className="text-sm font-primary text-gray-600 mt-2">Distance: {booking.distance}</p>
                  <p className="text-sm font-secondary text-gray-600">Total: {booking.total}</p>
                </div>

                {/* Customer Details */}
                <div className="flex-1 border-r pr-6">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-yellow-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Customer Details</h4>
                  </div>
                  <p className="text-sm font-secondary text-gray-600 mt-2">{booking.customerName}</p>
                  <p className="text-sm font-secondary text-gray-600">{booking.email}</p>
                  <p className="text-sm font-secondary text-gray-600">{booking.phone}</p>
                </div>

                {/* Status */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-pink-500" />
                    <h4 className="text-md font-primary font-medium text-gray-700">Status</h4>
                  </div>
                  <p className="text-sm font-secondary text-gray-600 mt-2">{booking.bookingStatus}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PendingBookings;