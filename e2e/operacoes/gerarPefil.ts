import { Genero, Perfil } from '../page-objects/FormBaseCadastroEPerfil';
import { faker } from '@faker-js/faker/locale/pt_BR';

export function gerarPerfil(): Perfil {
  return {
    nome: faker.person.fullName(),
    dataNascimento: faker.date.birthdate(),
    genero: faker.helpers.enumValue(Genero),
    cpf: faker.string.numeric(11),
    telefone: faker.string.numeric(11),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };
}
