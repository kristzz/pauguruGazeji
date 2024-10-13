'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [boxPosition, setBoxPosition] = useState(0); 

    useEffect(() => {
        
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tasks'); 
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const changeTask = () => {
        if (tasks.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
        }
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart !== null) {
            const distance = e.targetTouches[0].clientX - touchStart;
            setBoxPosition(distance); 
        }
    };

    const handleTouchEnd = () => {
        if (touchStart !== null && touchEnd !== null) {
            const distance = touchEnd - touchStart;

            if (distance > 50) {
                console.log("Task has been selected");
                changeTask();
            } else if (distance < -50) {
                if (tasks.length > 0) {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
                }
            }
        }
        setTouchStart(null);
        setTouchEnd(null);
        setBoxPosition(0); 
    };


    const currentTask = tasks.length > 0 ? tasks[currentIndex] : null;

    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div 
                    className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ transform: `translateX(${boxPosition}px)`, transition: 'none' }} 
                >
                    {currentTask ? (
                        <>
                            <div className="text-black mt-3 relative text-lg text-center">{currentTask.name}</div>
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
