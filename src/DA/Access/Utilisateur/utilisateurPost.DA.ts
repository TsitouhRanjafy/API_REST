import { IPostUser, UserMongoose } from "../../../types";

export class UtilisateurDAPost {


    public async PostUserOnMongo(newUser: IPostUser){
        try {
            const data = await UserMongoose.create(newUser);
            return data;
        } catch (error) {
            throw error
        }
    }
}