import mongoose from "mongoose";

export async function connectDB() {
    try {

       await mongoose.connect(process.env.MONGO_URI || '')
        const connection = mongoose.connection

        connection.on('connect', ()=>{
            console.log("Sucessfully Connected With DB");      
        })

          connection.on('error', (err)=>{
            console.log("Falied to connect with DB : ", err);      
        })
        
    } catch (error) {
        console.log("Something went Wrong while connecting with Database");
    }
}