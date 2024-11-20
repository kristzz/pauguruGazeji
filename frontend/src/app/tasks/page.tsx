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
    const [boxPosition, setBoxPosition] = useState(0);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://127.0.0.1:8000/api/getUserTasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchUserProfile();
        fetchTasks();
    }, []);

    const handleRightArrowClick = async () => {
        if (currentIndex < tasks.length - 1) {
            setBoxPosition(100); 
            setTimeout(() => {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setBoxPosition(0); 
            }, 300); 
        }
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/convertTaskToMessage',
                {
                    task_id: tasks[currentIndex]?.task_id, 
                    sender: 'app',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push('messages');
        } catch (error) {
            console.error('Error converting task:', error);
        }
    };

    const handleLeftArrowClick = () => {
        if (currentIndex < tasks.length - 1) {
            setBoxPosition(-100); 
            setTimeout(() => {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setBoxPosition(0); 
            }, 300); 
        }
    };

    const currentTask = tasks[currentIndex];

    const handleCreateTask = () => {
        router.push('/data-entry/create-task');
    };
    const handleCreateSubject = () => {
        router.push('/data-entry/create-subject');
    };
    const handleCreateSubjectMatter = () => {
        router.push('/data-entry/create-subject-matter');
    };

    return (
        <main className="bg-main-blue overflow-hidden h-screen w-screen absolute">
            <div className="bg-main-red h-screen w-screen flex flex-col items-center absolute overflow-hidden">
                <Link href="/profile" className="absolute top-4 left-4">
                    {/* Profile SVG */}
                </Link>
                <Link href="/messages" className="absolute right-4 top-4">
                    {/* Messages SVG */}
                </Link>
                <div className="flex flex-row ">
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
                    style={{
                        transform: `translateX(${boxPosition}px)`,
                        transition: 'transform 0.3s ease',
                    }}
                >
                    {currentTask ? (
                        <>
                            <div className="text-black mt-3 relative text-lg text-center">
                                {currentTask.task_name}
                            </div>
                            <div className="text-black mt-3 relative text-lg text-center">
                                {currentTask.task_description}
                            </div>
                        </>
                    ) : (
                        <div className="text-black mt-3 relative text-lg text-center">
                            No tasks available
                        </div>
                    )}
                </div>
                <div className="flex flex-row absolute bottom-10">
                    <button
                        className="bg-main-blue text-white px-4 py-2 rounded-lg mx-2"
                        onClick={handleLeftArrowClick}
                        
                    >
                        Left
                    </button>
                    <button
                        className="bg-main-blue text-white px-4 py-2 rounded-lg mx-2"
                        onClick={handleRightArrowClick}
                        
                    >
                        Right
                    </button>
                </div>
            </div>
        </main>
    );
}
