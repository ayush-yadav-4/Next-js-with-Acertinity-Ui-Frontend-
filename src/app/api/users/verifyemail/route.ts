import User from "@/models/usermodel";
import { NextRequest , NextResponse } from "next/server";
import { connectDB } from "@/db/dbconfig";
connectDB()

export async function POST(request:NextRequest){

   try {

    const reqbody = await request.json()
    console.log(reqbody);
    
    const {token} = reqbody 
    console.log(token);
    

    if (!token) {
       return NextResponse.json({"error":"No Token"}, {"status": 400})
    }
    console.log("verifying user");
    
    const user = await User.findOne({VerifyToken: token, 
        VerifyExpiryDate: {$gt: Date.now()}
    })
     console.log(user);
     
    if (!user) {
        return NextResponse.json({error:"Invalid Token",status: 400})
    }

    user.isVerified = true
    user.VerifyToken = undefined 
    user.VerifyTokenExpiry = undefined 

    await user.save()
      return NextResponse.json({message:"User Verified" ,sucess:true})
    
   } catch (error:any) {
     throw new Error("Error in Verify Email : ", error.message)
   }
}