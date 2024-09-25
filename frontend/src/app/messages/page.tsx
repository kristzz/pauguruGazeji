"use client"; // This line tells Next.js that this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Chat() {
    // Simulating a list of people
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

    const router = useRouter(); // Initialize the useRouter hook

    // Function to handle redirection when a person is clicked
    const handlePersonClick = (id: number) => {
        router.push(`/chat?id=${id}`); // Redirect to /chat with person's id as a query parameter
    };

    return (
        <main id="logs" className="bg-main-red h-screen w-screen flex flex-col items-center justify-center">
            <div id="search-area" className="bg-main-blue text-white h-[10%] w-[100%] flex border-b-[5px] border-black items-center justify-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-main-blue text-white px-4 py-2 w-[80%] border-2 border-black rounded-lg"
                />
            </div>
            
            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex flex-col overflow-y-scroll border-b-[5px] border-black">
                {people.map((person) => (
                    <div
                        key={person.id}
                        className="flex items-center gap-4 p-4 border-b-2 border-gray-300 cursor-pointer hover:bg-gray-100"
                        onClick={() => handlePersonClick(person.id)} // Call the function on click
                    >
                        <img src={person.image} alt={person.name} className="rounded-full w-[50px] h-[50px]" />
                        <span>{person.name}</span>
                    </div>
                ))}
            </div>
            
            <div id="pogu-area" className="bg-main-blue text-white h-[10%] w-[100%] flex items-center justify-center border-t-[5px] border-black">
            </div>
        </main>
    );
}
