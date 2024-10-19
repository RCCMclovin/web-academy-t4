import { Request, Response } from "express";
import { AuthDTO } from "./auth.types";
import { checkAuth } from "./auth.service"
import { ReasonPhrases, StatusCodes } from "http-status-codes";


const login = (req: Request, res: Response) => {
    const { email, password } = req.body as AuthDTO;
    const uid = checkAuth(email, password);
    if (uid) {
        req.session.uid = uid;
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } else {
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }

}

const logout =  (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if(err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    });
    
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
}

export default {login, logout}