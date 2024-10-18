import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para deletar um cliente e suas dependências por ID + Cascade
async function deleteCliente(id: string) {
  // Deletar endereços associados ao cliente
  await prisma.enderecos_Cliente.deleteMany({
    where: { Cliente_CPF: id },
  });

  // Deletar compras associadas ao cliente (se houver)
  await prisma.pedido.deleteMany({
    where: { Cliente_CPF: id },
  });

  // Deletar o cliente
  const clienteDeletado = await prisma.cliente.delete({
    where: { CPF: id },
  });

  console.log('Cliente deletado:', clienteDeletado);
}

export default deleteCliente;

