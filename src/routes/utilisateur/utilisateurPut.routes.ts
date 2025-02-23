import { Router, Request, Response } from "express";
import { UtilisateurPutService } from "../../service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const UtilisateurRoutePut = (router: Router, service: UtilisateurPutService) => {


    router.put('/update/password',async (req: Request, res: Response) => {
        const { oldPassword, newPassword } = req.body
        const dataEmail = req.query.email
        try {
            if (! oldPassword || !dataEmail || !newPassword){
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "try body 'oldPassword','newPassword' and query 'email' "
                })
                return;
            }
            const email = dataEmail.toString()
            const reponse: boolean  = await service.updatePasswordByEmail(email,oldPassword,newPassword)

            if (!reponse){
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "incorrect password"
                })
                return;
            }

            res.status(StatusCodes.OK).send({
                "status": ReasonPhrases.OK,
                "message": "password change with success"
            })
        } catch (error) {
            throw error
        }
    })
}