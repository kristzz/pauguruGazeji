'use client'; // Enable client-side functionality

import React, { useState } from 'react';
import Link from "next/link";
import api from '../axios'; 
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // New loading state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setLoading(true); // Start loading

    try {
        const response = await api.post('http://127.0.0.1:8000/api/login', {
            email,
            password,
        });
        
        // **Check if login was successful based on the response**
        if (response.data.status) { // Only proceed if status is true
            console.log('Login successful:', response.data);
            localStorage.setItem('userToken', response.data.token);


            // Optionally redirect the user after login
            setTimeout(() => {
                router.push('/tasks');
            }, 1500);
        } else {
            setError(response.data.message || 'Invalid login details.');
        }

    } catch (error: any) {
        console.error('Login failed:', error);

        // Set a fallback error message if no detailed message is provided
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError('An unexpected error occurred. Please try again.');
        }
    } finally {
        setLoading(false); // Stop loading
    }
};

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex justify-center h-screen w-screen">
      <div id="signinSection" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl text-center mt-16">Log In</p>
        
        {error && <p className="text-red-500 mt-4">{error}</p>} {/* Display error message */}
        
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 border-2 border-main-blue"
            disabled={loading}  // Disable input during loading
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-64 my-4 rounded-lg p-4 border-2 border-main-blue"
            disabled={loading}  // Disable input during loading
            required
          />

          <div className="mb-4">
            <Link href="/forgot" className="text-main-blue">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64 mt-8"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Log In'}  {/* Show loading state */}
          </button>

          <button 
            type="button" 
            onClick={handleRegisterRedirect} 
            className="bg-main-red text-main-white text-lg rounded-lg h-12 w-64 mt-8"
            disabled={loading} // Disable button during loading
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
