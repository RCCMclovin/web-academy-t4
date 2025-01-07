export interface Product {
id: number;
nome: string;
preco: number;
estoque: number;
}

export type CreateProductDto = Pick<Product, 'nome' | 'preco' | 'estoque'>;
