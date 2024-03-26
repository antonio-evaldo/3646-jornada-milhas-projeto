import { Locator, Page, expect } from "@playwright/test";
import FormBaseCadastroEPerfil, { Perfil } from "./PaginaBaseCadastroEPerfil";

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

  async estaMostrandoDialogDeErro(mensagem: string) {
    const mensagemElemento = this.page.getByText(mensagem);
    await expect(mensagemElemento).toBeVisible();
  }

  async cadastrarUsuario(novoUsuario: Perfil) {
    await this.formBase.definirNome(novoUsuario.nome);
    await this.formBase.definirDataNascimento(novoUsuario.dataNascimento); // corrigir no código Angular
    await this.formBase.definirGenero(novoUsuario.genero);
    await this.formBase.definirCPF(novoUsuario.cpf);
    await this.formBase.definirTelefone(novoUsuario.telefone);
    await this.formBase.definirCidade(novoUsuario.cidade);
    await this.formBase.definirEstado(novoUsuario.estado);

    await this.formBase.definirEmail(novoUsuario.email);
    await this.formBase.confirmarEmail(novoUsuario.email);
    await this.formBase.definirSenha(novoUsuario.senha);
    await this.formBase.confirmarSenha(novoUsuario.senha);
    await this.confirmarTermos();
    await this.formBase.submeterForm();
  }
}
