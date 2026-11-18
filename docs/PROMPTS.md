# Prompts do padrão Mesa v3.0

Para usar numa sessão do Claude Code aberta **no projeto** (não neste repositório), com o padrão clonado ao lado:
```bash
cd ~/projects && git clone https://github.com/pimenta-arthur/quantia-padrao-mesa.git   # ou: cd quantia-padrao-mesa && git pull
```
Todos os prompts pedem uma parada no fim, para você validar antes do próximo passo. Os códigos de regra (F3, G1…) são
os do `GUIA.md`.

---

## 0 · Abertura (colar no começo de toda conversa que mexe em layout)
```
Este projeto segue o padrão Mesa v3.0, em ../quantia-padrao-mesa (só leitura: nunca edite lá).
Leia ../quantia-padrao-mesa/GUIA.md antes de qualquer mudança de layout, e use as peças de
../quantia-padrao-mesa/nucleo/ e o catálogo ../quantia-padrao-mesa/exemplos/index.html (com o demo funcionando em
../quantia-padrao-mesa/exemplos/mesa-demo/). Cite as regras pelo código (ex.: F3) quando justificar uma escolha.
Regras de trabalho: só o passo que eu pedir; pare no fim com o que mudou e o que eu devo conferir; nada de commit sem
eu pedir; conferir no navegador em 1600 e 390 px, escuro e claro, antes de dizer que terminou (GUIA, "Conferência").
Responda em português do Brasil.
```

## 1 · Projeto novo no formato Mesa
```
Vamos criar a interface deste projeto no padrão Mesa v3.0.
1. Copie ../quantia-padrao-mesa/nucleo/ para web/padrao/ (cópia, não link) e ../quantia-padrao-mesa/modelos/projeto/
   para web/ (index.html e funcoes/), ajustando os caminhos para padrao/.
2. Troque o nome do projeto na marca e no título. Mantenha a função de exemplo só até a primeira função real existir.
3. Me proponha as funções (código de 3–4 letras, nome, a pergunta que cada uma responde) e, para cada uma, as telas
   (cod, nome) seguindo T1, e o que vai no bloco da MESA (M2, M3). PARE e me mostre a proposta antes de construir.
```

## 2 · Nova função
```
Crie a função <COD · Nome>, que responde a <pergunta da mesa>, a partir do molde
../quantia-padrao-mesa/modelos/funcao/_funcao.js (exemplo completo: ../quantia-padrao-mesa/modelos/projeto/funcoes/exemplo.js).
Dados: <de onde vêm; se ainda não existem, gere fictícios marcados como tal (P5)>.
Telas: <lista> (a última é MET). Bloco da MESA: <o que mostra> com mesa: { ordem, tam } (M2, M3).
Sinal, alertas e fita derivados dos dados. Registre a tecla na barra de funções (N1).
Construa uma tela por vez e PARE depois de cada uma, com a captura a 1600 px.
```

## 3 · Nova tela numa função existente
```
Na função <COD>, crie a tela <cod · nome> com <o que ela mostra>. Painéis com código <COD>-n (T2), grade sem buracos
(T6), filtros com Mesa.filtros (F1–F6), detalhe no inspetor (T4) e seção na metodologia ligada ao "?" (T5).
Decida se a tela tem linha de cartões (T3) e diga por quê. Atualize alertas e atalhos que apontarem para telas, pelo
código da tela (N4). PARE com a captura a 1600 px.
```

## 4 · Painel a partir do catálogo
```
Na tela <COD-n>, crie o painel <título> usando a peça "<nome da peça>" do catálogo
../quantia-padrao-mesa/exemplos/index.html (veja-a funcionando no demo e copie a implementação de referência indicada
na coluna "Código de referência"), ligada aos dados <quais>. Respeite as regras citadas na linha do catálogo.
Só esse painel; o resto da tela fica como está. PARE com a captura.
```

## 5 · Revisar uma tela contra o guia (sem mudar nada)
```
Revise a tela <COD-n> contra ../quantia-padrao-mesa/GUIA.md, SEM mudar nada. Para cada regra que a tela fere, diga:
o painel, a regra (código), o que está hoje, o que você faria e o impacto (altura, largura, o que some ou aparece).
Ordene do que mais atrapalha a leitura ao que menos. Me mostre um exemplo em texto (antes/depois) do primeiro item.
PARE e espere eu escolher o que aplicar.
```

## 6 · Ajuste pontual (o dia a dia)
```
No painel <COD-n>, <o ajuste: ex. "troque o menu suspenso de mês por abas" / "acrescente a coluna X" / "deixe o
filtro de variável independente">. Diga se concorda e por quê, e se alguma regra do GUIA se aplica ou precisaria
mudar. Faça só isso e PARE com a captura.
```

## 7 · Evoluir o padrão (no repositório quantia-padrao-mesa)
Usar numa sessão aberta **em ../quantia-padrao-mesa**, quando uma decisão nova valer para todos os projetos.
```
Uma regra do padrão mudou: <a decisão e o porquê, ex.: "rótulo de filtro ao lado por padrão, em cima só se não
couber">. Atualize, no mesmo commit: GUIA.md (regra nova ou alterada, com código e porquê), exemplos/index.html
(catálogo), o demo em exemplos/mesa-demo/ se a peça mudou, nucleo/ se a peça passou a ser usada por mais de uma
função, e CHANGELOG.md com a versão (v3.x). Rode a conferência do GUIA no demo e no modelo de projeto. PARE com o
diff e as capturas antes do commit.
```

## 8 · Levar um app que já existe para o Mesa
```
Este app tem páginas no padrão antigo. Quero levá-lo para o padrão Mesa v3.0 sem perder informação nem mudar contas.
Passo 1, só leitura: liste páginas, seções e painéis de hoje e proponha, função por função, as telas do Mesa e onde
cada informação de hoje vai parar (tela, painel ou inspetor), o que vai para a MESA e o que pode sair. Use o demo
(../quantia-padrao-mesa/exemplos/mesa-demo/) como referência de como o Quant Energia App ficou no Mesa.
PARE e me mostre o plano. Depois: uma função por vez, uma tela por vez, comparando os números com a página antiga.
```
