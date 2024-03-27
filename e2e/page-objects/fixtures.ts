import { test as base } from "@playwright/test";
import PaginaPrincipal from "./PaginaPrincipal";
import PaginaCadastro from "./PaginaCadastro";
import PaginaLogin from "./PaginaLogin";
import PaginaPerfil from "./PaginaPerfil";

const test = base.extend<{
  paginaPrincipal: PaginaPrincipal,
  paginaCadastro: PaginaCadastro,
  paginaLogin: PaginaLogin,
  paginaPerfil: PaginaPerfil
}>({
  paginaPrincipal: async ({ page }, use) => {
    await use(new PaginaPrincipal(page));
  },
  paginaCadastro: async ({ page }, use) => {
    await use(new PaginaCadastro(page));
  },
  paginaLogin: async ({ page }, use) => {
    await use(new PaginaLogin(page));
  },
  paginaPerfil: async ({ page }, use) => {
    await use(new PaginaPerfil(page));
  },
});

export default test;
