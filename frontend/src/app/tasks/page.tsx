'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
