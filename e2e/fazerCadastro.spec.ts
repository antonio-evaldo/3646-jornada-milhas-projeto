import { gerarPerfil } from './operacoes/gerarPefil';
import { Perfil } from './page-objects/FormBaseCadastroEPerfil';
import test from './setup/fixtures';

test.describe("Página de Cadastro", () => {
  let novoUsuario: Perfil;

  test.beforeEach(async ({ paginaCadastro }) => {
    novoUsuario = gerarPerfil();
    await paginaCadastro.visitar();
  });

  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();
  });

  test("Não deve conseguir fazer cadastro com os mesmos dados", async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.estaMostrandoDialogoDeErro('E-mail já utilizado.');
  });
});
