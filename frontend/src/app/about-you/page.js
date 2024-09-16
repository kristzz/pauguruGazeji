import React from "react";

export default function Home() {
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
      <div className="flex flex-col items-center hidden">  
      <p className="text-main-blue text-2xl w-52 text-center mt-8">
        Specify the subjects you want to study
      </p>
      <div className="flex flex-row flex-wrap w-64 mt-4">
        <SubjectButton label="Geometry" />
        <SubjectButton label="Algebra" />
        <SubjectButton label="Latvian" />
        <SubjectButton label="English" />
        <SubjectButton label="Chemistry" />
        <SubjectButton label="Biology" />
        <SubjectButton label="Physics" />
        <SubjectButton label="Geography" />
        <SubjectButton label="Art" />
        <SubjectButton label="History" />
        <SubjectButton label="Programming" />
        <SubjectButton label="Literature" />
        <SubjectButton label="Sports" />
        <SubjectButton label="Business" />
      </div>
      <button className="bg-main-red text-main-white w-40 h-12 rounded-lg mt-16 text-lg">Next</button>
      </div>
      
      <div className="">
      <p className="text-main-blue text-2xl w-52 text-center mt-8">
        What is your education level?
      </p>
      </div>
    </div>
  );
}


function SubjectButton({ label }) {
  return (
    <button className="bg-gray-300 border-main-blue border-2 rounded-lg w-auto pr-1 pl-1 m-1">
      {label}
    </button>
  );
}