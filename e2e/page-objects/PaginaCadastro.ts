import { Locator, Page, expect } from "@playwright/test";
import FormBaseCadastroEPerfil from "./PaginaBaseCadastroEPerfil";

export default class PaginaCadastro {
  private readonly page: Page;
  readonly formBase: FormBaseCadastroEPerfil;
  
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly checkboxTermos: Locator;

  constructor(page: Page) {
    // trazer discussão de escolha herança X composição
    this.page = page;
    this.formBase = new FormBaseCadastroEPerfil(page);

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
