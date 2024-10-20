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

            // Show an alert instead of a success message
            alert('Login successful!');

            // Optionally redirect the user after login
            setTimeout(() => {
                router.push('/profile'); // Redirect to dashboard after success
            }, 1500); // Redirect after 1.5 seconds for a smoother user experience
        } else {
            // Handle failed login attempt by displaying the error message
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
    <main>
      <div className="bg-main-red h-screen w-screen">
        <div className="">
          <form className="flex flex-col items-center" onSubmit={handleLogin} method="post">
            <div className="flex flex-row">
              <div className="bg-main-blue w-60 h-16 rounded-b-xl z-0 hidden sm:w-72 sm:h-24 sm:block xl:w-[600px]"></div>
              <div className="absolute bg-main-white w-8 h-60 rounded-s-xl right-0 top-64 hidden sm:w-24 sm:h-72 sm:block"></div>
              <div className="absolute bg-main-white w-12 h-32 rounded-e-xl left-0 top-52 hidden sm:w-20 sm:h-64 sm:block xl:top-40"></div>
              <div className="absolute bg-main-blue w-8 h-32 rounded-e-xl left-0 bottom-36 hidden sm:w-16 sm:h-40 sm:bottom-44 sm:block xl:bottom-32"></div>
              <div className="absolute bg-main-white w-40 h-16 rounded-tr-xl bottom-0 left-0 hidden sm:w-48 sm:h-20 sm:block"></div>
              <div className="absolute bg-main-blue w-28 h-24 rounded-tl-xl bottom-0 right-0 hidden sm:w-40 sm:h-32 sm:block"></div>
            </div>

            <input
              className="h-12 w-64 mt-24 mb-4 rounded-lg p-4"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}  // Disable input during loading
            />
            <input
              className="h-12 w-64 my-4 rounded-lg p-4"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}  // Disable input during loading
            />

            <div className="mb-4">
              <Link href="/forgot" className="text-main-blue">
                Forgot Password?
              </Link>
            </div>

            {error && <p className="text-main-white">{error}</p>} {/* Display error message */}

            <div className="flex items-center mt-8">
              <button 
                className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64"
                disabled={loading} // Disable button during loading
              >
                {loading ? 'Signing in...' : 'Sign in'}  {/* Show loading state */}
              </button>
            </div>

            <div className="flex items-center mt-8">
              <button  
                type="button" 
                onClick={handleRegisterRedirect} 
                className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64"
                disabled={loading} // Disable button during loading
              >
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
