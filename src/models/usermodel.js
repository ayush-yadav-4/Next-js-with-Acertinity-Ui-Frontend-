import mongoose,{ Schema , model } from "mongoose";
import { type } from "os";

const UserSchema = Schema({
   username:{
     type: String,
     required : [true , "please Enter Username"],
     unique: true
   },
   email:{
      type: String,
      required:true
   },
   password:{
     type: String,
     required : [true , "please Enter Password"],
   },
   isVerified:{
     type: Boolean,
     default : false
   },
      isAdmin:{
     type: Boolean,
     default : false
   },
   forgetPasswordToken : String,
   forgetPasswordDate : Date,
   VerifyToken : String,
   VerifyExpiryDate : Date,


})

const User = mongoose.models.users || model("users", UserSchema )

export default User