import { Request, Response } from 'express';
import productService from './product.service'
import { CreateProductDto } from './product.types';
import { StatusCodes, ReasonPhrases } from "http-status-codes"

const index = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Produtos"]
 #swagger.summary = 'Recupera dados de todos os produtos.'
 #swagger.responses[200] = {
 schema: [{ $ref: '#/definitions/Product' }]
 }   
*/
  try {
    const products = await productService.list();
    res.json(products);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const create = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Produtos"]
 #swagger.summary = 'Adiciona um novo produto na base.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateProductDto' }
 } 
#swagger.responses[201] = {
 schema: { $ref: '#/definitions/Product' }
 }
 #swagger.responses[409] = {
 description:  'Já existe um produto com o nome informado'
 }
*/
  try {
    const product = req.body as CreateProductDto;
    if (!(await productService.checkAlreadyExists(product.name))) {
      const newProduct = await productService.create(product);
      res.status(StatusCodes.CREATED).json(newProduct);
    } else {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const update = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Produtos"]
 #swagger.summary = 'Atualiza os dados de um produto específico.'
 #swagger.parameters['id'] = { description: 'ID do produto' }
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateProductDto' }
 } 
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Product' }
 }
 #swagger.responses[406] = {
 description:  'Não existe um produto com o id informado'
 }
*/
  try {
    const product = req.body as CreateProductDto;
    if (await productService.checkAlreadyExists(product.name)) {
      const newProduct = await productService.update(req.params.id, product);
      res.json(newProduct);
    } else {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(ReasonPhrases.NOT_ACCEPTABLE);
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const remove = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Produtos"]
 #swagger.summary = 'Remove os dados de um produto específico.'
 #swagger.parameters['id'] = { description: 'ID do produto' }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Product' }
 }   
*/
  try {
    const product = await productService.remove(req.params.id);
    res.json(product);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
const read = async (req: Request, res: Response) => {
  /*
 #swagger.tags = ["Produtos"]
 #swagger.summary = 'Recupera dados de um produto específico.'
 #swagger.parameters['id'] = { description: 'ID do produto' }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Product' }
 }   
*/
  try {
    const product = await productService.read(req.params.id);
    res.json(product);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export default { index, create, update, remove, read };
