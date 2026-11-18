# quantia-padrao-mesa

Padrão de interface **Mesa** (v3.0) para as aplicações da mesa de energia: um terminal de uma tela, com funções,
telas numeradas, painéis, inspetor e uma visão geral (MESA), escuro como padrão e operável pelo teclado.

Nasceu no laboratório [quantia-ui-lab](https://github.com/pimenta-arthur/quantia-ui-lab) (variante 08), onde foi
ajustado tela a tela com a mesa. Este repositório é a **fonte do padrão**: cada projeto copia o que precisa, e as
mudanças de padrão são feitas aqui (GUIA, núcleo, catálogo e demo juntos).

## O que tem aqui
| Pasta / arquivo | Para quê |
|---|---|
| `GUIA.md` | **As regras**, com código (F3, G1…) e o porquê de cada uma. Ler antes de mexer em layout. |
| `nucleo/` | O que todo projeto copia (para `web/padrao/`): `base.css`, `painel.css`, `graficos.js`, `componentes.js`, `terminal.js` e a casca da mesa (`mesa.js`, `mesa.css`, com a API documentada no topo do `mesa.js`). |
| `modelos/projeto/` | Um projeto novo pronto: casca e uma função de exemplo funcionando. |
| `modelos/funcao/_funcao.js` | Molde de uma função em branco. |
| `exemplos/index.html` | **Catálogo** das peças aprovadas: o que é, onde ver no demo, onde está o código de referência e as regras que segue. |
| `exemplos/mesa-demo/` | O Quant Energia App inteiro no Mesa (dados fictícios): a referência viva do padrão. |
| `docs/PROMPTS.md` | Prompts para projeto novo, nova função, nova tela, painel do catálogo, revisão contra o guia, ajuste pontual, evolução do padrão e migração de app. |
| `para-o-quant-energia-app/` | Versões dos guias do quant-energia-app (CLAUDE.md, nova funcionalidade, nova pesquisa) apontando para o Mesa. |
| `CHANGELOG.md` | Versões do padrão. |

## Ver
```bash
python3 servir.py 8790     # http://127.0.0.1:8790/exemplos/  (catálogo) · /exemplos/mesa-demo/  · /modelos/projeto/
```

## Usar num projeto
1. Clone este repositório ao lado do projeto (`~/projects/quantia-padrao-mesa`).
2. Na sessão do projeto, cole o prompt 0 (Abertura) e o do passo de `docs/PROMPTS.md`.
3. O projeto copia `nucleo/` para `web/padrao/` (cópia, não link) e registra a versão do padrão que usa.

## Relação com o padrão v2.0 (terminal por páginas)
O v2.0 (`migracao-terminal/padrao` do quantia-ui-lab) é o terminal **por páginas**, caminho da migração atual do
Quant Energia App (a variante 07). O Mesa v3.0 inclui o v2.0 (`nucleo/` traz os mesmos arquivos) e acrescenta a casca
de uma tela. Projeto novo: começar direto no Mesa.
