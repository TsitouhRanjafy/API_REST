import { UtilisateurDAPost } from "../../DA";
import { IPostUser } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { UtilisateurServiceGet } from "./utilisateurGet.service";
import  bcrypt  from 'bcrypt'
import  jwt  from "jsonwebtoken";

export class UtilisateurPostService {

    constructor(
        private utilisateurDAPost: UtilisateurDAPost,
        private utilisateurServiceGet: UtilisateurServiceGet
    ){}

    public async SignUp(newUserWithoutId: IPostUser): Promise<string | void> {
        try {
            const id: string =  uuidv4()

            // vérifier si l'email est déjà utiliser
            const IsUserAvailable: IPostUser | null = await this.utilisateurServiceGet.IsUserAvailable(newUserWithoutId.email)
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

    public async SignIn(email: string,password: string): Promise<string | void >{

        try {
            //  Vérifier si l'email exist 
            const isUserExist: IPostUser | null = await this.utilisateurServiceGet.IsUserAvailable(email);
            if (!isUserExist) {
                console.log('user not found');
                
                return
            };

            // Vérifion le mot de passe
            const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
            if (!isPasswordMatched) {
                console.log('wrong password');
                
                return;
            };

            if (!process.env.JWT_KEY) {
                console.log('jwt key not found');
                
                return;
            };
            const token = jwt.sign(
                { id: isUserExist.id, email: isUserExist.email, password: isUserExist.password },
                process.env.JWT_KEY,
                {
                    expiresIn: 10
                }
            )

            return token;
        } catch (error) {
            throw error
        }


    }
}