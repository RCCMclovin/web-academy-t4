import clienteController from './controllers/cliente/clienteController'

import Cliente from "./types/cliente"

import { faker } from '@faker-js/faker'

function newRandomCliente(): Cliente{
    let cliente = new Cliente(faker.string.numeric(11),
        faker.internet.userName(),
        faker.phone.number({ style: 'international' }),
        faker.internet.email(),
        faker.date.birthdate()
    );
    cliente.add_endereco(faker.location.streetAddress(true));
    return cliente;
}

let cliente = newRandomCliente();
clienteController.create(cliente);

