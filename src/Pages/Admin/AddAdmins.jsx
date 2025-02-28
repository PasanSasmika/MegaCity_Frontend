import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Importing the "+" icon from react-icons
import { Link } from 'react-router-dom';

function AddAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all admins
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8080/api/admin/alladmins', {
      headers: {
        'Authorization': `Bearer ${token}`, // Add the token for authentication
      }
    })
    .then(response => {
      setAdmins(response.data);  // Store the list of admins in the state
      setLoading(false);
    })
    .catch(error => {
      setError('Error fetching admins.');
      setLoading(false);
      console.error('Error fetching admins:', error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 h-[70vh]">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Admins</h2>
      <table className="min-w-full table-auto border-collapse shadow-lg bg-white rounded-lg">
        <thead>
          <tr className="bg-green-500 text-white text-left">
            <th className="px-6 py-3">Admin ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Password</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-200">
              <td className="px-6 py-4 border-t">{admin.adminID}</td>
              <td className="px-6 py-4 border-t">{admin.userName}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Plus Icon Button at the bottom */}
      <div className="flex justify-center mt-6">
        <button 
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
         <Link to="/adminpage/addAdmin"><FaPlus size={20} /></Link> 
        </button>
      </div>
    </div>
  );
}

export default AddAdmins;
