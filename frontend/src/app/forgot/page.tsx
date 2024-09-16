export default function ForgotPassword() {
    return(

        <main>

        <div className="bg-main-red h-screen w-screen">
            <div className="">
                <form className="flex flex-col items-center" action="" method="post">
                    <input className="h-12 w-64 mt-24 mb-4 rounded-lg p-4" type="email" id="email" name="email" placeholder="Enter your email"/>
                    <div className="flex items-center mt-8">
                        <button className="bg-main-blue text-main-white text-lg rounded-lg h-12 w-64">Send kaut ko</button>
                    </div>
                </form>
            </div>
        </div>

        </main>

    );
}