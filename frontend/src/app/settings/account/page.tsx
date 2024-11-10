'use client'
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      alert(response.data.message);
      router.push("/login");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await axios.delete('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Replace with your token logic
          },
        });

        alert(response.data.message);
        router.push("/login");
      } catch (error) {
        console.error('Error during account deletion:', error);
      }
    }
  };

  return (
    <main className="flex flex-col space-y-4">
      <h3 className="text-2xl font-bold">Account security</h3>
      <div>
        <p>Change your password here!</p>
          <Link href="/forgot" className="text-sm underline mt-2">
            Proceed to password change
          </Link>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">More</h3>
        <div className="flex justify-around mt-4">
          <button
            className="bg-main-blue text-main-white rounded-xl px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-main-red text-main-white rounded-xl px-4 py-2"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
        </div>
      </div>
    </main>
  );
}
