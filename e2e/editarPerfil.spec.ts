import { testeLogado } from './setup/testeLogado';
import { gerarPerfil } from './operacoes/gerarPefil';

testeLogado.describe("Página de Perfil", () => {
  testeLogado.beforeEach(async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();
  });

  testeLogado("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    const novosDados = gerarPerfil();
    const emailAtual = await paginaPerfil.formBase.obterValorInputEmail();

    await paginaPerfil.formBase.preencherForm({ ...novosDados, email: emailAtual });
    await paginaPerfil.formBase.submeterForm();
    await paginaPerfil.atualizadoComSucesso();

    await paginaPerfil.visitar();
    await paginaPerfil.dadosEstaoCorretos({ ...novosDados, email: emailAtual });
  });

  testeLogado("Deve conseguir fazer logout", async ({ paginaPerfil }) => {
    await paginaPerfil.deslogar();
    await paginaPerfil.deslogadoComSucesso();
  });
});
