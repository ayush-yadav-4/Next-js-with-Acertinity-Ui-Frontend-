import User from '@/models/usermodel.js'
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  {connectDB}  from '@/db/dbconfig';
import { sendEmail } from '@/helper/mailer';

connectDB()
export async function POST(request : NextRequest){

    try {
       console.log("In sign-In");
       
        const reqbody = await request.json()
        console.log(reqbody);
        
        const {username , email , password} = reqbody

        const user = await User.findOne({username})
        if (user) {
           return NextResponse.json({error:"Username already exist"},{status:400})
        }
         
    const salt = await bcrypt.genSalt(10)
    const pass = await  bcrypt.hash(password, salt)
      
        const newUser = new User(
            {
                username ,
                email:email , 
                password : pass
            }
        )
        const savedid = await newUser.save()
        console.log("Saved User Id : ", savedid); 
        sendEmail({email:email ,emailType: 'VERIFY' , userId : savedid})

       return NextResponse.json(
        {
            message: "User Registered Sucessful",
            sucess: true,
            savedid
        }
       ) 


    } catch (error:any) {
        throw new Error("Error while Sign In : "+ error.message);
        
    }
}