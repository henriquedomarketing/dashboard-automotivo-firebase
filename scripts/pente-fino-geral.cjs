const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
}

const footerPagesBlock = `const footerPages = {
  sobre: {
    title: "Sobre n\\u00f3s",
    text: [
      "O Dashboard Automotivo Brasileiro \\u00e9 um projeto criado por Henrique Ferreira, conhecido como @henriquedomarketing.",
      "O projeto nasceu para organizar, visualizar e facilitar a leitura de dados do mercado automotivo brasileiro em uma \\u00fanica p\\u00e1gina.",
      "A proposta \\u00e9 reunir emplacamentos, transfer\\u00eancias, rankings, FIPE, cidades, estados, fontes oficiais e insights autom\\u00e1ticos para ajudar lojistas, profissionais de marketing, vendedores, consultores e interessados no setor.",
      "O painel ainda est\\u00e1 em evolu\\u00e7\\u00e3o e ser\\u00e1 aprimorado com novas fontes, automa\\u00e7\\u00f5es e an\\u00e1lises."
    ]
  },
  dados: {
    title: "Fontes e dados",
    text: [
      "Os dados exibidos no painel s\\u00e3o organizados a partir de fontes p\\u00fablicas, oficiais e bases estat\\u00edsticas do setor automotivo.",
      "As principais refer\\u00eancias s\\u00e3o Fenabrave, SENATRAN, FIPE, Banco Central, B3, ANFAVEA e IBGE.",
      "Algumas informa\\u00e7\\u00f5es podem ser atualizadas diariamente; outras dependem da publica\\u00e7\\u00e3o mensal ou peri\\u00f3dica das fontes oficiais.",
      "Sempre que poss\\u00edvel, o painel indica a origem e a periodicidade dos dados para manter transpar\\u00eancia."
    ]
  },
  termos: {
    title: "Termos de uso",
    text: [
      "As informa\\u00e7\\u00f5es deste site s\\u00e3o disponibilizadas para fins informativos, estat\\u00edsticos e educacionais.",
      "O dashboard n\\u00e3o substitui consultas oficiais, relat\\u00f3rios institucionais ou orienta\\u00e7\\u00e3o profissional especializada.",
      "Antes de tomar decis\\u00f5es comerciais, financeiras ou jur\\u00eddicas, consulte sempre a fonte oficial dos dados.",
      "Os n\\u00fameros podem variar conforme atualiza\\u00e7\\u00f5es, metodologia de coleta e disponibilidade das bases oficiais."
    ]
  },
  privacidade: {
    title: "Pol\\u00edtica de privacidade",
    text: [
      "Este site n\\u00e3o solicita dados pessoais sens\\u00edveis para navega\\u00e7\\u00e3o no dashboard.",
      "Podemos utilizar servi\\u00e7os como Firebase, Google Analytics ou ferramentas similares para hospedagem, seguran\\u00e7a e m\\u00e9tricas de uso.",
      "As estat\\u00edsticas exibidas no painel n\\u00e3o identificam usu\\u00e1rios individuais.",
      "O objetivo \\u00e9 melhorar a experi\\u00eancia, acompanhar desempenho e manter o site seguro."
    ]
  },
  robots: {
    title: "Robots.txt",
    text: [
      "O arquivo robots.txt informa aos mecanismos de busca quais p\\u00e1ginas podem ser rastreadas.",
      "Neste projeto, o site est\\u00e1 configurado para permitir a indexa\\u00e7\\u00e3o das p\\u00e1ginas p\\u00fablicas.",
      "Isso ajuda mecanismos como o Google a entenderem melhor a estrutura do site."
    ]
  },
  sitemap: {
    title: "Sitemap",
    text: [
      "O sitemap ajuda o Google e outros buscadores a encontrarem as p\\u00e1ginas principais do site.",
      "Ele melhora a organiza\\u00e7\\u00e3o para SEO e facilita o rastreamento das p\\u00e1ginas institucionais.",
      "Com isso, o site fica mais preparado para ser lido e indexado pelos mecanismos de busca."
    ]
  }
};`;

