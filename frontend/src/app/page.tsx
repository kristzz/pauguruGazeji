'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const contentSteps = [
    {
      text: "Input your email and password",
      imageSrc: "/images/register.png",
      altText: "Register"
    },
    {
      text: "Input your details",
      imageSrc: "/images/aboutyou.png",
      altText: "About You"
    },
    {
      text: "Customize your learning experience",
      imageSrc: "/images/customize.png",
      altText: "Customize"
    },
    {
      text: "Start your first lesson!",
      imageSrc: "/images/lesson.png",
      altText: "Lesson Start"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentSteps.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? contentSteps.length - 1 : prevIndex - 1
    );
  };

  const currentContent = contentSteps[currentIndex];

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="text-center mt-12 mb-16 px-4">
        <h1 className="text-main-blue font-bold text-5xl sm:text-6xl lg:text-7xl">
          Think Abt It
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center md:justify-center w-full px-4 md:px-0">
        <div className="flex flex-col items-center w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-main-blue font-semibold text-2xl text-center mb-6 md:text-3xl">
            Start your learning journey today!
          </h2>
          <div className="flex items-center justify-center mb-8 md:mb-0">
            <button
              onClick={handlePrevious}
              className="bg-main-blue text-white p-2 rounded-lg shadow-md mr-4 hover:bg-blue-700 transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
              </svg>
            </button>
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-72 sm:w-80 md:w-96">
              <p className="text-main-blue font-medium text-center mb-4 text-lg">
                {currentContent.text}
              </p>
              <Image src={currentContent.imageSrc} alt={currentContent.altText} width={280} height={300} className="rounded-lg" />
            </div>
            <button
              onClick={handleNext}
              className="bg-main-blue text-white p-2 rounded-lg shadow-md ml-4 hover:bg-blue-700 transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2 mt-8 md:mt-0">
          <div className="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 space-y-4">
            <Link href="/register">
              <button className="bg-main-blue text-white text-lg font-semibold rounded-lg h-12 w-48 shadow-md hover:bg-blue-700 transition duration-300">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-main-red text-white text-lg font-semibold rounded-lg h-12 w-48 shadow-md hover:bg-red-700 transition duration-300">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
