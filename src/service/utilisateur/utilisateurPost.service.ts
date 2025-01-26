import { UtilisateurDAPost } from "../../DA";
import { IPostUser } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { UtilisateurServiceGet } from "./utilisateurGet.service";

export class UtilisateurPostService {

    constructor(
        private utilisateurDAPost: UtilisateurDAPost,
        private utilisateurServiceGet: UtilisateurServiceGet
    ){}

    public async PostNewUserOnMongo(newUserWithoutId: IPostUser): Promise<IPostUser | void> {
        try {
            const id: string =  uuidv4()

            // vérifier si l'email est déjà utiliser
            const IsUserAvailable = await this.utilisateurServiceGet.IsUserAvailable(newUserWithoutId.email)
            if (IsUserAvailable) {
                return;
            }

            const newUser = Object.assign({},newUserWithoutId,{ id: id })

            // hasher le mot de passe
            


            
            const data = await this.utilisateurDAPost.PostUserOnMongo(newUser);
    
            return data;
        } catch (error) {
            console.error("Error during user creation:");
            throw error
        }
    }
}