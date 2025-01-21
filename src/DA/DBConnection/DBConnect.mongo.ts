import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const URL = process.env.MONGODB_URL

export const connectMongo = async () =>{
    try {
        if (!URL) {
            console.log(' URL MONGODB is Empty');
            return
        }
        await mongoose.connect(URL)
        console.log(" DataBase MongoDB Connected");
    } catch (error) {
        throw error
    }
}