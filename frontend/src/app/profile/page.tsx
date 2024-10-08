'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('userToken'); 
                if (token) {
                    const response = await axios.get('http://localhost:8000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProfile(response.data.data); 
                } else {
                    console.error("User is not authenticated.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
        
    if (loading) {
        return(
            <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2 text-center justify-center ">
                    Loading...
                </div>
            </div>
            </main>
        );
    }
    
    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2">
                    <div className="text-black mt-5 relative text-2xl text-center">{profile.name}</div>
                    <div className="text-black mt-5 relative text-lg text-center">{profile.email}</div>
                    <div className="text-black mt-3 relative text-lg text-center">High School Education</div>
                    <div className="text-black mt-3 relative text-lg text-center">Points: 204</div>
                    <div className="text-black mt-8 relative text-lg text-center underline cursor-pointer">Certificates</div>
                    <div className="text-black mt-3 relative text-lg text-center underline cursor-pointer">Statistics</div>
                </div>
            </div>
        </main>
    );
}
