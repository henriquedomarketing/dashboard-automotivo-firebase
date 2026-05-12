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

async function carregarCurrent() {
  const snap = await db.doc("dashboard/current").get();
  return snap.exists ? snap.data() : {};
}

function criarArtigos(dataAtual, dashboard = {}) {
  const carros = dashboard?.snapshots?.["30 dias"]?.carros?.emplacados || "dados em leitura";
  const motos = dashboard?.snapshots?.["30 dias"]?.motos?.emplacados || "dados em leitura";
  const pesados = dashboard?.snapshots?.["30 dias"]?.pesados?.emplacados || "dados em leitura";
  const credito = dashboard?.snapshots?.["30 dias"]?.credito || "dados em leitura";

  return [
    {
      title: "Resumo do mes: carros seguem em recuperacao no mercado brasileiro",
      tag: "Carros",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel registra ${carros} carros emplacados nos ultimos 30 dias, indicando um mercado ativo e com oportunidades comerciais.`,
      content: [
        "O mercado de carros no Brasil segue sendo uma referencia importante para entender o comportamento do consumidor automotivo.",
        "A leitura de emplacamentos ajuda a identificar quais modelos ganham mais espaco, quais marcas mantem presenca forte e quais categorias podem representar oportunidades.",
        "Para lojistas, acompanhar os modelos mais emplacados e transferidos ajuda a tomar decisoes melhores sobre estoque, campanha e atendimento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
    {
      title: "Motos mantem procura forte e puxam volume no mes",
      tag: "Motos",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel registra ${motos} motos emplacadas nos ultimos 30 dias, reforcando a importancia do segmento.`,
      content: [
        "O mercado de motos continua sendo um dos segmentos mais dinamicos do setor automotivo brasileiro.",
        "A procura por motocicletas esta ligada a mobilidade urbana, economia no deslocamento, trabalho por aplicativo e facilidade de compra.",
        "Para lojas e profissionais de marketing, esse segmento pede comunicacao direta, com foco em economia, manutencao e financiamento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
    {
      title: "Credito automotivo indica ritmo de compra do consumidor",
      tag: "Credito",
      updatedAt: dataAtual,
      sourceName: "Banco Central",
      sourceUrl: "https://www.bcb.gov.br/estatisticas",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel acompanha ${credito} em credito financiado para entender o comportamento de compra.`,
      content: [
        "O credito automotivo e um dos principais indicadores para entender o ritmo de compra no mercado de veiculos.",
        "Muitos consumidores decidem pela entrada, taxa, prazo e valor da parcela, nao apenas pelo preco total do veiculo.",
        "Para lojas, esse dado ajuda a ajustar campanhas com foco em parcela, simulacao, bancos parceiros e aprovacao.",
        "Fonte oficial utilizada nesta leitura: Banco Central."
      ],
    },
    {
      title: "Estados e cidades mostram oportunidades regionais",
      tag: "Regioes",
      updatedAt: dataAtual,
      sourceName: "SENATRAN",
      sourceUrl: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      summary: "A leitura por estados e cidades ajuda a identificar onde o mercado esta mais aquecido.",
      content: [
        "A analise regional e essencial para entender o mercado automotivo brasileiro.",
        "O Brasil tem realidades diferentes entre estados e cidades, e isso aparece nos emplacamentos, transferencias e perfil de frota.",
        "Para lojistas, olhar dados regionais ajuda a ajustar estoque, campanhas e argumentos comerciais.",
        "Fonte oficial utilizada nesta leitura: SENATRAN."
      ],
    },
    {
      title: "FIPE ajuda a entender faixas de preco e oportunidades",
      tag: "FIPE",
      updatedAt: dataAtual,
      sourceName: "FIPE",
      sourceUrl: "https://www.fipe.org.br/pt-br/indices/veiculos",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      summary: "A leitura por faixa de preco ajuda a identificar modelos acessiveis, intermediarios e premium.",
      content: [
        "A FIPE e uma referencia importante para entender preco medio de veiculos no Brasil.",
        "Mesmo que o valor real varie por cidade, estado, conservacao e quilometragem, a tabela ajuda a criar uma base comparativa.",
        "Para lojistas, a leitura por faixa ajuda a pensar estoque, campanhas e oportunidades comerciais.",
        "Fonte oficial utilizada nesta leitura: FIPE."
      ],
    },
    {
      title: "Pesados e transporte sinalizam atividade economica",
      tag: "Pesados",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
      summary: `O painel registra ${pesados} pesados emplacados nos ultimos 30 dias, sinalizando movimentos da logistica.`,
      content: [
        "O mercado de pesados e medios transportes tem relacao direta com logistica, agronegocio, industria, construcao e servicos.",
        "Quando caminhoes e comerciais leves crescem, pode haver sinal de renovacao de frota e aumento de atividade produtiva.",
        "Esse segmento exige comunicacao mais tecnica, com foco em custo operacional, manutencao e retorno sobre investimento.",
        "Fonte oficial utilizada nesta leitura: Fenabrave."
      ],
    },
  ];
}

async function roboColetarFontesReais() {
  const fontesReais = await coletarFontesReais();

  await db.doc("dashboard/current").set(
    {
      fontesReais,
      fontesReaisAtualizadoEm: nowISO(),
      fenabraveRankingMaisVendidos: fontesReais?.fenabrave?.rankingMaisVendidos || [],
      bancoCentralCreditoVeiculos: fontesReais?.bancoCentral?.ultimos13Meses || [],
    },
    { merge: true }
  );

  await db.doc("sources/fenabrave").set(fontesReais.fenabrave || {}, { merge: true });
  await db.doc("sources/bancoCentral").set(fontesReais.bancoCentral || {}, { merge: true });
  await db.doc("sources/senatran").set(fontesReais.senatran || {}, { merge: true });
  await db.doc("sources/fipe").set(fontesReais.fipe || {}, { merge: true });

  await log("robo-coletar-fontes-reais", "ok", {
    fenabrave: fontesReais?.fenabrave?.status,
    bancoCentral: fontesReais?.bancoCentral?.status,
  });

  console.log("OK - roboColetarFontesReais");
}

async function roboAtualizarDados() {
  const current = await carregarCurrent();

  const limpo = JSON.parse(JSON.stringify(current || {}), (key, value) => {
    if (typeof value === "string") return limparTexto(value);
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
