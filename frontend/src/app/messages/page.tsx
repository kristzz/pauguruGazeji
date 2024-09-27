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
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); 
    };

    const filteredPeople = people.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main id="logs" className="bg-white h-screen w-screen flex flex-col items-center justify-center">
            <div id="search-area" className="bg-main-blue text-white h-[10%] w-[100%] flex border-b-[5px] border-black items-center justify-center">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    className="bg-main-blue text-white px-4 py-2 w-[80%] border-2 border-black rounded-lg"
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
            
            <div id="pogu-area" className="bg-main-blue text-white h-[10%] w-[100%] flex items-center justify-center border-t-[5px] border-black">
                
            <a id='settings-poga' className="bg-main-red h-[80%] w-[10%] [5%] flex cursor-pointer">
                <svg fill="#000000" height="[2%]" width="[2%]" viewBox="0 0 26.676 26.676">
                        <g>
                            <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
                                c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
                                C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
                                c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
                                C26.18,21.891,26.141,21.891,26.105,21.891z"/>
                        </g>
                </svg>
            </a>
            
            <a id='profila-poga' className="bg-white h-[80%] w-[10%] ml-[20%] mr-[20%] flex cursor-pointer">
                <svg fill="#000000" height="[2%]" width="[2%]" viewBox="0 0 26.676 26.676">
                        <g>
                            <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
                                c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
                                C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
                                c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
                                C26.18,21.891,26.141,21.891,26.105,21.891z"/>
                        </g>
                </svg>
            </a>
            
            <a id='kys-poga' className="bg-main-red h-[80%] w-[10%] pl-[5%] flex cursor-pointer">
                <svg fill="#000000" height="[4%]" width="[2%]" viewBox="0 0 26.676 26.676">
                        <g>
                            <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
                                c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
                                C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
                                c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
                                C26.18,21.891,26.141,21.891,26.105,21.891z"/>
                        </g>
                </svg>
            </a>
            </div>
        </main>
    );
}
