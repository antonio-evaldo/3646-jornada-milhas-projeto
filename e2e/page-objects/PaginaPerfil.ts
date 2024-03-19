import { Locator, Page, expect } from "@playwright/test";
import PaginaBaseCadastroEPerfil from "./PaginaBaseCadastroEPerfil";

export default class PaginaPerfil extends PaginaBaseCadastroEPerfil {
  private readonly linkPerfil: Locator;

  constructor(page: Page) {
    super(page);

    this.linkPerfil = page.getByTestId('header-link-perfil');
  }

  async visitar() {
    await this.page.goto('/');
    await this.linkPerfil.click();
    await expect(this.page).toHaveURL('/auth/perfil');
  }

  async atualizar() {
    // await this.botaoCadastrar.click();
  }

  async atualizadoComSucesso() {
    // await expect(this.page).toHaveURL('/auth/login');
  }
}
