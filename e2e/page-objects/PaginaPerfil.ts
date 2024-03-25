import { Locator, Page, expect } from "@playwright/test";
import FormBaseCadastroEPerfil from "./PaginaBaseCadastroEPerfil";

export default class PaginaPerfil {
  private readonly page: Page;
  readonly formBase: FormBaseCadastroEPerfil;
  
  private readonly linkPerfil: Locator;
  private readonly botaoDeslogar: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.formBase = new FormBaseCadastroEPerfil(page);

    this.linkPerfil = page.getByTestId('header-link-perfil');
    this.botaoDeslogar = page.getByTestId('form-base-botao-deslogar');
  }

  async visitar() {
    await this.page.goto('/');
    await this.linkPerfil.click();
    await expect(this.page).toHaveURL('/auth/perfil');
  }

  async deslogar() {
    await this.botaoDeslogar.click();
  }

  async atualizadoComSucesso() {
    await expect(this.page).toHaveURL('/home');
  }
}
