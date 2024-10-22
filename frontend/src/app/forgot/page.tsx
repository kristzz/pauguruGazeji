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
    <main>
      <div className="bg-main-red h-screen w-screen">
        <div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              className={`h-12 w-64 mt-24 mb-4 rounded-lg p-4 ${error ? 'border-red-500' : ''}`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center mt-8">
              <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64">
                Reset Password
              </button>
            </div>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-main-white mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
