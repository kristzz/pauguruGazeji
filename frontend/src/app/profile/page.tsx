'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Profile() {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (token) {
                    const response = await axios.get('http://localhost:8000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile(response.data.data);
                } else {
                    setError("User is not authenticated.");
                }
            } catch (err) {
                setError("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <main className="flex h-screen w-screen items-center justify-center bg-main-white">
                <div className="flex flex-col items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-main-blue h-12 w-12 mb-4"></div>
                    <p className="text-lg text-main-blue">Loading...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex h-screen w-screen items-center justify-center bg-main-white">
                <div className="text-center">
                    <p className="text-2xl text-main-red font-semibold">{error}</p>
                    <p className="text-lg text-main-blue mt-2">Please check your connection or try logging in again.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col space-y-2 h-screen w-screen items-center bg-main-white">
            <div className=" rounded-lg p-8 mt-8 w-full max-w-md mx-auto">
                {/* Profile Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-main-blue">{profile.name}</h1>
                    <p className="text-gray-600 mt-2">{profile.email}</p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Profile Details */}
                <div className="space-y-4 text-center">
                    <p className="text-gray-700">High School Education</p>
                    <p className="text-gray-700">Points: 204</p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Action Buttons */}
                <div className="flex justify-around">
                    <Link href="/certificates">
                        <button className="bg-main-red text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
                            Certificates
                        </button>
                    </Link>
                    <Link href="/leaderboard">
                        <button className="bg-main-blue text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                            Statistics
                        </button>
                    </Link>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-main-blue">Last Activities</h2>
                    <div className="mt-2 p-4 rounded-lg shadow-md">
                        <p className="text-gray-700">Matematika</p>
                        <p className="opacity-70 text-gray-500 text-sm">Triangles</p>
                    </div>
                    <div className="mt-2 p-4 rounded-lg shadow-md">
                        <p className="text-gray-700">Matematika</p>
                        <p className="opacity-70 text-gray-500 text-sm">Triangles</p>
                    </div>
                    <div className="mt-2 p-4 rounded-lg shadow-md">
                        <p className="text-gray-700">Matematika</p>
                        <p className="opacity-70 text-gray-500 text-sm">Triangles</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
