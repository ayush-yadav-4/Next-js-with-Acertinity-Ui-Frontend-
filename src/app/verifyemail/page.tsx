"use client"

import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function page() {

  const router = useRouter()
  const [error, seterror] = useState(false);
  const [token, setdata] = useState("");
  const [verified, setverified] = useState(false);

  const Verifyemail= async ()=>{
    try {   
      console.log("Request sent: ", token);
      
     const res = await axios.post("/api/users/verifyemail?token=",{token})
     console.log("response is : ", res);
     
     setverified(true)
    } catch (error:any) {
      console.log(error.response.message);
      
      toast.error(error.message)
      seterror(true)
      setverified(false)
    }
  }

  useEffect(() => {
   
    const urltoken = window.location.search.split("=")[1]
    console.log("token is : ",urltoken);
    
    setdata(urltoken || "")

    // using nextjs
    // const {query} = router
    // const urltoken = query.token

  }, []);

  useEffect(() => {
    seterror(false)

    if (token.length > 0) {
      console.log("calling verify email");
      
      Verifyemail()
    }  
  }, [token]);

  return (

     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-10 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-8 text-center">Verify Your Email</h2>
        {token}
        <form className="space-y-8">
          <div className="relative">
       {verified && 
      <div>
        <h4 className="text-xl font-bold mb-8 text-center" >Email Verified Sucessfully</h4>
         <div className="text-center mt-8">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white">
           Continue to Login
          </Link>
        </div>
      </div> }
         { error && 
      <div>
        <h4 className="text-xl font-bold mb-8 text-center"  >Error</h4>
    
      </div> }
          </div>
        </form>
        <div className="text-center mt-8">
          <Link href="/signup" className="text-sm text-gray-400 hover:text-white">
            Send Email Again
          </Link>
        </div>
      </div>
    </div>


  )
}

export default page