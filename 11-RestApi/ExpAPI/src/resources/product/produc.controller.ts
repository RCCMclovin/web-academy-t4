import { Request, Response } from 'express';

const products: any[] = [];

const index = (req: Request, res: Response) => {
  res.json(products);
};
const create = (req: Request, res: Response) => {
    products.push(req.body);
    res.status(201).json({ message: "Ok", data: products });
};
const update = (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(products.find((p: any) => p.id == id));
};
const remove = (req: Request, res: Response) => {};
const read = (req: Request, res: Response) => {};

export default { index, create, update, remove, read };
