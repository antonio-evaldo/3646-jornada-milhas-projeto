import { Perfil } from './page-objects/PaginaBaseCadastroEPerfil';
import { test } from './page-objects/fixtures';

test.describe("Página de Perfil", () => {
  test.beforeEach(async ({ paginaLogin, paginaPerfil }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('antonio.evaldo@alura.com', '1234567');
    await paginaLogin.loginFeitoComSucesso();

    await paginaPerfil.visitar();
  });

  test("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    const novosDados: Perfil = {
      nome: 'Evaldo Junior',
      dataNascimento: '10/13/1999',
      cpf: '11111111111',
      telefone: '0087654321',
      cidade: 'Fortaleza',
      estado: 'Ceará',
      email: 'novo.evaldo@alura.com',
      senha: '123456',
    };

    await paginaPerfil.formBase.definirNome(novosDados.nome);
    await paginaPerfil.formBase.definirDataNascimento(novosDados.dataNascimento); // corrigir no código Angular
    await paginaPerfil.formBase.definirGeneroNaoInformado();
    await paginaPerfil.formBase.definirCPF(novosDados.cpf);
    await paginaPerfil.formBase.definirTelefone(novosDados.telefone);
    await paginaPerfil.formBase.definirCidade(novosDados.cidade);
    await paginaPerfil.formBase.definirEstado(novosDados.estado);

    await paginaPerfil.formBase.definirEmail(novosDados.email);
    await paginaPerfil.formBase.confirmarEmail(novosDados.email);
    await paginaPerfil.formBase.definirSenha(novosDados.senha);
    await paginaPerfil.formBase.confirmarSenha(novosDados.senha);
    await paginaPerfil.formBase.submeterForm();
    await paginaPerfil.atualizadoComSucesso();

    await paginaPerfil.visitar();
    await paginaPerfil.formBase.dadosEstaoCorretos(novosDados);  // corrigir exibição da data no código Angular
    await paginaPerfil.formBase.generoNaoInformadoEstaMarcado();
   });
});
