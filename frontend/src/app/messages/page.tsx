"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import api from '../axios'; 
import Link from 'next/link';

interface Message {
    id: number;
    content: string;
    created_at: string;
    subject: string;
    task_answer: string;
    sender: string;
    task_id: string;
}

const VALID_SUBJECTS = [
    "Math", "Latvian", "English", "Geometry", "Algebra",
    "Chemistry", "Biology", "Physics", "Geography",
    "Art", "History", "Programming", "Literature",
    "Sports", "Business"
];

export default function Messages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const router = useRouter();

    const fetchMessages = async () => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('http://127.0.0.1:8000/api/getUserMessages', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status) {
                setMessages(response.data);
            } else {
                setError('Failed to load messages.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load messages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();

    }, []);

    const handleTaskClick = (taskId: string) => {
        router.push(`/chat?task_id=${encodeURIComponent(taskId)}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredMessages = messages.filter(message =>
        VALID_SUBJECTS.includes(message.subject) &&
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedMessages = filteredMessages.reduce((acc, message) => {
        if (!acc[message.subject]) {
            acc[message.subject] = [];
        }
        acc[message.subject].push(message);
        return acc;
    }, {} as { [subject: string]: Message[] });

    return (
        <main className="bg-white h-screen w-screen flex flex-col items-center">
            <div className="bg-white text-white h-[10%] w-full flex border-b-[5px] border-black items-center justify-center">
                <Link href="/tasks" className="fixed my-auto left-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-white text-black px-4 py-2 w-[80%] border-2 border-black rounded-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="bg-white h-[80%] w-full flex flex-col overflow-y-scroll border-b-[5px] border-black">
                {loading ? (
                    <p>Loading messages...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {Object.keys(groupedMessages).length > 0 ? (
                            Object.keys(groupedMessages).map(subject => (
                                <div key={subject} className="p-4 border-b">
                                    <h3 className="font-semibold text-lg">
                                        {subject}
                                    </h3>
                                    <ul className="mt-2 space-y-2">
                                        {groupedMessages[subject].map((message) => (
                                            <li 
                                                key={message.id} 
                                                className="flex items-start p-2 border rounded cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleTaskClick(message.task_id)}
                                            >
                                                <img
                                                    src={`https://via.placeholder.com/50?text=${subject.charAt(0)}`}
                                                    alt={subject}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-gray-700">{message.content}</p>
                                                    <span className="text-gray-400 text-xs">
                                                        {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No messages found</p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
