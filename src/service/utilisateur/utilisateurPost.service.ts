import { UtilisateurDAPost } from "../../DA";
import { IPostUser } from "../../types";
import { v4 as uuidv4 } from "uuid";

export class UtilisateurPostService {

    constructor(private utilisateurDAPost: UtilisateurDAPost){}

    public async PostNewUserOnMongo(newUserWithoutId: IPostUser): Promise<IPostUser> {
        try {
            const id: string =  uuidv4()
            const newUser = Object.assign({},newUserWithoutId,{ id: id })
    
            console.log(newUser);
    
            const data = await this.utilisateurDAPost.PostUserOnMongo(newUser);
    
            return data;
        } catch (error) {
            console.error("Error during user creation:");
            throw error
        }
    }
}