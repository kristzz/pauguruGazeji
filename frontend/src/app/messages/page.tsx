"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import api from '../axios'; 

interface SubjectWithMessage {
    subject: string;
    last_message: string; 
    created_at: string;
}

const VALID_SUBJECTS = [
    "Math", "Latvian", "English", "Geometry", "Algebra", 
    "Chemistry", "Biology", "Physics", "Geography", 
    "Art", "History", "Programming", "Literature", 
    "Sports", "Business"
];

export default function Messages() {
    const [subjectsWithMessages, setSubjectsWithMessages] = useState<SubjectWithMessage[]>([]);
    const [error, setError] = useState<string | null>(null);  
    const [loading, setLoading] = useState<boolean>(true);    
    const [searchQuery, setSearchQuery] = useState<string>(""); 
    const router = useRouter();

    const fetchSubjectsWithMessages = async () => {
        const token = localStorage.getItem('userToken'); 
    
        if (!token) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await api.get('/api/getSubjectsWithLastMessages', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if(response.data.status){
                setSubjectsWithMessages(response.data.data);
            } else {
                setError('Failed to load subjects.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load subjects.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchSubjectsWithMessages(); 
    }, []);

    const handleSubjectClick = (subject: string) => {
        router.push(`/chat?subject=${encodeURIComponent(subject)}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); 
    };

    const truncateMessage = (message: string) => {
        return message.length > 60 ? `${message.substring(0, 57)}...` : message;
    };

    const filteredSubjects = subjectsWithMessages.filter(subjectObj =>
        VALID_SUBJECTS.includes(subjectObj.subject) && 
        subjectObj.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="bg-white h-screen w-screen flex flex-col items-center">
            <div className="bg-white text-white h-[10%] w-full flex border-b-[5px] border-black items-center justify-center">
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
                    <p>Loading subjects...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ul className="mt-4 space-y-2">
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((subjectObj) => (
                                <li
                                    key={subjectObj.subject}
                                    className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSubjectClick(subjectObj.subject)}
                                >
                                    <img
                                        src={`https://via.placeholder.com/50?text=${subjectObj.subject.charAt(0)}`} 
                                        alt={subjectObj.subject}
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    <div className="flex-1 flex items-center justify-between"> 
                                        <div className="flex-1 flex justify-start">
                                            <h3 className="font-semibold w-48">{subjectObj.subject}</h3> 
                                            <span 
                                                className="text-gray-600 mx-4"
                                                style={{ maxWidth: 'calc(100% - 100px)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                            >
                                                {truncateMessage(subjectObj.last_message)}
                                            </span>
                                        </div>
                                        <span className="text-gray-400 text-sm">
                                            {new Date(subjectObj.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">No subjects found</li>
                        )}
                    </ul>
                )}
            </div>
        </main>
    );
}
