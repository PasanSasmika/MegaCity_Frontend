import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsGrid } from "react-icons/bs";
import { RiHome3Line } from "react-icons/ri";
import { FaClipboardList, FaCheckCircle, FaTrash, FaStar, FaUser } from "react-icons/fa";
import axios from 'axios';
import PendingBookings from './PendingBookings';
import { FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  // State for UpdateDriverStatus component
  const [formData, setFormData] = useState({
    driverStatues: 'Pending'
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');
    
    // Get driverID from localStorage
    const driverID = localStorage.getItem('userId');
    if (!driverID) {
      setIsError(true);
      setMessage('No driver ID found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/setdriverStatues/${driverID}`,
        null,
        {
          params: {
            driverStatues: formData.driverStatues
          }
        }
      );

      if (response.status === 200) {
        setMessage('Driver status updated successfully!');
        setFormData({ driverStatues: 'Pending' });
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Error updating driver status');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      toast.success('Logout Successfully..!', {
        duration: 2000, 
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`h-full bg-gradient-to-b from-green-900 to-black text-white p-6 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>DRIVER PANEL</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-400 transition duration-200">
            <BsGrid size={24} />
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Link to="/admin" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200">
            <RiHome3Line size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
          <Link to="/driverdashboard/pending" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200">
            <FaClipboardList size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Pending Bookings</span>
          </Link>
          <Link to="/driverdashboard/confirmed" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200">
            <FaCheckCircle size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Confirmed Bookings</span>
          </Link>
          <Link to="/driverdashboard/delete" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200">
            <FaTrash size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Delete Bookings</span>
          </Link>
          <Link to="/driverdashboard/reviews" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200">
            <FaStar size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Reviews</span>
          </Link>
          <Link to="/driverdashboard/profile" className="flex items-center gap-4 text-lg hover:text-gray-400 transition duration-200 mt-auto">
            <FaUser size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Profile</span>
          </Link>
             <button 
                      onClick={handleLogout}
                      className="flex items-center gap-4 text-lg hover:text-gray-400 mt-auto"
                    >
                      <FiLogOut size={20} />
                      <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
                    </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-primary text-gray-800">Welcome</h1>
        </div>

        {/* Embedded UpdateDriverStatus Component */}
        <div className="bg-white rounded-xl font-secondary shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold  mb-6 text-gray-800">Add You are Active or Not Active</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="driverStatues">
                Status
              </label>
              <select
                id="driverStatues"
                value={formData.driverStatues}
                onChange={(e) => setFormData({ ...formData, driverStatues: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Your Status</option>
                <option value="active">active</option>
                <option value="not active">not active</option>
                {/* <option value="Rejected">Rejected</option> */}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Update Status
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Routes path="/*">
            <Route path="/" element={<h1 className="text-center text-2xl font-bold text-gray-800">Dashboard Overview</h1>} />
            <Route path="/pending" element={<PendingBookings />} />
            <Route path="/confirmed" element={<h1 className="text-center text-2xl font-bold text-gray-800">Confirmed Bookings</h1>} />
            <Route path="/delete" element={<h1 className="text-center text-2xl font-bold text-gray-800">Delete Bookings</h1>} />
            <Route path="/reviews" element={<h1 className="text-center text-2xl font-bold text-gray-800">Reviews</h1>} />
            <Route path="/profile" element={<h1 className="text-center text-2xl font-bold text-gray-800">Profile</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;