"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: ""
  });
  const [userId, setUserId] = useState({user: { id: 0}});
  const [error, setError] = useState("");
  const router = useRouter();
  const [profile, setProfile] = useState("");

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.user.id) {
        setError("User ID not found.");
        return;
    }

    try {
        const token = localStorage.getItem("userToken");
        const response = await axios.post("http://127.0.0.1:8000/api/about-you", {
            id: profile.user.id, // Use dynamic user ID
            ...formData,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
        router.push("/about-you/education");
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
    <div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <div className=" bg-main-red w-60 h-16 rounded-b-xl z-0 sm:w-72 sm:h-24 xl:w-[600px]"></div>
          <div className="absolute bg-main-blue w-14 h-60 rounded-s-xl right-0 top-64 sm:w-24 sm:h-72"></div>
          <div className="absolute bg-main-blue w-8 h-36 rounded-e-xl left-0 top-48 sm:w-20 sm:h-64 xl:top-40"></div>
          <div className="absolute bg-main-red w-16 h-32 rounded-e-xl left-0 bottom-36 sm:w-16 sm:h-40 sm:bottom-44 xl:bottom-32"></div>
          <div className="absolute bg-main-blue w-40 h-16 rounded-tr-xl bottom-0 left-0 sm:w-48 sm:h-20"></div>
          <div className="absolute bg-main-red w-32 h-24 rounded-tl-xl bottom-0 right-0 sm:w-40 sm:h-32"></div>
        </div>

        <div id="section1" className="flex flex-col items-center">
          <p className="text-main-blue text-2xl text-center mt-8">Your information</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="px-2 py-1 border-2 border-main-blue rounded-lg mt-4"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2"
              required
            />
            <div className="flex flex-row w-full">
              <input
                type="number"
                name="age"
                placeholder="Age"
                min="6"
                max="116"
                value={formData.age}
                onChange={handleChange}
                className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 mr-2 w-20"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 w-full bg-main-white"
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-16 text-lg">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}






  
