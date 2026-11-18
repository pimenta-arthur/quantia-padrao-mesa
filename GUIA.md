# Padrão Mesa · v3.0 · 2026-11

Guia de layout e interação das aplicações da mesa de energia no formato **Mesa**: um terminal de uma tela, com
funções, telas numeradas, painéis, inspetor e uma visão geral (MESA). Nasceu da variante 08 do `quantia-ui-lab`,
ajustada tela a tela com a mesa; cada regra abaixo veio de uma decisão concreta e traz o porquê.

As regras têm código (F3, G2…) para serem citadas em prompts, revisões e no catálogo (`exemplos/index.html`).
Base visual (tokens, fontes, painéis, tabelas, gráficos): `nucleo/base.css`, `nucleo/painel.css`, `nucleo/graficos.js`,
`nucleo/componentes.js` e `nucleo/terminal.js`. Casca e API: `nucleo/mesa.js` (documentação no topo do arquivo) e
`nucleo/mesa.css`.

---

## P · Princípios
- **P1 · A resposta primeiro.** Cada tela e cada bloco começam pelo que a mesa precisa saber; a evidência vem depois.
- **P2 · Uma tela.** No desktop da mesa (1600×950 e acima), a MESA cabe sem rolar; as telas das funções cabem em cerca
  de uma tela e meia. Só a área de trabalho rola; casca, barras e inspetor ficam fixos.
- **P3 · Detalhe no inspetor, não em outra página.** Clicar num dia, mês, produto, ano ou linha abre o detalhe à
  direita.
- **P4 · Ler sem passar o mouse.** O número que importa está escrito na tela (rótulo direto, cartão compacto,
  cabeçalho); a dica completa o resto, não substitui.
- **P5 · Dados fictícios sempre marcados.** "Simulado", "exemplo fictício" ou "dados fictícios" visível em toda peça que
  não usa dado real.
- **P6 · Português do Brasil e números pt-BR.** Datas `15/11/26`, meses `nov/26`, horas `00h`, sinal `−` (U+2212) e `+`,
  moeda com `rs()`/`srs()`.

## N · Navegação e teclas
- **N1 · Funções por número.** `0` MESA, `1`…`N` as funções, na ordem da barra (fixas e fáceis de decorar).
- **N2 · Telas em sequência.** `←` `→` (ou `[` `]`) passam de tela, dando a volta; `⇧1`–`9` vai direto a uma tela. As
  telas mudam de quantidade e de sentido entre funções, por isso a navegação entre elas é sequencial.
- **N3 · Comando.** `/` abre o comando: `BAND`, `BAND 3`, `RISK SIM`, `MESA`. `Esc` volta à MESA; `I` mostra ou esconde
  o inspetor; `?` abre a metodologia da função; `T` troca o tema.
- **N4 · Barras compactas.** Barra de funções numa linha só (`[tecla] CÓDIGO Nome`, o sinal na dica); barra de telas com
  número, código e nome. Referências internas apontam para a tela pelo **código** (`SIM`), nunca pelo número, para a
  ordem poder mudar sem quebrar alertas e atalhos.

## M · MESA (visão geral)
- **M1 · Blocos por função, sem linha de sinais.** O sinal de cada função fica na barra de funções e na fita; a MESA
  começa direto nos blocos.
- **M2 · Arranjo por importância.** Primeira linha: o que muda durante o dia (preço, PLD, research). Segunda: o que muda
  por rodada (bandeira, hidrologia). O bloco mais vivo ganha mais largura (ex.: candle em 2/3). Cada função escolhe o
  lugar com `mesa: { ordem, tam }` e pode ficar fora com `mesa: false`.
- **M3 · Números compactos no bloco.** Nada de cartões grandes no topo de um bloco: rótulo pequeno, valor médio,
  detalhe em até duas linhas, numa faixa. O gráfico ou a tabela do bloco tem de aparecer sem rolar.
- **M4 · Alertas sempre à direita.** Derivados dos dados, com a tela de destino e o nível (alto/normal).

## T · Telas e painéis
- **T1 · Tela = função + número.** Cada função tem de 4 a 7 telas; a última é a metodologia (`MET`).
- **T2 · Painel com código.** `<COD>-<n>` (BAND-1, RISK-25), título que diz o que mostra, unidade ao lado, legenda curta
  embaixo e "?" ligado à seção da metodologia que o explica.
- **T3 · Cartões no topo da tela só quando acrescentam.** Se os números já estão nos painéis, a tela não tem a linha de
  cartões (`decisao: false`, na função ou só na tela). Ao tirar, conferir que nenhum número sumiu sem ir para um painel.
- **T4 · Inspetor.** `Mesa.alvo(el, título, conteúdo)` em tudo que tem detalhe; o inspetor mostra números, um gráfico
  pequeno e a explicação curta.
- **T5 · Metodologia com índice.** `Mesa.met()`; o "?" de cada painel leva à seção certa.
- **T6 · Grade de 12 colunas sem buracos.** Cada linha soma 12; painéis lado a lado com a mesma altura quando contam a
  mesma história (o mais baixo cresce para acompanhar o vizinho).

