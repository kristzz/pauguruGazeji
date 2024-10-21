"use client";
import React, { useState, useEffect } from 'react';
import api from '../axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Message {
    id: number;
    content: string;
    created_at: string;
    task_answer: string | null; // Include task_answer field
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);  // Messages state
    const [newMessage, setNewMessage] = useState<string>(''); // New message input state
    const [error, setError] = useState<string | null>(null);  // Error state
    const [loading, setLoading] = useState<boolean>(true);    // Loading state
    const router = useRouter();
    const searchParams = useSearchParams(); // For query parameters

    const subject = searchParams.get('subject') || ''; // Get subject from query parameters

    // Fetch messages based on subject
    const printMessages = async () => {
        const token = localStorage.getItem('userToken'); 

        if (!token) {
            setError('User is not logged in.');
            setLoading(false);
            return; 
        }

        try {
            const response = await api.get('/api/getMessageFrom', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    subject // Pass subject as a query parameter
                }
            });
            console.log('Messages:', response.data.messages);  
            setMessages(response.data.messages);  // Set fetched messages
        } catch (error) {
            console.error('Fetching messages failed:', error); 
            setError('Failed to load messages.');
        } finally {
            setLoading(false); // Set loading to false once messages are fetched
        }
    };

    // Post a new message
    const postMessage = async () => {
        if (newMessage.trim() === '') {
            return; 
        }

        const token = localStorage.getItem('userToken'); 

        if (!token) {
            setError('User is not logged in.');
            return; 
        }

        try {
            const response = await api.post('/api/postMessage', {
                content: newMessage,
                subject, // Include the subject when posting the message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log('Message posted:', response.data);

            // Check if the message matches any task_answer from the fetched messages
            const correctMessage = messages.find(msg => msg.task_answer && msg.task_answer.toLowerCase() === newMessage.toLowerCase());

            if (correctMessage) {
                alert('Correct answer!');
            } else if (messages.some(msg => msg.task_answer)) {
                alert('Incorrect answer. Try again.');
            }

            setNewMessage('');  // Clear the input field
            printMessages();    // Re-fetch messages
        } catch (error) {
            console.error('Posting message failed:', error); 
            setError('Failed to post message.');
        }
    };

    // Fetch messages on component load and when the subject changes
    useEffect(() => {
        printMessages();
    }, [subject]); // Re-fetch messages when the subject changes

    // Handle "Enter" key press to send the message
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            postMessage();
        }
    };

    return (
        <main id="logs" className="bg-main-red h-screen w-screen flex flex-col items-center justify-center">
            {/* Back button area */}
            <div id="back-area" className="bg-white text-white h-[10%] w-[100%] flex border-b-[5px] border-black">
                <a href="/messages" id='back-poga' className="bg-white h-[80%] w-[10%] flex ml-[5%] mt-[0.5%] cursor-pointer items-center justify-center border-black border-1px">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </a>
            </div>

            {/* Messages area */}
            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex items-center justify-center">
                <div className="w-[90%] h-full flex flex-col overflow-auto">
                    {loading ? (
                        <p>Loading messages...</p>  // Loading state
                    ) : error ? (
                        <p className="text-red-500">{error}</p> // Error state
                    ) : messages.length > 0 ? (
                        messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex flex-col w-full p-2 m-1 rounded-md text-black ${msg.task_answer ? 'bg-blue-200' : 'bg-gray-100'}`} // Blue background if task_answer exists
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 pr-4 overflow-hidden"> 
                                        <p className="whitespace-pre-wrap break-words">
                                            {msg.content}
                                        </p>
                                    </div>
                                    <span className="text-gray-400 text-sm whitespace-nowrap ml-2 self-end">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages to display</p>
                    )}
                </div>
            </div>

            {/* Input bar for sending messages */}
            <div id="pogu-area" className="bg-white text-white h-[10%] w-[100%] flex border-t-[5px] border-black">
                <div id='chat-bar' className="bg-white h-[60%] w-[90%] flex justify-center items-center ml-[5%] mt-[1%] rounded-lg border-[1px] border-black">
                    <input 
                        type="text" 
                        className="w-full h-full bg-transparent text-left text-black outline-none px-2" 
                        placeholder="Type a message..." 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}  // Update newMessage on change
                        onKeyPress={handleKeyPress}  // Handle Enter key press to send the message
                    />
                </div>
            </div>
        </main>
    );
}
