import { Request, Response } from 'express';
import productService from './product.service'
import { CreateProductDto } from './product.types';
import { StatusCodes, ReasonPhrases } from "http-status-codes"

const index = async (req: Request, res: Response) => {
  try {
    const products = await productService.list();
    res.json(products);
  } catch (e) {
    res.status(500).json(e);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const product = req.body as CreateProductDto;
    if (!(await productService.checkAlreadyExists(product.name))) {
      const newProduct = productService.create(product);
      res.json(newProduct);
    } else {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
  } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
};
const update = async (req: Request, res: Response) => {
};
const remove = async (req: Request, res: Response) => {};
const read = async (req: Request, res: Response) => {
  try {
    const product = productService.read(req.params.id)
    res.json(product);
  } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
};

export default { index, create, update, remove, read };
