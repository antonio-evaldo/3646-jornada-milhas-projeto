import { expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

import { test, Fixtures } from "e2e/setup/fixtures";
import PaginaCadastro from "../page-objects/PaginaCadastro";
import PaginaLogin from "../page-objects/PaginaLogin";
import { gerarPerfil } from "e2e/operacoes/gerarPefil";

export const testeLogado = test.extend<Fixtures, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [async ({ browser }, use) => {
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    // Important: make sure we authenticate in a clean environment by unsetting storage state.
    const page = await browser.newPage({ storageState: undefined });
    const paginaCadastro = new PaginaCadastro(page);
    const paginaLogin = new PaginaLogin(page);

    // Acquire a unique account, for example create a new one.
    // Alternatively, you can have a list of precreated accounts for testing.
    // Make sure that accounts are unique, so that multiple team members
    // can run tests at the same time without interference.
    // await paginaCadastro.visitar();
    await page.goto('http://localhost:4200/auth/cadastro');

    const novoUsuario = gerarPerfil();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    // await paginaCadastro.cadastroFeitoComSucesso();
    // await paginaLogin.visitar();
    await expect(page).toHaveURL('http://localhost:4200/auth/login');

    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    // await paginaLogin.loginFeitoComSucesso();
    await expect(page).toHaveURL('http://localhost:4200/home');

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});
