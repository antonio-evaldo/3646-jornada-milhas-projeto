import { test } from './page-objects/fixtures';

test.describe("Página de Cadastro", () => {
  // Variáveis de ambiente para diferentes ambientes (ex: cpf diferente para local e homologação)
  // também pode ser apenas um arquivo que exporta constantes

  test.beforeEach(async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();
  });

  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    await paginaCadastro.formBase.definirNome('Antônio Evaldo');
    await paginaCadastro.formBase.definirDataNascimento('10/05/1999'); // corrigir no código Angular
    await paginaCadastro.formBase.definirGeneroMasculino();
    await paginaCadastro.formBase.definirCPF('12345678901');
    await paginaCadastro.formBase.definirTelefone('86912345678');
    await paginaCadastro.formBase.definirCidade('Teresina');
    await paginaCadastro.formBase.definirEstado('Piauí');

    const email = 'antonio.evaldo@alura.com';
    const senha = '1234567';

    await paginaCadastro.formBase.definirEmail(email);
    await paginaCadastro.formBase.confirmarEmail(email);
    await paginaCadastro.formBase.definirSenha(senha);
    await paginaCadastro.formBase.confirmarSenha(senha);
    await paginaCadastro.confirmarTermos();
    await paginaCadastro.formBase.submeterForm();
    await paginaCadastro.cadastroFeitoComSucesso();
  });
});
