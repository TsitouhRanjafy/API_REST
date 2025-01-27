import { Router, Request, Response } from "express";
import { UtilisateurGetService } from "../../service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { typeForGetUser } from "../../types";


export const UtilisateurRouteGet = (router: Router, service: UtilisateurGetService) => {

     
    router.get('/user/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data: typeForGetUser | null = await service.getUserById(id)
            res.status(StatusCodes.OK).send(data);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
                "error": error
            })
        }
    })

    router.get('/users', async (req: Request, res: Response) => {
        try {
            const data = await service.getUsers();
            res.status(StatusCodes.OK).send(data);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
                "error": error
            })
        }
    })

}