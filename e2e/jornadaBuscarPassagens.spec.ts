import test from "./setup/fixtures";

test.describe('Jornada de buscar passagens', () => {
  test('Deve buscar passagem de somente ida, econômica', async ({ paginaPrincipal }) => {
    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda();

    await paginaPrincipal.abrirModalPassageiros();
    await paginaPrincipal.definirPassageirosAdultos(3);
    await paginaPrincipal.definirPassageirosCriancas(1);
    await paginaPrincipal.definirPassageirosBebes(1);
    await paginaPrincipal.fecharModalPassageiros();

    await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro');

    const dataIda = new Date();

    await paginaPrincipal.definirDataIda(dataIda);
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro', dataIda);
  });
});

test.describe('Mocks das passagens da API', () => {
  test('Deve buscar passagem de somente ida, executiva', async ({ page, paginaPrincipal }) => {
    await page.routeFromHAR('e2e/hars/passagens/passagem-ida-executiva/passagem.har', {
      url: '*/**/passagem/search*',
      update: false
    });

    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda();

    await paginaPrincipal.abrirModalPassageiros();
    await paginaPrincipal.definirPassagemExecutiva();
    await paginaPrincipal.fecharModalPassageiros();

    await paginaPrincipal.definirOrigemEDestino('paraíba', 'roraima');

    const dataIda = new Date();
    await paginaPrincipal.definirDataIda(dataIda);
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Paraíba', 'Roraima', dataIda);
  });

  test('Deve buscar passagem de somente ida, econômica', async ({ page, paginaPrincipal }) => {
    await page.routeFromHAR('e2e/hars/passagens/passagem-ida-economica/passagem.har', {
      url: '*/**/passagem/search*',
      update: false
    });

    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda();

    await paginaPrincipal.definirOrigemEDestino('paraíba', 'roraima');

    const dataIda = new Date();
    await paginaPrincipal.definirDataIda(dataIda);
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Paraíba', 'Roraima', dataIda);
  });
});
