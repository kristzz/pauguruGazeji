'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Define a type for the user data
interface User {
    id: number;
    email: string;
    name: string;
    points: number;
}

const Leaderboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/countsUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data.data); // Use proper type-safe access
            } catch (err) {
                setError((err as Error).message); // Cast err to Error to get the message
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
        return <div className="text-center text-main-red">Error: {error}</div>; // Use 'main-red' for error messages
    }

    return (
        <div className="w-screen h-screen bg-main-blue flex justify-center">
            <div className="bg-main-white shadow-lg border border-gray-200 rounded-lg w-screen p-4 md:p-6 overflow-x-auto">
                <div className="flex">
                    {/* Back Button */}
                    <Link href="/tasks" className="p-2 fixed top-4 left-4 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                </div>
                
                
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 mt-8 text-black">Leaderboard</h2>
                
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-600 uppercase text-xs md:text-sm leading-normal">
                            <th className="py-2 md:py-3 px-4 md:px-6">Rank</th>
                            <th className="py-2 md:py-3 px-4 md:px-6">Points</th>
                            <th className="py-2 md:py-3 px-4 md:px-6">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 md:py-3 px-4 md:px-6 text-gray-800">{index + 1}</td>
                                <td className="py-2 md:py-3 px-4 md:px-6 text-black">{user.points}</td>
                                <td className="py-2 md:py-3 px-4 md:px-6 text-black">{user.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
