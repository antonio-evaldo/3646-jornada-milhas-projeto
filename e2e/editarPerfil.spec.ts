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

    await paginaPerfil.formBase.definirNome(novosDados.nome);
    await paginaPerfil.formBase.definirDataNascimento(novosDados.dataNascimento); // corrigir no código Angular
    await paginaPerfil.formBase.definirGenero(novosDados.genero);
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
    await paginaPerfil.dadosEstaoCorretos(novosDados);
   });
});
