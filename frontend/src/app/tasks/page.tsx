'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Tasks() {
    const router = useRouter();
    const [profile, setProfile] = useState({ user: { id: '', name: '', email: '', role: '' } });
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [boxPosition, setBoxPosition] = useState(0);
    const [task_id, settask_id] = useState(0);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('userToken'); // Get the token from local storage
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request
                    }
                });
                setProfile(response.data.data);
                console.log(response.data.data) // Update profile with user data (including role)
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('userToken'); // Get the token from local storage
                const response = await axios.get('http://127.0.0.1:8000/api/getUserTasks', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request
                    }
                });
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchUserProfile();
        fetchTasks();
    }, []);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart !== null) {
            const distance = e.targetTouches[0].clientX - touchStart;
            setBoxPosition(distance); // Move box based on touch movement
        }
    };

    const handleTouchEnd = () => {
        if (touchStart !== null && touchEnd !== null) {
            const distance = touchEnd - touchStart;

            if (distance > 150) {
                console.log('swiped right');
                handleSwipeRight();
                setCurrentIndex((prevIndex) => (prevIndex < tasks.length - 1 ? prevIndex + 1 : prevIndex));
               
            } else if (distance < -150) {
                console.log('swiped left');
                setCurrentIndex((prevIndex) => (prevIndex < tasks.length - 1 ? prevIndex + 1 : prevIndex));
            }
        }
        setTouchStart(null);
        setTouchEnd(null);
        setBoxPosition(0); // Reset box position after swiping
    };

    const currentTask = tasks.length > 0 ? tasks[currentIndex] : null; // Get the current task based on index

    const handleSwipeRight = async () => {
        try {
            const token = localStorage.getItem('userToken'); // Get the token from local storage
            const response = await axios.post('http://127.0.0.1:8000/api/convertTaskToMessage', {
                task_id: currentTask.task_id, 
                sender: 'app'
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`  
                }
            }
            );
            router.push('messages');
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleCreateTask = () => {
        router.push('/data-entry/create-task') 
    };
    const handleCreateSubject = () => {
        router.push('/data-entry/create-subject') 
    };
    const handleCreateSubjectMatter = () => {
        router.push('/data-entry/create-subject-matter') 
    };

    return (
        <main className='bg-main-blue overflow-hidden h-screen w-screen absolute'>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center absolute overflow-hidden">
            <Link href="/profile" className="absolute top-4 left-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </Link>
            <Link href="/messages" className="absolute right-4 top-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            </Link>
                <div className='flex flex-row '>
                    {profile.user.role === 'admin' && ( 
                        
                        <button 
                            className="bg-main-blue text-white px-4 py-2 rounded-lg top-10 m-1 relative"
                            onClick={handleCreateTask}
                        >
                            New Task
                        </button>
                    )}
                    {profile.user.role === 'admin' && ( 
                        
                        <button 
                            className="bg-main-blue text-white px-4 py-2 rounded-lg m-1 top-10 relative"
                            onClick={handleCreateSubject}
                        >
                            New Subject
                        </button>
                    )}
                    {profile.user.role === 'admin' && ( 
                        
                        <button 
                            className="bg-main-blue text-white px-4 py-2 rounded-lg top-10 m-1 relative"
                            onClick={handleCreateSubjectMatter}
                        >
                            New Matter
                        </button>
                    )}

                </div>
                <div
                    className="bg-main-white w-[65%] h-[50%] shadow-2xl absolute top-[20%] rounded-lg align-center border-2"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ transform: `translateX(${boxPosition}px)`, transition: 'none' }}
                >
                    {currentTask ? (
                        <>
                            <div className="text-black mt-3 relative text-lg text-center">{currentTask.task_name}</div>
                            <div className="text-black mt-3 relative text-lg text-center">{currentTask.task_description}</div>
                        </>
                    ) : (
                        <div className="text-black mt-3 relative text-lg text-center">No tasks available</div>
                    )}
                </div>
            </div>
        </main>
    );
}
