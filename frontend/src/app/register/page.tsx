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

    const normalizedEmail = email.toLowerCase();

    if (!validateEmail(normalizedEmail)) {
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
        email: normalizedEmail, // Use normalized email
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
    <main>
      <div className="bg-main-blue h-screen w-screen">
        <div className="">
          <form
            className="flex flex-col items-center"
            onSubmit={handleRegister}
            method="post"
          >
            <div className="flex flex-row">
              <div className="bg-main-red w-60 h-16 rounded-b-xl z-0 hidden sm:w-72 sm:h-24 sm:block xl:w-[600px]"></div>
              <div className="absolute bg-main-white w-8 h-60 rounded-s-xl right-0 top-64 hidden sm:w-24 sm:h-72 sm:block"></div>
              <div className="absolute bg-main-white w-12 h-32 rounded-e-xl left-0 top-52 hidden sm:w-20 sm:h-64 sm:block xl:top-40"></div>
              <div className ="absolute bg-main-red w-8 h-32 rounded-e-xl left-0 bottom-36 hidden sm:w-16 sm:h-40 sm:bottom-44 sm:block xl:bottom-32"></div>
              <div className="absolute bg-main-white w-40 h-16 rounded-tr-xl bottom-0 left-0 hidden sm:w-48 sm:h-20 sm:block"></div>
              <div className="absolute bg-main-red w-28 h-24 rounded-tl-xl bottom-0 right-0 hidden sm:w-40 sm:h-32 sm:block"></div>
            </div>

            <input
              className="h-12 w-64 mt-24 mb-4 rounded-lg p-4"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="h-12 w-64 my-4 rounded-lg p-4"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="h-12 w-64 my-4 rounded-lg p-4"
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-main-white">{error}</p>} {/* Display error message */}

            <div className="flex items-center mt-8">
              <button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-64">
                Register
              </button>
            </div>

            <div className="flex items-center mt-8">
              <button  type="button" onClick={handleLoginRedirect} className="bg-main-red text-main-white text-lg rounded-lg h-12 w-64">
                Log in
              </button> 
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
