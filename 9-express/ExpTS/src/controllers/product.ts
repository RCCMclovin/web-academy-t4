import { Request, Response } from 'express';
import axios from 'axios';

import { Product, CreateProductDto } from '../types/product';

const index = async (req: Request, res: Response) => {
  try {
    const { data: produtos } = await axios.get<Product[]>(
      `${process.env.DB_SERVER}/produtos`,
    );
    res.render('product/index', {
      produtos,
      layout: 'main',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('product/create', { layout: 'main' });
  } else if (req.method === 'POST') {
    const produto: CreateProductDto = req.body;
    try {
      await axios.post(`${process.env.DB_SERVER}/produtos`, produto);
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
const read = async (req: Request, res: Response) => {
  try {
    const { data: produto } = await axios.get<Product>(
      `${process.env.DB_SERVER}/produtos/${req.params.id}`,
    );
    res.render('product/view', { produto, layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
};
const update = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      const { data: produto } = await axios.get<Product>(
        `${process.env.DB_SERVER}/produtos/${req.params.id}`,
      );
      res.render('product/update', { produto, layout: 'main' });
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (req.method === 'POST') {
    const produto: CreateProductDto = req.body;
    try {
      await axios.patch(
        `${process.env.DB_SERVER}/produtos/${req.params.id}`,
        produto,
      );
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    await axios.delete(`${process.env.DB_SERVER}/produtos/${req.params.id}`);
    res.redirect('/produtos');
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { index, read, create, update, remove };
