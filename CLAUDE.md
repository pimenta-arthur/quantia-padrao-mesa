# quantia-padrao-mesa

Fonte do padrão de interface Mesa (v3.0) das aplicações da mesa de energia. Responder sempre em português do Brasil.

- Aqui só entra o que foi aprovado (no quantia-ui-lab ou num projeto). Experimentos ficam no laboratório.
- Toda mudança de regra ou de peça atualiza, **no mesmo commit**: `GUIA.md`, `exemplos/index.html` (catálogo),
  `exemplos/mesa-demo/` (se a peça mudou), `nucleo/` (se a peça é usada por mais de uma função) e `CHANGELOG.md`.
- Regras com código (P, N, M, T, F, G, C, D, E + número); nunca renumerar uma regra existente (só acrescentar ou marcar
  como substituída), porque prompts e projetos citam os códigos.
- Só estático (HTML/CSS/JS, sem build nem dependências). Dados do demo e dos modelos sempre fictícios e marcados.
- Toda cor nova é token (escuro em `:root`, claro em `:root[data-theme="light"]`); nunca `prefers-color-scheme`.
- Conferir no navegador (1600 e 390 px, escuro e claro) o demo e o modelo de projeto antes de commitar.
- Nunca escrever em outros repositórios.
