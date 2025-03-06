import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar, FaKey, FaCheckCircle, FaImage } from "react-icons/fa";
import image from '/taxiii.jpg'; // Import the local image
import toast from "react-hot-toast";

function BecomeDriver() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverAddress, setDriverAddress] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [driverStatues, setDriverStatus] = useState("");
  const [vehicalName, setVehicleName] = useState("");
  const [vehicalType, setVehicleType] = useState("");
  const [vehicalModel, setVehicleModel] = useState("");
  const [vehicalSeats, setVehicleSeats] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get("http://localhost:8080/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Automatically populate form fields with category data
    setVehicleSeats(category.noOfSeats);
    setVehicleType(category.catType);
    setPricePerKm(category.pricePerKm);
  };

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
      pricePerKm,
      categoryId: selectedCategory ? selectedCategory.catID : null, // Include the selected category ID
    };

    if (
      !driverName ||
      !driverAddress ||
      !driverPhone ||
      !driverEmail ||
      !userName ||
      !password ||
      !driverStatues ||
      !vehicalName ||
      !pricePerKm ||
      !vehicalType ||
      !vehicalModel ||
      !vehicalSeats ||
      !imageUrl ||
      !selectedCategory
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/auth/createdriver",
        driverDetails
      );
      navigate("/");
      toast.success("Driver Registration successful");
    } catch (error) {
      toast.error("Failed to register driver!");
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`, // Use the imported local image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50  p-8 rounded-3xl shadow-2xl w-full max-w-5xl">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
            Become a Driver with Us
          </h1>
          <p className="text-lg text-gray-700 text-center mb-6">
            Fill out the form below to apply and start driving with us. It's
            easy and quick!
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <label
                  key={category.catID}
                  htmlFor={`category-${category.catID}`}
                  className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-start transition-all duration-300 ${
                    selectedCategory?.catID === category.catID
                      ? "border-yellow-500 bg-yellow-100 shadow-lg"
                      : "border-gray-300 bg-white hover:shadow-md hover:border-yellow-500"
                  }`}
                >
                  <input
                    type="radio"
                    id={`category-${category.catID}`}
                    name="category"
                    value={category.catID}
                    onChange={() => handleSelectCategory(category)}
                    className="hidden"
                  />
                  <div className="flex flex-col w-full">
                    <span className="text-md font-semibold text-gray-800">
                      {category.catType}
                    </span>
                    <span className="text-sm text-gray-600">
                      Seats: {category.noOfSeats}
                    </span>
                    <span className="text-sm text-gray-600">
                      Price per KM: {category.pricePerKm}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverName"
                >
                  <FaUser className="inline-block mr-2" />
                  Driver Name
                </label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverAddress"
                >
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  Driver Address
                </label>
                <input
                  type="text"
                  id="driverAddress"
                  name="driverAddress"
                  value={driverAddress}
                  onChange={(e) => setDriverAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverPhone"
                >
                  <FaPhone className="inline-block mr-2" />
                  Driver Phone
                </label>
                <input
                  type="tel"
                  id="driverPhone"
                  name="driverPhone"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverEmail"
                >
                  <FaEnvelope className="inline-block mr-2" />
                  Driver Email
                </label>
                <input
                  type="email"
                  id="driverEmail"
                  name="driverEmail"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="userName"
                >
                  <FaUser className="inline-block mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter a username"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="password"
                >
                  <FaKey className="inline-block mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="driverStatus"
                >
                  <FaCheckCircle className="inline-block mr-2" />
                  Driver Status <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="driverStatus"
                  name="driverStatus"
                  value={driverStatues}
                  onChange={(e) => setDriverStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter driver status"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleName"
                >
                  <FaCar className="inline-block mr-2" />
                  Vehicle Name
                </label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  value={vehicalName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleType"
                >
                  <FaCar className="inline-block mr-2" />
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleType"
                  name="vehicleType"
                  value={vehicalType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle type"
                  required
                  disabled
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleModel"
                >
                  <FaCar className="inline-block mr-2" />
                  Vehicle Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={vehicalModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter vehicle model"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="vehicleSeats"
                >
                  <FaCar className="inline-block mr-2" />
                  Vehicle Seats <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="vehicleSeats"
                  name="vehicleSeats"
                  value={vehicalSeats}
                  onChange={(e) => setVehicleSeats(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter number of seats"
                  required
                  disabled
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="price KM"
                >
                  <FaCar className="inline-block mr-2" />
                  Price per KM <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price KM"
                  name="set price KM"
                  value={pricePerKm}
                  onChange={(e) => setPricePerKm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter price per KM"
                  required
                  disabled
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="imageUrl"
                >
                  <FaImage className="inline-block mr-2" />
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white text-lg font-bold px-8 py-2 rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
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