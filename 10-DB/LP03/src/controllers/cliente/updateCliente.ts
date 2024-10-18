import { PrismaClient } from '@prisma/client';
import Cliente from '../../types/cliente';

const prisma = new PrismaClient();

// Função para atualizar o email e celular de um cliente
async function updateCliente(cliente: Cliente) {
  const clienteAtualizado = await prisma.cliente.update({
    where: { CPF: cliente.CPF },
    data: {
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        DoB: cliente.DoB,
    },
  });

  console.log('Cliente atualizado:', clienteAtualizado);
}

export default updateCliente;