# Calculadora de Emissao de Carbono

Projeto web estatico para calcular emissoes estimadas de CO2 em rotas brasileiras, comparar meios de transporte e estimar creditos de carbono.

## Objetivo

Este projeto foi criado como um experimento pratico de desenvolvimento assistido por IA no chat do VS Code. A ideia foi testar um fluxo em que o usuario descreve o que quer por prompts, em etapas, e o agente implementa a estrutura, estilos, dados, regras de negocio, interacao e documentacao diretamente no projeto.

O foco nao foi apenas chegar ao resultado final, mas observar como a qualidade e a especificidade dos prompts influenciam o codigo gerado: quando o pedido trouxe nomes de IDs, classes, regras de calculo e criterios visuais, a implementacao ficou mais direta, consistente e facil de revisar.

## Funcionalidades

- Autocomplete de cidades brasileiras usando `datalist`.
- Preenchimento automatico de distancia para rotas conhecidas.
- Entrada manual de distancia quando a rota nao existe na base.
- Calculo de emissao por bicicleta, carro, onibus e caminhao.
- Comparacao visual entre todos os modais.
- Indicador de economia ou aumento de CO2 em relacao ao carro.
- Estimativa de creditos de carbono e faixa de preco em reais.
- Interface responsiva com HTML, CSS e JavaScript puros.

## Como usar

Abra o arquivo `index.html` diretamente no navegador.

Nao ha dependencias externas, instalacao ou processo de build.

## Estrutura

```text
.
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── calculator.js
    ├── config.js
    ├── routes-data.js
    └── ui.js
```

## Arquitetura

- `routes-data.js`: base de rotas brasileiras e metodos para listar cidades e buscar distancias.
- `config.js`: configuracoes globais, fatores de emissao, metadados dos transportes e autofill de distancia.
- `calculator.js`: regras de calculo de emissoes, comparacoes, economia e creditos de carbono.
- `ui.js`: renderizacao dos resultados, comparacao, creditos e estados de loading.
- `app.js`: inicializacao, validacao do formulario e orquestracao do fluxo.
- `style.css`: design system, layout responsivo e estilos dos componentes estaticos e dinamicos.

## Resumo das prompts usadas

As prompts foram feitas em camadas, cada uma adicionando uma parte do sistema:

1. Criar a estrutura HTML semantica da calculadora, com header, formulario, campos de origem/destino, distancia, selecao de transporte, secoes de resultado e scripts.
2. Definir o CSS base com variaveis globais, paleta eco-friendly, reset, layout, estilos do formulario, grid de transporte, botoes, loading e responsividade.
3. Criar uma base de rotas brasileiras em JavaScript com cidades, distancias, listagem unica de cidades e busca de distancia nos dois sentidos.
4. Criar o arquivo de configuracao com fatores de emissao, metadados dos transportes, creditos de carbono, autocomplete e autopreenchimento de distancia.
5. Implementar o modulo de calculos para emissao por modal, comparacao com carro, economia de carbono e estimativa de creditos.
6. Criar a camada de UI para renderizar cards de resultado, comparacao entre modais, creditos de carbono e estados de loading.
7. Criar a inicializacao da aplicacao com listener de formulario, validacoes, simulacao de processamento e renderizacao das secoes.
8. Melhorar os estilos do conteudo dinamico para deixar os cards, barras, badges, secoes e botoes mais polidos.
9. Revisar o projeto, corrigir inconsistencias e documentar o experimento no README.

## Observacoes sobre qualidade de prompts

Prompts mais uteis neste projeto tiveram algumas caracteristicas:

- Especificaram arquivos e nomes de objetos, como `CONFIG`, `Calculator` e `UI`.
- Definiram IDs e classes esperadas, reduzindo ambiguidade entre HTML, CSS e JS.
- Separaram responsabilidades por arquivo.
- Informaram formulas de calculo e regras de arredondamento.
- Descreveram estados de interface, como loading, resultado oculto, erro e responsividade.
- Pediram revisao depois da implementacao, o que ajudou a encontrar comportamentos incorretos e melhorar a experiencia.

## Limitacoes

As distancias sao aproximadas e mantidas em uma base local. Os fatores de emissao sao simplificados para fins demonstrativos e nao substituem inventarios oficiais de carbono.
