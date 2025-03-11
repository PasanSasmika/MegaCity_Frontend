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
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setAdmins(response.data);  
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
    <div className="p-6 bg-gray-100 min-h-[70vh] ">
      <h2 className="text-3xl font-semibold text-center  font-primary text-gray-800 mb-6">All Admins</h2>
      
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-lg font-semibold font-primary text-gray-800">Admin ID: <span className='font-secondary'> {admin.adminID}</span></div>
            <div className="text-md text-gray-600 font-primary">Username: <span className='font-secondary'>{admin.userName}</span></div>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>

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