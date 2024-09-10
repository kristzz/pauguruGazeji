import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16">
      <p className="text-main-blue text-2xl w-52 text-center">
        Specify the subjects you want to study
      </p>
      <div className="flex flex-row flex-wrap w-64 mt-4 ">
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
      <button className=""></button>
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
