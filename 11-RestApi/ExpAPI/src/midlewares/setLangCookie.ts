import { NextFunction, Request, Response } from "express";


const setLangCookie = (defaultLang: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!("lang" in req.cookies)) {
            res.cookie("lang", defaultLang);
        }
        next();
    }
}

export default setLangCookie;

