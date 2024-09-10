import Link from "next/link";

export default function Signin() {
    return(

        <main>

        <div className="bg-main-red h-screen w-screen">
            <div className="">
                <form className="flex flex-col items-center" action="" method="post">
                    <input className="h-12 w-64 mt-24 mb-4 rounded-lg p-4" type="email" id="email" name="email" placeholder="Enter your email"/>
                    <input className="h-12 w-64 my-4 rounded-lg p-4" type="password" id="password" name="password" placeholder="Password"/>
                    <div className="mb-4">
                       <Link href="/forgot"> <a className="text-main-blue" href="">Forgot Password?</a> </Link>
                    </div>
                    <div className="flex items-center mt-8">
                        <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64">Sign in</button>
                    </div>
                </form>
            </div>
        </div>

        </main>

    );
}