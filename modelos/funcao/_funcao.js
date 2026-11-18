/* Padrão Mesa v3.0 · MOLDE DE FUNÇÃO (copiar para funcoes/<cod>.js e trocar tudo o que está em <…>).
   Regras em ../../GUIA.md; exemplo completo e funcionando em ../projeto/funcoes/exemplo.js.
   Tudo dentro de uma IIFE: nenhum nome global além do Mesa.registrar (as funções dividem a mesma página).
   CSS da função em funcoes/<cod>.css, com prefixo .<cod>- ou html[data-func="<COD>"]. localStorage com prefixo
   "mesa.<cod>.". Dados FICTÍCIOS sempre marcados como tal na tela. */
(function () {
  // ---------- dados: no app real vêm de /dados/<código>/…; aqui, o que a função precisa ----------
  const D = window.<OBJETO_DE_DADOS>;

  // ---------- telas: uma função por tela; a primeira responde à pergunta da mesa ----------
  function telaMonitor(area) {
    const g = Mesa.grade(area);
    const p = Mesa.painel(g, { cod: "<COD>-1", titulo: "<o que o gráfico mostra>", unidade: "<unidade>", tam: "xl", ajuda: "<id-da-secao-da-met>",
      leg: "<legenda curta: o que é cada marca e de onde vem o dado>" });
    // filtros do painel (GUIA F1–F6): abas visíveis, rótulo por grupo, escolha guardada
    const f = Mesa.filtros(p.corpo, [
      { rotulo: "<Grupo>", opcoes: [["a", "<A>"], ["b", "<B>"]], valor: "a", chave: "mesa.<cod>.<grupo>", aoTrocar: v => desenhar(v) },
    ]);
    const caixa = document.createElement("div"); p.corpo.append(caixa);
    function desenhar(v) {
      caixa.replaceChildren();
      grafico(caixa, (svg, W, H) => linhas(svg, W, H, { n: 0, series: [] /* … */ }));
    }
    desenhar(f.valores[0]);
  }
  const SECOES = [
    { id: "<id-da-secao-da-met>", titulo: "<Como ler o painel X>", html: "<p>…</p>" },
  ];

  // ---------- MESA: sinal (uma linha), resumo (o bloco da visão geral), alertas, fita ----------
  function sinal() { return { v: "<resposta curta, até ~28 caracteres>", d: "<detalhe>", tom: "neutro", dnum: undefined }; }
  function resumo(el) { /* números compactos (GUIA M3) + um gráfico ou tabela pequena; clique abre o inspetor */ }
  function alertas() { return [/* { quando: "AAAA-MM-DDTHH:MM", texto, tela: <n>, nivel: "alto" | "normal" } */]; }
  function fita() { return [/* { r: "<rótulo>", v: "<valor>", d: <variação numérica opcional> } */]; }

  Mesa.registrar({
    cod: "<COD>", nome: "<Nome da função>", desc: "<uma linha>",
    mesa: { ordem: 1, tam: "m" },   // lugar e tamanho do bloco na MESA; false = fora da MESA
    // decisao: false,              // GUIA T3: só sem a linha de cartões se os números estiverem nos painéis
    sinal, resumo, alertas, fita,
    telas: [
      { cod: "MON", nome: "Monitor", montar: area => telaMonitor(area) },
      { cod: "MET", nome: "Metodologia", montar: area => Mesa.met(area, SECOES) },
    ],
  });
})();
