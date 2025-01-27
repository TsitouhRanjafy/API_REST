import { UtilisateurDAGet } from "../../DA";

export class UtilisateurGetService {

    constructor(private utilisateurDAGet: UtilisateurDAGet){}

    public async getUserById(id: string){
        try {
            const data = await this.utilisateurDAGet.GetUserById(id);
            return data;
        } catch (error) {
            throw error
        }
    }

    public async getUsers(){
        try {
            const data = await this.utilisateurDAGet.GetUsers();
            return data;
        } catch (error) {
            throw error
        }
    }
}