import { Locator, Page, expect } from "@playwright/test";

export interface Perfil {
  nome: string,
  dataNascimento: string,
  cpf: string,
  telefone: string,
  cidade: string,
  estado: string,
  email: string,
  senha: string,
}

export default class FormBaseCadastroEPerfil {
  private readonly inputNome: Locator;
  private readonly inputDataNascimento: Locator;
  private readonly radioGeneroFeminino: Locator;
  private readonly radioGeneroMasculino: Locator;
  private readonly radioGeneroNaoInformado: Locator;
  private readonly inputCpf: Locator;
  private readonly inputTelefone: Locator;
  private readonly inputCidade: Locator;
  private readonly inputEstado: Locator;
  private readonly inputEmail: Locator;
  private readonly inputConfirmarEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly inputConfirmarSenha: Locator;
  private readonly botaoSubmeterForm: Locator;

  constructor(page: Page) {
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

    this.radioGeneroNaoInformado = page
      .getByTestId('form-base-radio-genero-nao-informar')
      .getByLabel('Prefiro não informar');

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

  async definirGeneroNaoInformado() {
    await this.radioGeneroNaoInformado.check();
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

  async dadosEstaoCorretos({ nome, dataNascimento, cpf, telefone, cidade, estado, email }: Perfil) {
    await expect(this.inputNome).toHaveValue(nome);
    await expect(this.inputDataNascimento).toHaveValue(dataNascimento);
    await expect(this.inputCpf).toHaveValue(cpf);
    await expect(this.inputTelefone).toHaveValue(telefone);
    await expect(this.inputCidade).toHaveValue(cidade);
    await expect(this.inputEstado).toHaveValue(estado);
    await expect(this.inputEmail).toHaveValue(email);
  }
  
  async generoMasculinoEstaMarcado() {
    await expect(this.radioGeneroMasculino).toBeChecked();
  }

  async generoFemininoEstaMarcado() {
    await expect(this.radioGeneroFeminino).toBeChecked();
  }

  async generoNaoInformadoEstaMarcado() {
    await expect(this.radioGeneroNaoInformado).toBeChecked();
  }
}
