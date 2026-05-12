const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
}

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

const footerPages = `const footerPages = {
  sobre: {
    title: "Sobre nós",
    text: [
      "O Dashboard Automotivo Brasileiro é um projeto criado por Henrique Ferreira, conhecido como @henriquedomarketing.",
      "O projeto nasceu para organizar, visualizar e facilitar a leitura de dados do mercado automotivo brasileiro em uma única página.",
      "A proposta é reunir emplacamentos, transferências, rankings, FIPE, cidades, estados, fontes oficiais e insights automáticos para ajudar lojistas, profissionais de marketing, vendedores, consultores e interessados no setor.",
      "O painel ainda está em evolução e será aprimorado com novas fontes, automações e análises."
    ]
  },
  dados: {
    title: "Fontes e dados",
    text: [
      "Os dados exibidos no painel são organizados a partir de fontes públicas, oficiais e bases estatísticas do setor automotivo.",
      "As principais referências são Fenabrave, SENATRAN, FIPE, Banco Central, B3, ANFAVEA e IBGE.",
      "Algumas informações podem ser atualizadas diariamente; outras dependem da publicação mensal ou periódica das fontes oficiais.",
      "Sempre que possível, o painel indica a origem e a periodicidade dos dados para manter transparência."
    ]
  },
  termos: {
    title: "Termos de uso",
    text: [
      "As informações deste site são disponibilizadas para fins informativos, estatísticos e educacionais.",
      "O dashboard não substitui consultas oficiais, relatórios institucionais ou orientação profissional especializada.",
      "Antes de tomar decisões comerciais, financeiras ou jurídicas, consulte sempre a fonte oficial dos dados.",
      "Os números podem variar conforme atualizações, metodologia de coleta e disponibilidade das bases oficiais."
    ]
  },
  privacidade: {
    title: "Política de privacidade",
    text: [
      "Este site não solicita dados pessoais sensíveis para navegação no dashboard.",
      "Podemos utilizar serviços como Firebase, Google Analytics ou ferramentas similares para hospedagem, segurança e métricas de uso.",
      "As estatísticas exibidas no painel não identificam usuários individuais.",
      "O objetivo é melhorar a experiência, acompanhar desempenho e manter o site seguro."
    ]
  },
  robots: {
    title: "Robots.txt",
    text: [
      "O arquivo robots.txt informa aos mecanismos de busca quais páginas podem ser rastreadas.",
      "Neste projeto, o site está configurado para permitir a indexação das páginas públicas.",
      "Isso ajuda mecanismos como o Google a entenderem melhor a estrutura do site."
    ]
  },
  sitemap: {
    title: "Sitemap",
    text: [
      "O sitemap ajuda o Google e outros buscadores a encontrarem as páginas principais do site.",
      "Ele melhora a organização para SEO e facilita o rastreamento das páginas institucionais.",
      "Com isso, o site fica mais preparado para ser lido e indexado pelos mecanismos de busca."
    ]
  }
};`;

let appPath = "src/App.tsx";
let app = read(appPath);

app = app.replace(/const footerPages = \{[\s\S]*?\};\s*function toNumber/, footerPages + "\n\nfunction toNumber");

if (!app.includes("const footerPages")) {
  app = app.replace(/function toNumber/, footerPages + "\n\nfunction toNumber");
}

app = app.replace(/const chartLabels = \[[\s\S]*?\];/, `const chartLabels = ${labels13};`);

app = app.replace(/const chartSeries = \{[\s\S]*?\};\s*const fipeBands/, `const chartSeries = ${chartSeries13};\n\nconst fipeBands`);

app = app.replace(/Inform[a-zA-Z?ãçõíóúéêÁÉÍÓÚãõç\s]+institucional/g, "Informação institucional");

app = app.replace(/Fechar\s*[?×]?/g, "Fechar");

app = app.replace(/Volume de carros[^"`]*\$\{period\.toLowerCase\(\)\}\.?/g, "Volume de carros nos últimos 13 meses.");
app = app.replace(/Volume de motos[^"`]*\$\{period\.toLowerCase\(\)\}\.?/g, "Volume de motos nos últimos 13 meses.");
app = app.replace(/Volume de pesados[^"`]*\$\{period\.toLowerCase\(\)\}\.?/g, "Volume de pesados nos últimos 13 meses.");
app = app.replace(/Crédito automotivo[^"`]*\$\{period\.toLowerCase\(\)\}\.?/g, "Crédito automotivo nos últimos 13 meses.");

write(appPath, app);

let demoPath = "functions/src/demoData.ts";
let demo = read(demoPath);

demo = demo.replace(/chartLabels:\s*\[[\s\S]*?\],/, `chartLabels: ${labels13},`);

demo = demo.replace(/chartSeries:\s*\{[\s\S]*?\},\s*fipeBands:/, `chartSeries: ${chartSeries13},\n    fipeBands:`);

write(demoPath, demo);

console.log("OK - Pente fino aplicado: textos corrigidos e gráficos atualizados para 13 meses.");
