import { IUser, UserMongoose } from "../../../types";

// Data Accès pour l'utilisateur qui n'est pas encore autorisé à emprunter des livres
export class UtilisateurDAGet {
    
    public async GetUserById(idUser: string) {
        try {
            const data = await UserMongoose.findOne({ id: idUser }, 'id firstname lastname email').exec();
            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetUsers() {
        try {
            const data = await UserMongoose.find({},'id firstname lastname email').exec();
            return data;
        } catch (error) {
            throw error
        }
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const data = await UserMongoose.findOne({ email: email }).exec(); // null if not found
            return data;
        } catch (error) {
            throw error
        }
    }
    

}