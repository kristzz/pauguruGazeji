'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Profile() {
    const [profile, setProfile] = useState({  user: { name: '', email: '' }, about_user: { points: 0, level_of_education:'' }  });
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
            <div className="flex">
                <Link href="/tasks" className="p-2 fixed top-4 left-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>

                <Link href="settings/account" className="p-2 fixed top-4 right-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link>
            </div>
            
            <div className=" rounded-lg p-8 w-full max-w-md mx-auto">
                {/* Profile Header */}
                <div className="text-center mb-6 mt-12">
                    <h1 className="text-3xl font-semibold text-main-blue">{profile.user.name}</h1>
                    <p className="text-gray-600 mt-2">{profile.user.email}</p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Profile Details */}
                <div className="space-y-4 text-center">
                    <p className="text-gray-700">{profile.about_user.level_of_education}</p>
                    <p className="text-gray-700">Points: {profile.about_user.points}</p>
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
