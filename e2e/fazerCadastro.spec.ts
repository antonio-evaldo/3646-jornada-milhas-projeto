import { gerarPerfil } from './operacoes/gerarPefil';
import { Perfil } from './page-objects/PaginaBaseCadastroEPerfil';
import { test } from './page-objects/fixtures';

test.describe("Página de Cadastro", () => {
  // Variáveis de ambiente para diferentes ambientes (ex: cpf diferente para local e homologação)
  // também pode ser apenas um arquivo que exporta constantes

  let novoUsuario: Perfil;

  test.beforeEach(async ({ paginaCadastro }) => {
    novoUsuario = gerarPerfil();
    await paginaCadastro.visitar();
  });

  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    await paginaCadastro.formBase.definirNome(novoUsuario.nome);
    await paginaCadastro.formBase.definirDataNascimento(novoUsuario.dataNascimento); // corrigir no código Angular
    await paginaCadastro.formBase.definirCPF(novoUsuario.cpf);
    await paginaCadastro.formBase.definirTelefone(novoUsuario.telefone);
    await paginaCadastro.formBase.definirCidade(novoUsuario.cidade);
    await paginaCadastro.formBase.definirEstado(novoUsuario.estado);

    await paginaCadastro.formBase.definirEmail(novoUsuario.email);
    await paginaCadastro.formBase.confirmarEmail(novoUsuario.email);
    await paginaCadastro.formBase.definirSenha(novoUsuario.senha);
    await paginaCadastro.formBase.confirmarSenha(novoUsuario.senha);
    await paginaCadastro.confirmarTermos();
    await paginaCadastro.formBase.submeterForm();
    await paginaCadastro.cadastroFeitoComSucesso();
  });

  test("Não deve conseguir fazer cadastro com email duplicado", async ({ paginaCadastro }) => {
  });
});
