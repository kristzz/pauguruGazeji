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
    <div className="flex flex-col items-center h-64">
    <h1 className="text-main-blue  text-center text-9xl w-[50%] mt-12 mb-36 z-1
                      sm:mt-56 sm:text-6xl
                      xl:mt-36" >Think Abt It</h1>

    </div>

    <div className="flex flex-row">
      <div className="flex flex-col items-center w-[50%]">
        <div className="flex flex-col items-center ">
          <h1 className="text-main-blue text-4xl text-center w-[60%] ml-24 " >Start your learning journey today!</h1>
          
        </div>
      </div>

      <div className="flex flex-col items-center w-[50%]">
        <div className="flex flex-col w-[50%] mt-16">
        <Link href="/register"><button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-40 my-4
                                                  sm:w-60 sm:h-16 sm:text-xl ">Register</button></Link>
        <Link href="/login"><button className="bg-main-red text-main-white text-lg rounded-lg h-12 w-40 my-4
                                                  sm:w-60 sm:h-16 sm:text-xl">Log In</button></Link>
        </div>
      </div>

    </div>
    </main>
  );
}