const sourceLinksBlock = `const sourceLinks: Record<string, string> = {
  "Fenabrave": "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
  "SENATRAN": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/frota-de-veiculos-2026",
  "FIPE": "https://www.fipe.org.br/pt-br/indices/veiculos",
  "Banco Central": "https://www4.bcb.gov.br/pec/series/port/aviso.asp",
  "B3 / SNG": "https://www.b3.com.br/",
  "ANFAVEA + IBGE": "https://anfavea.com.br/"
};`;

const labels13 = `["Mai/25", "Jun/25", "Jul/25", "Ago/25", "Set/25", "Out/25", "Nov/25", "Dez/25", "Jan/26", "Fev/26", "Mar/26", "Abr/26", "Mai/26"]`;

const chartSeries13 = `{
    "30 dias": {
      carros: [162, 158, 166, 171, 164, 169, 173, 168, 161, 176, 181, 174, 179],
      motos: [132, 128, 137, 141, 136, 142, 145, 139, 134, 146, 151, 144, 149],
      pesados: [12.1, 11.8, 12.4, 12.9, 12.2, 12.7, 13.1, 12.6, 11.9, 13.4, 13.8, 12.9, 13.2],
      credito: [55.1, 53.8, 56.4, 58.2, 57.1, 59.3, 60.1, 58.7, 57.9, 61.4, 63.2, 62.34, 64.1]
    },
    "60 dias": {
      carros: [318, 309, 327, 336, 324, 331, 342, 334, 326, 351, 362, 344, 356],
      motos: [263, 255, 271, 279, 268, 276, 282, 274, 266, 289, 296, 284, 292],
      pesados: [23.2, 22.6, 24.1, 24.8, 23.7, 24.4, 25.1, 24.3, 23.5, 25.8, 26.4, 25.2, 25.9],
      credito: [108.2, 105.4, 111.7, 114.3, 112.6, 116.8, 119.3, 117.1, 114.8, 122.6, 125.2, 121.18, 127.4]
    },
    "90 dias": {
      carros: [472, 459, 486, 498, 481, 492, 508, 497, 484, 523, 537, 511, 529],
      motos: [392, 381, 405, 416, 401, 412, 419, 407, 396, 430, 441, 421, 436],
      pesados: [34.6, 33.8, 35.9, 36.8, 35.2, 36.4, 37.6, 36.2, 35.1, 38.3, 39.1, 37.4, 38.6],
      credito: [160.4, 156.8, 166.2, 171.5, 168.1, 174.3, 178.7, 175.4, 171.9, 184.2, 188.5, 181.92, 190.6]
    }
  }`;

