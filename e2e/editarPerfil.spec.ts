import { gerarPerfil } from './operacoes/gerarPefil';
import test from './page-objects/fixtures';

test.describe("Página de Perfil", () => {
  test.beforeEach(async ({ paginaLogin, paginaPerfil }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('antonio.evaldo@alura.com', '1234567');
    await paginaLogin.loginFeitoComSucesso();

    await paginaPerfil.visitar();
  });

  test("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    const novosDados = gerarPerfil();

    await paginaPerfil.formBase.definirNome(novosDados.nome);
    await paginaPerfil.formBase.definirDataNascimento(novosDados.dataNascimento); // corrigir no código Angular
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
    await paginaPerfil.dadosEstaoCorretos(novosDados);  // corrigir exibição da data no código Angular
   });
});
