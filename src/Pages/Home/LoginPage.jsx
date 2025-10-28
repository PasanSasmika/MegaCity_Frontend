import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function userLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/auth/login", {
        userName,
        password,
      });

      if (response.status === 200) {
        const { token, role, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);

        if (role === "ROLE_CUSTOMER") {
          navigate("/");
        } else if (role === "ROLE_ADMIN") {
          navigate("/adminpage");
        } else if (role === "ROLE_DRIVER") {
          navigate("/driverdashboard");
        } else {
          toast.error("Invalid role assigned!");
        }

        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Invalid username or password!");
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

      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105 relative z-10">
        <h2 className="text-3xl font-bold font-primary text-center text-gray-800 mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={userLogin}>
          <div className="mb-6 font-secondary">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 font-secondary border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-primary bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700  font-secondary">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-primary hover:text-blue-800 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;