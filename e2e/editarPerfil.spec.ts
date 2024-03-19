import { test } from './page-objects/fixtures';

test.describe("Página de Perfil", () => {
  test.beforeEach(async ({ paginaLogin, paginaPerfil }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('antonio.evaldo@alura.com', '123456');
    await paginaLogin.loginFeitoComSucesso();

    await paginaPerfil.visitar();
  });

  test("Deve conseguir editar o perfil", async () => {  });
});
