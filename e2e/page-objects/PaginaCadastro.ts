import { Locator, Page, expect } from "@playwright/test";
import { test as base } from "@playwright/test";

export const test = base.extend<{ paginaCadastro: PaginaCadastro }>({
  paginaCadastro: async ({ page }, use) => {
    const paginaLogin = new PaginaCadastro(page);
    await paginaLogin.visitar();
    await use(paginaLogin);
  }
});

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly inputNome: Locator;
  private readonly inputDataNascimento: Locator;
  private readonly inputCpf: Locator;
  private readonly inputCidade: Locator;
  private readonly radioGeneroFeminino: Locator;
  private readonly radioGeneroMasculino: Locator;
  private readonly inputTelefone: Locator;
  private readonly inputEstado: Locator;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly inputConfirmarEmail: Locator;
  private readonly inputConfirmarSenha: Locator;
  private readonly checkboxTermos: Locator;
  private readonly botaoCadastrar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoVisitarPaginaCadastro = page.getByTestId('botao-visitar-pagina-cadastro');
    this.inputNome = page.getByTestId('input-cadastro-nome');
    this.inputDataNascimento = page.getByTestId('input-cadastro-data-nascimento');
    this.inputCpf = page.getByTestId('input-cadastro-cpf');
    this.inputCidade = page.getByTestId('input-cadastro-cidade');
    this.radioGeneroFeminino = page
      .getByTestId('radio-cadastro-genero-feminino')
      .getByLabel('Feminino');

    this.radioGeneroMasculino = page
      .getByTestId('radio-cadastro-genero-masculino')
      .getByLabel('Masculino');

    this.inputTelefone = page.getByTestId('input-cadastro-telefone');

    this.inputEstado = page
      .getByTestId('container-cadastro-estado')
      .getByLabel('Estado');

    this.inputEmail = page.getByTestId('input-cadastro-email');
    this.inputSenha = page.getByTestId('input-cadastro-senha');
    this.inputConfirmarEmail = page.getByTestId('input-cadastro-confirmar-email');
    this.inputConfirmarSenha = page.getByTestId('input-cadastro-confirmar-senha');
    this.checkboxTermos = page
      .getByTestId('checkbox-cadastro-termos')
      .getByLabel('Li e aceito os termos e condições deste cadastro');

    this.botaoCadastrar = page.getByTestId('botao-cadastrar');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async definirNome(nome: string) {
    await this.inputNome.fill(nome);
  }

  async definirDataNascimento(dataDigitada: string) {
    await this.inputDataNascimento.fill(dataDigitada);
  }

  async definirGeneroFeminino() {
    await this.radioGeneroFeminino.check();
  }

  async definirGeneroMasculino() {
    await this.radioGeneroMasculino.check();
  }

  async definirCPF(cpf: string) {
    await this.inputCpf.fill(cpf);
  }

  async definirTelefone(telefone: string) {
    await this.inputTelefone.fill(telefone);
  }

  async definirCidade(cidade: string) {
    await this.inputCidade.fill(cidade);
  }

  async definirEstado(estado: string) {
    await this.inputEstado.fill(estado);
    await this.inputEstado.press('Enter');
  }

  async definirEmail(email: string) {
    await this.inputEmail.fill(email);
  }

  async confirmarEmail(email: string) {
    await this.inputConfirmarEmail.fill(email);
  }

  async definirSenha(senha: string) {
    await this.inputSenha.fill(senha);
  }

  async confirmarSenha(senha: string) {
    await this.inputConfirmarSenha.fill(senha);
  }

  async confirmarTermos() {
    await this.checkboxTermos.check();
  }

  async cadastrar() {
    await this.botaoCadastrar.click();
  }

  async cadastroFeitoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
  }
}
