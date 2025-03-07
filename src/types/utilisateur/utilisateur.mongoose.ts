import { Document, Schema, model } from "mongoose";

interface IUsers extends Document {
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

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUsers>({
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
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

export const UserMongoose = model<IUsers>('utilisateurs',UserSchema); 

export type loginObject = {
    id: string | null,
    token: string,
}

export type typeForGetUser = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
}

