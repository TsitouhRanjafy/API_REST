import  { Router, Request, Response  } from "express"
import { UtilisateurPostService } from "../../service"
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const  UtilisateurRouterPost = (router: Router, service: UtilisateurPostService) =>{

    // sign up
    router.post( '/signup/',async (req: Request, res: Response) => {
        const userWthioudId = req.body;
        try {
            const id: string | void = await service.SignUp(userWthioudId);
            if (id){
                res.status(StatusCodes.CREATED).send({
                    "status": ReasonPhrases.CREATED,
                    "message": "signup done",
                    "your_id": id
                });
            } else {
                res.status(StatusCodes.NOT_ACCEPTABLE).send({ 
                    "status": ReasonPhrases.NOT_ACCEPTABLE, 
                    "message": "this email is not acceptable"
                })
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            throw error
        }
    })

    // sign in 
    router.post( '/sign/in',async (req: Request, res: Response) => {
        const { email,password } = req.body;
        try {
            const data: string | void  = await service.SignIn(email,password);
            if (!data) { 
                res.status(StatusCodes.BAD_REQUEST).send({ "status ": ReasonPhrases.BAD_REQUEST });
                return;
            }
            res.cookie("token",data, { maxAge: 5 * 1000 });
            res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "token": data });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            throw error
        }
    })

}
