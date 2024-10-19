import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const checkAuth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.session && req.session.uid) next();
        else res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
}

export default checkAuth;