const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function nowISO() {
  return new Date().toISOString();
}

function hojeBrasil() {
  return new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function mesBrasil() {
  const parts = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).split("/");
  return `${parts[1]}-${parts[0]}`;
}

function diaBrasil() {
  return Number(new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
  }));
}

function limparTexto(value) {
  return String(value ?? "").replace(/�/g, "").trim();
}

async function log(tipo, status, extra = {}) {
  await db.collection("updateLogs").add({
    tipo,
    status,
    ...extra,
    criadoEm: admin.firestore.FieldValue.serverTimestamp(),
  });
}

function criarArtigos(dataAtual, dashboard = {}) {
  const carros = dashboard?.snapshots?.["30 dias"]?.carros?.emplacados || "dados em leitura";
  const motos = dashboard?.snapshots?.["30 dias"]?.motos?.emplacados || "dados em leitura";
  const pesados = dashboard?.snapshots?.["30 dias"]?.pesados?.emplacados || "dados em leitura";
  const credito = dashboard?.snapshots?.["30 dias"]?.credito || "dados em leitura";

  return [
    {
      title: "Resumo do mes: carros seguem em recuperacao no mercado brasileiro",
      seoTitle: "Mercado de carros no Brasil: resumo do mes, emplacamentos e tendencias",
      metaDescription: "Analise mensal do mercado de carros no Brasil com leitura de emplacamentos, marcas em destaque e oportunidades para lojistas.",
      tag: "Carros",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      summary: `No periodo analisado, o painel registra ${carros} carros emplacados nos ultimos 30 dias, indicando um mercado ativo e com boas oportunidades de leitura comercial.`,
      content: [
        "O mercado de carros no Brasil segue sendo uma das principais referencias para entender o comportamento do consumidor automotivo. A leitura dos emplacamentos ajuda a identificar quais modelos ganham mais espaco, quais marcas mantem presenca forte e quais categorias podem representar oportunidades para lojistas, vendedores, consultores e profissionais de marketing.",
        "Carros compactos, SUVs de entrada e picapes leves continuam relevantes porque atendem perfis diferentes de compradores. Os compactos conversam com quem busca economia, menor custo de manutencao e facilidade de revenda. SUVs e picapes leves trabalham mais a percepcao de valor, conforto, espaco interno e versatilidade.",
        "Para o lojista, acompanhar os modelos mais emplacados e transferidos ajuda a tomar decisoes melhores sobre estoque, campanha e atendimento. Um veiculo com boa presenca no mercado tende a ter mais procura, melhor liquidez e maior chance de giro.",
        "A leitura regional tambem e importante. Um modelo pode estar forte no ranking nacional, mas ter desempenho diferente em uma cidade especifica. Por isso, cruzar dados de emplacamentos, transferencias, estados e cidades ajuda a criar campanhas mais proximas da realidade local.",
        "Na pratica, esses dados podem orientar quais carros destacar nas redes sociais, quais modelos colocar em anuncios, quais ofertas merecem reforco e quais argumentos comerciais devem aparecer em videos, legendas e paginas de venda.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
    {
      title: "Motos mantem procura forte e puxam volume no mes",
      seoTitle: "Mercado de motos no Brasil: crescimento, modelos mais procurados e leitura mensal",
      metaDescription: "Resumo mensal do mercado de motos no Brasil com analise de emplacamentos, mobilidade e oportunidades comerciais.",
      tag: "Motos",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel registra ${motos} motos emplacadas nos ultimos 30 dias, reforcando a importancia do segmento para mobilidade, economia e trabalho.`,
      content: [
        "O mercado de motos continua sendo um dos segmentos mais dinamicos do setor automotivo brasileiro. A procura por motocicletas esta ligada a mobilidade urbana, economia no deslocamento, trabalho por aplicativo, entregas e facilidade de compra.",
        "Modelos de entrada e baixa cilindrada costumam aparecer com destaque porque atendem um publico amplo. Para muitos consumidores, a moto e uma solucao pratica para reduzir custo de transporte e ganhar agilidade no dia a dia.",
        "A leitura mensal de emplacamentos ajuda lojas e profissionais de marketing a entender quais marcas e modelos merecem mais destaque. Quando um modelo aparece com volume forte, isso pode indicar boa aceitacao, facilidade de manutencao e maior confianca do consumidor.",
        "A comunicacao para motos deve ser objetiva. Temas como economia, consumo, manutencao, uso profissional, entrada facilitada e financiamento costumam gerar bom entendimento para o publico.",
        "Tambem e importante acompanhar transferencias, pois elas mostram o movimento de motos usadas e seminovas. Esse dado ajuda a entender quais modelos seguem girando depois do primeiro emplacamento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
    {
      title: "Credito automotivo indica ritmo de compra do consumidor",
      seoTitle: "Credito automotivo no Brasil: financiamento, demanda e comportamento de compra",
      metaDescription: "Analise do credito automotivo e sua relacao com vendas, parcelas, financiamento e poder de compra.",
      tag: "Credito",
      updatedAt: dataAtual,
      sourceName: "Banco Central",
      sourceUrl: "https://www.bcb.gov.br/estatisticas",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel acompanha ${credito} em credito financiado, ajudando a entender o comportamento de compra e financiamento no setor automotivo.`,
      content: [
        "O credito automotivo e um dos principais indicadores para entender o ritmo de compra no mercado de veiculos. Muitos consumidores nao decidem apenas pelo valor total do veiculo, mas pela entrada, taxa, prazo e valor da parcela.",
        "Quando o financiamento esta mais ativo, o mercado tende a ter maior movimento, principalmente em veiculos seminovos e faixas intermediarias de preco. Por isso, acompanhar o credito ajuda a entender se o consumidor esta mais disposto a comprar.",
        "Para lojas de veiculos, esse dado pode orientar campanhas com foco em parcela, simulacao, bancos parceiros, aprovacao e entrada facilitada. A comunicacao fica mais forte quando conversa com a realidade financeira do comprador.",
        "O credito tambem influencia o estoque. Veiculos com ticket medio mais acessivel podem ganhar procura em momentos de maior cautela, enquanto modelos de maior valor podem vender melhor quando o financiamento esta mais favoravel.",
        "A leitura do credito deve ser combinada com FIPE, emplacamentos e transferencias para criar uma visao completa do mercado.",
        "Fonte oficial utilizada nesta leitura: Banco Central."
      ],
    },
    {
      title: "Estados e cidades mostram oportunidades regionais",
      seoTitle: "Mercado automotivo por estado: cidades em destaque e oportunidades regionais",
      metaDescription: "Analise regional do mercado automotivo brasileiro com leitura por estados, cidades, emplacamentos e transferencias.",
      tag: "Regioes",
      updatedAt: dataAtual,
      sourceName: "SENATRAN",
      sourceUrl: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      summary: "A leitura por estados e cidades ajuda a identificar onde o mercado esta mais aquecido e onde existem oportunidades comerciais.",
      content: [
        "A analise regional e essencial para entender o mercado automotivo brasileiro. O Brasil tem realidades muito diferentes entre estados e cidades, e isso aparece no comportamento de compra, emplacamentos, transferencias e perfil de frota.",
        "Um estado com alto volume pode indicar economia mais aquecida, maior populacao, renovacao de frota ou maior presenca de lojas e concessionarias. Ja as transferencias ajudam a observar o mercado de usados e seminovos.",
        "Para lojistas, olhar apenas o ranking nacional pode gerar decisao incompleta. Um modelo forte no Brasil pode nao ser o mais procurado em uma cidade especifica. Por isso, a leitura regional ajuda a ajustar estoque e campanhas.",
        "No marketing automotivo, a informacao regional permite criar conteudos mais certeiros. A loja pode destacar modelos com melhor aderencia local, usar argumentos proximos da realidade da cidade e criar campanhas por categoria.",
        "Cidades medias tambem podem revelar mercados muito ativos, principalmente quando atendem regioes vizinhas ou polos comerciais, agricolas e industriais.",
        "Fonte oficial utilizada nesta leitura: SENATRAN."
      ],
    },
    {
      title: "FIPE ajuda a entender faixas de preco e oportunidades",
      seoTitle: "FIPE por faixa de preco: oportunidades para compra, venda e estoque de veiculos",
      metaDescription: "Analise de veiculos por faixa de preco com base em referencia FIPE, oportunidades comerciais e leitura para lojistas.",
      tag: "FIPE",
      updatedAt: dataAtual,
      sourceName: "FIPE",
      sourceUrl: "https://www.fipe.org.br/pt-br/indices/veiculos",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      summary: "A leitura por faixa de preco ajuda a identificar modelos acessiveis, intermediarios e premium com maior potencial comercial.",
      content: [
        "A FIPE e uma referencia importante para entender preco medio de veiculos no Brasil. Mesmo que o valor real varie por cidade, estado, conservacao, quilometragem e oferta local, ela ajuda a criar uma base comparativa.",
        "Ao organizar veiculos por faixa de preco, o painel facilita a leitura comercial. Faixas mais baixas atendem consumidores que buscam economia, primeiro veiculo ou troca acessivel.",
        "Faixas intermediarias costumam concentrar seminovos, SUVs, sedans completos e modelos com maior valor agregado. Nesses casos, a comunicacao deve trabalhar conforto, procedencia, tecnologia, seguranca e financiamento.",
        "Para lojistas, a leitura por faixa ajuda a pensar estoque. Nao basta comprar qualquer veiculo; e preciso entender qual faixa conversa com o publico local e qual ticket tem mais giro.",
        "Esse conteudo tambem ajuda no SEO, porque pode gerar artigos como melhores carros ate 50 mil, opcoes economicas, SUVs ate 100 mil e modelos para familia.",
        "Fonte oficial utilizada nesta leitura: FIPE."
      ],
    },
    {
      title: "Pesados e transporte sinalizam atividade economica",
      seoTitle: "Mercado de pesados e transporte: caminhoes, comerciais leves e atividade economica",
      metaDescription: "Analise do segmento de pesados e medios transportes com foco em logistica, emplacamentos, frota e oportunidades de mercado.",
      tag: "Pesados",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel registra ${pesados} pesados emplacados nos ultimos 30 dias, sinalizando movimentos ligados a logistica e atividade economica.`,
      content: [
        "O mercado de pesados e medios transportes tem relacao direta com logistica, agronegocio, industria, construcao e servicos. Por isso, acompanhar esse segmento ajuda a entender movimentacoes economicas mais amplas.",
        "Quando caminhoes e comerciais leves apresentam crescimento, pode haver sinal de renovacao de frota, aumento de demanda por transporte ou expansao de atividades produtivas.",
        "Para vendedores e empresas, esse segmento exige comunicacao mais tecnica. O cliente costuma avaliar consumo, manutencao, capacidade de carga, disponibilidade de pecas, garantia e retorno sobre investimento.",
        "No marketing, esse publico responde melhor a conteudos objetivos, demonstracoes, comparativos, videos de aplicacao real e argumentos financeiros.",
        "Acompanhar marcas e modelos mais emplacados ajuda a entender quais fabricantes estao ganhando espaco e quais categorias estao com maior procura.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
  ];
}

async function carregarCurrent() {
  const snap = await db.doc("dashboard/current").get();
  return snap.exists ? snap.data() : {};
}

function normalizarDashboard(current) {
  const limpo = JSON.parse(JSON.stringify(current || {}), (key, value) => {
    if (typeof value === "string") return limparTexto(value);
    return value;
  });

  return {
    ...limpo,
    updatedAt: nowISO(),
    automation: {
      status: "atualizado",
      origem: "GitHub Actions",
      dataBrasil: hojeBrasil(),
      ultimaExecucao: nowISO(),
    },
    robotStatus: {
      dados: "estrutura ativa",
      historico: "ativo",
      artigos: "ativo",
      coletoresReais: "pendente conectar fonte por fonte",
    },
  };
}

async function roboAtualizarDados() {
  const current = await carregarCurrent();
  const dashboard = normalizarDashboard(current);

  await db.doc("dashboard/current").set(dashboard, { merge: true });

  await log("robo-atualizar-dados", "ok", {
    destino: "dashboard/current",
    dataBrasil: hojeBrasil(),
  });

  console.log("OK - roboAtualizarDados");
}

async function roboSalvarHistorico() {
  const current = await carregarCurrent();
  const mes = mesBrasil();

  await db.doc(`history/${mes}`).set(
    {
      mes,
      dataBrasil: hojeBrasil(),
      atualizadoEm: admin.firestore.FieldValue.serverTimestamp(),
      dados: current,
    },
    { merge: true }
  );

  await log("robo-salvar-historico", "ok", {
    destino: `history/${mes}`,
  });

  console.log("OK - roboSalvarHistorico");
}

async function roboAtualizarArtigos() {
  const current = await carregarCurrent();
  const artigos = criarArtigos(hojeBrasil(), current);
  const dia = diaBrasil();

  await db.doc("dashboard/current").set(
    {
      news: artigos,
      articlesUpdatedAt: nowISO(),
      articlesSchedule: "Atualiza automaticamente no dia 1 e no dia 15",
    },
    { merge: true }
  );

  await db.collection("articles").doc(`${mesBrasil()}-${String(dia).padStart(2, "0")}`).set(
    {
      dataBrasil: hojeBrasil(),
      artigos,
      criadoEm: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await log("robo-atualizar-artigos", "ok", {
    total: artigos.length,
    destino: "dashboard/current.news",
  });

  console.log("OK - roboAtualizarArtigos");
}

async function roboSaude() {
  await db.doc("automation/status").set(
    {
      status: "funcionando",
      origem: "GitHub Actions",
      ultimaVerificacao: admin.firestore.FieldValue.serverTimestamp(),
      dataBrasil: hojeBrasil(),
    },
    { merge: true }
  );

  await log("robo-saude", "ok");

  console.log("OK - roboSaude");
}

async function main() {
  const modo = process.argv[2] || "all";
  const dia = diaBrasil();

  if (modo === "dados" || modo === "all") {
    await roboAtualizarDados();
  }

  if (modo === "historico" || modo === "all") {
    await roboSalvarHistorico();
  }

  if (modo === "artigos" || (modo === "all" && (dia === 1 || dia === 15))) {
    await roboAtualizarArtigos();
  }

  if (modo === "saude" || modo === "all") {
    await roboSaude();
  }

  console.log(`OK - modo ${modo} finalizado.`);
}

main().catch(async (error) => {
  console.error(error);
  try {
    await log("runner", "erro", { mensagem: String(error.message || error) });
  } catch (_) {}
  process.exit(1);
});
