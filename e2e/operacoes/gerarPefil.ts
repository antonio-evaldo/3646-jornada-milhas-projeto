import { Genero, Perfil } from '../page-objects/PaginaBaseCadastroEPerfil';
import { faker } from '@faker-js/faker/locale/pt_BR';

export function gerarPerfil(): Perfil {
  return {
    nome: faker.person.fullName(),
    dataNascimento: faker.date.birthdate({ mode: 'age', min: 18, max: 120 }),
    genero: faker.helpers.enumValue(Genero),
    cpf: faker.string.numeric(11),
    telefone: faker.string.numeric(11),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };
}
