'use client'; //kautkas

import React, { useState } from 'react';
import api from '../axios'; // Import your Axios instance
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state

    // Email validation
    if (!validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    // Password length check
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await api.post('http://127.0.0.1:8000/api/register', {
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log('Registration successful:', response.data);
      localStorage.setItem('userToken', response.data.token);
      
      // Redirect to 'About You' page
      router.push('/about-you');

    } catch (error) {
      console.error('Registration failed:', error);

      // Display a more detailed error if provided
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed, please try again.');
      }
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center h-screen w-screen">
      <div id="registerSection" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl text-center mt-16">Register</p>
        
        {error && <p className="text-red-500 mt-4">{error}</p>} {/* Display error message */}
        
        <form onSubmit={handleRegister} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 border-2 border-main-blue"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-64 my-4 rounded-lg p-4 border-2 border-main-blue"
            required
          />
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-64 my-4 rounded-lg p-4 border-2 border-main-blue"
            required
          />
  
          <button 
            type="submit" 
            className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64 mt-8"
          >
            Register
          </button>
  
          <button 
            type="button" 
            onClick={handleLoginRedirect} 
            className="bg-main-red text-main-white text-lg rounded-lg h-12 w-64 mt-8"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );  
}
