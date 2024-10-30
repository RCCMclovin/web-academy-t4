import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const doc = {
  info: {
    title: 'API da Loja virtual',
    description: 'Documentação da API',
    version: '1.0.1',
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProductDto: {
      name: 'Modern Soft Sausages',
      price: 2699.0,
      stockQuantity: 9,
    },
    Product: {
      id: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
      name: 'Modern Soft Sausages',
      price: 2699.0,
      stockQuantity: 9,
      createdAt: '2023-11-07T19:27:15.645Z',
      updatedAt: '2023-11-07T19:27:15.645Z',
    },
    ChangeLanguageDTO: {
      lang: 'pt-BR',
    },
    AuthDTO: {
      email: 'email@example.com',
      password: 'SenhaMuitoForte',
    },
    SignUpDto: {
      name: 'Fulano de Tal',
      email: 'email@example.com',
      password: 'SenhaMuitoForte',
    },
    CreateUserDTO: {
      name: 'Fulano de Tal',
      email: 'email@example.com',
      password: 'SenhaMuitoForte',
      userTypeId: '3299edf2-faf0-4d18-addd-0e530e0024ff',
    },
    UserDTO: {
      name: 'Fulano de Tal',
      email: 'email@example.com',
      userTypeId: '3299edf2-faf0-4d18-addd-0e530e0024ff',
    },
    UpdateUserDTO: {
      name: 'Fulano de Tal',
      email: 'email@example.com',
      password: 'SenhaMuitoForte',
    },
  },
};
const outputFile = './swagger-output.json';
const routes = [path.join(__dirname, 'router/index.ts')];
swaggerAutogen()(outputFile, routes, doc);
