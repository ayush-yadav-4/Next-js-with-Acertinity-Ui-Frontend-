"use client"
import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BackgroundGradient } from "@/components/ui/background-gradient";
;
import Image from "next/image";

function page() {

    const [data, setdata] = useState("")
    
    const [logout, setlogout] = useState(false);

    useEffect(() => {
        const profile =async()=>{
        const res = await axios.post("/api/users/me")
        console.log("Response from User : ", res.data);
        
        setdata(res.data)
        setlogout(true)
        }
       profile()
    }, []);

    const Logout =async()=>{
      try {
          await axios.post("/api/users/logout")
          toast.success("Sucessfully Logedout")
          setlogout(false)
          
      } catch (error) {
        
      }
    }

  return (
   <div className=' min-h-screen flex items-center justify-center mt-auto bg-gradient-to-r from-gray-700 via-gray-900 to-black' >
    <div className=" " >
      <BackgroundGradient className=" text-white rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900 shadow-2xl transform transition duration-500 hover:scale-105">
       
        <p className="text-base sm:text-xl  mt-4 mb-2 text-neutral-200">
          {data}
        </p>
         
        <p className="text-sm text-neutral-400">
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
          February 17, 2024. Your best opportunity to get these right now is by
          entering raffles and waiting for the official releases.
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
    </div>
  )
}

export default page