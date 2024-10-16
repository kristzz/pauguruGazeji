'use client'; // Enable client-side functionality

import React, { useState } from 'react';
import api from '../axios'; 
import Link from 'next/link'; // Ensure Link is imported if you're using Next.js

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('userToken', response.data.token);

      // Optionally redirect the user to a different page after login
      // window.location.href = '/dashboard'; // Replace with your desired route
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main className="relative">
      <div className="bg-main-red h-screen w-screen flex justify-center items-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="bg-main-blue w-60 h-16 rounded-b-xl hidden sm:w-72 sm:h-24 sm:block xl:w-[600px]"></div>
          <div className="absolute bg-main-white w-8 h-60 rounded-s-xl right-0 top-64 hidden sm:w-24 sm:h-72 sm:block"></div>
          <div className="absolute bg-main-white w-12 h-32 rounded-e-xl left-0 top-52 hidden sm:w-20 sm:h-64 sm:block xl:top-40"></div>
          <div className="absolute bg-main-blue w-8 h-32 rounded-e-xl left-0 bottom-36 hidden sm:w-16 sm:h-40 sm:bottom-44 sm:block xl:bottom-32"></div>
          <div className="absolute bg-main-white w-40 h-16 rounded-tr-xl bottom-0 left-0 hidden sm:w-48 sm:h-20 sm:block"></div>
          <div className="absolute bg-main-blue w-28 h-24 rounded-tl-xl bottom-0 right-0 hidden sm:w-40 sm:h-32 sm:block"></div>
        </div>

        {/* Signin Form */}
        <form
          className="relative z-10 flex flex-col items-center bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleLogin}
          method="post"
        >
          <h2 className="text-2xl mb-6">Sign In</h2>
          <input
            className="h-12 w-64 mt-4 mb-4 rounded-lg p-4 border border-gray-300"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="h-12 w-64 my-4 rounded-lg p-4 border border-gray-300"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mb-4 w-full text-right">
            <Link href="/forgot" className="text-main-blue">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64 hover:bg-main-blue-dark transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