## F · Filtros
- **F1 · Abas sempre visíveis, nunca menu suspenso.** A pessoa vê todas as opções de uma vez. Muitas opções no tempo
  (meses) viram abas da janela recente, com `◀` para recuar.
- **F2 · Um rótulo por grupo e um fio entre os grupos.** Rótulo pequeno em âmbar (VARIÁVEL, SUBMERCADO, MESES…).
- **F3 · Rótulo ao lado por padrão; em cima só quando a linha não cabe** no desktop. A tela não cresce por causa de
  rótulo. `Mesa.filtros(…, { posicao: "auto" })` decide sozinho.
- **F4 · Filtros próprios por painel quando a leitura é independente.** Trocar a variável num painel não muda outro.
  Painéis que são duas vistas da mesma coisa compartilham uma faixa de filtros acima dos dois, com o escopo escrito
  ("vale para RISK-11 e RISK-12").
- **F5 · Mesma linha, mesmas posições.** Faixas de filtros na mesma tela usam o mesmo componente, ordem, espaçamento e
  tamanho de botão (Variável · Submercado · …), para os grupos ficarem alinhados de um painel para o outro.
- **F6 · Escolha guardada.** Cada filtro guarda a escolha no navegador (`mesa.<cod>.<nome>`); título curto e estável,
  que não muda de tamanho com a seleção.

## G · Gráficos
- **G1 · Um símbolo vale mais que um serrote.** Muitas horas por dia: um símbolo por dia (mínimo–máximo, vale, ponta,
  média) em vez de 24 pontos por dia; o detalhe horário fica no inspetor ou num botão "ver horário".
- **G2 · Pequenos múltiplos legíveis.** Grade (6 × 2, 4 × 3, 2 por linha) em vez de uma fileira de miniaturas; escala
  comum; eixo e horas legíveis.
- **G3 · Rótulos diretos, poucos.** Valor do último ponto na ponta da linha, valor da referência no degrau, só o pico de
  cada período, legenda desenhada uma vez no primeiro símbolo. Nunca um número em cada ponto.
- **G4 · Períodos com nome, datas e desvio.** Faixas alternadas por período (revisão, semana) com o cabeçalho
  "RV1 · 07/11–13/11 · DECOMP 137 · DESSEM 123 · ▼ −15", encurtando quando a faixa estreita; o período em curso diz
  quantos dias tem.
- **G5 · Alta e baixa sem depender da cor.** Seta ▲▼, candle vazado (alta) e cheio (baixa); valor fora da escala com ▲ e
  o número escrito.
- **G6 · Progresso com referência.** Medida que cresce durante o dia (chuva, negócios) mostra o previsto do dia e o
  ritmo esperado para a hora atual.
- **G7 · Gráficos pela largura real** (`grafico()` do núcleo), tooltip em todo valor, cores só por token.

## C · Cores
- **C1 · Escuro é o padrão** e não segue o sistema; claro só pelo botão. Toda cor é token (escuro em `:root`, claro em
  `:root[data-theme="light"]`), nunca `prefers-color-scheme`.
- **C2 · Submercados com `--sm-se`, `--sm-s`, `--sm-ne`, `--sm-n`**, sempre na mesma ordem.
- **C3 · Cores de bandeira só para bandeira.** Fora disso, tokens próprios. Sigla de bandeira ao lado de uma barra já
  colorida vai em texto simples, sem fundo.

## D · Tabelas
- **D1 · Densas e com rolagem própria.** Tabelas longas rolam dentro do painel com cabeçalho fixo e rodapé fixo
  (média, mínimo, máximo); a página não rola de lado.
- **D2 · Tempo em ordem natural.** Horas de 00h a 23h dentro de cada dia, mesmo quando os dias vêm do mais recente para
  o mais antigo; a virada do dia marcada.
- **D3 · Abreviar com o nome completo na dica.** Para caber, cabeçalhos curtos ("P. útil") e o nome por extenso no
  `title`.

## E · Entrada de dados
- **E1 · Validação que avisa sem bloquear**, exceto o que não é número.
- **E2 · Colar do Excel** numa célula preenche para a direita e para baixo.
- **E3 · Versões com autor, data e o que mudou.** No laboratório, no navegador; no app, no servidor com histórico.

---

## Conferência antes de dizer que terminou
- Navegador headless ou real em **1600 px e 390 px, escuro e claro**: sem erro de JS, sem rolagem horizontal, sem
  gráfico vazio, sem NaN/undefined, sem número cortado.
- Captura de tela olhada de verdade (sobreposição, rótulos encostando, filtro quebrando a linha).
- Clique em todo alvo do inspetor e em todas as abas.
- Cada alerta leva à tela certa.

## Evoluir o padrão
Uma regra mudou ou uma peça nova foi aprovada: no mesmo commit, atualizar **este GUIA**, o **catálogo**
(`exemplos/index.html`), o **demo** (se a peça mudou) e o **núcleo** (se a peça passou a ser usada por mais de uma
função, ela sobe para `nucleo/`), e anotar no `CHANGELOG.md` com a versão. Assim o padrão, os exemplos e o código não
voltam a divergir.
