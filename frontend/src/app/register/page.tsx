export default function Register() {
    return(

        <main>

        <div className="bg-main-blue h-screen w-screen">
            <div className="">
                <form className="flex flex-col items-center" action="" method="post">
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