import { UserMongoose } from "../../../types";

export class UtilisateurPutDataAccess {


    public async updatePassword(email: string,newHashedPassword: string){
        try {
            const response = await UserMongoose.updateOne({email: email}, { $set: { password: newHashedPassword } }).exec();
            if (!response){
                return null
            }
            return response;
        } catch (error) {
            throw error
        }
    }
}