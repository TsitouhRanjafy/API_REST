import { EmpruntDAGet } from "../../DA/index";
import { Emprunt, Livre, triEmprunt } from "../../types";

export class EmpruntServiceGet {
    constructor(private empruntDAGet: EmpruntDAGet){}

    public async GetEmpruntById(Id: string): Promise<Emprunt | void>{
        try {
            const data = await this.empruntDAGet.GetEmpruntById(Id)
            return data;
        } catch (error) {
            console.error(" Error Service Emprunt Get",error);
        }
    }

    public async GetEmpruntByIdLivre(Id: string): Promise<Livre | void>{
        try {
            const data = await this.empruntDAGet.GetEmpruntByIdLivre(Id)
            return data;
        } catch (error) {
            console.error(" Error Service Emprunt Get",error);
        }
    }

    public async GetAllEmprunt(tri: triEmprunt ): Promise<Livre[] | void> {
        try {
            const data = await this.empruntDAGet.GetAllEmprunt(tri);
            return data;
        } catch (error) {
            console.error(" Service Emprunt Error ",error)
        }
    }

    public async GetAllEmpruntByUsersId(userId: string) {
        try {
            const allUserEmprunts: Array<{ id_emprunt: string, livreEmprunter: Livre }> = await this.empruntDAGet.GetByUserId(userId);
            let livres: Livre[] = [];
            allUserEmprunts.forEach((emprunt) => {
                livres.push(emprunt.livreEmprunter)
            })
            return livres;
        } catch (error) {
            throw error
        }
    }
}