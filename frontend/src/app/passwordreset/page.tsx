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

    // Password validation
    if (!password || password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
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

      // Display success alert and redirect to login page
      alert('Password reset successfully. You will be redirected to the login page.');
      window.location.href = '/login';  // Redirect to the login page
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

            {message && <p className="mt-4 text-main-white">{message}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
