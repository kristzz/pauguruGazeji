"use client"; 

import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            console.log(response.data);
            alert('Registration successful');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    }
    
    return(

        <main>

        <div className="bg-main-blue h-screen w-screen">
            
            <div className="">
                <form className="flex flex-col items-center" action="" method="post">

                    <div className="flex flex-row">
                            <div className=" bg-main-red w-60 h-16 rounded-b-xl z-0 hidden
                                            sm:w-72 sm:h-24 sm:block
                                            xl:w-[600px]"></div>
                            <div className="absolute bg-main-white w-8 h-60 rounded-s-xl right-0 top-64 hidden
                                            sm:w-24 sm:h-72 sm:block"></div>
                            <div className="absolute bg-main-white w-12 h-32 rounded-e-xl left-0 top-52 hidden
                                            sm:w-20 sm:h-64 sm:block
                                            xl:top-40"></div>
                            <div className="absolute bg-main-red w-8 h-32 rounded-e-xl left-0 bottom-36 hidden
                                            sm:w-16 sm:h-40 sm:bottom-44 sm:block
                                            xl:bottom-32"></div>
                            <div className="absolute bg-main-white w-40 h-16 rounded-tr-xl bottom-0 left-0 hidden
                                            sm:w-48 sm:h-20 sm:block"></div>
                            <div className="absolute bg-main-red w-28 h-24 rounded-tl-xl bottom-0 right-0 hidden
                                            sm:w-40 sm:h-32 sm:block"></div>
                    </div>                          

                    <input className="h-12 w-64 mt-24 mb-4 rounded-lg p-4" type="email" id="email" name="email" placeholder="Enter your email"/>
                    <input className="h-12 w-64 my-4 rounded-lg p-4" type="password" id="password" name="password" placeholder="Password"/>
                    <input className="h-12 w-64 my-4 rounded-lg p-4" type="passwprd" id="confirm-password" name="confirm-password" placeholder="Confirm Password"/>
                    <div className="flex items-center mt-8">
                        <button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-64">Register</button>
                    </div>
                </form>
            </div>
        </div>

        </main>

    );
}