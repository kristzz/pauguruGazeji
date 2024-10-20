import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>

      {/* 
      <h1>pauguru gazeji</h1>
      <h2 className="bg-main-blue">blue</h2>    
      <h2 className="bg-main-white">white</h2>
      <h2 className="bg-main-red">red</h2> */}

      <div className="flex flex-col items-center h-screen">

        <div className="flex flex-row">
          <div className=" bg-main-red w-60 h-16 rounded-b-xl z-0
                          sm:w-72 sm:h-24
                          xl:w-[600px]"></div>
          <div className="absolute bg-main-blue w-14 h-60 rounded-s-xl right-0 top-64
                          sm:w-24 sm:h-72"></div>
          <div className="absolute bg-main-blue w-16 h-36 rounded-e-xl left-0 top-52
                          sm:w-20 sm:h-64
                          xl:top-40"></div>
          <div className="absolute bg-main-red w-8 h-32 rounded-e-xl left-0 bottom-36
                          sm:w-16 sm:h-40 sm:bottom-44
                          xl:bottom-32"></div>
          <div className="absolute bg-main-blue w-40 h-16 rounded-tr-xl bottom-0 left-0
                          sm:w-48 sm:h-20"></div>
          <div className="absolute bg-main-red w-32 h-24 rounded-tl-xl bottom-0 right-0
                          sm:w-40 sm:h-32"></div>
        </div>

        <h1 className="text-main-blue text-2xl text-center w-[50%] mt-12 mb-36 z-1
                      sm:mt-56 sm:text-4xl
                      xl:mt-36" >Start your learning journey today!</h1>
        <Link href="/register"><button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-40 my-4
                                                  sm:w-60 sm:h-16 sm:text-xl">Register</button></Link>
        <Link href="/login"><button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-40 my-4
                                                  sm:w-60 sm:h-16 sm:text-xl">Sign In</button></Link>
      </div>
    </main>
  );
}