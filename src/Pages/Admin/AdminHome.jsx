import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { FiSettings, FiLogOut, FiSearch } from "react-icons/fi";
import { FaCarSide, FaRegUserCircle } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { RiHome3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiSteeringWheel } from "react-icons/pi";
import Drivers from './Drivers';
import Customers from './Customers';
import AddAdmins from './AddAdmins';
import Admin from './Admin';
import CategoryAdd from './CategoryAdd';
import toast from 'react-hot-toast';

function AdminHome() {
  const [isOpen, setIsOpen] = useState(false);

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
      }, 1000);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-gray-800 to-black text-white p-6 transition-all ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>ADMIN PANEL</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <BsGrid size={24} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <Link to="/adminpage/dashboard" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaRegUserCircle size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Esther Howard</span>
          </Link>
          <Link to="/defi" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <RiHome3Line size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
          </Link>
          <Link to="/adminpage/drivers" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <PiSteeringWheel size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Drivers</span>
          </Link>
          <Link to="/adminpage/customers" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaRegUser size={24} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Customers</span>
          </Link>
          <Link to="/adminpage/admin" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <MdOutlineAdminPanelSettings size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Admins</span>
          </Link>
          <Link to="/adminpage/vehicalcategory" className="flex items-center gap-4 text-lg hover:text-gray-400">
            <FaCarSide size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Vehicle Category</span>
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
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
        </div>
        <div className="mt-4 p-6 h-[80vh]">
          <Routes>
            <Route path="/adminpage/dashboard" element={<h1 className="text-center text-xl">Dashboard</h1>} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/admin" element={<AddAdmins />} />
            <Route path="/addAdmin" element={<Admin />} />
            <Route path="/vehicalcategory" element={<CategoryAdd />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;