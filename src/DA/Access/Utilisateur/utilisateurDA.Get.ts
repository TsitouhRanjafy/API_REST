import { UserMongoose, Utilisateur } from "../../../types/index";
import { DBManager } from "../../DBManager";


export class UtilisateurDAGet extends DBManager {

    public async GetUtilisateurs() {
        const deferredQuery = (): Promise<any> => {
            return Utilisateur.findAll();
        }
        try {
            const data = await this.ReadData(deferredQuery);
            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetUtilisateurById(id: string) {
        const deferredQuery = (): Promise<any> => {
            return Utilisateur.findByPk(id);
        }
        try {
            const data = await this.ReadData(deferredQuery);
            return data;
        } catch (error) {
            throw error
        }
    }

    public async IsUserAvailable(email: string): Promise<boolean> {
        try {
            const data = await UserMongoose.findOne({ email: email }).exec(); // null if not found
            return data? true : false 
        } catch (error) {
            throw error
        }
    }
}