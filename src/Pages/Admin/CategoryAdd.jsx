import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CategoryAdd() {

    const [catType, setCatType] = useState("");
    const [noOfSeats, setNoOfSeats] = useState("");
    const [lagguageType, setLuggageType] = useState("");
    const [pricePerKm, setPricePerKm] = useState("");
    const navigate  = useNavigate();

   async function submit(){
    const category = {
        catType,
        noOfSeats,
        pricePerKm,
        lagguageType
      };

      
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:8080/api/category/createcategory', 
        category, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(category)
      navigate('/adminpage/dashboard');
      toast.success('Category added successfully!');
    } catch (error) {
      toast.error('Failed to add Category!');
    }
  }

  return (
    <div className="h-[70vh] flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-primary font-bold text-center text-gray-800 mb-6">
          Add Category
        </h2>
        <div className="space-y-6">
          {/* Vehicle Type Field */}
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-secondary text-gray-700 mb-2">
              Vehicle Type:
            </label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={catType}
              onChange={(e)=>setCatType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-secondary"
              placeholder="Enter vehicle type"
              required
            />
          </div>

          {/* Seats Field */}
          <div>
            <label htmlFor="seats" className="block text-sm font-secondary text-gray-700 mb-2">
              Number of Seats:
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              value={noOfSeats}
              onChange={(e)=>setNoOfSeats(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-secondary"
              placeholder="Enter number of seats"
              required
            />
          </div>

          {/* Luggage Type Field */}
          <div>
            <label htmlFor="luggageType" className="block text-sm font-secondary text-gray-700 mb-2">
              Luggage Type:
            </label>
            <input
              type="text"
              id="luggageType"
              name="luggageType"
              value={lagguageType}
              onChange={(e)=>setLuggageType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-secondary"
              placeholder="Enter luggage type"
              required
            />
          </div>

          {/* Price Per KM Field */}
          <div>
            <label htmlFor="pricePerKm" className="block text-sm font-secondary text-gray-700 mb-2">
              Price Per KM:
            </label>
            <input
              type="number"
              id="pricePerKm"
              name="pricePerKm"
              value={pricePerKm}
              onChange={(e)=>setPricePerKm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-secondary"
              placeholder="Enter price per KM"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all font-primary font-semibold"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryAdd;