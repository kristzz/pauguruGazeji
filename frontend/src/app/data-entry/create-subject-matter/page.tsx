'use client';
import { useState } from 'react';
import axios from 'axios';

export default function CreateSubject() {
    const [subjectName, setSubjectName] = useState('');  
    const [subjectMatterName, setSubjectMatterName] = useState('');  
    const [message, setMessage] = useState('');  

    const token = localStorage.getItem('userToken');
        if (!token) {
            setMessage('Unauthorized: No token found.');
            return;
        }

   
    const handleSubjectNameChange = (e) => {
        setSubjectName(e.target.value); 
    };

  
    const handleSubjectMatterNameChange = (e) => {
        setSubjectMatterName(e.target.value); e
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  

        try {
         
            const Subjectresponse = await axios.post('http://127.0.0.1:8000/api/getSubjectByName', {
                name: subjectName
            });
            console.log(Subjectresponse.data);
            const subjectId = Subjectresponse.data.id; 


            const response = await axios.post('http://127.0.0.1:8000/api/createSubjectMatter', {
                name: subjectMatterName,  
                subject_id: subjectId    
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`  
                }
            }
            );
            console.log(response.data);

            setMessage(response.data.message);  
            setSubjectName('');  
            setSubjectMatterName('');  
        } catch (error) {
            console.error('Error creating subject:', error);
            setMessage('Failed to create subject matter. Please try again.');  
        }
    };

    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2 p-2 text-center">
                    Create Subject Matters
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            name="subjectName"
                            value={subjectName}
                            onChange={handleSubjectNameChange}  
                            placeholder="Subject Name"
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
                        
                        <button
                            type="submit"
                            className="bg-main-blue text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Create Subject
                        </button>
                    </form>
                      
                </div>
            </div>
        </main>
    );
}
