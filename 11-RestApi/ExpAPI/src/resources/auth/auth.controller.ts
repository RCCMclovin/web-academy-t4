import { Request, Response } from 'express';
import { AuthDTO, SignUpDto } from './auth.types';
import { checkAuth } from './auth.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userService from '../user/user.service';
import { UserTypes } from '../userType/userType.consts';

const login = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Auth"]
 #swagger.summary = 'Usuário faz Login.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/AuthDTO' }
 } 
#swagger.responses[200] = {description: 'OK'}
 #swagger.responses[401] = {
 description:  'Usuário ou senha incorretos.'
 }
*/
  const credentials = req.body as AuthDTO;
  const uid = await checkAuth(credentials);
  if (uid) {
    req.session.uid = uid;
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  }
};

const logout = (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Auth"]
 #swagger.summary = 'Usuário faz Login.'
 #swagger.responses[200] = {description: 'OK'}
 #swagger.responses[400] = {
 description:  'Usuário não logado.'
 }
  */
  if (req.session.uid)
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  else {
    req.session.destroy((err) => {
      if (err)
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    });
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  }
};

///*

const signUp = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Auth"]
 #swagger.summary = 'Usuário é criado e faz Login.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/SignUpDto' }
 } 
#swagger.responses[201] = {
 schema: { $ref: '#/definitions/UserDTO' }
 }
 #swagger.responses[400] = {
 description:  'Email informado já está sendo usado.'
 }
*/
  const usuario = req.body as SignUpDto;
  try {
    if (await userService.findUserByEmail(usuario.email)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Email informado já está sendo usado.' });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUsuario } = await userService.createUser({
        ...usuario,
        userTypeId: UserTypes.client,
      });
      req.session.uid = newUsuario.id;
      res.status(StatusCodes.CREATED).json(newUsuario);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e.errors);
  }
};
//*/

export default { login, logout, signUp };
