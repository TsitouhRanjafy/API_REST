import { Router, Request, Response } from "express"
import { UtilisateurPostService } from "../../service"
import { StatusCodes } from "http-status-codes";

export const  UtilisateurRouterPost = (router: Router, service: UtilisateurPostService) =>{

    router.post('/new/user/m', async (req: Request, res: Response) => {
        const userWthioudId = req.body;
        try {
            const data = await service.PostNewUserOnMongo(userWthioudId);
            res.status(StatusCodes.CREATED).send(data);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw error
        }
    })
}