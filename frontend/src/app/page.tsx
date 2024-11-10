'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Array of content for each step
  const contentSteps = [
    {
      text: "Register by entering your email, etc.",
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

  // State to track current content index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next content step
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentSteps.length);
  };

  // Function to go to the previous content step
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? contentSteps.length - 1 : prevIndex - 1
    );
  };

  const currentContent = contentSteps[currentIndex];

  return (
    <main>
      <div className="flex flex-col items-center h-64">
        <h1 className="text-main-blue text-center text-9xl w-[50%] mt-12 mb-36 z-1
                      sm:mt-56 sm:text-6xl
                      xl:mt-36">Think Abt It</h1>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col items-center w-[50%]">
          <div className="flex flex-col items-center">
            <h1 className="text-main-blue text-4xl text-center w-[60%] ml-24">
              Start your learning journey today!
            </h1>
            <div className="bg-slate-100 h-[420px] w-[400px] ml-24 mt-10 flex flex-col items-center">
              {/* Displaying the current content based on the index */}
              <p className="text-main-blue mt-6 w-44 text-center">
                {currentContent.text}
              </p>
              <Image src={currentContent.imageSrc} alt={currentContent.altText} width={280} height={260} />

              {/* Buttons to navigate through content */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handlePrevious}
                  className="bg-main-blue text-white px-4 py-2 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-main-blue text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-[50%]">
          <div className="flex flex-col w-[50%] mt-16">
            <Link href="/register">
              <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-40 my-4
                                sm:w-60 sm:h-16 sm:text-xl">Register</button>
            </Link>
            <Link href="/login">
              <button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-40 my-4
                                sm:w-60 sm:h-16 sm:text-xl">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
