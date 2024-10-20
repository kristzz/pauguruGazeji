'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Tasks() {
    const [profile, setProfile] = useState({ id: '', name: '', email: '' });
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [boxPosition, setBoxPosition] = useState(0);

    useEffect(() => {
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

    return (
        <main className='bg-main-blue overflow-hidden h-screen w-screen absolute'>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center absolute overflow-hidden">
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
