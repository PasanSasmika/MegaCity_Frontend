import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Bookings() {
  const [pageStatus, setPageStatus] = useState('loading');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (pageStatus === 'loading') {
      const token = localStorage.getItem('token');
      axios
        .get('http://localhost:8081/api/bookings/allbooking', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBookings(response.data);
          setPageStatus('loaded');
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
          setPageStatus('error');
        });
    }
  }, [pageStatus]);

  if (pageStatus === 'loading') {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (pageStatus === 'error') {
    return <div className="text-center py-8 text-red-600">Error loading bookings. Please try again.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-semibold">{booking.date}</p>
              </div>
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-semibold">{booking.time}</p>
              </div>
              <div>
                <p className="text-gray-600">Pickup Location</p>
                <p className="font-semibold">{booking.pickupLocation}</p>
              </div>
              <div>
                <p className="text-gray-600">Distance</p>
                <p className="font-semibold">{booking.distance}</p>
              </div>
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-semibold">{booking.total}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    booking.bookingStatus === 'ACCEPTED'
                      ? 'bg-green-100 text-green-800'
                      : booking.bookingStatus === 'ACCEPTED'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;