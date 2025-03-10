import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion, useAnimation } from 'framer-motion';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDriverID, setSelectedDriverID] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    fetchDrivers();
  }, [drivers]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/alldrivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast.error("Failed to fetch drivers");
    }
  };

  const openModal = (driverID) => {
    setSelectedDriverID(driverID);
    setIsModalOpen(true);
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/auth/setcredentials/${selectedDriverID}`,
        null,
        {
          params: {
            userName,
            password,
          },
        }
      );
      toast.success("Driver credentials updated successfully!");
      setIsModalOpen(false);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error("Error updating driver credentials:", error);
      toast.error("Failed to update driver credentials.");
    }
  };


 const handleDeleteDriver = async (driverID) => {
    
     try {
        await axios.delete(`http://localhost:8080/auth/deletedriver/${driverID}`);
       toast.success( "Driver deleted successfully!");
      
       await fetchDrivers();
     } catch (error) {
       console.error("Error deleting driver:", error);
       toast.error("Failed to delete driver");
     }
   };
 
   const openImageModal = (imageUrl) => {
     setSelectedImage(imageUrl);
   };
 
   const closeImageModal = () => {
     setSelectedImage(null);
   };
 
   const handleNext = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 4) % drivers.length);
   };
 
   const handlePrev = () => {
     setCurrentIndex((prevIndex) => (prevIndex - 4 + drivers.length) % drivers.length);
   };
 
   const cardVariants = {
     hidden: { opacity: 0, x: 100 },
     visible: { opacity: 1, x: 0 },
     exit: { opacity: 0, x: -100 },
   };


  return (
    <div className="p-6 min-h-[80vh] rounded-lg">
    <h2 className="text-3xl font-primary font-semibold text-center text-gray-800 mb-6">All Drivers</h2>
    <div className="relative">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full z-10"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full z-10"
      >
        &gt;
      </button>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        animate={controls}
      >
        {drivers.slice(currentIndex, currentIndex + 4).map((driver) => (
          <motion.div
            key={driver.driverID}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => handleDeleteDriver(driver.driverID)}
                  className="text-red-600 hover:text-red-800" 
                  title="Delete Driver"
                >
                  <FaTrash />
                </button>
                <h3 className="text-lg font-semibold text-gray-800">{driver.driverName}</h3>
                <button
                  onClick={() => openModal(driver.driverID)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 text-sm"
                >
                  Set Credentials
                </button>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p><span className="font-medium">Email:</span> {driver.driverEmail}</p>
                <p><span className="font-medium">Phone:</span> {driver.driverPhone}</p>
                <p> <span className="font-medium">Username:</span>{" "}
                {driver.userName ? (
                  <span>{driver.userName}</span>) : ( <span className="text-red-500 italic">Add username</span> )}</p>
                <p><span className="font-medium">Address:</span> {driver.driverAddress}</p>
                <p><span className="font-medium">Vehicle:</span> {driver.vehicalName}</p>
                <p><span className="font-medium">Vehicle Type:</span> {driver.vehicalType}</p>
                <p><span className="font-medium">Category:</span> {driver.catType}</p>
                <p><span className="font-medium">Seats:</span> {driver.noOfSeats}</p>
                <p><span className="font-medium">Luggage Type:</span> {driver.lagguageType}</p>
                <p><span className="font-medium">Price per Km:</span> {driver.pricePerKm}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <div className="w-1/2">
                  <p className="text-sm font-medium">Vehicle Image</p>
                  <img 
                    src={driver.imageUrl} 
                    alt="Driver" 
                    className="w-full h-auto rounded-lg cursor-pointer" 
                    onClick={() => openImageModal(driver.imageUrl)}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-sm font-medium">Licence Image</p>
                  <img 
                    src={driver.licenceImg} 
                    alt="Licence" 
                    className="w-full h-auto rounded-lg cursor-pointer" 
                    onClick={() => openImageModal(driver.licenceImg)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

</motion.div>
       </div>
 
       {/* Credentials Modal */}
       {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-secondary">
           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
             <h3 className="text-xl font-semibold mb-4">Set Driver Credentials</h3>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700">Username</label>
                 <input
                   type="text"
                   value={userName}
                   onChange={(e) => setUsername(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">Password</label>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                 />
               </div>
             </div>
             <div className="mt-6 flex justify-end space-x-4">
               <button
                 onClick={() => setIsModalOpen(false)}
                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
               >
                 Cancel
               </button>
               <button
                 onClick={handleAddDriver}
                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
               >
                 Save
               </button>
             </div>
           </div>
         </div>
       )}
 
       {/* Image Modal */}
       {selectedImage && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeImageModal}>
           <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-[90vh] overflow-auto">
             <img src={selectedImage} alt="Enlarged" className="w-full h-auto rounded-lg" />
           </div>
         </div>
       )}
     </div>
   );
 }
export default Drivers;