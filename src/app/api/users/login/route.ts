import User from "@/models/usermodel";
import { NextRequest , NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { connectDB } from "@/db/dbconfig";

export async function POST(request:NextRequest){
  try {
    
    const reqbody = await request.json()
    const {email , password} = reqbody
    
    if (!email || !password) {
         return NextResponse.json({error: "Please Enter Email or Password",
            status:400
         })
    }

    const user = await User.findOne({email:email})
       if (!user) {
         return NextResponse.json({error: "Email Not Found",
            status:400
         })
    }

    const pass = await bcrypt.compare(password , user.password)
    if (!pass) {
         return NextResponse.json({error: "Please Enter the Correct Password",
            status:400
         })
    }
    
    const tokenData ={
        id: user._id,
        username: user.username,
        email: user.email, 

    }

    const token =  jwt.sign(tokenData , process.env.SECRET_TOKEN!,{ expiresIn:'1d' })
     //Typescript require assurence that the env variable will definately conatain some value
     
   const response =  NextResponse.json({
        message: "User sucessfully logged in",
        status:400
    })
    console.log("Token of user is : ", token);
    
    response.cookies.set("token", token,{
        httpOnly : true
    })
    //httpOnly means only Server can change the url , code
        return response 


  } catch (error:any) {
     return NextResponse.json({error:"Error while loggin in : " + error.message})
  }
}