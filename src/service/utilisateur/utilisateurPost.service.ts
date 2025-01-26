import { UtilisateurDAPost } from "../../DA";
import { IPostUser } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { UtilisateurServiceGet } from "./utilisateurGet.service";
import  bcrypt  from 'bcrypt'

export class UtilisateurPostService {

    constructor(
        private utilisateurDAPost: UtilisateurDAPost,
        private utilisateurServiceGet: UtilisateurServiceGet
    ){}

    public async PostNewUserOnMongo(newUserWithoutId: IPostUser): Promise<string | void> {
        try {
            const id: string =  uuidv4()

            // vérifier si l'email est déjà utiliser
            const IsUserAvailable = await this.utilisateurServiceGet.IsUserAvailable(newUserWithoutId.email)
            if (IsUserAvailable) {
                return;
            }

            let newUser = Object.assign({},newUserWithoutId,{ id: id })

            // hasher le mot de passe
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt, async (err,hash) => {
                    newUser.password = hash
                    await this.utilisateurDAPost.PostUserOnMongo(newUser);
                })
            })
    
            return newUser.id;
        } catch (error) {
            console.error("Error during user creation:");
            throw error
        }
    }
}