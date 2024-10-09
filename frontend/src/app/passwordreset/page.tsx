'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');


  useEffect(() => {
    // Retrieve token and email from the query parameters in the URL
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    const emailFromUrl = queryParams.get('email');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);  // Set token
    }
    if (emailFromUrl) {
      setEmail(emailFromUrl);  // Prefill email
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      setMessage('Passwords do not match or are empty');
      return;
    }

    try {
      // Make the API request to reset the password
      await axios.post('http://127.0.0.1:8000/api/reset-password', {
        email,
        password,
        password_confirmation: confirmPassword,
        token,  // Include token in the request
      });
      setMessage('Password reset successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <main>
      <div className="bg-main-red h-screen w-screen flex justify-center items-center">
        <div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            
            <input
              className="h-12 w-64 mb-4 rounded-lg p-4"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="h-12 w-64 mb-4 rounded-lg p-4"
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              className="h-12 w-64 mb-4 rounded-lg p-4"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="flex items-center mt-8">
              <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64">
                Reset Password
              </button>
            </div>

            {message && <p className="mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
