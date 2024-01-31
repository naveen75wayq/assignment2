import mongoose from "mongoose";
import { DATABASE_URI } from "./loadEnv";

export const connectDB = async() =>{
    try{
        await mongoose.connect(DATABASE_URI as string)
        console.log("DB Connected")
    }catch(err){
        console.log(err)
    }
}