"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    education: ""
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({user: { id: 0}});

  useEffect(() => {
    const fetchProfile = async () => {
        try {
          
          const token = localStorage.getItem("userToken");
          if (token) {
              const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.education) {
      setError("Please select your education level.");
      return;
  }
    if (!profile.user.id) {
        setError("User ID not found.");
        return;
    }

    try {
        const token = localStorage.getItem("userToken");
        const response = await axios.post("http://127.0.0.1:8000/api/about-you/education", {
          user_id: profile.user.id, // Change id to user_id
          level_of_education: formData.education,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
        router.push("/about-you/subjects");
    } catch (error) {
        console.error("Error response:", error.response);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        }
        setError("An error occurred while updating your information.");
    }
};



  return (
    <div className="flex justify-center mt-16">
     <div id="section3" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl w-52 text-center mt-8">
          What is your education level?
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <select name="education" value={formData.education} onChange={handleChange} className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4 w-full bg-main-white">
          <option value=''>Education level</option>
          <option value='primary'>Primary</option>
          <option value='secondary'>Secondary</option>
          <option value='highschool'>Highschool</option>
          <option value='College'>College</option>
        </select>
        <div className="flex flex-col items-center">
        
        <button
          id="cycleButton"
          onClick={handleSubmit}
          className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-[7.625rem] text-lg">
          Next
        </button>
        {/* Display error or success messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
        
      </form>
    </div>
  </div>
  );
}






  
