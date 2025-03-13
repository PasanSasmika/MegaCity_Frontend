import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'; // Import icons

function SignUp() {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function userRegistration(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (phone.length < 10) {
      toast.error('Phone number must be at least 10 digits.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/createuser', {
        userName,
        email,
        password,
        phone,
        name,
      });

      if (response.status === 201) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Registration failed! Please try again.');
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2022/09/05/08/11/taxi-7433597_1280.jpg')",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="bg-white w-[530px] bg-opacity-90 p-8 rounded-xl shadow-2xl  transform transition-all hover:scale-105 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-primary">
          Register
        </h2>
        <form onSubmit={userRegistration}>
          {/* Name and Phone in one row */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                  placeholder="Enter your name"
                  required
                />
                <FaIdBadge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
                Phone
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                  placeholder="Enter your phone"
                  required
                />
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                placeholder="Enter your username"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                  placeholder="Enter your password"
                  required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 font-secondary">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-secondary"
                  placeholder="Confirm password"
                  required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 font-primary"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-700 mt-6 font-secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold font-primary"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;