import { Product, PrismaClient } from "@prisma/client";
import { CreateProductDto } from './product.types';

const prisma = new PrismaClient();

async function list(): Promise<Product[]> {
    return prisma.product.findMany();
}

async function checkAlreadyExists(name: string): Promise<boolean>{
    return !!(await prisma.product.findUnique({ where: { name } }));
}

async function create(product: CreateProductDto): Promise<Product> {
    return prisma.product.create({ data: product });
}

async function read(id: string): Promise<Product>{
    return prisma.product.findUnique({where:{id}}) as Promise<Product>;
}

async function update(id: string, product: CreateProductDto): Promise<Product>{
    return prisma.product.update({
        where: { id },
        data: product,
    });
}

async function remove(id: string): Promise<Product>{
    return prisma.product.delete({
        where: { id },
    });
}

export default {list, checkAlreadyExists, create, read, update, remove}