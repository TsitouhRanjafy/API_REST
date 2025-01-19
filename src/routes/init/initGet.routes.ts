import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Router , Request , Response } from "express";
import { InitServiceGet } from "../../service";

export const InitRouterGet = (router: Router, service: InitServiceGet) => {    

    router.get('/', async (req: Request, res: Response) => {
        try {
            const n = await service.getNombreToutLivre();
            res.status(StatusCodes.OK).json({ "status": ReasonPhrases.OK, "nombreToutLivre": n });
        } catch (error) {
            throw error
        }
    })
}