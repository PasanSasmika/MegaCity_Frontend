import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function userLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        userName,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data; // Assuming the backend sends { token, role }
        localStorage.setItem("token", token); // Store the token
        localStorage.setItem("role", role);
        // Redirect based on user role
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
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={userLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
