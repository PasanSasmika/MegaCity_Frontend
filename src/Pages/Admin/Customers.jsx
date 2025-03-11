import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

function Customers() {
  const [customers, setCustomers] = useState([]); // Ensure it's an array by default
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/allcustomers');
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        setError('Data format error: Expected an array');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers');
    }
  };

  const handleDeleteDriver = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/deletecustomer/${customerId}`);
      toast.success("Customer deleted successfully!");
      fetchCustomers(); // Refetch customers after deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-[70vh]">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 font-primary">All Customers</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message if any */}
      <table className="min-w-full table-auto border-collapse shadow-lg bg-white rounded-lg">
        <thead>
          <tr className="bg-green-500 text-white text-left font-primary">
            <th className="px-6 py-3">Customer ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.customerId} className="hover:bg-gray-200 font-secondary">
                <td className="px-6 py-4 border-t">{customer.customerId}</td>
                <td className="px-6 py-4 border-t">{customer.name}</td>
                <td className="px-6 py-4 border-t">{customer.email}</td>
                <td className="px-6 py-4 border-t">{customer.phone}</td>
                <td className="px-6 py-4 border-t">
                  <button onClick={() => handleDeleteDriver(customer.customerId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;