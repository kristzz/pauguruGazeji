export default function Chat() {
    return (
        <main id="logs" className="bg-main-red h-screen w-screen flex flex-col items-center justify-center">
            
            <div id="back-area" className="bg-main-blue text-white h-[10%] w-[100%] flex border-b-[5px] border-black">
                <a href="/messages" id='back-poga' className="bg-white h-[80%] w-[10%] flex ml-[5%] mt-[1%] cursor-pointer">
                </a>
           </div>

            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex items-center justify-center">
            </div>

            <div id="pogu-area" className="bg-main-blue text-white h-[10%] w-[100%] flex border-t-[5px] border-black">
                <div id='chat-bar' className="bg-main-red h-[60%] w-[90%] flex justify-center items-center ml-[5%] mt-[2%] rounded-lg">
                    <input 
                        type="text" 
                        className="w-full h-full bg-transparent text-left text-white outline-none px-2" 
                        placeholder="Type a message..." 
                    />
                </div>
           </div>

        </main>
    );
}
