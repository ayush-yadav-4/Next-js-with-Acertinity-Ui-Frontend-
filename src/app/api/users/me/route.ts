 import User from "@/models/usermodel";
import { NextRequest , NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import getUserInfo from "@/helper/getuserinfo";
import { connectDB } from "@/db/dbconfig";
connectDB()

export async function POST(request:NextRequest) {
    try {

        const userid = await getUserInfo(request)
        console.log("Finding the user with id : ", userid);
        
        if (!userid) {
            return NextResponse.json({error:"Please Login first", status:400})
        }
        const user = await User.findOne({_id:userid})
        console.log("User Found : ", user);
        
        if (!user) {
            return NextResponse.json({error:"No User Detail Found", status:400})
        }
     return NextResponse.json(user._id )
        
        
    } catch (error:any) {
         return NextResponse.json({error:"Some Error occured while Displaying user information", status:400})
    }
}