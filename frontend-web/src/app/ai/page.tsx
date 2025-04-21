"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import Aurora from "@/components/Aurora";
import Orb from "@/components/Orb";

const Page = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const [hoverState, setHoverState] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    const vapi = new Vapi("e40b24cd-3e58-477c-bb1c-3c67bfd7ca5a");
    vapi.on("volume-level", (volume) => {
      console.log(`Assistant volume level: ${volume}`);
      setHoverState(volume > 0);
    });
   
    vapiRef.current = vapi;

    return () => {
      vapiRef.current?.stop(); // Cleanup on unmount
    };
  }, []);

  const startCall = async () => {
    await vapiRef.current?.start("7069a530-dc4d-4b86-aab2-9c799e4d21b9");
   // await vapiRef.current?.play("Hello, I am your nutritionist. How can I help you today?"); // Play the initial message
    
  };
  const stopCall = async () => {
    await vapiRef.current?.stop();
  };

  return (
    <div className=" w-screen overflow-x-hidden overflow-y-hidden h-screen">
      <div className="  fixed max-md:top-12 left-5 top-7" >
        <p className=" p-11  ">Mealzy - Health</p>
      </div>
      <div 
      className=" relative top-0 left-0 h-[20%]  w-screen"
      >

      <Aurora
      
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.6}
        speed={0.5}
      />
      </div>
      <div className=" flex flex-col  items-center mt-10 justify-center w-screen overflow-x-hidden ">
        <h1 className="font-sans font-bold text-3xl max-md:text-lg max-md:m-6">
          Hi , I am Harry  Your Ai nutritionist
        </h1>
        <div className=" mt-14 ">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={hoverState}
          />
        </div>

        <button onClick={()=>{
            if(isCalling){
                stopCall();
                
                setIsCalling(false);
                setHoverState(false);
            }
            else{
                startCall();
                setIsCalling(true);
            }
        }}  className="bg-white px-3 py-1 cursor-pointer my-5 rounded-md text-black">
            {isCalling ? "Stop Conversation" : "Start a Conversation"}
        </button>
      </div>
    </div>
  );
};

export default Page;
