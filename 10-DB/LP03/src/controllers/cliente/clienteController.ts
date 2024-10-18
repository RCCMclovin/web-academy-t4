import { PrismaClient } from '@prisma/client';

import createCliente from "./createCliente";
import updateCliente from "./updateCliente";
import getCliente from "./getCliente";
import getClientes from "./listCliente";
import deleteCliente from "./deleteCliente";

import Cliente from "../../types/cliente";

const prisma = new PrismaClient();

function remove(cpf: string) {
    deleteCliente(cpf)
        .catch(e => console.error(e))
        .finally(async () => {
            await prisma.$disconnect();
        });
}

function create(cliente: Cliente) {
    createCliente(cliente)
        .catch(e => console.error(e))
        .finally(async () => {
            await prisma.$disconnect();
        });
}

function read(cpf: string) {
    let cliente = getCliente(cpf)
        .catch(e => console.error(e))
        .finally(async () => {
            await prisma.$disconnect();
        });
    return cliente
}

  
function list() {
    let clientes = getClientes()
        .catch(e => console.error(e))
        .finally(async () => {
            await prisma.$disconnect();
        });
    
    return clientes;
}

function update(cliente: Cliente) {
    updateCliente(cliente)
        .catch(e => console.error(e))
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default {remove, create, read, list, update};
