import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Import the FaPlus icon
import { Link } from 'react-router-dom';

function Category() {
    const [pageStatus, setPageStatus] = useState("loading");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (pageStatus === "loading") {
            axios
                .get("http://localhost:8080/api/category")
                .then((response) => {
                    setCategories(response.data);
                    setPageStatus("loaded");
                })
                .catch((error) => {
                    console.error("There was an error fetching the categories!", error);
                    toast.error("Failed to fetch categories!");
                    setPageStatus("error");
                });
        }
    }, [pageStatus]);

    const handleDelete = async (catID) => {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
      
        if (!token) {
          toast.error("You are not authorized. Please log in.");
          return;
        }
      
        try {
          await axios.delete(`http://localhost:8080/api/category/${catID}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token in the request header
            },
          });
          toast.success("Category Deleting Successfully");
          setPageStatus("loading")
        } catch (error) {
          console.error("Error deleting driver:", error);
        }
      };

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-primary">
            {/* Add a FaPlus button at the top of the page */}
            <div className="flex justify-end mb-6">
               <Link to="/adminpage/categoryadd"><button
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    <FaPlus className="mr-2" /> Add Category
                </button></Link> 
            </div>

            {pageStatus === "loaded" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.catID}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 font-secondary">
                                    {category.catType}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Seats:</span> {category.noOfSeats}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Luggage Type:</span> {category.lagguageType}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Price per KM:</span> ${category.pricePerKm}
                                </p>
                                <button onClick={() => handleDelete(category.catID)}>
                                    <FaTrash/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : pageStatus === "error" ? (
                <div className="text-center text-red-500 text-xl">Error loading categories.</div>
            ) : (
                <div className="text-center text-gray-600 text-xl">Loading...</div>
            )}
        </div>
    );
}

export default Category;