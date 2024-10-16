<<<<<<< HEAD
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
=======
"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation"; 
export default function Chat() {
    const [people] = useState([
        { id: 1, name: "John Doe", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Alice Johnson", image: "https://via.placeholder.com/50" },
        { id: 4, name: "Bob Brown", image: "https://via.placeholder.com/50" },
        { id: 5, name: "Charlie Davis", image: "https://via.placeholder.com/50" },
        { id: 6, name: "Diana Prince", image: "https://via.placeholder.com/50" },
        { id: 7, name: "Ethan Hunt", image: "https://via.placeholder.com/50" },
        { id: 8, name: "Fiona Gallagher", image: "https://via.placeholder.com/50" },
        { id: 9, name: "George Clooney", image: "https://via.placeholder.com/50" },
        { id: 10, name: "Hannah Montana", image: "https://via.placeholder.com/50" },
    ]);

    const [searchQuery, setSearchQuery] = useState(""); 
    const router = useRouter(); 

    const handlePersonClick = (id: number) => {
        router.push(`/chat?id=${id}`); 
>>>>>>> main
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); 
    };

<<<<<<< HEAD
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
=======
    const filteredPeople = people.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main id="logs" className="bg-white h-screen w-screen flex flex-col items-center justify-center">
            <div id="search-area" className="bg-white text-white h-[10%] w-[100%] flex border-b-[5px] border-black items-center justify-center">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    className="bg-white text-white px-4 py-2 w-[80%] border-2 border-black rounded-lg"
                />
            </div>
            
            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex flex-col overflow-y-scroll border-b-[5px] border-black">
                {filteredPeople.length > 0 ? (
                    filteredPeople.map((person) => (
                        <div
                            key={person.id}
                            className="flex items-center gap-4 p-4 border-b-2 border-gray-300 cursor-pointer hover:bg-gray-100"
                            onClick={() => handlePersonClick(person.id)} 
                        >
                            <img src={person.image} alt={person.name} className="rounded-full w-[50px] h-[50px]" />
                            <span>{person.name}</span>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No results found</div>
                )}
            </div>
            
            <div id="pogu-area" className="bg-white text-white h-[10%] w-[100%] flex items-center justify-center border-t-[5px] border-black space-x-[10%]">
  
  {/* <a id='settings-poga' className="bg-white h-[80%] w-[10%] flex cursor-pointer border-[1px] border-black justify-center items-center">
    <svg fill="#000000" height="80%" width="80%" viewBox="0 0 26.676 26.676">
      <g>
        <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
          c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
          C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
          c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
          C26.18,21.891,26.141,21.891,26.105,21.891z"/>
      </g>
    </svg>
  </a>

  <a id='profila-poga' className="bg-white h-[80%] w-[10%] flex cursor-pointer border-[1px] border-black justify-center items-center">
    <svg fill="#000000" height="80%" width="80%" viewBox="0 0 26.676 26.676">
      <g>
        <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
          c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
          C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
          c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
          C26.18,21.891,26.141,21.891,26.105,21.891z"/>
      </g>
    </svg>
  </a>

  <a id='tresa-poga' className="bg-white h-[80%] w-[10%] flex cursor-pointer border-[1px] border-black justify-center items-center">
    <svg fill="#000000" height="80%" width="80%" viewBox="0 0 26.676 26.676">
      <g>
        <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
          c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
          C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
          c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
          C26.18,21.891,26.141,21.891,26.105,21.891z"/>
      </g>
    </svg>
  </a> */}

</div>


        </main>
    );
}
>>>>>>> main
