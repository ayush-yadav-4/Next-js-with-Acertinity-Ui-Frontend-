"use client"

import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

 function page() {

  const router = useRouter()
  const [User, setUser] = useState({
  password:"",
  email:""
  });
  const [loading, setloading] = useState(false);
   const [btndisabled, setbtndisabled] = useState(true);
  
   
  const Login = async ()=>{

   try {

    setloading(true)
    const data = await axios.post("api/users/login",User)
    console.log(data.data);
    setloading(false)
    router.push("/")
   } catch (error:any) {
     toast.error(error.message)
   }
  }
  useEffect(() => {
    if ( User.email.length  > 0 && User.password.length > 0 ) {
       setbtndisabled(false)
    }else{
      setbtndisabled(true)
    }
 
  }, [User]);

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-10 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-8 text-center">Log In</h2>
        <div className="space-y-8">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
                 onChange={(e)=>setUser({...User,email:e.target.value})}
              className="peer bg-transparent border-b-2 border-gray-600 w-full text-white focus:outline-none focus:border-white"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-0 text-gray-500 peer-placeholder-shown:text-lg peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-sm peer-focus:top-0 transition-all"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
                 onChange={(e)=>setUser({...User,password:e.target.value})}
              className="peer bg-transparent border-b-2 border-gray-600 w-full text-white focus:outline-none focus:border-white"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-0 text-gray-500 peer-placeholder-shown:text-lg peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-sm peer-focus:top-0 transition-all"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            onClick={()=>Login()}
            disabled={btndisabled}
            className="w-full py-3 px-6 bg-black hover:bg-white hover:text-black border border-white text-white font-semibold rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
          >
            {btndisabled? "Fill the info":"Log in"}
          </button>
        </div>
        <div className="text-center mt-8">
          <Link href="/signup" className="text-sm text-gray-400 hover:text-white">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page