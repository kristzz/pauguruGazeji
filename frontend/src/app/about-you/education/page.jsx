"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
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

     <div id="section3" className="flex flex-col items-center">
        <p className="text-main-blue text-2xl w-52 text-center mt-8">
          What is your education level?
        </p>
        <div className="flex flex-col items-center">
        <select className="px-2 py-1 border-2 border-main-blue rounded-lg mt-2 w-full bg-main-white">
          <option>Education level</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Highschool</option>
          <option>College</option>
        </select>
       
      </div>
    </div>


    <div class="flex flex-col items-center">
      <button id="cycleButton" onClick={() => router.push('/')} class="bg-main-red text-main-white w-40 h-12 rounded-lg mt-16 text-lg">Next</button>
    </div>
    </div>


  );
}






  
