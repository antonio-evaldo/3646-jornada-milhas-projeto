import { test as base } from "@playwright/test";
import PaginaCadastro from "./PaginaCadastro";
import PaginaLogin from "./PaginaLogin";
import PaginaPerfil from "./PaginaPerfil";

export const test = base.extend<{
  paginaCadastro: PaginaCadastro,
  paginaLogin: PaginaLogin,
  paginaPerfil: PaginaPerfil
}>({
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
