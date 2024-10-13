'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tasks'); // Adjust the URL if needed
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleCubeClick = () => {
        if (tasks.length > 0) {
            // Update index to show the next task
            setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
        }
    };

    // Get the current task based on the index
    const currentTask = tasks.length > 0 ? tasks[currentIndex] : null;

    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2">
                    {/* Display current task name and description */}
                    {currentTask ? (
                        <>
                            <div className="text-black mt-3 relative text-lg text-center">{currentTask.name}</div>
                            <div className="text-black mt-3 relative text-lg text-center">{currentTask.task_description}</div>
                        </>
                    ) : (
                        <div className="text-black mt-3 relative text-lg text-center">No tasks available</div>
                    )}

                    {/* Single black cube */}
                    <div
                        className='bg-black w-10 h-10 cursor-pointer mx-auto'
                        onClick={handleCubeClick}
                    ></div>
                </div>
            </div>
        </main>
    );
}
