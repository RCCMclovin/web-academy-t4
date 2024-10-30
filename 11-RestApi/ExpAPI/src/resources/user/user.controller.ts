import { Request, Response } from 'express';
import userService from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const index = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Usuários"]
 #swagger.summary = 'Recupera dados de todos os usuários.'
 #swagger.responses[200] = {
 schema: [{ $ref: '#/definitions/UserDTO' }]
 }   
*/
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};
const create = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Usuários"]
 #swagger.summary = 'Adiciona um novo usuário na base.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateUserDTO' }
 } 
 #swagger.responses[201] = {
 schema: { $ref: '#/definitions/UserDTO' }
 }
 #swagger.responses[409] = {
 description:  'Já existe um usuário com o id informado'
 }
*/
  const user = req.body as CreateUserDTO;
  try {
    const findByEmail = await userService.findUserByEmail(user.email);
    if (!findByEmail) {
      const newUser = await userService.createUser(user);
      res.json(newUser);
    } else {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
};
const update = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Usuários"]
 #swagger.summary = 'Atualiza os dados de um usuário específico.'
 #swagger.parameters['id'] = { description: 'ID do usuário' }
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateUserDTO' }
 } 
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/UserDTO' }
 }
 #swagger.responses[406] = {
 description:  'Não existe um usuário com o id informado'
 }
*/
  try {
    const user = req.body as UpdateUserDTO;
    if (await userService.findUserByEmail(user.name)) {
      const newUser = await userService.updateUser(req.params.id, user);
      res.json(newUser);
    } else {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(ReasonPhrases.NOT_ACCEPTABLE);
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const remove = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Usuários"]
 #swagger.summary = 'Remove os dados de um usuário específico.'
 #swagger.parameters['id'] = { description: 'ID do usuário' }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/UserDTO' }
 }   
*/
  try {
    const user = await userService.removeUser(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const read = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Usuários"]
 #swagger.summary = 'Recupera dados de um usuário específico.'
 #swagger.parameters['id'] = { description: 'ID do usuário' }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/UserDTO' }
 }   
*/
  try {
    const user = await userService.readUser(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export default { index, create, update, remove, read };
