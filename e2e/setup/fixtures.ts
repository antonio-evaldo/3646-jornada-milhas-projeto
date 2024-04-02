import { test as base } from "@playwright/test";
import PaginaPrincipal from "../page-objects/PaginaPrincipal";
import PaginaCadastro from "../page-objects/PaginaCadastro";
import PaginaLogin from "../page-objects/PaginaLogin";
import PaginaPerfil from "../page-objects/PaginaPerfil";

export type Fixtures = {
  paginaPrincipal: PaginaPrincipal,
  paginaCadastro: PaginaCadastro,
  paginaLogin: PaginaLogin,
  paginaPerfil: PaginaPerfil
};

export const test = base.extend<Fixtures>({
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
