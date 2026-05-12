async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 DashboardAutomotivoBot/1.0",
      "accept": "text/html,application/json,text/plain,*/*",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao acessar ${url}: ${res.status}`);
  }

  return await res.text();
}

function cleanText(text) {
  return String(text || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFenabraveMaisVendidos(html) {
  const text = cleanText(html);

  const modelosConhecidos = [
    "STRADA", "POLO", "ONIX", "HB20", "ARGO", "MOBI", "KWID",
    "T-CROSS", "TRACKER", "CRETA", "COMPASS", "COROLLA", "HILUX",
    "RENEGADE", "HR-V", "KICKS", "VIRTUS", "S10",
    "CG 160", "BIZ", "POP 110I", "NXR160", "FAZER", "FACTOR",
    "BROS", "PCX", "XRE", "NMAX", "ELITE"
  ];

  const ranking = [];

  for (const modelo of modelosConhecidos) {
    const regex = new RegExp(`${modelo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+([0-9.]+)`, "i");
    const match = text.match(regex);

    if (match) {
      ranking.push({
        modelo,
        volume: match[1],
      });
    }
  }

  return ranking.slice(0, 20);
}

async function coletarFenabrave() {
  const url = "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp";
  const html = await fetchText(url);
  const rankingMaisVendidos = parseFenabraveMaisVendidos(html);

  return {
    fonte: "Fenabrave",
    url,
    atualizadoEm: new Date().toISOString(),
    status: rankingMaisVendidos.length ? "ok" : "sem_ranking_extraido",
    rankingMaisVendidos,
  };
}

async function coletarBancoCentral() {
  const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.25447/dados?formato=json";
  const text = await fetchText(url);
  const data = JSON.parse(text);
  const ultimos13Meses = data.slice(-13);

  return {
    fonte: "Banco Central",
    url,
    atualizadoEm: new Date().toISOString(),
    status: ultimos13Meses.length ? "ok" : "sem_dados",
    serie: "25447",
    nome: "Juros para aquisicao de veiculos",
    ultimos13Meses,
  };
}

async function coletarFontesReais() {
  const resultado = {
    coletadoEm: new Date().toISOString(),
    fenabrave: null,
    bancoCentral: null,
    senatran: {
      fonte: "SENATRAN",
      url: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
      status: "preparado_para_conectar",
    },
    fipe: {
      fonte: "FIPE",
      url: "https://www.fipe.org.br/pt-br/indices/veiculos",
      status: "preparado_para_conectar",
    },
  };

  try {
    resultado.fenabrave = await coletarFenabrave();
  } catch (error) {
    resultado.fenabrave = {
      fonte: "Fenabrave",
      status: "erro",
      erro: String(error.message || error),
    };
  }

  try {
    resultado.bancoCentral = await coletarBancoCentral();
  } catch (error) {
    resultado.bancoCentral = {
      fonte: "Banco Central",
      status: "erro",
      erro: String(error.message || error),
    };
  }

  return resultado;
}

module.exports = {
  coletarFontesReais,
};
