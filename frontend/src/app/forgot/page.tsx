"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.toLowerCase();

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError('Invalid email format');
      setTimeout(() => setError(''), 2000); // Error disappears after 2 seconds
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/forgot-password', {  email: normalizedEmail  });
      setMessage('Password reset link sent to your email');
      alert('Please check your email for the password reset link.');
      
      // Redirect to the login page after alert
      setTimeout(() => {
        router.push('/login');
      }, 2000); // 2-second delay before redirecting
    } catch (error) {
      // Error handling for non-existent email or other server issues
      if (error.response && error.response.status === 404) {
        setError('Email does not exist in our records');
      } else {
        setError('Error sending reset link, please try again');
      }

      setTimeout(() => setError(''), 2000); // Error disappears after 2 seconds
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen">
      <div id="passwordResetSection" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl text-center mt-16">Reset Password</p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-64 mt-8 rounded-lg p-4 border-2 border-main-blue"
            required
          />
          <button type="submit" className="bg-main-red text-main-white text-lg rounded-lg h-12 w-52 mt-24">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
