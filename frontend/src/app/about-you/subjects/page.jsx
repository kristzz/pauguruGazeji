"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(subject)) {
        return prevSelected.filter((s) => s !== subject); // Remove subject if already selected
      } else {
        return [...prevSelected, subject]; // Add subject if not selected
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/about-you/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjects: selectedSubjects,
          // Include any additional fields needed, such as user ID
        }),
      });

      if (response.ok) {
        // Handle successful submission
        router.push('/about-you/education');
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting subjects:', error);
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
            {["Geometry", "Algebra", "Latvian", "English", "Chemistry", "Biology", "Physics", "Geography", "Art", "History", "Programming", "Literature", "Sports", "Business"].map(subject => (
              <SubjectButton
                key={subject}
                label={subject}
                isSelected={selectedSubjects.includes(subject)}
                onToggle={() => handleSubjectToggle(subject)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          id="cycleButton"
          onClick={handleSubmit}
          className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-16 text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SubjectButton({ label, isSelected, onToggle }) {
  return (
    <button
      className={`border-main-blue border-2 rounded-lg w-auto pr-1 pl-1 m-1 ${
        isSelected ? "bg-main-blue text-main-white" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}
