import { Locator, Page, expect } from "@playwright/test";
import PaginaBaseCadastroEPerfil from "./PaginaBaseCadastroEPerfil";
import { test as base } from "@playwright/test";

export const test = base.extend<{ paginaCadastro: PaginaCadastro }>({
  paginaCadastro: async ({ page }, use) => {
    const paginaLogin = new PaginaCadastro(page);
    await use(paginaLogin);
  }
});

export default class PaginaCadastro extends PaginaBaseCadastroEPerfil {
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly checkboxTermos: Locator;

  constructor(page: Page) {
    super(page);

    this.botaoVisitarPaginaCadastro = page.getByTestId('botao-visitar-pagina-cadastro');
    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito os termos e condições deste cadastro');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async confirmarTermos() {
    await this.checkboxTermos.check();
  }

  async cadastroFeitoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
  }
}
