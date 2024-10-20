'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationsSettings() {
    const [settings, setSettings] = useState({
        email_notifications: false,
        push_notifications: false,
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/settings', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                });
                setSettings(response.data || { // Handle the case when response.data is null
                    email_notifications: false,
                    push_notifications: false,
                });
            } catch (error) {
                console.error('Error fetching settings:', error);
                setErrorMessage('Failed to fetch settings.');
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/settings', settings, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
        } catch (error: unknown) {
            console.error('Error saving settings:', error);
        }
    };
    

    return (
        <main className="flex flex-col space-y-6 p-4">
            <div>
                <h3 className="text-2xl font-bold">Notifications</h3>
                <p className="text-gray-700">Manage your notifications here</p>
                {errorMessage && <p className="text-red-600">{errorMessage}</p>} {/* Display error message */}
            </div>
            <form className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded"
                        checked={settings.email_notifications}
                        onChange={() => setSettings({ ...settings, email_notifications: !settings.email_notifications })}
                    />
                    <label className="ml-2 flex flex-col">
                        <span>Email Notifications</span>
                        <span className="text-gray-600">Receive email notifications</span>
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded"
                        checked={settings.push_notifications}
                        onChange={() => setSettings({ ...settings, push_notifications: !settings.push_notifications })}
                    />
                    <label className="ml-2 flex flex-col">
                        <span>Push Notifications</span>
                        <span className="text-gray-600">Receive push notifications</span>
                    </label>
                </div>
                <button
                    type="button"
                    className="bg-main-blue text-main-white rounded-md px-4 py-2 hover:opacity-95 transition duration-200"
                    onClick={handleSave}
                >
                    Save
                </button>
            </form>
        </main>
    );
}
