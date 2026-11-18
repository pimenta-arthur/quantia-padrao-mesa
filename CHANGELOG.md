# Changelog do padrão Mesa

## v3.0 · 2026-11-18
Primeira versão como padrão próprio, a partir da variante 08 do quantia-ui-lab.
- **Núcleo:** base do terminal (v2.0: `base.css`, `painel.css`, `graficos.js`, `componentes.js`, `terminal.js`) e a
  casca de uma tela (`mesa.js`, `mesa.css`): funções, telas numeradas, painéis com código, inspetor, MESA, alertas,
  fita, metodologia com índice e teclas (0–N funções, ← → telas, ⇧1–9, `/`, `Esc`, `I`, `?`, `T`).
- **Novo no núcleo:** `Mesa.filtros()` (abas visíveis, rótulo por grupo ao lado ou em cima, fio entre grupos, escolha
  guardada); `decisao: false` por função ou por tela; `mesa: { ordem, tam }` ou `mesa: false`; `Mesa.atualizarSinal()`.
- **GUIA v3.0:** regras P, N, M, T, F, G, C, D, E, conferência e como evoluir o padrão.
- **Catálogo e demo:** as peças aprovadas com a mesa (candle, PLD do dia em símbolos, preços por hora, perfil por mês
  em grade, filtros ligados, chuva por bacia, cenários LP, probabilidade de bandeira) e o Quant Energia App inteiro no
  Mesa, com dados fictícios.
- **Modelos e prompts:** projeto novo, molde de função e `docs/PROMPTS.md`.
