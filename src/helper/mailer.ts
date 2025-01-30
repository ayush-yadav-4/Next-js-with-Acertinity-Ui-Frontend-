import User from "@/models/usermodel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


export const sendEmail = async ({email, emailType , userId }:any)=> {
           const gentoken = await bcrypt.hash(userId.toString() , 10)
    try {

  
         // instead of hash , better option might be uuid (no special char in it)
    if (emailType === 'VERIFY') {
        
         // instead of hash , better option might be uuid (no special char in it)
         await User.findByIdAndUpdate(userId, {
           $set:{ VerifyToken: gentoken ,
            VerifyExpiryDate : new Date(Date.now() + 3600000)}
        })


    } else if(emailType === 'PASSWORD') {
        
       
         const user = await User.findByIdAndUpdate(userId, {
              $set:{ forgetPasswordToken: gentoken ,
            forgetPasswordDate :  new Date(Date.now() + 3600000) }
        })

    }

 const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0d232fa8894a5b",
    pass: "29f3d597d4f627"
  }
});

   const mailOption ={
    from: 'ayush@gmail.com', // sender address
    to: email, // list of receivers
    subject: emailType === 'VERIFY' ? 'Verify your Email': 'Reset Your password', // Subject line
  
    html: `<p>Click  to <a href="${process.env.DOMAIN}/verifyemial?token=${gentoken}">here</a> </p> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
    or copy and paste the link below in the browser ${gentoken}`, 
   }
    const emailresponse = await transport.sendMail(mailOption); 
  console.log("Emial sent Sucessfully");
  
  console.log(emailresponse);
  
   return emailresponse 

    } catch (error:any) {
        throw new Error("Eroor while sending email " + error.message)        
    }
}