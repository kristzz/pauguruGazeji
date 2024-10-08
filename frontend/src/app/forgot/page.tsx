"use client";

import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      setMessage('Password reset link sent to your email');
    } catch (error) {
      setMessage('Error sending reset link');
    }
  };

  return (
    <main>
      <div className="bg-main-red h-screen w-screen">
        <div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              className="h-12 w-64 mt-24 mb-4 rounded-lg p-4"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center mt-8">
              <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64">
                Send kaut ko
              </button>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
