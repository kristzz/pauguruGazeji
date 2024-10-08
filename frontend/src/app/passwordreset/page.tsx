'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const searchParams = useSearchParams();

  // Initialize token and email from query params
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Use useEffect to set the email and token from searchParams once available
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (tokenParam) setToken(tokenParam);
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      setMessage('Passwords do not match or are empty');
      return;
    }

    try {
      // Make the API request to reset the password
      await axios.post('http://127.0.0.1:8000/api/reset-password', {
        email, // Email from state
        password,
        password_confirmation: confirmPassword,
        token, // Token from state
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
              onChange={(e) => setEmail(e.target.value)} // Allow input in email field
              required
            />
            <input
              className="h-12 w-64 mb-4 rounded-lg p-4"
              type="text"
              id="token"
              name="token"
              placeholder="Enter your reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)} // Allow input in token field
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
