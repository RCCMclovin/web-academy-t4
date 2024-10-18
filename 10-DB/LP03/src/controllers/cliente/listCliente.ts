import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para todos os clientes
async function getCliente() {
    const cliente = await prisma.cliente.findMany({
      where: { },
      include: { Enderecos_Cliente: true },
    });
  
    return cliente;
}

export default getCliente;

