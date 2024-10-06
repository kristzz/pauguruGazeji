'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [profile, setProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        // Fetch the profile data when the component mounts
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage
                if (token) {
                    const response = await axios.get('http://localhost:8000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProfile(response.data.data); // Assuming 'data' is where the user info is
                } else {
                    console.error("User is not authenticated.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <main>
            <div className="bg-main-white h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[50%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2 border-main-red">
                    <div className="text-main-red mt-5 relative text-2xl text-center">{profile.name}</div>
                    <div className="text-main-red mt-5 relative text-lg text-center">{profile.email}</div>
                    <div className="text-main-red mt-3 relative text-lg text-center">High School Education</div>
                    <div className="text-main-red mt-3 relative text-lg text-center">Points: 204</div>
                    <div className="grid grid-cols-3 place-items-center absolute w-full inset-x-0 bottom-14">
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                    </div>
                    <div className="grid grid-cols-3 w-full text-center absolute inset-x-0 bottom-6">
                        <div className="text-main-red">Settings</div>
                        <div className="text-main-red">Certificates</div>
                        <div className="text-main-red">Statistics</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
