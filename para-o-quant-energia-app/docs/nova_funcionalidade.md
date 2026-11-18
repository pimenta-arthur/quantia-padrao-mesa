# Como levar uma pesquisa para o app (nova funcionalidade)

Padrão usado nas bandeiras tarifárias (pesquisa em `forecast-bandeiras-analytics`, produto em
`features/forecast_bandeiras/`) e a seguir nas próximas (ex.: PLD horário, pesquisa em `risk-lab-dessem-analytics`).

## 0. Antes de começar (na pesquisa)
- Como criar e conduzir o repositório de pesquisa (estrutura, CLAUDE.md, metodologia, testes, páginas e pacote
  de promoção): `docs/nova_pesquisa.md`.
- Método validado com backtest sem vazamento, decisões registradas no `docs/metodologia.md` da pesquisa.
- Os repositórios de pesquisa são independentes do app (não importam o `qe_core`). Ao promover, os leitores
  e cálculos da pesquisa são **reimplementados** aqui: leitores comuns a mais de uma funcionalidade no `qe_core`
  (`core/src/qe_core/leitores/`, funções puras sobre o caminho do arquivo), o resto em `features/<nome>/`.
- A pesquisa entrega resultados de referência reproduzíveis (tabelas tratadas e uma rodada de projeção), que
  servem para conferir a reimplementação (seção 4).

## 1. Estrutura
```
features/<nome>/
├── pyproject.toml            # pacote qe-<nome>; `uv add --package qe-<nome> qe-core …`
└── src/qe_<nome>/
    ├── chaves.py             # chaves raw/ (por fonte, compartilhadas) e processed/<nome>/, serving/<nome>/
    ├── ingestao.py           # origem → raw/ (imutável, versionado quando a fonte republica)
    ├── tratamento.py         # raw/ → processed/<nome>/ (Parquet)
    ├── modelo.py             # parâmetros numa versão nomeada (Modelo v1) + funções do método
    ├── backtest.py           # sem vazamento; base do σ/calibração e do desempenho mostrado
    ├── projecao.py           # rodada com os insumos vigentes
    ├── publicacao.py         # serving/<nome>/ + registro das rodadas publicadas
    ├── referencias.py        # referências congeladas (modelo e tratamento)
    └── cli.py                # Typer: ingerir | tratar | backtest | status | projetar | publicar | pagina | congelar
web/<nome>/                   # função da mesa (mesa.js + mesa.css; lê /dados/<nome>/…)
tests/referencias/<nome>/     # resultados esperados
```
- Incluir `features/<nome>` em `[tool.uv.workspace].members` da raiz, adicionar `qe-<nome>` às dependências da
  raiz e registrar o sub-app em `src/qe/cli.py` (`app.add_typer(…, name="<nome>")`).
- Registrar a função em `web/index.html` (script do módulo, na ordem da barra de funções: a posição define a tecla).

## 2. Regras de dados
- **Todo acesso a dados pelo `qe_core.armazenamento`**, por chave. Nada de abrir caminhos de `data/`.
- `raw/` por fonte e imutável; se a fonte publica mais de uma versão (deck republicado, emissão extra), a
  versão entra na chave (`deck=AAAA-MM/v=<hash>`, `emissao=AAAA-MM-DD`).
- `processed/<nome>/` e `serving/<nome>/` só da funcionalidade.
- `serving/<nome>/` (dados das páginas e registro das rodadas publicadas) é versionado no git até a fase AWS;
  `raw/` e `processed/` não.
- Documentar o formato da pasta de origem da ingestão em `docs/entrada.md` (seção da funcionalidade).

## 3. Rodadas e modelo
- Rodada = publicação (id data-hora) com os insumos vigentes, motivo e versão do modelo; nunca recalculada
  depois de publicada. `publicar` recusa repetir insumos e modelo sem `--forcar --motivo`.
- Parâmetros do método só em `modelo.py` (`MODELO`). Mudança de método = versão nova (checklist no CLAUDE.md).

## 4. Testes (aceitação da migração)
1. Gerar com o app e conferir **uma vez** contra a pesquisa: tratamento (tabelas-base) e projeção de uma rodada
   de referência — iguais (diferença só de arredondamento).
2. Congelar (`qe <nome> congelar`) em `tests/referencias/<nome>/…` e commitar.
3. Daí em diante os testes comparam com as referências congeladas; o app não depende da pesquisa para rodar.
   Um teste de paridade com a pesquisa pode ficar opt-in (variável de ambiente).

## 5. Interface (padrão Mesa v3.0)
- A funcionalidade vira uma **função da mesa**: `web/<nome>/mesa.js` (+ `mesa.css`), a partir do molde
  `web/padrao/modelos/funcao/_funcao.js` do padrão, registrada com `Mesa.registrar` e incluída em `web/index.html`.
- Definir com o Arthur: o código curto (ex.: `BAND`), a pergunta que a função responde, as telas (a última é a
  metodologia) e o bloco da MESA (`mesa: { ordem, tam }`). Regras em `web/padrao/GUIA.md`.
- Cada painel com código `<CÓDIGO>-n`, título, unidade, legenda curta e "?" para a metodologia; filtros com
  `Mesa.filtros`; detalhe no inspetor; sinal, alertas e fita derivados dos dados publicados.
- Prompts prontos (nova função, nova tela, painel do catálogo, revisão contra o guia): `docs/PROMPTS.md` do padrão.
- Conferir em escuro (padrão), claro e celular (1600 e 390 px) e clicar em todo alvo do inspetor antes de publicar.

## 6. Independência
Cada funcionalidade roda, testa e publica sozinha: falha numa não afeta as outras. O que é comum fica no
`qe_core`; nada de uma funcionalidade importar outra.
