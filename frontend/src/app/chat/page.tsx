export default function Chat() {
    return (
        <main id="logs" className="bg-main-red h-screen w-screen flex flex-col items-center justify-center">
            
            <div id="back-area" className="bg-white text-white h-[10%] w-[100%] flex border-b-[5px] border-black">
                <a href="/messages" id='back-poga' className="bg-white h-[80%] w-[10%] flex ml-[5%] mt-[0.5%] cursor-pointer items-center justify-center border-black border-1px">
                    <svg fill="#000000" height="40px" width="40px" viewBox="0 0 26.676 26.676">
                        <g>
                            <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
                                c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
                                C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
                                c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
                                C26.18,21.891,26.141,21.891,26.105,21.891z"/>
                        </g>
                    </svg>
                </a>
           </div>

            <div id="swipe-logs" className="bg-white h-[80%] w-[100%] flex items-center justify-center">
            </div>
 
            <div id="pogu-area" className="bg-white text-white h-[10%] w-[100%] flex border-t-[5px] border-black">
    <div id='chat-bar' className="bg-white h-[60%] w-[90%] flex justify-center items-center ml-[5%] mt-[1%] rounded-lg border-[1px] border-black">
        <input 
            type="text" 
            className="w-full h-full bg-transparent text-left text-black outline-none px-2" 
            placeholder="Type a message..." 
        />
    </div>
</div>


        </main>
    );
}
