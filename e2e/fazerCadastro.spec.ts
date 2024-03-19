import { test } from './page-objects/PaginaCadastro';

test.describe("Página de Cadastro", () => {
  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    await paginaCadastro.definirNome('Antônio Evaldo');
    await paginaCadastro.definirDataNascimento('10/05/1999'); // corrigir no código Angular
    await paginaCadastro.definirGeneroMasculino();
    await paginaCadastro.definirCPF('12345678901');
    await paginaCadastro.definirTelefone('86912345678');
    await paginaCadastro.definirCidade('Teresina');
    await paginaCadastro.definirEstado('Piauí');

    const email = 'antonio.evaldo@alura.com';
    const senha = '1234567';

    await paginaCadastro.definirEmail(email);
    await paginaCadastro.confirmarEmail(email);
    await paginaCadastro.definirSenha(senha);
    await paginaCadastro.confirmarSenha(senha);
    await paginaCadastro.confirmarTermos();
    await paginaCadastro.cadastrar();
    await paginaCadastro.cadastroFeitoComSucesso();
  });
});
