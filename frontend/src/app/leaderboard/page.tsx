    'use client';


    import { useEffect, useState } from 'react';

    const Leaderboard = () => {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

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
                    setUsers(data.data);
                } catch (error) {
                    setError(error.message);
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className='w-screen h-screen bg-main-blue items-center relative flex flex-col'>
                <div className='bg-main-white border-main-red border-4 w-[70%] h-[90%] rounded-lg mt-10'>
                    <table >
                        <thead>
                            <tr className='mt-10'>
                                <th className='pl-5 pt-5'>User ID</th>
                                <th className=' pt-5'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className='pl-6'>{user.id}</td>
                                    <td className='pl-6'>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    
            </div>
        );
    };

    export default Leaderboard;
