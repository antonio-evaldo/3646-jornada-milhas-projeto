import { testeLogado } from './setup/testeLogado';
import { gerarPerfil } from './operacoes/gerarPefil';

testeLogado.describe("Página de Perfil", () => {
  testeLogado.beforeEach(async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();
  });

  testeLogado("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    const novosDados = gerarPerfil();

    await paginaPerfil.formBase.definirNome(novosDados.nome);
    await paginaPerfil.formBase.definirDataNascimento(novosDados.dataNascimento);
    await paginaPerfil.formBase.definirGenero(novosDados.genero);
    await paginaPerfil.formBase.definirCPF(novosDados.cpf);
    await paginaPerfil.formBase.definirTelefone(novosDados.telefone);
    await paginaPerfil.formBase.definirCidade(novosDados.cidade);
    await paginaPerfil.formBase.definirEstado(novosDados.estado);

    const emailAtual = await paginaPerfil.formBase.obterValorInputEmail();

    await paginaPerfil.formBase.confirmarEmail(emailAtual);
    await paginaPerfil.formBase.definirSenha(novosDados.senha);
    await paginaPerfil.formBase.confirmarSenha(novosDados.senha);
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
