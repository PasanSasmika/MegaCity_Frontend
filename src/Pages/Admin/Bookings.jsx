import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bookings() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/alldrivers") 
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Drivers</h2>
      <table className="min-w-full table-auto border-collapse shadow-lg bg-white rounded-lg">
        <thead>
          <tr className="bg-green-500 text-white text-left">
            <th className="px-6 py-3">Driver ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driverID} className="hover:bg-gray-200">
              <td className="px-6 py-4 border-t">{driver.driverID}</td>
              <td className="px-6 py-4 border-t">{driver.driverName}</td>
              <td className="px-6 py-4 border-t">{driver.driverEmail}</td>
              <td className="px-6 py-4 border-t">{driver.driverPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
