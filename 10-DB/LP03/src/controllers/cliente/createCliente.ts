import { PrismaClient} from '@prisma/client';
import myCliente from '../../types/cliente';


const prisma = new PrismaClient();

// Função para criar um novo cliente
async function createCliente(cliente: myCliente){
  const novoCliente = await prisma.cliente.create({
    data: {
          nome: cliente.nome,
          CPF: cliente.CPF,
          telefone: cliente.telefone,
          email: cliente.email,
          DoB: cliente.DoB,
          Enderecos_Cliente: {
            createMany: {data: cliente.enderecos},
          },
    },
  });

  console.log('Cliente criado:', novoCliente);
}

export default createCliente;
