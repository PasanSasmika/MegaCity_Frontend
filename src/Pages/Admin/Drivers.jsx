import React, { useState } from 'react';
import axios from 'axios';

const SetDriverStatus = ({ initialDriverID }) => {
  const [selectedDriverID, setSelectedDriverID] = useState(initialDriverID || null);
  const [driverStatus, setDriverStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example: You might fetch this from an API or pass it as a prop
  const driverOptions = [
    { id: 'driver1', name: 'Driver 1' },
    { id: 'driver2', name: 'Driver 2' },
    { id: 'driver3', name: 'Driver 3' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDriverID) {
      setError('Please select a driver');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/setdriverStatues/${selectedDriverID}`,
        { driverStatues: driverStatus }, // Matching your backend parameter name
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      setMessage(response.data);
      setDriverStatus(''); // Clear status after success
    } catch (err) {
      setError(err.response?.data || 'An error occurred while updating driver status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Update Driver Status
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Driver ID Selection */}
        <div>
          <label 
            htmlFor="driverID" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Driver
          </label>
          <select
            id="driverID"
            value={selectedDriverID || ''}
            onChange={(e) => setSelectedDriverID(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a Driver</option>
            {driverOptions.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        {/* Driver Status Selection */}
        <div>
          <label 
            htmlFor="driverStatus" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Driver Status
          </label>
          <select
            id="driverStatus"
            value={driverStatus}
            onChange={(e) => setDriverStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedDriverID}
          className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            (loading || !selectedDriverID) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default SetDriverStatus;