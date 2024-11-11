"use client";
import React, { useState, useEffect } from 'react';
import api from '../axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Message {
    id: number;
    content: string;
    created_at: string;
    task_answer: string | null;
    solved?: boolean;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentBlueMessageIndex, setCurrentBlueMessageIndex] = useState<number | null>(null);
    const [solvedMessageIds, setSolvedMessageIds] = useState<Set<number>>(new Set());
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false); 
    const [isChatInputVisible, setIsChatInputVisible] = useState<boolean>(true);  // Track if the chat input is visible
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('task_id') || '';

    // Fetch messages from localStorage or API
    const printMessages = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }
    
        const savedMessages = localStorage.getItem(`messages-${taskId}`);
        if (savedMessages) {
            const allMessages = JSON.parse(savedMessages);
            setMessages(allMessages);
    
            // Check for any message with "Correct answer!"
            const correctAnswerMessage = allMessages.find(msg => msg.content === "Correct answer!");
            if (correctAnswerMessage) {
                setIsChatInputVisible(false);  // Hide chat input if "Correct answer!" is found
            }
    
            // Find the first unsolved blue message to focus on
            const blueMessages = allMessages.filter(msg => msg.task_answer && !solvedMessageIds.has(msg.id));
            if (blueMessages.length > 0) {
                const firstBlueIndex = allMessages.findIndex(msg => msg.id === blueMessages[0].id);
                setCurrentBlueMessageIndex(firstBlueIndex);
            } else {
                setCurrentBlueMessageIndex(null);
            }
            setLoading(false);
        } else {
            try {
                const response = await api.get('/api/getMessagesByTaskId', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { task_id: taskId }
                });
                const allMessages = response.data.messages;
                setMessages(allMessages);
                localStorage.setItem(`messages-${taskId}`, JSON.stringify(allMessages));
    
                // Check for any message with "Correct answer!"
                const correctAnswerMessage = allMessages.find(msg => msg.content === "Correct answer!");
                if (correctAnswerMessage) {
                    setIsChatInputVisible(false);  // Hide chat input if "Correct answer!" is found
                }
    
                const blueMessages = allMessages.filter(msg => msg.task_answer && !solvedMessageIds.has(msg.id));
                if (blueMessages.length > 0) {
                    const firstBlueIndex = allMessages.findIndex(msg => msg.id === blueMessages[0].id);
                    setCurrentBlueMessageIndex(firstBlueIndex);
                } else {
                    setCurrentBlueMessageIndex(null);
                }
            } catch (error) {
                console.error('Fetching messages failed:', error);
                setError('Failed to load messages.');
                setLoading(false);
            }
        }
    };
    
const postMessage = async () => {
    if (newMessage.trim() === '') return;

    const token = localStorage.getItem('userToken');
    if (!token) {
        setError('User is not logged in.');
        return;
    }

    const userMessage = {
        id: Date.now(),
        content: newMessage,
        created_at: new Date().toISOString(),
        task_answer: null
    };
    setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, userMessage];
        localStorage.setItem(`messages-${taskId}`, JSON.stringify(updatedMessages)); 
        return updatedMessages;
    });

    try {
        const currentMessage = messages[currentBlueMessageIndex!];
        const correctAnswer = currentMessage?.task_answer?.toLowerCase();

        // Check if the answer is correct
        if (correctAnswer && correctAnswer === newMessage.toLowerCase()) {
            setIsAnswerCorrect(true);  // Answer is correct
            setIsChatInputVisible(false);  // Hide chat input permanently

            const feedbackMessage = {
                id: Date.now() + 1,
                content: "Correct answer!",
                created_at: new Date().toISOString(),
                task_answer: null
            };
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, feedbackMessage];
                localStorage.setItem(`messages-${taskId}`, JSON.stringify(updatedMessages)); 
                return updatedMessages;
            });

            // After posting "Correct answer!", hide the chat input
            setNewMessage(''); 

            // Check if the correct answer message has been added
            setTimeout(() => {
                // Re-check the latest messages to see if "Correct answer!" was added
                const lastMessage = messages[messages.length - 1];
                if (lastMessage?.content === "Correct answer!") {
                    setIsChatInputVisible(false);
                }
            }, 500);  // Small timeout to ensure message is added before check

            api.post('/api/markMessageAsSolved', { id: currentMessage.id }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setSolvedMessageIds(prev => new Set(prev).add(currentMessage.id));
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === currentMessage.id ? { ...msg, solved: true } : msg
                    )
                );

                // Save updated messages to localStorage after state update
                setMessages(prevMessages => {
                    const updatedMessages = prevMessages;
                    localStorage.setItem(`messages-${taskId}`, JSON.stringify(updatedMessages));
                    return updatedMessages;
                });

                const blueMessages = messages.filter(msg => msg.task_answer && !solvedMessageIds.has(msg.id));
                if (blueMessages.length > 0) {
                    const nextBlueIndex = messages.findIndex(msg => msg.id === blueMessages[0].id);
                    setCurrentBlueMessageIndex(nextBlueIndex);
                } else {
                    setCurrentBlueMessageIndex(null);
                    const finalMessage = {
                        id: Date.now() + 2,
                        content: "Congratulations! You have solved all tasks.",
                        created_at: new Date().toISOString(),
                        task_answer: null
                    };
                    setMessages(prevMessages => {
                        const updatedMessages = [...prevMessages, finalMessage];
                        localStorage.setItem(`messages-${taskId}`, JSON.stringify(updatedMessages)); 
                        return updatedMessages;
                    });
                }
            })
            .catch(error => {
                console.error('Failed to mark message as solved:', error);
                setError('Failed to mark message as solved.');
            });
        } else {
            const feedbackMessage = {
                id: Date.now() + 1,
                content: "Incorrect answer. Try again.",
                created_at: new Date().toISOString(),
                task_answer: null
            };
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, feedbackMessage];
                localStorage.setItem(`messages-${taskId}`, JSON.stringify(updatedMessages));
                return updatedMessages;
            });
            setNewMessage('');
        }
    } catch (error) {
        console.error('Posting message failed:', error);
        setError('Failed to post message.');
    }
};


    useEffect(() => {
        printMessages();
    }, [taskId]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') postMessage();
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
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col w-full p-2 m-1 rounded-md text-black ${msg.task_answer ? 'bg-blue-200' : 'bg-gray-100'}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 pr-4 overflow-hidden">
                                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                    </div>
                                    <span className="text-gray-400 text-sm whitespace-nowrap ml-2 self-end">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat input is visible only if the answer is not correct */}
            {isChatInputVisible && !isAnswerCorrect && (
                <div id="input-area" className="flex bg-white items-center justify-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-[80%] p-2 border rounded-md"
                        placeholder="Type your answer..."
                    />
                    <button onClick={postMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">Send</button>
                </div>
            )}
        </main>
    );
}
