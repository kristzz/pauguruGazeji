"use client";
import React, { useState, useEffect } from "react";

export default function AboutYou() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [education, setEducation] = useState("");

  useEffect(() => {
    let currentSection = 1;
    const totalSections = 3;
    const cycleButton = document.getElementById("cycleButton");

    if (cycleButton) {
      cycleButton.addEventListener("click", nextSection);
    }

    function nextSection() {
      

      document.getElementById(`section${currentSection}`).classList.add("hidden");
      currentSection++;

      if (currentSection > totalSections) {
        
        handleSubmit();

      } else {
        document.getElementById(`section${currentSection}`).classList.remove("hidden");
      }
    }

    return () => {
      if (cycleButton) {
        cycleButton.removeEventListener("click", nextSection);
      }
    };
  }, [name, surname, age, gender, subjects, education]);

  const handleSubmit = () => {
    const formData = {
      name,
      surname,
      age,
      gender,
      subjects,
      education,
    };

    // Use fetch or axios to send the data to the backend
    fetch("http://127.0.0.1:8000/api/about-you", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/"; // Redirect after success
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubjectToggle = (subject) => {
    setSubjects((prevSubjects) => {
      if (prevSubjects.includes(subject)) {
        return prevSubjects.filter((s) => s !== subject); // Remove if already selected
      }
      return [...prevSubjects, subject]; // Add if not selected
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
      <div className=" bg-main-red w-60 h-16 rounded-b-xl z-0
                        sm:w-72 sm:h-24
                        xl:w-[600px]"></div>
        <div className="absolute bg-main-blue w-14 h-60 rounded-s-xl right-0 top-64
                        sm:w-24 sm:h-72"></div>
        <div className="absolute bg-main-blue w-8 h-36 rounded-e-xl left-0 top-48
                        sm:w-20 sm:h-64
                        xl:top-40"></div>
        <div className="absolute bg-main-red w-16 h-32 rounded-e-xl left-0 bottom-36
                        sm:w-16 sm:h-40 sm:bottom-44
                        xl:bottom-32"></div>
        <div className="absolute bg-main-blue w-40 h-16 rounded-tr-xl bottom-0 left-0
                        sm:w-48 sm:h-20"></div>
        <div className="absolute bg-main-red w-32 h-24 rounded-tl-xl bottom-0 right-0
                        sm:w-40 sm:h-32"></div>
      </div>

      <div id="section1" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl text-center mt-8">Your information</p>
        <form className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Name"
            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Surname"
            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <div className="flex flex-row w-full">
            <input
              type="number"
              placeholder="Age"
              min="0"
              max="116"
              className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 mr-2 w-20"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <select
              placeholder="Gender"
              className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 w-full bg-main-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </form>
      </div>

      <div id="section2" className="flex flex-col items-center hidden">
        <p className="text-main-blue text-2xl w-52 text-center mt-8">
          Specify the subjects you want to study
        </p>
        <div className="flex flex-row flex-wrap w-64 mt-4">
          {["Geometry", "Algebra", "Latvian", "English", "Chemistry", "Biology", "Physics", "Geography", "Art", "History", "Programming", "Literature", "Sports", "Business"].map((subject) => (
            <SubjectButton key={subject} label={subject} onToggle={handleSubjectToggle} />
          ))}
        </div>
      </div>

      <div id="section3" className="flex flex-col items-center hidden">
        <p className="text-main-blue text-2xl w-52 text-center mt-8">
          What is your education level?
        </p>
        <div className="flex flex-col items-center">
          <select
            className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 w-full bg-main-white"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          >
            <option>Education level</option>
            <option>Primary</option>
            <option>Secondary</option>
            <option>Highschool</option>
            <option>College</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button type="button" id="cycleButton" className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-16 text-lg">
          Next
        </button>
      </div>
    </div>
  );
}

function SubjectButton({ label, onToggle }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState); // Toggle the state
    onToggle(label); // Call the parent function to update selected subjects
  };

  return (
    <button
      className={`border-main-blue border-2 rounded-lg w-auto pr-1 pl-1 m-1 ${
        isToggled ? "bg-main-blue text-main-white" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      {label}
    </button>
  );
}