const fipeBandsReal = `[
      {
        title: "Até 30 mil",
        items: [
          "Fiat Uno 1.0 2014", "Volkswagen Gol 1.0 2014", "Renault Sandero 1.0 2015", "Chevrolet Celta 1.0 2015", "Ford Ka 1.0 2015",
          "Fiat Palio 1.0 2014", "Nissan March 1.0 2014", "Peugeot 207 1.4 2013", "Citroën C3 1.4 2013", "Fiat Siena 1.0 2012",
          "Chevrolet Classic 1.0 2014", "Ford Fiesta 1.0 2013", "Volkswagen Fox 1.0 2012", "Renault Clio 1.0 2014", "Fiat Punto 1.4 2012",
          "Hyundai HB20 1.0 2013", "Toyota Etios 1.3 2013", "Chevrolet Agile 1.4 2012", "Volkswagen Voyage 1.0 2013", "Fiat Grand Siena 1.4 2013"
        ]
      },
      {
        title: "Até 60 mil",
        items: [
          "Hyundai HB20 1.0 2020", "Chevrolet Onix 1.0 2020", "Volkswagen Polo 1.0 2019", "Fiat Argo 1.0 2020", "Renault Kwid Zen 2022",
          "Ford Ka SE 2020", "Toyota Etios 1.3 2019", "Peugeot 208 Active 2021", "Citroën C3 Live 2022", "Nissan Versa 1.6 2019",
          "Volkswagen Gol 1.6 2021", "Chevrolet Prisma 1.4 2019", "Fiat Cronos 1.3 2020", "Renault Sandero 1.0 2021", "Honda Fit LX 2018",
          "Hyundai Creta Attitude 2018", "Jeep Renegade Sport 2017", "Toyota Corolla GLI 2016", "Volkswagen Virtus MSI 2019", "Nissan Kicks S 2018"
        ]
      },
      {
        title: "Até 90 mil",
        items: [
          "Chevrolet Tracker 2021", "Hyundai Creta 2020", "Volkswagen T-Cross 2020", "Honda HR-V 2019", "Jeep Renegade 2021",
          "Toyota Corolla 2018", "Nissan Kicks 2021", "Fiat Pulse 2022", "Volkswagen Virtus 2021", "Honda City 2021",
          "Chevrolet Onix Plus 2022", "Fiat Toro Freedom 2019", "Renault Duster Iconic 2021", "Peugeot 2008 Allure 2022", "Citroën C4 Cactus 2021",
          "Hyundai HB20S Platinum 2022", "Toyota Yaris Sedan 2022", "Volkswagen Nivus 2021", "Chevrolet Spin Premier 2021", "Jeep Compass Sport 2018"
        ]
      },
      {
        title: "Até 150 mil",
        items: [
          "Toyota Corolla Cross 2023", "Jeep Compass Longitude 2022", "Volkswagen Taos Comfortline 2022", "Honda HR-V Touring 2023", "Fiat Toro Volcano 2023",
          "Toyota Corolla XEi 2023", "Chevrolet Tracker Premier 2023", "Hyundai Creta Platinum 2023", "Nissan Kicks Exclusive 2023", "Renault Duster Iconic 2023",
          "Caoa Chery Tiggo 5X Pro 2023", "Mitsubishi Eclipse Cross 2021", "Peugeot 3008 Griffe 2020", "Jeep Renegade Trailhawk 2023", "Volkswagen Nivus Highline 2023",
          "Honda City Touring 2023", "Toyota Yaris XLS 2023", "Chevrolet Montana Premier 2023", "Ford Territory SEL 2021", "Fiat Fastback Limited 2023"
        ]
      },
      {
        title: "Até 250 mil",
        items: [
          "Toyota SW4 2021", "Jeep Commander 2023", "Ford Ranger XLT 2023", "Toyota Hilux SRX 2022", "Chevrolet S10 High Country 2023",
          "Mitsubishi L200 Triton 2023", "Volkswagen Amarok Highline 2022", "Caoa Chery Tiggo 8 Pro 2023", "GWM Haval H6 2023", "BYD Song Plus 2023",
          "Honda Civic Touring 2021", "Toyota Corolla Altis Hybrid 2023", "Jeep Compass Limited 2023", "Ford Territory Titanium 2023", "Kia Sportage EX 2022",
          "Hyundai Tucson GLS 2022", "Volvo XC40 T4 2020", "BMW X1 sDrive20i 2020", "Audi Q3 Prestige 2020", "Mercedes-Benz GLA 200 2020"
        ]
      },
      {
        title: "Até 500 mil",
        items: [
          "BMW X5 2021", "Porsche Macan 2020", "Mercedes-Benz GLE 2020", "Audi Q7 2021", "Volvo XC90 2021",
          "RAM 1500 2022", "Toyota SW4 Diamond 2023", "Ford Bronco Sport 2022", "Land Rover Discovery Sport 2021", "Jeep Grand Cherokee 2022",
          "BMW 330i M Sport 2023", "Mercedes-Benz C300 2022", "Audi A5 Sportback 2022", "Volvo XC60 Recharge 2022", "Porsche Cayenne 2019",
          "BMW X3 xDrive30e 2022", "Mercedes-Benz GLC 300 2022", "Audi Q5 Performance 2022", "Lexus NX 300h 2021", "BYD Tan EV 2023"
        ]
      }
    ]`;

