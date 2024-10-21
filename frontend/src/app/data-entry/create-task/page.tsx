'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function createTask() {
    const [taskName, setTaskName] = useState(''); 
    const [subjectMatterName, setSubjectMatterName] = useState(''); 
    const [taskDescription, setTaskDescription] = useState(''); 
    const [taskAnswer, setTaskAnswer] = useState(''); 
    const [message, setMessage] = useState('');  

    const token = localStorage.getItem('userToken');
        if (!token) {
            setMessage('Unauthorized: No token found.');
            return;
        }

   
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value); 
    };

  
    const handleSubjectMatterNameChange = (e) => {
        setSubjectMatterName(e.target.value); e
    };

      
    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value); e
    };

    const handleTaskAnswerChange = (e) => {
        setTaskAnswer(e.target.value); e
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  

        try {
         
            const Subjectresponse = await axios.post('http://127.0.0.1:8000/api/getSubjectMatterByName', {
                name: subjectMatterName
            });
            console.log(Subjectresponse.data);
            const subjectMatterId = Subjectresponse.data.id; 


            const response = await axios.post('http://127.0.0.1:8000/api/createTask', {
                name: subjectMatterName,  
                subject_matter_id: subjectMatterId ,
                task_description: taskDescription,
                taskAnswer: taskAnswer  
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`  
                }
            }
            );
            console.log(response.data);

            setMessage(response.data.message);  
            setTaskName('');  
            setSubjectMatterName(''); 
            setTaskDescription('');   
            setTaskAnswer('');  
        } catch (error) {
            console.error('Error creating subject:', error);
            setMessage('Failed to create subject matter. Please try again.');  
        }
    };

    
    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2 text-center p-2">
                Create Task
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            name="taskName"
                            value={taskName}
                            onChange={handleTaskNameChange}  
                            placeholder="Task Name"
                            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
                            required
                        />
                        
                        <input
                            type="text"
                            name="subjectMatterName"
                            value={subjectMatterName}
                            onChange={handleSubjectMatterNameChange} 
                            placeholder="Subject Matter Name"
                            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
                            required
                        />

                        <input
                            type="text"
                            name="taskDescription"
                            value={taskDescription}
                            onChange={handleTaskDescriptionChange} 
                            placeholder="Task description"
                            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
                            required
                        />

                        <input
                            type="text"
                            name="taskAnswer"
                            value={taskAnswer}
                            onChange={handleTaskAnswerChange} 
                            placeholder="Task answer"
                            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
                            required
                        />
                        
                        <button
                            type="submit"
                            className="bg-main-blue text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Create Task
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
