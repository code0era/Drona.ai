"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const GenerateProgramPage = () => {
    const [callActive , setCallActive] = useState(false);
    const [connecting , setConnecting] =useState(false);
    const [isSpeaking , setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState([]);
    const [callEnded , setCallEnded] = useState(false);

    const {user} = useUser();
    const router  = useRouter();

    const messageContainerRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
      vapi.on("message", (message) =>{
        
      })
    })


  return (
    <div>
      GenerateProgramPage
    </div>
  )
}
export default GenerateProgramPage
