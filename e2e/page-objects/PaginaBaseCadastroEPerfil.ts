import { Locator, Page } from "@playwright/test";

export default abstract class PaginaBaseCadastroEPerfil {
  protected readonly page: Page;
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
  private readonly botaoSubmeterForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNome = page.getByTestId('form-base-input-nome');
    this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento');
    this.inputCpf = page.getByTestId('form-base-input-cpf');
    this.inputCidade = page.getByTestId('form-base-input-cidade');
    this.radioGeneroFeminino = page
      .getByTestId('form-base-radio-genero-feminino')
      .getByLabel('Feminino');

    this.radioGeneroMasculino = page
      .getByTestId('form-base-radio-genero-masculino')
      .getByLabel('Masculino');

    this.inputTelefone = page.getByTestId('form-base-input-telefone');

    this.inputEstado = page
      .getByTestId('form-base-container-estado')
      .getByLabel('Estado');

    this.inputEmail = page.getByTestId('form-base-input-email');
    this.inputSenha = page.getByTestId('form-base-input-senha');
    this.inputConfirmarEmail = page.getByTestId('form-base-input-confirmar-email');
    this.inputConfirmarSenha = page.getByTestId('form-base-input-confirmar-senha');

    this.botaoSubmeterForm = page.getByTestId('botao-submeter-form');
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

  async submeterForm() {
    await this.botaoSubmeterForm.click();
  }
}
