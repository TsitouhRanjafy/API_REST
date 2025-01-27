import  { Router, Request, Response  } from "express"
import { UtilisateurPostService } from "../../service"
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { loginObject } from "../../types";

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
            const data: loginObject | void  = await service.SignIn(email,password);
            if (!data) { 
                res.status(StatusCodes.BAD_REQUEST).send({ "status ": ReasonPhrases.BAD_REQUEST });
                return;
            }
            if (!data.id){
                res.status(StatusCodes.BAD_REQUEST).send({ "status ": ReasonPhrases.BAD_REQUEST });
                return;
            }
            res.cookie("token",data.token, { maxAge: 24 * (60 * (60 * 1000)) }); // 24h
            res.status(StatusCodes.OK).send({ 
                "status": ReasonPhrases.OK,
                "id": data.id,
                "token": data.token
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            throw error
        }
    })

    // authentification 
    router.post('/welcome',async (req: Request, res: Response) => {
        try {
            const token = req.cookies.token; // key of token (perso: 'token')
            console.log(token);
            
            const isVerified: JwtPayload | string | void = await service.Welcome(token)
            if (isVerified){
                res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "message": isVerified });
                return;
            }
            res.status(StatusCodes.NOT_FOUND).send({ "status": ReasonPhrases.NOT_FOUND })
        } catch (error) {
            throw error
        }
    })

}
