import { gerarPerfil } from './operacoes/gerarPefil';
import test from './page-objects/fixtures';

test.describe("Página de Perfil", () => {
  test.beforeEach(async ({ paginaCadastro, paginaLogin, paginaPerfil }) => {
    const novoUsuario = gerarPerfil();
    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaLogin.visitar();
    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await paginaLogin.loginFeitoComSucesso();

    await paginaPerfil.visitar();
  });

  test("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    const novosDados = gerarPerfil();

    await paginaPerfil.formBase.preencherForm(novosDados);
    await paginaPerfil.formBase.submeterForm();
    await paginaPerfil.atualizadoComSucesso();

    await paginaPerfil.visitar();
    await paginaPerfil.dadosEstaoCorretos(novosDados);
  });

  test("Deve conseguir fazer logout", async ({ paginaPerfil }) => {
    await paginaPerfil.deslogar();
    await paginaPerfil.deslogadoComSucesso();
  });
});