const sourcesReal = `[
      { name: "Fenabrave", use: "Emplacamentos, rankings e veículos mais vendidos", frequency: "Mensal / automático" },
      { name: "SENATRAN", use: "Frota por estado, município e tipo de veículo", frequency: "Mensal / automático" },
      { name: "FIPE", use: "Preço médio de veículos por modelo, ano e versão", frequency: "Diário / automático" },
      { name: "Banco Central", use: "Crédito, financiamento e séries econômicas", frequency: "Mensal / automático" },
      { name: "B3 / SNG", use: "Indicadores ligados a financiamentos e gravames", frequency: "Mensal / automático" },
      { name: "ANFAVEA + IBGE", use: "Contexto econômico, produção e mercado nacional", frequency: "Mensal / automático" }
    ]`;

let app = read("src/App.tsx");

app = app.replace(/const sourceLinks:[\s\S]*?\};/, sourceLinksBlock);
app = app.replace(/const footerPages = \{[\s\S]*?\};\s*function toNumber/, footerPagesBlock + "\n\nfunction toNumber");
app = app.replace(/<p className="modal-eyebrow">[\s\S]*?<\/p>/, '<p className="modal-eyebrow">Informação institucional</p>');
app = app.replace(/Abrir fonte \?/g, "Abrir fonte");
app = app.replace(/Volume de carros nos\s+ltimos 13 meses\./g, "Volume de carros nos últimos 13 meses.");
app = app.replace(/Volume de motos nos\s+ltimos 13 meses\./g, "Volume de motos nos últimos 13 meses.");
app = app.replace(/Volume de pesados nos\s+ltimos 13 meses\./g, "Volume de pesados nos últimos 13 meses.");
app = app.replace(/Crédito automotivo nos últimos \$\{period\.toLowerCase\(\)\}\./g, "Crédito automotivo nos últimos 13 meses.");
app = app.replace(/<span className="external-pill">Abrir fonte.*?<\/span>/g, '<span className="external-pill">Abrir fonte</span>');

write("src/App.tsx", app);

let demo = read("functions/src/demoData.ts");

demo = demo.replace(/chartLabels:\s*\[[\s\S]*?\],/, `chartLabels: ${labels13},`);
demo = demo.replace(/chartSeries:\s*\{[\s\S]*?\},\s*fipeBands:/, `chartSeries: ${chartSeries13},\n    fipeBands:`);
demo = demo.replace(/fipeBands:\s*\[[\s\S]*?\],\s*states:/, `fipeBands: ${fipeBandsReal},\n    states:`);
demo = demo.replace(/sources:\s*\[[\s\S]*?\]\s*};/, `sources: ${sourcesReal}\n  };`);

write("functions/src/demoData.ts", demo);

let css = read("src/styles.css");

if (!css.includes("PENTE FINO GLOBAL")) {
  css += `
/* PENTE FINO GLOBAL */
html, body, #root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif !important;
  text-rendering: geometricPrecision;
}

button, input, textarea, select {
  font-family: inherit !important;
}

.modal-card,
.site-footer,
.card,
.header,
.rank-row,
.source-row,
.news-row,
.city-row,
.state-row {
  font-family: inherit !important;
}

.modal-eyebrow {
  color: #ef4444;
  font-weight: 900;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.source-link {
  cursor: pointer;
}

.source-link:hover {
  background: #eef2f7;
}
`;
}

write("src/styles.css", css);

console.log("OK - pente fino geral aplicado no site todo.");
