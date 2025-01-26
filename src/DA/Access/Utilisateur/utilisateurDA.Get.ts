import { IPostUser, UserMongoose, Utilisateur } from "../../../types/index";
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

    public async IsUserAvailableByEmail(email: string): Promise<IPostUser | null> {
        try {
            const data: IPostUser | null = await UserMongoose.findOne({ email: email }).exec(); // null if not found
            return data;
        } catch (error) {
            throw error
        }
    }

}