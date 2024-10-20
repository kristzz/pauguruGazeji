'use client';
import { useState } from 'react';
import axios from 'axios';

export default function CreateSubject() {
    const [subjectName, setSubjectName] = useState('');  // State to hold the subject name
    const [message, setMessage] = useState('');  // State to hold success or error message

    const handleInputChange = (e) => {
        setSubjectName(e.target.value);  // Update the subject name as user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the form from submitting the traditional way

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/createSubject', {
                name: subjectName
            }, {
            });

            setMessage(response.data.message);  // Set the success message
            setSubjectName('');  // Reset the input field after successful creation
        } catch (error) {
            console.error('Error creating subject:', error);
            setMessage('Failed to create subject. Please try again.');  // Handle error case
        }
    };

    return (
        <main>
            <div className="bg-main-red h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[65%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            name="name"
                            value={subjectName}
                            onChange={handleInputChange}  // Handle input change
                            placeholder="Name"
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
                    {message && <p className="text-center mt-4">{message}</p>}  {/* Display success/error message */}
                </div>
            </div>
        </main>
    );
}
