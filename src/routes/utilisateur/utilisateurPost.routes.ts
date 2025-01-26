import  { Router, Request, Response  } from "express"
import { UtilisateurPostService } from "../../service"
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const  UtilisateurRouterPost = (router: Router, service: UtilisateurPostService) =>{

    router.post( '/new/user/m',async (req: Request, res: Response) => {
        const userWthioudId = req.body;
        try {
            const data = await service.PostNewUserOnMongo(userWthioudId);
            if (data){
                res.status(StatusCodes.CREATED).send(data);
            } else {
                res.status(StatusCodes.NOT_ACCEPTABLE).send({ 
                    "status": ReasonPhrases.NOT_ACCEPTABLE, 
                    "message": "this email is not acceptable"
                })
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw error
        }
    })
}
