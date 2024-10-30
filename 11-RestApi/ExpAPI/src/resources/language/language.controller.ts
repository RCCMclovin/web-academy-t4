import { Request, Response } from "express";
import { ChangeLanguageDTO } from "./language.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const changeLanguage = (req: Request, res: Response) => {
  /*
    #swagger.tags = ["Linguagem"]
    #swagger.summary = 'Muda a linguagem da API.'
    #swagger.parameters['body'] = {
    in: 'body',
        schema: { $ref: '#/definitions/ChangeLanguageDTO' }
    } 
    #swagger.responses[200] = {description: 'OK'}
    */
  const { lang } = req.body as ChangeLanguageDTO;
  res.cookie('lang', lang);
  res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
}

export default { changeLanguage };