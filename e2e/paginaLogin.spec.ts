import test from './page-objects/fixtures';

test.describe("Página de Login", () => {
  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('antonio.errado@alura.com', '123456');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso');
  });
});
