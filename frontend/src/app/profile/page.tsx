export default function Profile() {
    return (
        <main>
            <div className="bg-main-white h-screen w-screen flex flex-col items-center relative">
                <div className="bg-main-blue w-screen h-[50%] absolute inset-x-0 bottom-0"></div>
                <div className="bg-main-white w-[50%] h-[50%] shadow-2xl relative top-[20%] rounded-lg align-center border-2 border-main-red">
                    <div className="text-main-red top-10 relative text-2xl text-center">Balderjanis</div>
                    <div className="text-main-red top-10 relative text-lg text-center">Balderjanis@yandex.ru</div>
                    <div className="grid grid-cols-3 place-items-center absolute w-full inset-x-0 bottom-14">
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                        <div className="bg-main-red w-16 h-16 rounded-lg flex items-center justify-center">
                        </div>
                    </div>
                    <div className="grid grid-cols-3 w-full text-center absolute inset-x-0 bottom-6">
                        <div className="text-main-red">Settings</div>
                        <div className="text-main-red">Certificates</div>
                        <div className="text-main-red">Statistics</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
