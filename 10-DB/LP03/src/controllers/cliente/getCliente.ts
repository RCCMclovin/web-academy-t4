import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar um cliente por ID
async function getCliente(id: string) {
    const cliente = await prisma.cliente.findUnique({
        where: { CPF: id },
        include: { Enderecos_Cliente: true },
    });
  
    return cliente
}

export default getCliente;