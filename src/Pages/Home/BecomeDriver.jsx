import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BecomeDriver() {

    const [driverName, setDriverName] = useState('');
    const [driverAddress, setDriverAddress] = useState('');
    const [driverPhone, setDriverPhone] = useState('');
    const [driverEmail, setDriverEmail ] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [driverStatues, setDriverStatus] = useState('');
    const [vehicalName, setVehicleName] = useState('');
    const [vehicalType, setVehicleType] = useState('');
    const [vehicalModel, setVehicleModel] = useState('');
    const [vehicalSeats, setVehicleSeats] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        
        const driverDetails = {
            driverName,
            driverAddress,
            driverPhone,
            imageUrl,
          driverEmail,
          userName,
          password,
          driverStatues,
          vehicalName,
          vehicalType,
          vehicalModel,
          vehicalSeats,

        };
        if (!driverName || !driverAddress || !driverPhone || !driverEmail || 
            !userName || !password || !driverStatues || !vehicalName || 
            !vehicalType || !vehicalModel || !vehicalSeats || !imageUrl) {
            toast.error('Please fill in all required fields.');
            return;
        }
        try {
          await axios.post(
            ('http://localhost:8080/auth/createdriver'),
            driverDetails, 
          );
          navigate('/');
          toast.success('Driver Registration successfully');
        } catch (error) {
          toast.error('Failed to registration..!');
        }
      }
    
  
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white bg-opacity-70 p-6 rounded-3xl shadow-2xl w-full max-w-3xl">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
            Become a Driver with Us
          </h1>
          <p className="text-lg text-gray-700 text-center mb-6">
            Fill out the form below to apply and start driving with us. It's
            easy and quick!
          </p>
          <form  className="space-y-5" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverName"
                >
                  Driver Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverAddress"
                >
                  Driver Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="driverAddress"
                  name="driverAddress"
                  value={driverAddress}
                  onChange={(e) => setDriverAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverPhone"
                >
                  Driver Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="driverPhone"
                  name="driverPhone"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverEmail"
                >
                  Driver Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="driverEmail"
                  name="driverEmail"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="userName"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter a username"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverStatus"
                >
                  Driver Status <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="driverStatus"
                  name="driverStatus"
                  value={driverStatues}
                  onChange={(e) => setDriverStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter driver status"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleName"
                >
                  Vehicle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  value={vehicalName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle name"
                  required
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleType"
                >
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleType"
                  name="vehicleType"
                  value={vehicalType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle type"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleModel"
                >
                  Vehicle Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={vehicalModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle model"
                  required
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleSeats"
                >
                  Vehicle Seats <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="vehicleSeats"
                  name="vehicleSeats"
                  value={vehicalSeats}
                  onChange={(e) => setVehicleSeats(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter number of seats"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="imageUrl"
                >
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white text-lg font-bold px-8 py-3 rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
                onClick={handleSubmit}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BecomeDriver;
