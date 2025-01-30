import User from "@/models/usermodel";
import jwt from "jsonwebtoken";
import { NextRequest , NextResponse } from "next/server";

export default async function POST(request : NextRequest){
 try {
    
    console.log("in middleware");
    
    const token =  request.cookies.get("token")?.value || ""
    console.log("Token from user");
    const decodedtoken:any = jwt.verify(token,process.env.SECRET_TOKEN!)
    console.log("Decoded token : ",decodedtoken.id);
    
     return decodedtoken.id

 } catch (error) {
     throw new Error("Erroir in Middleware")
 }
}