import mongoose from "mongoose";
import { config } from "../../config/env";

export const connectMongo = async () =>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.error("DataBase MongoDB Connected");
    } catch (error) {
        console.error('Error of Connection DataBase MongoDB:',error);
        throw error
    }
}