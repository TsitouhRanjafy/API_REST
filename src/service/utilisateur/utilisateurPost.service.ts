import { UtilisateurDAPost } from "../../DA";
import { IPostUser, loginObject } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { UtilisateurServiceGet } from "./utilisateurGet-badged.service";
import  bcrypt  from 'bcrypt'
import  jwt, { JwtPayload }  from "jsonwebtoken";

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

    
    public async SignIn(email: string,password: string): Promise<loginObject | void >{

        try {
            //  Vérifier si l'email exist 
            const isUserExist: IPostUser | null = await this.utilisateurServiceGet.IsUserAvailable(email);
            if (!isUserExist) {
               return
            };

            // Vérifion le mot de passe
            const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
            if (!isPasswordMatched) {
                return;
            };

            if (!process.env.JWT_KEY) {
                return;
            };

            // verifion le token
            const token = jwt.sign(
                { id: isUserExist.id, email: isUserExist.email, password: isUserExist.password },
                process.env.JWT_KEY,
                {
                    expiresIn: (24 * (60 *(60 * 1000))) + 15
                }
            )

            return Object.assign({},{ id: isUserExist.id? isUserExist.id : null }, { token: token });
        } catch (error) {
            throw error
        }
    }

    public async Welcome(Token: string): Promise<string | JwtPayload | void > {
        try {
            const token = Token;
            if (!token) return;
            if (!process.env.JWT_KEY) {;
                // jwt .env non trouvé
                return;
            };
            // Analysez la chaîne JWT et stockez le résultat dans `payload`.
            // Notez que nous transmettons également la clé dans cette méthode. Cette méthode génèrera une erreur
            // si le jeton n'est pas valide (s'il a expiré conformément au délai d'expiration que nous avons défini lors de la connexion),
            // ou si la signature ne correspond pas
            const payload = jwt.verify(token,process.env.JWT_KEY)   
            return payload;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                // if the error thrown is because the JWT is unauthorized, return a 401 error
                // mila gestion de retoure de http-code tsika
                return;
            }
            throw error;
        }
    }
}