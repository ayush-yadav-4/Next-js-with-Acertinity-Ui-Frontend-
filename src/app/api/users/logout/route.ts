
import { NextRequest , NextResponse } from "next/server";
import { connectDB } from "@/db/dbconfig";

connectDB()

export async function GET(request:NextResponse) {
    try {
        const Response = NextResponse.json({message:"Sucessfully logged out", status:200})
         Response.cookies.set("token","",{
            httpOnly:true
        })
        return Response

    } catch (error) {
        
    }
}