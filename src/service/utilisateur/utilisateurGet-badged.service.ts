import { UtilisateurBadgedDAGet } from "../../DA/index";
import { IPostUser } from "../../types";

export class UtilisateurServiceGet {
    private utilisateurDAGet: UtilisateurBadgedDAGet;

    constructor(utilisateurDAGet: UtilisateurBadgedDAGet){
        this.utilisateurDAGet = utilisateurDAGet;
    }

    public async GetUtilisateurs() {
        try {
            const data = await this.utilisateurDAGet.GetUtilisateurs();
            return data;
        } catch (error) {
            console.error(" Erro Service Utilisateur Get ",error)
        }
    }

    public async GetUtilisateurById(id: string) {
        try {
            const data = await this.utilisateurDAGet.GetUtilisateurById(id)
            return data;
        } catch (error) {
            throw error
        }
    }

    public async IsUserAvailable(emailUser:string): Promise<IPostUser | null>{
        try {
            const isAvailable: IPostUser | null = await this.utilisateurDAGet.IsUserAvailableByEmail(emailUser);
            return isAvailable;
        } catch (error) {
            throw error
        }
    }

}