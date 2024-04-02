import test from "./setup/fixtures";

test.describe('Buscar Passagens', () => {
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

  test('Deve buscar passagem de ida, executiva', async ({ page, paginaPrincipal }) => {
    await page.route(/passagem\/search/, async rota => {
      const json = {
        "paginaAtual": "1",
        "ultimaPagina": 1,
        "total": 10,
        "precoMin": 20,
        "precoMax": 5000,
        "resultado": [
          {
            "id": 2,
            "tipo": "Executiva",
            "precoIda": 2800,
            "precoVolta": 2700,
            "taxaEmbarque": 175,
            "conexoes": 2,
            "tempoVoo": 6,
            "origem": {
              "id": 11,
              "nome": "Paraíba",
              "sigla": "PB"
            },
            "destino": {
              "id": 19,
              "nome": "Roraima",
              "sigla": "RR"
            },
            "companhia": {
              "id": 4,
              "nome": "Latam"
            },
            "dataIda": "2024-04-02T00:00:00.000Z",
            "dataVolta": null,
            "orcamento": [
              {
                "descricao": "1 adulto, executiva",
                "preco": 2800,
                "taxaEmbarque": 175,
                "total": 2975
              }
            ],
            "total": 2975
          },
          {
            "id": 3,
            "tipo": "Executiva",
            "precoIda": 2300,
            "precoVolta": 2200,
            "taxaEmbarque": 195,
            "conexoes": 3,
            "tempoVoo": 8,
            "origem": {
              "id": 11,
              "nome": "Paraíba",
              "sigla": "PB"
            },
            "destino": {
              "id": 19,
              "nome": "Roraima",
              "sigla": "RR"
            },
            "companhia": {
              "id": 1,
              "nome": "Gol"
            },
            "dataIda": "2024-04-02T00:00:00.000Z",
            "dataVolta": null,
            "orcamento": [
              {
                "descricao": "1 adulto, executiva",
                "preco": 2800,
                "taxaEmbarque": 175,
                "total": 2975
              }
            ],
            "total": 2975
          }
        ]
      };

      await rota.fulfill({ json });
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
});
