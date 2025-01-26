import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IPostUser {
    id?: string,
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true, 
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

export const UserMongoose = model<IUser>('utilisateur',UserSchema); 

