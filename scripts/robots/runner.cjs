const admin = require("firebase-admin");
const { coletarFontesReais } = require("./collectors-real.cjs");

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

function cleanText(value) {
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

async function carregarCurrent() {
  const snap = await db.doc("dashboard/current").get();
  return snap.exists ? snap.data() : {};
}

function artigoBase(title, tag, sourceName, sourceUrl, image, summary, paragraphs) {
  return {
    title,
    tag,
    sourceName,
    sourceUrl,
    image,
    updatedAt: hojeBrasil(),
    summary,
    content: paragraphs,
  };
}

function criarArtigos(dashboard = {}) {
  const fenabrave = dashboard?.fontesReais?.fenabrave;
  const bancoCentral = dashboard?.fontesReais?.bancoCentral;
  const senatran = dashboard?.fontesReais?.senatran;
  const fipe = dashboard?.fontesReais?.fipe;

  const carrosTop = fenabrave?.rankingCarros?.[0]?.modelo || fenabrave?.rankingMaisVendidos?.[0]?.modelo || "modelos de maior giro";
  const motosTop = fenabrave?.rankingMotos?.[0]?.modelo || "motos de entrada";
  const creditoAtual = bancoCentral?.ultimos13Meses?.slice(-1)?.[0]?.valor || "indicador atualizado";
  const estadoTop = senatran?.estados?.[0]?.uf || "principais estados";
  const fipeTotal = fipe?.totalAmostra || "amostra inicial";

  return [
    artigoBase(
      "Resumo do mês: carros seguem em recuperação no mercado brasileiro",
      "Carros",
      "Fenabrave",
      "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      `O ranking da Fenabrave destaca ${carrosTop}, reforçando a importância de acompanhar modelos de maior giro.`,
      [
        "O mercado de carros no Brasil segue sendo uma das principais referências para entender o comportamento do consumidor automotivo.",
        "A leitura dos emplacamentos ajuda a identificar quais modelos ganham mais espaço, quais marcas mantêm presença forte e quais categorias podem representar oportunidade comercial.",
        "Para lojistas, acompanhar os modelos mais emplacados ajuda a tomar decisões melhores sobre estoque, campanha e atendimento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ]
    ),
    artigoBase(
      "Motos mantêm procura forte e puxam volume no mês",
      "Motos",
      "Fenabrave",
      "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      `O segmento de motos segue relevante, com destaque para ${motosTop}.`,
      [
        "O mercado de motos continua sendo um dos segmentos mais dinâmicos do setor automotivo brasileiro.",
        "A procura por motocicletas está ligada à mobilidade urbana, economia no deslocamento, trabalho por aplicativo e facilidade de compra.",
        "Modelos de entrada e baixa cilindrada costumam aparecer com destaque por atenderem um público amplo.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ]
    ),
    artigoBase(
      "Crédito automotivo indica ritmo de compra do consumidor",
      "Crédito",
      "Banco Central",
      "https://www.bcb.gov.br/estatisticas",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      `O último valor coletado na série do Banco Central foi ${creditoAtual}.`,
      [
        "O crédito automotivo é um dos principais indicadores para entender o ritmo de compra no mercado de veículos.",
        "Muitos consumidores decidem pela entrada, taxa, prazo e valor da parcela, não apenas pelo preço total do veículo.",
        "Para lojas, esse dado ajuda a ajustar campanhas com foco em parcela, simulação, bancos parceiros e aprovação.",
        "Fonte oficial utilizada nesta leitura: Banco Central."
      ]
    ),
    artigoBase(
      "Estados e cidades mostram oportunidades regionais",
      "Regiões",
      "SENATRAN",
      "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      `A base SENATRAN ajuda a monitorar frota por estado e município; destaque inicial: ${estadoTop}.`,
      [
        "A análise regional é essencial para entender o mercado automotivo brasileiro.",
        "Estados e cidades têm comportamentos diferentes em frota, emplacamentos, transferências e perfil de consumo.",
        "Para lojistas, olhar dados regionais ajuda a ajustar estoque, campanhas e argumentos comerciais.",
        "Fonte oficial utilizada nesta leitura: SENATRAN."
      ]
    ),
    artigoBase(
      "FIPE ajuda a entender faixas de preço e oportunidades",
      "FIPE",
      "FIPE",
      "https://www.fipe.org.br/pt-br/indices/veiculos",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      `O robô consultou ${fipeTotal} referências para organizar faixas de preço.`,
      [
        "A FIPE é uma referência importante para entender preço médio de veículos no Brasil.",
        "Mesmo que o valor real varie por cidade, estado, conservação e quilometragem, a tabela ajuda a criar uma base comparativa.",
        "Organizar veículos por faixa de preço facilita a leitura comercial para estoque, campanhas e conteúdos de SEO.",
        "Fonte oficial utilizada nesta leitura: FIPE."
      ]
    ),
    artigoBase(
      "Pesados e transporte sinalizam atividade econômica",
      "Pesados",
      "Fenabrave",
      "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
      "O segmento de pesados ajuda a entender movimentos de logística, produção e transporte.",
      [
        "O mercado de pesados e médios transportes tem relação direta com logística, agronegócio, indústria, construção e serviços.",
        "Quando caminhões e comerciais leves crescem, pode haver sinal de renovação de frota e aumento de atividade produtiva.",
        "Esse segmento exige comunicação mais técnica, com foco em custo operacional, manutenção e retorno sobre investimento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ]
    ),
  ];
}

async function roboColetarFontesReais() {
  const fontesReais = await coletarFontesReais();

  const fenabraveRanking = fontesReais?.fenabrave?.rankingCarros?.length
    ? fontesReais.fenabrave.rankingCarros
    : fontesReais?.fenabrave?.rankingMaisVendidos || [];

  const update = {
    fontesReais,
    fontesReaisAtualizadoEm: nowISO(),

    fenabraveRankingMaisVendidos: fontesReais?.fenabrave?.rankingMaisVendidos || [],
    fenabraveRankingCarros: fontesReais?.fenabrave?.rankingCarros || [],
    fenabraveRankingMotos: fontesReais?.fenabrave?.rankingMotos || [],
    fenabraveRankingPesados: fontesReais?.fenabrave?.rankingPesados || [],

    bancoCentralCreditoVeiculos: fontesReais?.bancoCentral?.ultimos13Meses || [],

    senatranEstados: fontesReais?.senatran?.estados || [],
    senatranCidades: fontesReais?.senatran?.cidades || [],
    senatranLinksOficiais: fontesReais?.senatran?.linksOficiais || [],

    fipeVeiculosAmostra: fontesReais?.fipe?.veiculos || [],
    fipeFaixasDePreco: fontesReais?.fipe?.faixasDePreco || [],

    rankingPrincipal: fenabraveRanking,

    robotStatus: {
      dados: "ativo",
      historico: "ativo",
      artigos: "ativo",
      fontesReais: "ativo",
    },
  };

  await db.doc("dashboard/current").set(update, { merge: true });

  await db.doc("sources/fenabrave").set(fontesReais.fenabrave || {}, { merge: true });
  await db.doc("sources/bancoCentral").set(fontesReais.bancoCentral || {}, { merge: true });
  await db.doc("sources/senatran").set(fontesReais.senatran || {}, { merge: true });
  await db.doc("sources/fipe").set(fontesReais.fipe || {}, { merge: true });

  await log("robo-coletar-fontes-reais", "ok", {
    fenabrave: fontesReais?.fenabrave?.status,
    bancoCentral: fontesReais?.bancoCentral?.status,
    senatran: fontesReais?.senatran?.status,
    fipe: fontesReais?.fipe?.status,
  });

  console.log("OK - roboColetarFontesReais");
}

async function roboAtualizarDados() {
  const current = await carregarCurrent();

  const limpo = JSON.parse(JSON.stringify(current || {}), (key, value) => {
    if (typeof value === "string") return cleanText(value);
    return value;
  });

  await db.doc("dashboard/current").set(
    {
      ...limpo,
      updatedAt: nowISO(),
      automation: {
        status: "atualizado",
        origem: "GitHub Actions",
        dataBrasil: hojeBrasil(),
        ultimaExecucao: nowISO(),
      },
      robotStatus: {
        dados: "ativo",
        historico: "ativo",
        artigos: "ativo",
        fontesReais: "ativo",
      },
    },
    { merge: true }
  );

  await log("robo-atualizar-dados", "ok");
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
  const artigos = criarArtigos(current);
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

  if (modo === "fontes" || modo === "all") {
    await roboColetarFontesReais();
  }

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
    await log("runner", "erro", {
      mensagem: String(error.message || error),
    });
  } catch (_) {}

  process.exit(1);
});
