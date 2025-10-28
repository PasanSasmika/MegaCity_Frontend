import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar, FaKey, FaCheckCircle, FaImage } from "react-icons/fa";
import image from '/taxiii.jpg'; // Import the local image
import toast from "react-hot-toast";
import { FaBagShopping } from "react-icons/fa6";

function BecomeDriver() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverAddress, setDriverAddress] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  const [vehicalName, setVehicleName] = useState("");
  const [vehicalType, setVehicleType] = useState("");
  const [vehicalSeats, setVehicleSeats] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [lagguageType, setLagguageType] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [licenceImg, setLicenceImg] = useState(null);
  const [catStage, setCatStage] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if(catStage== "loading"){
    axios
      .get("http://localhost:8081/api/category")
      .then((response) => {
        setCategories(response.data);
        setCatStage("loaded")
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
    }
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Automatically populate form fields with category data
    setVehicleSeats(category.noOfSeats);
    setVehicleType(category.catType);
    setPricePerKm(category.pricePerKm);
    setLagguageType(category.lagguageType);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !driverName ||
      !driverAddress ||
      !driverPhone ||
      !driverEmail ||
      // !userName ||
      // !password ||
      !vehicalName ||
      !pricePerKm ||
      !lagguageType ||
      !vehicalType ||
      !vehicalSeats ||
      !imageFile ||
      !licenceImg||
      !selectedCategory
    ){
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(driverEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (driverPhone.length < 10) {
      toast.error("Phone number must be at least 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("imageUrl", imageFile);
    formData.append("licenceImg", licenceImg);
    formData.append("vehicalName", vehicalName);
    formData.append("driverName", driverName);
    formData.append("driverStatues", "Pending"); // Default status
    formData.append("driverEmail", driverEmail);
    // formData.append("userName", userName);
    // formData.append("password", password);
    formData.append("driverAddress", driverAddress);
    formData.append("driverPhone", driverPhone);
    formData.append("vehicalType", vehicalType);
    formData.append("catType", selectedCategory.catType);
    formData.append("noOfSeats", vehicalSeats);
    formData.append("lagguageType", lagguageType);
    formData.append("pricePerKm", pricePerKm);

    try {
      await axios.post("http://localhost:8081/auth/createdriver", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
      toast.success("Application Submit Successfull..!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register driver. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl">
          <h1 className="text-4xl font-primary font-extrabold text-center text-accent mb-4">
            Become a Driver with Us
          </h1>
          <p className="text-lg font-secondary text-gray-700 text-center mb-6">
            Fill out the form below to apply and start driving with us. It's easy and quick!
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Section: Category Selection */}
             {catStage == "loaded"? <div className="flex flex-col gap-4 p-8 rounded-xl w-[300px]">
                {categories.map((category) => (
                  <label
                    key={category.catID}
                    htmlFor={`category-${category.catID}`}
                    className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-start transition-all duration-300 ${
                      selectedCategory?.catID === category.catID
                        ? "border-[#f0db2e] bg-[#f0db2e] shadow-lg"
                        : "border-gray-300 bg-white hover:shadow-md hover:border-[#f0db2e]"
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
                      <span className="text-xl font-primary font-semibold text-gray-800">
                        {category.catType}
                      </span>
                      <span className="text-sm font-secondary text-gray-600">
                        Seats: {category.noOfSeats}
                      </span>
                      <span className="text-sm font-secondary text-gray-600">
                        Lagguage Type: {category.lagguageType}
                      </span>
                      <span className="text-sm font-secondary text-gray-600">
                        Price per KM: {category.pricePerKm}
                      </span>
                    </div>
                  </label>
                ))}
              </div>: <div>
                <h1>Loading.....</h1>
                </div>}

              {/* Right Section: Form Fields */}
              <div className="space-y-5 flex-1">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="driverName">
                      <FaUser className="inline-block mr-2 text-secondery" />
                      Driver Name
                    </label>
                    <input
                      type="text"
                      id="driverName"
                      name="driverName"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="driverAddress">
                      <FaMapMarkerAlt className="inline-block mr-2 text-secondery" />
                      Driver Address
                    </label>
                    <input
                      type="text"
                      id="driverAddress"
                      name="driverAddress"
                      value={driverAddress}
                      onChange={(e) => setDriverAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="driverPhone">
                      <FaPhone className="inline-block mr-2 text-secondery" />
                      Driver Phone
                    </label>
                    <input
                      type="tel"
                      id="driverPhone"
                      name="driverPhone"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="driverEmail">
                      <FaEnvelope className="inline-block mr-2 text-secondery" />
                      Driver Email
                    </label>
                    <input
                      type="email"
                      id="driverEmail"
                      name="driverEmail"
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-secondary focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  {/* <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="userName">
                      <FaUser className="inline-block mr-2 text-secondery" />
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter a username"
                      required
                    />
                  </div> */}
                  {/* <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                      <FaKey className="inline-block mr-2 text-secondery" />
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter your password"
                      required
                    />
                  </div> */}
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="vehicleName">
                      <FaCar className="inline-block mr-2 text-secondery" />
                      Vehicle Name
                    </label>
                    <input
                      type="text"
                      id="vehicleName"
                      name="vehicleName"
                      value={vehicalName}
                      onChange={(e) => setVehicleName(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter vehicle name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="vehicleType">
                      <FaCar className="inline-block mr-2 text-secondery" />
                      Vehicle Type
                    </label>
                    <input type="text"id="vehicleType"name="vehicleType" value={vehicalType} onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter vehicle type" required disabled
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="vehicleModel">
                      <FaCar className="inline-block mr-2 text-secondery" />
                      Licence Image
                    </label>
                    <input
                      type="file"
                      id="Licence"
                      name="Licence"
                      onChange={(e) => setLicenceImg(e.target.files[0])}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter Licence"
                      required
                      multiple
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="vehicleSeats">
                      <FaCar className="inline-block mr-2 text-secondery" />
                      Vehicle Seats
                    </label>
                    <input
                      type="number"
                      id="vehicleSeats"
                      name="vehicleSeats"
                      value={vehicalSeats}
                      onChange={(e) => setVehicleSeats(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter number of seats"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="lagguageType">
                      <FaBagShopping className="inline-block mr-2 text-secondery" />
                      Lagguage size
                    </label>
                    <input
                      type="text"
                      id="lagguageType"
                      name="lagguageType"
                      value={lagguageType}
                      onChange={(e) => setLagguageType(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Lagguage size"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="pricePerKm">
                      <FaCar className="inline-block mr-2 text-secondery" />
                      Price per KM
                    </label>
                    <input
                      type="number"
                      id="pricePerKm"
                      name="pricePerKm"
                      value={pricePerKm}
                      onChange={(e) => setPricePerKm(e.target.value)}
                      className="w-full p-2 border border-gray-300 font-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter price per KM"
                      required
                      disabled
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-secondary text-[17px] font-medium mb-2" htmlFor="imageUrl">
                      <FaImage className="inline-block mr-2 text-secondery" />
                      Vehicle Images
                    </label>
                    <input
                      type="file"
                      id="imageUrl"
                      name="imageUrl"
                      onChange={(e) => setImageFile(e.target.files[0])} // Updated to handle file object
                      className="w[100px] p-2 border border-gray-300 rounded-lg font-secondary focus:outline-none focus:ring-2 focus:ring-[#f0db2e]"
                      placeholder="Enter Vehicle"
                      required
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-6">
              <button
                type="submit"
                className="bg-primary font-primary text-accent text-lg font-bold px-8 py-2 rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
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