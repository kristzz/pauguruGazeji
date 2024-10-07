"use client"; 
import React, { useState, useEffect } from 'react';
import api from '../axios';

interface Message {
    id: number;
    content: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);  
    const [newMessage, setNewMessage] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null);  
    const [loading, setLoading] = useState<boolean>(true);    

    // mugurpuse
    const printMessages = async () => {
        try {
            const response = await api.get('/api/getMessageFrom', {
                params: { user_id: 11 }
            });
            console.log('Messages:', response.data.messages);  
            setMessages(response.data.messages);               
        } catch (error) {
            console.error('Fetching messages failed:', error); 
            setError('Failed to load messages.');
        } finally {
            setLoading(false); 
        }
    };
    const postMessage = async () => {
        if (newMessage.trim() === '') {
            return;  // ja tuksa zina neko neizdara
        }

        try {
            const response = await api.post('/api/postMessage', {
                user_id: 11,
                content: newMessage,
            });
            
            console.log('Message posted:', response.data);
            setNewMessage('');
            printMessages(); 
        } catch (error) {
            console.error('Posting message failed:', error); 
            setError('Failed to post message.');
        }
    };

    useEffect(() => {
        printMessages();
    }, []);

   
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            postMessage();
        }
    };

    return (
        <main id="logs" className="bg-main-red h-screen w-screen flex flex-col items-center justify-center">
       
            <div id="back-area" className="bg-white text-white h-[10%] w-[100%] flex border-b-[5px] border-black">
                <a href="/messages" id='back-poga' className="bg-white h-[80%] w-[10%] flex ml-[5%] mt-[0.5%] cursor-pointer items-center justify-center border-black border-1px">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </a>
            </div>

          
            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex items-center justify-center">
                <div className="w-[90%] h-full flex flex-col overflow-auto">
                    {loading ? (
                        <p>Loading messages...</p>  
                    ) : error ? (
                        <p className="text-red-500">{error}</p> 
                    ) : messages.length > 0 ? (
                        messages.map((msg) => (
                            <p key={msg.id} className="bg-gray-100 p-2 m-1 rounded-md text-black">
                                {msg.content}  
                            </p>
                        )) 
                    ) : (
                        <p className="text-gray-500">No messages to display</p>
                    )}
                </div>
            </div>

            <div id="pogu-area" className="bg-white text-white h-[10%] w-[100%] flex border-t-[5px] border-black">
                <div id='chat-bar' className="bg-white h-[60%] w-[90%] flex justify-center items-center ml-[5%] mt-[1%] rounded-lg border-[1px] border-black">
                    <input 
                        type="text" 
                        className="w-full h-full bg-transparent text-left text-black outline-none px-2" 
                        placeholder="Type a message..." 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}  
                        onKeyPress={handleKeyPress}  
                    />
                </div>
            </div>
        </main>
    );
}
