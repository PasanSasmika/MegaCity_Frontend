import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsGrid } from "react-icons/bs";
import { RiHome3Line } from "react-icons/ri";
import { FaClipboardList, FaCheckCircle, FaTrash, FaStar, FaUser } from "react-icons/fa";

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`h-full bg-gradient-to-b from-green-900 to-black text-white p-6 transition-all ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>ADMIN PANEL</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <BsGrid size={24} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <Link to="/admin" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <RiHome3Line size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
          <Link to="/driverdashboard/pending" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaClipboardList size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Pending Bookings</span>
          </Link>
          <Link to="/driverdashboard/confirmed" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaCheckCircle size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Confirmed Bookings</span>
          </Link>
          <Link to="/driverdashboard/delete" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaTrash size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Delete Bookings</span>
          </Link>
          <Link to="/driverdashboard/reviews" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaStar size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Reviews</span>
          </Link>
          <Link to="/driverdashboard/profile" className="flex items-center gap-4 text-lg hover:text-gray-400 mt-auto">
            <FaUser size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Welcome to Admin Dashboard</h1>
        </div>
        <div className="mt-4 p-6 bg-white rounded-lg shadow-lg h-[80vh]">
          <Routes path="/*">
            <Route path="/" element={<h1 className="text-center text-xl">Dashboard Overview</h1>} />
            <Route path="/pending" element={<h1>PendingBookings</h1>} />
            <Route path="/confirmed" element={<h1>PendingBookings</h1>} />
            <Route path="/delete" element={<h1>PendingBookings</h1>} />
            <Route path="/reviews" element={<h1>PendingBookings</h1>} />
            <Route path="/profile" element={<h1>PendingBookings</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
