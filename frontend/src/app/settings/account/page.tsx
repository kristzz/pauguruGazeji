'use client'
import React from 'react';

export default function Settings() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        // Optionally, redirect or perform any cleanup after logout
      } else {
        alert(data.error || 'Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
          },
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message); // Show success message
          // Optionally, redirect or perform any cleanup after account deletion
        } else {
          alert(data.error || 'Failed to delete account');
        }
      } catch (error) {
        console.error('Error during account deletion:', error);
        alert('Account deletion failed');
      }
    }
  };

  return (
    <main className="flex flex-col space-y-4">
      <h3 className="text-2xl font-bold">Account security</h3>
      <div>
        <p>Change your password here!</p>
        <button className="text-sm underline mt-2">Proceed to password change</button>
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
