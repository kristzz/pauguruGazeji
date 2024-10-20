"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [error, setError] = useState(null); // For error handling
  const [success, setSuccess] = useState(null); // For success messages
  const [profile, setProfile] = useState("");

  // Assuming these are the subjects and their IDs
  const subjectsList = [
    { id: 1, name: "Geometry" },
    { id: 2, name: "Algebra" },
    { id: 3, name: "Latvian" },
    { id: 4, name: "English" },
    { id: 5, name: "Chemistry" },
    { id: 6, name: "Biology" },
    { id: 7, name: "Physics" },
    { id: 8, name: "Geography" },
    { id: 9, name: "Art" },
    { id: 10, name: "History" },
    { id: 11, name: "Programming" },
    { id: 12, name: "Literature" },
    { id: 13, name: "Sports" },
    { id: 14, name: "Business" },
  ];

  // Toggle subject selection by ID
  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(subjectId)) {
        return prevSelected.filter((id) => id !== subjectId); // Remove if already selected
      } else {
        return [...prevSelected, subjectId]; // Add if not selected
      }
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
        try {
          
          const token = localStorage.getItem("userToken");
          if (token) {
              const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setProfile(response.data.data); 
          } else {
              console.error("User is not authenticated.");
          }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    fetchProfile();
}, []);

  // Submit the selected subject IDs to the backend using Axios
  const handleSubmit = async () => {
    const token = localStorage.getItem("userToken"); // Get the token from localStorage
    const userId = profile.id;
    console.log('Submitting subjects for user ID:', userId);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/about-you/subjects', {
        subjects: selectedSubjects,
        user_id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      
      if (response.status === 200) {
        alert("Your information is submitted successfully!\n\nVerify your email!"); // Success message
        router.push('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting subjects."); // Handle error
      console.error('Error submitting subjects:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <div className="bg-main-red w-60 h-16 rounded-b-xl z-0 sm:w-72 sm:h-24 xl:w-[600px]"></div>
          <div className="absolute bg-main-blue w-14 h-60 rounded-s-xl right-0 top-64 sm:w-24 sm:h-72"></div>
          <div className="absolute bg-main-blue w-8 h-36 rounded-e-xl left-0 top-48 sm:w-20 sm:h-64 xl:top-40"></div>
          <div className="absolute bg-main-red w-16 h-32 rounded-e-xl left-0 bottom-36 sm:w-16 sm:h-40 sm:bottom-44 xl:bottom-32"></div>
          <div className="absolute bg-main-blue w-40 h-16 rounded-tr-xl bottom-0 left-0 sm:w-48 sm:h-20"></div>
          <div className="absolute bg-main-red w-32 h-24 rounded-tl-xl bottom-0 right-0 sm:w-40 sm:h-32"></div>
        </div>

        <div id="section2" className="flex flex-col items-center">
          <p className="text-main-blue text-2xl w-52 text-center mt-8">
            Specify the subjects you want to study
          </p>
          <div className="flex flex-row flex-wrap w-64 mt-4">
            {subjectsList.map(subject => (
              <SubjectButton
                key={subject.id}
                label={subject.name}
                isSelected={selectedSubjects.includes(subject.id)}
                onToggle={() => handleSubjectToggle(subject.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        
        <button
          id="cycleButton"
          onClick={handleSubmit}
          className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-14 text-lg">
          Next
        </button>
        {/* Display error or success messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

function SubjectButton({ label, isSelected, onToggle }) {
  return (
    <button
      className={`border-main-blue border-2 rounded-lg w-auto pr-1 pl-1 m-1 ${
        isSelected ? "bg-main-blue text-main-white" : "bg-main-white"
      }`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}
