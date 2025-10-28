import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Assuming the token is stored in localStorage (you can change this based on where your token is stored)
        const token = localStorage.getItem('token');

        axios.post(
            'http://localhost:8081/api/admin/createadmin', 
            {
                userName,
                password,
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Adding the Bearer token in the Authorization header
                }
            }
        )
        .then(response => {
            // Handle successful response here
            toast.success('Admin created successfully!');
            navigate("/")
        })
        .catch(error => {
            // Handle error here
            setMessage('Error creating admin.');
            console.error('Error creating admin:', error);
        });
    };

    return (
        <div className="h-[70vh] w-full flex items-center justify-center p-6 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6 font-primary">Create Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 font-secondary">
                        <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={userName} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6 font-secondary">
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-primary shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Create Admin
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
