import randomstring from "randomstring"
import jwt from 'jsonwebtoken'
import { IPostUser } from "../../types"

export const generateOTP = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    })
}

// génerer un token
export const generateToken = (User: Omit<IPostUser,"id">,JWT_KEY: string): string => {
    const token: string =  jwt.sign(
        User,
        JWT_KEY,
        { 
            expiresIn: (24 * (60 *(60 * 1000))) + 15
        }
    )
    return token
}