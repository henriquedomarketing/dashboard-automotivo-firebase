let XLSX = null;

try {
  XLSX = require("xlsx");
} catch (_) {
  XLSX = null;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function nowISO() {
  return new Date().toISOString();
}

function cleanText(value) {
  return String(value || "")
    .replace(/�/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&ccedil;/g, "ç")
    .replace(/&atilde;/g, "ã")
    .replace(/&otilde;/g, "õ")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&Aacute;/g, "Á")
    .replace(/&Eacute;/g, "É")
    .replace(/&Iacute;/g, "Í")
    .replace(/&Oacute;/g, "Ó")
    .replace(/&Uacute;/g, "Ú")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html) {
  return cleanText(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

function normalize(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function parseNumberBR(value) {
  if (typeof value === "number") return value;
  const text = String(value || "").trim();

  if (!text) return 0;

  if (text.includes(".") && !text.includes(",")) {
    return Number(text.replace(/[^\d.-]/g, "")) || 0;
  }

  return Number(text.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 DashboardAutomotivoBot/1.0",
      accept: "text/html,application/json,text/plain,*/*",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao acessar ${url}: ${res.status}`);
  }

  return await res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 DashboardAutomotivoBot/1.0",
      accept: "*/*",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao baixar ${url}: ${res.status}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

function absoluteUrl(base, href) {
  try {
    return new URL(href, base).toString();
  } catch (_) {
    return href;
  }
}

/* =========================
   FENABRAVE
========================= */

function classifyFenabraveItem(modelo) {
  const name = normalize(modelo);

  const motos = [
    "CG", "BIZ", "POP", "NXR", "FAZER", "FACTOR", "BROS", "PCX", "XRE",
    "NMAX", "ELITE", "YBR", "CB", "ADV", "CROSSER", "SHI", "JET", "DK"
  ];

  const pesados = [
    "DELIVERY", "ACCELO", "ATEGO", "ACTROS", "CONSTELLATION", "METEOR",
    "FH", "FM", "VM", "XF", "CF", "TECTOR", "STRALIS", "DAILY", "SPRINTER"
  ];

  if (motos.some((token) => name.includes(token))) return "motos";
  if (pesados.some((token) => name.includes(token))) return "pesados";
  return "carros";
}

function parseFenabraveMaisVendidos(html) {
  const text = stripHtml(html);

  const ignore = [
    "RELATORIO", "MAIS VENDIDOS", "MES", "ANO", "SEGMENTO", "TODOS",
    "AUTO", "COMERCIAL", "CAMINHAO", "MOTO", "FILTRO", "SELECIONADO",
    "BRASIL", "GRAFICO", "UF", "TESTE", "IMAGE", "MAIO", "ABRIL",
    "JANEIRO", "FEVEREIRO", "MARCO", "MARÇO", "JUNHO", "JULHO",
    "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];

  const regex = /([A-Z0-9À-Ú][A-Z0-9À-Ú\s./+-]{1,45})\s+(\d{1,3}(?:\.\d{3})+|\d{3,7})/g;
  const ranking = [];
  const seen = new Set();

  let match;

  while ((match = regex.exec(text.toUpperCase())) !== null) {
    const modelo = cleanText(match[1]).replace(/\s+/g, " ").trim();
    const volume = cleanText(match[2]);
    const normalized = normalize(modelo);

    if (!modelo || modelo.length < 2) continue;
    if (ignore.some((word) => normalized.includes(word))) continue;
    if (seen.has(normalized)) continue;

    seen.add(normalized);

    ranking.push({
      modelo,
      volume,
      volumeNumber: parseNumberBR(volume),
      categoria: classifyFenabraveItem(modelo),
    });

    if (ranking.length >= 80) break;
  }

  const carros = ranking.filter((item) => item.categoria === "carros").slice(0, 20);
  const motos = ranking.filter((item) => item.categoria === "motos").slice(0, 20);
  const pesados = ranking.filter((item) => item.categoria === "pesados").slice(0, 20);

  return {
    geral: ranking.slice(0, 30),
    carros,
    motos,
    pesados,
  };
}

async function coletarFenabrave() {
  const url = "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp";
  const html = await fetchText(url);
  const ranking = parseFenabraveMaisVendidos(html);

  return {
    fonte: "Fenabrave",
    url,
    atualizadoEm: nowISO(),
    status: ranking.geral.length ? "ok" : "sem_ranking_extraido",
    rankingMaisVendidos: ranking.geral,
    rankingCarros: ranking.carros,
    rankingMotos: ranking.motos,
    rankingPesados: ranking.pesados,
  };
}

/* =========================
   BANCO CENTRAL
========================= */

async function coletarBancoCentral() {
  const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.25447/dados?formato=json";
  const text = await fetchText(url);
  const data = JSON.parse(text);
  const ultimos13Meses = data.slice(-13);

  return {
    fonte: "Banco Central",
    url,
    atualizadoEm: nowISO(),
    status: ultimos13Meses.length ? "ok" : "sem_dados",
    serie: "25447",
    nome: "Juros para aquisição de veículos",
    ultimos13Meses,
  };
}

/* =========================
   SENATRAN
========================= */

function extractLinks(html, baseUrl) {
  const links = [];
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = absoluteUrl(baseUrl, match[1]);
    const label = stripHtml(match[2]);

    if (!href || !label) continue;

    links.push({
      label,
      url: href,
    });
  }

  return links;
}

function findSenatranUsefulLinks(links) {
  const useful = links.filter((link) => {
    const label = normalize(link.label);
    const url = normalize(link.url);

    return (
      label.includes("FROTA") ||
      label.includes("MUNICIPIO") ||
      label.includes("MUNICÍPIO") ||
      label.includes("UF") ||
      label.includes("MARCA") ||
      url.includes("FROTA") ||
      url.includes("MUNICIPIO") ||
      url.includes("MUNICÍPIO")
    );
  });

  return useful.slice(0, 80);
}

function getRowValue(row, patterns) {
  const keys = Object.keys(row || {});

  for (const pattern of patterns) {
    const key = keys.find((k) => normalize(k).includes(normalize(pattern)));
    if (key) return row[key];
  }

  return "";
}

function getBestNumber(row) {
  const values = Object.values(row || {});
  const nums = values.map(parseNumberBR).filter((n) => Number.isFinite(n) && n > 0);
  return nums.length ? nums[nums.length - 1] : 0;
}

function parseXlsxFrota(buffer) {
  if (!XLSX) {
    return {
      status: "xlsx_nao_instalado",
      estados: [],
      cidades: [],
    };
  }

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  const estadosMap = new Map();
  const cidadesMap = new Map();

  for (const row of rows) {
    const uf = cleanText(getRowValue(row, ["uf", "estado"])).toUpperCase();
    const municipio = cleanText(getRowValue(row, ["municipio", "município", "cidade"]));
    const tipo = cleanText(getRowValue(row, ["tipo"]));
    const total = getBestNumber(row);

    if (!uf || total <= 0) continue;

    if (!estadosMap.has(uf)) {
      estadosMap.set(uf, {
        uf,
        total: 0,
        tipos: {},
      });
    }

    const estado = estadosMap.get(uf);
    estado.total += total;

    if (tipo) {
      estado.tipos[tipo] = (estado.tipos[tipo] || 0) + total;
    }

    if (municipio) {
      const key = `${uf}-${municipio}`;

      if (!cidadesMap.has(key)) {
        cidadesMap.set(key, {
          uf,
          cidade: municipio,
          total: 0,
          tipos: {},
        });
      }

      const cidade = cidadesMap.get(key);
      cidade.total += total;

      if (tipo) {
        cidade.tipos[tipo] = (cidade.tipos[tipo] || 0) + total;
      }
    }
  }

  const estados = [...estadosMap.values()]
    .sort((a, b) => b.total - a.total)
    .slice(0, 27);

  const cidades = [...cidadesMap.values()]
    .sort((a, b) => b.total - a.total)
    .slice(0, 100);

  return {
    status: estados.length || cidades.length ? "ok" : "sem_dados_parseados",
    estados,
    cidades,
  };
}

async function tryParseSenatranFile(link) {
  const url = link.url.toLowerCase();

  if (!url.includes(".xlsx") && !url.includes(".xls") && !url.includes(".csv") && !url.includes(".txt")) {
    return null;
  }

  const buffer = await fetchBuffer(link.url);

  if (url.includes(".xlsx") || url.includes(".xls")) {
    return parseXlsxFrota(buffer);
  }

  const text = buffer.toString("utf8");
  const lines = text.split(/\r?\n/).filter(Boolean);

  if (lines.length < 2) {
    return {
      status: "arquivo_sem_linhas",
      estados: [],
      cidades: [],
    };
  }

  const separator = text.includes(";") ? ";" : ",";
  const header = lines[0].split(separator).map(cleanText);
  const rows = lines.slice(1).map((line) => {
    const values = line.split(separator);
    const row = {};
    header.forEach((key, index) => {
      row[key] = values[index] || "";
    });
    return row;
  });

  return parseXlsxFrotaLikeRows(rows);
}

function parseXlsxFrotaLikeRows(rows) {
  const estadosMap = new Map();
  const cidadesMap = new Map();

  for (const row of rows) {
    const uf = cleanText(getRowValue(row, ["uf", "estado"])).toUpperCase();
    const municipio = cleanText(getRowValue(row, ["municipio", "município", "cidade"]));
    const tipo = cleanText(getRowValue(row, ["tipo"]));
    const total = getBestNumber(row);

    if (!uf || total <= 0) continue;

    if (!estadosMap.has(uf)) estadosMap.set(uf, { uf, total: 0, tipos: {} });
    estadosMap.get(uf).total += total;

    if (tipo) estadosMap.get(uf).tipos[tipo] = (estadosMap.get(uf).tipos[tipo] || 0) + total;

    if (municipio) {
      const key = `${uf}-${municipio}`;
      if (!cidadesMap.has(key)) cidadesMap.set(key, { uf, cidade: municipio, total: 0, tipos: {} });
      cidadesMap.get(key).total += total;
      if (tipo) cidadesMap.get(key).tipos[tipo] = (cidadesMap.get(key).tipos[tipo] || 0) + total;
    }
  }

  return {
    status: estadosMap.size || cidadesMap.size ? "ok" : "sem_dados_parseados",
    estados: [...estadosMap.values()].sort((a, b) => b.total - a.total).slice(0, 27),
    cidades: [...cidadesMap.values()].sort((a, b) => b.total - a.total).slice(0, 100),
  };
}

async function coletarSenatran() {
  const urls = [
    "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/frota-de-veiculos-2026",
    "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/frota-de-veiculos-2025",
    "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/estatisticas-frota-de-veiculos-senatran",
  ];

  let pageUrl = "";
  let html = "";

  for (const url of urls) {
    try {
      html = await fetchText(url);
      pageUrl = url;
      break;
    } catch (_) {}
  }

  if (!html) {
    throw new Error("Não foi possível acessar páginas públicas do SENATRAN.");
  }

  const links = findSenatranUsefulLinks(extractLinks(html, pageUrl));

  const priority = links.find((link) => {
    const label = normalize(link.label);
    const url = normalize(link.url);
    return (
      (label.includes("MUNICIPIO") || label.includes("MUNICÍPIO") || label.includes("UF")) &&
      (url.includes("XLS") || url.includes("CSV") || url.includes("TXT"))
    );
  }) || links.find((link) => {
    const url = normalize(link.url);
    return url.includes("XLS") || url.includes("CSV") || url.includes("TXT");
  });

  let parsed = null;

  if (priority) {
    try {
      parsed = await tryParseSenatranFile(priority);
    } catch (error) {
      parsed = {
        status: "erro_parse_arquivo",
        erro: String(error.message || error),
        estados: [],
        cidades: [],
      };
    }
  }

  return {
    fonte: "SENATRAN",
    url: pageUrl,
    atualizadoEm: nowISO(),
    status: parsed?.status === "ok" ? "ok" : "links_oficiais_encontrados",
    linksOficiais: links,
    arquivoTentado: priority || null,
    estados: parsed?.estados || [],
    cidades: parsed?.cidades || [],
    observacao: "Quando o arquivo oficial estiver em XLSX/CSV/TXT acessível, o robô tenta ler estados e cidades automaticamente.",
  };
}

/* =========================
   FIPE
========================= */

async function postFipe(endpoint, payload) {
  const url = `https://veiculos.fipe.org.br/api/veiculos/${endpoint}`;
  const body = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    body.append(key, String(value));
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "user-agent": "Mozilla/5.0 DashboardAutomotivoBot/1.0",
      "referer": "https://veiculos.fipe.org.br/",
      "origin": "https://veiculos.fipe.org.br",
      "accept": "application/json, text/javascript, */*; q=0.01",
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`FIPE ${endpoint}: ${res.status}`);
  }

  return await res.json();
}

async function coletarFipeOficialAmostra() {
  const referencias = await postFipe("ConsultarTabelaDeReferencia", {});
  const codigoTabelaReferencia = referencias?.[0]?.Codigo;

  if (!codigoTabelaReferencia) {
    throw new Error("FIPE sem código de tabela de referência.");
  }

  const tipos = [
    { nome: "carros", codigoTipoVeiculo: 1, marcasAlvo: ["FIAT", "VOLKSWAGEN", "CHEVROLET", "HYUNDAI", "TOYOTA", "HONDA", "BYD"] },
    { nome: "motos", codigoTipoVeiculo: 2, marcasAlvo: ["HONDA", "YAMAHA", "SHINERAY", "BMW"] },
    { nome: "caminhoes", codigoTipoVeiculo: 3, marcasAlvo: ["MERCEDES", "VOLKSWAGEN", "VOLVO", "SCANIA", "IVECO"] },
  ];

  const veiculos = [];

  for (const tipo of tipos) {
    const marcas = await postFipe("ConsultarMarcas", {
      codigoTabelaReferencia,
      codigoTipoVeiculo: tipo.codigoTipoVeiculo,
    });

    const marcasSelecionadas = marcas
      .filter((marca) => tipo.marcasAlvo.some((alvo) => normalize(marca.Label).includes(alvo)))
      .slice(0, 4);

    for (const marca of marcasSelecionadas) {
      await sleep(180);

      let modelosResponse;

      try {
        modelosResponse = await postFipe("ConsultarModelos", {
          codigoTabelaReferencia,
          codigoTipoVeiculo: tipo.codigoTipoVeiculo,
          codigoMarca: marca.Value,
        });
      } catch (_) {
        continue;
      }

      const modelos = (modelosResponse?.Modelos || []).slice(0, 4);

      for (const modelo of modelos) {
        await sleep(180);

        let anos;

        try {
          anos = await postFipe("ConsultarAnoModelo", {
            codigoTabelaReferencia,
            codigoTipoVeiculo: tipo.codigoTipoVeiculo,
            codigoMarca: marca.Value,
            codigoModelo: modelo.Value,
          });
        } catch (_) {
          continue;
        }

        const ano = anos?.[0];

        if (!ano?.Value) continue;

        const [anoModelo, codigoTipoCombustivel] = String(ano.Value).split("-");

        await sleep(180);

        try {
          const valor = await postFipe("ConsultarValorComTodosParametros", {
            codigoTabelaReferencia,
            codigoTipoVeiculo: tipo.codigoTipoVeiculo,
            codigoMarca: marca.Value,
            codigoModelo: modelo.Value,
            anoModelo,
            codigoTipoCombustivel,
            tipoConsulta: "tradicional",
          });

          if (valor?.Valor) {
            veiculos.push({
              tipo: tipo.nome,
              marca: cleanText(valor.Marca || marca.Label),
              modelo: cleanText(valor.Modelo || modelo.Label),
              ano: cleanText(valor.AnoModelo || ano.Label),
              codigoFipe: cleanText(valor.CodigoFipe),
              valor: cleanText(valor.Valor),
              valorNumber: parseNumberBR(valor.Valor),
              mesReferencia: cleanText(valor.MesReferencia),
            });
          }
        } catch (_) {}
      }
    }
  }

  const bands = [
    { title: "Até 30 mil", max: 30000 },
    { title: "Até 60 mil", max: 60000 },
    { title: "Até 90 mil", max: 90000 },
    { title: "Até 150 mil", max: 150000 },
    { title: "Até 250 mil", max: 250000 },
    { title: "Até 500 mil", max: 500000 },
  ].map((band) => ({
    ...band,
    items: veiculos
      .filter((item) => item.valorNumber > 0 && item.valorNumber <= band.max)
      .sort((a, b) => b.valorNumber - a.valorNumber)
      .slice(0, 20),
  }));

  return {
    fonte: "FIPE",
    url: "https://www.fipe.org.br/pt-br/indices/veiculos",
    atualizadoEm: nowISO(),
    status: veiculos.length ? "ok" : "sem_amostra",
    codigoTabelaReferencia,
    totalAmostra: veiculos.length,
    veiculos,
    faixasDePreco: bands,
  };
}

/* =========================
   COLETOR GERAL
========================= */

async function safeCollect(name, fn) {
  try {
    return await fn();
  } catch (error) {
    return {
      fonte: name,
      status: "erro",
      erro: String(error.message || error),
      atualizadoEm: nowISO(),
    };
  }
}

async function coletarFontesReais() {
  const [fenabrave, bancoCentral, senatran, fipe] = await Promise.all([
    safeCollect("Fenabrave", coletarFenabrave),
    safeCollect("Banco Central", coletarBancoCentral),
    safeCollect("SENATRAN", coletarSenatran),
    safeCollect("FIPE", coletarFipeOficialAmostra),
  ]);

  return {
    coletadoEm: nowISO(),
    fenabrave,
    bancoCentral,
    senatran,
    fipe,
  };
}

module.exports = {
  coletarFontesReais,
};
