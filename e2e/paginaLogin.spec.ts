import { gerarPerfil } from './operacoes/gerarPefil';
import test from './setup/fixtures';

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async ({ paginaCadastro, paginaLogin }) => {
    const novoUsuario = gerarPerfil();
    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();
  
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await paginaLogin.loginFeitoComSucesso();
  });
  
  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('antonio.errado@alura.com', '123456');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso');
  });
});
