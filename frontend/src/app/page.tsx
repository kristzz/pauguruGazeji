import Image from "next/image";

export default function Home() {
  return (
    <main>

      {/* 
      <h1>pauguru gazeji</h1>
      <h2 className="bg-main-blue">blue</h2>
      <h2 className="bg-main-white">white</h2>
      <h2 className="bg-main-red">red</h2> */}
      
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-main-blue text-2xl text-center w-52 mt-16 mb-44" >Start your learning journey today!</h1>
        <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-40 my-4">Register</button>
        <button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-40 my-4">Sign in</button>
      </div>
    </main>
  );
}