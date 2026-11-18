/* Padrão Mesa v3.0 · função de EXEMPLO de um projeto novo (dados FICTÍCIOS gerados aqui).
   Mostra o mínimo que toda função tem: telas, painéis com código, filtros com rótulo (Mesa.filtros), gráfico
   responsivo, inspetor, metodologia ligada ao "?", sinal, resumo da MESA, alertas e fita. */
(function () {
  // ---------- dados fictícios: PLD médio diário de 30 dias por submercado ----------
  const SUBS = [["se", "SE/CO"], ["s", "S"], ["ne", "NE"], ["n", "N"]];
  const DIAS = Array.from({ length: 30 }, (_, i) => { const d = new Date(2026, 9, 17 + i); return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`; });
  const BASE = { se: 160, s: 165, ne: 120, n: 135 };
  const PLD = Object.fromEntries(SUBS.map(([k], j) => [k, DIAS.map((_, i) => Math.round((BASE[k] + 30 * Math.sin((i + j) / 4) + ((i * 37 + j * 11) % 17) - 8) * 100) / 100)]));
  const media = a => a.reduce((s, v) => s + v, 0) / a.length;

  // ---------- telas ----------
  function telaMonitor(area) {
    const g = Mesa.grade(area);
    const p = Mesa.painel(g, { cod: "EXE-1", titulo: "PLD médio diário", unidade: "R$/MWh", tam: "xl", ajuda: "pld-diario",
      leg: "Média das 24 horas de cada dia. Dados fictícios." });
    const f = Mesa.filtros(p.corpo, [
      { rotulo: "Submercado", opcoes: SUBS, valor: "se", chave: "mesa.exe.sub", aoTrocar: v => desenhar(v, janela) },
      { rotulo: "Janela", opcoes: [["10", "10 dias"], ["30", "30 dias"]], valor: "30", chave: "mesa.exe.janela", aoTrocar: v => { janela = +v; desenhar(sub, janela); } },
    ]);
    let sub = f.valores[0], janela = +f.valores[1];
    const caixa = document.createElement("div"); p.corpo.append(caixa);
    function desenhar(s, jan) {
      sub = s; caixa.replaceChildren();
      const v = PLD[s].slice(-jan), dias = DIAS.slice(-jan), nome = SUBS.find(x => x[0] === s)[1];
      grafico(caixa, (svg, W, H) => linhas(svg, W, H, { n: v.length, series: [{ nome, v, cor: `var(--sm-${s})` }], rotX: i => (i % 5 === 4 ? dias[i] : null), titX: i => dias[i], fmt: rs }));
    }
    desenhar(sub, janela);

    const q = Mesa.painel(g, { cod: "EXE-2", titulo: "Médias por submercado", unidade: "R$/MWh", tam: "s", ajuda: "medias", leg: "Clique numa linha para o detalhe." });
    QC.tabela(q.corpo, [{ t: "Submercado" }, { t: "Média", n: 1 }, { t: "Último", n: 1 }], SUBS.map(([k, nome]) => [nome, n(media(PLD[k]), 2), n(PLD[k][29], 2)]));
    q.corpo.querySelectorAll("tbody tr").forEach((tr, i) => {
      const [k, nome] = SUBS[i];
      Mesa.alvo(tr, `PLD · ${nome}`, el => { QC.pares(el, [["Média de 30 dias", rs(media(PLD[k]))], ["Máximo", rs(Math.max(...PLD[k]))], ["Mínimo", rs(Math.min(...PLD[k]))]]); grafico(el, (svg, W, H) => linhas(svg, W, H, { n: 30, series: [{ nome, v: PLD[k], cor: `var(--sm-${k})` }], rotX: j => (j % 10 === 9 ? DIAS[j] : null), titX: j => DIAS[j], fmt: rs }), "baixo"); });
    });
  }
  const SECOES = [
    { id: "pld-diario", titulo: "PLD médio diário (EXE-1)", html: "<p>Média das 24 horas de cada dia, por submercado. Filtros do próprio painel; a escolha fica guardada no navegador.</p>" },
    { id: "medias", titulo: "Médias por submercado (EXE-2)", html: "<p>Média e último valor dos 30 dias. Clique numa linha para ver o detalhe no inspetor.</p>" },
  ];

  // ---------- MESA ----------
  const ult = PLD.se[29], ant = PLD.se[28];
  function sinal() { return { v: `SE ${DIAS[29]} R$ ${n(ult, 0)}`, d: `${seta(ult - ant)} ${srs(ult - ant)} no dia`, tom: tom(ult - ant), dnum: ult - ant }; }
  function resumo(el) {
    QC.kpis(el, SUBS.map(([k, nome]) => ({ r: `PLD ${nome} ${DIAS[29]}`, v: n(PLD[k][29], 0), d: `média 30 d ${n(media(PLD[k]), 0)}` })));
    grafico(el, (svg, W, H) => linhas(svg, W, H, { n: 30, series: SUBS.map(([k, nome]) => ({ nome, v: PLD[k], cor: `var(--sm-${k})` })), rotX: i => (i % 10 === 9 ? DIAS[i] : null), titX: i => DIAS[i], fmt: rs }), "baixo");
  }
  function alertas() { return Math.abs(ult - ant) > 10 ? [{ quando: "2026-11-15T06:10", texto: `PLD SE/CO variou ${srs(ult - ant)} no dia (exemplo)`, tela: 1, nivel: "normal" }] : []; }
  function fita() { return SUBS.slice(1).map(([k, nome]) => ({ r: `PLD ${nome}`, v: n(PLD[k][29], 2), d: PLD[k][29] - PLD[k][28] })); }

  Mesa.registrar({
    cod: "EXE", nome: "Exemplo", desc: "Função de exemplo do modelo de projeto",
    mesa: { ordem: 1, tam: "l" }, decisao: false,
    sinal, resumo, alertas, fita,
    telas: [
      { cod: "MON", nome: "Monitor", montar: area => telaMonitor(area) },
      { cod: "MET", nome: "Metodologia", montar: area => Mesa.met(area, SECOES) },
    ],
  });
})();
