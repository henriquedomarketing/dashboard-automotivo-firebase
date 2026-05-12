const fs = require("fs");

const path = "src/App.tsx";
let app = fs.readFileSync(path, "utf8");

const footerPages = `const footerPages = {
  sobre: {
    title: "Sobre nos",
    text: [
      "O Dashboard Automotivo Brasileiro e um projeto criado por Henrique Ferreira, conhecido como @henriquedomarketing.",
      "O projeto nasceu para organizar, visualizar e facilitar a leitura de dados do mercado automotivo brasileiro em uma unica pagina.",
      "A proposta e reunir emplacamentos, transferencias, rankings, FIPE, cidades, estados, fontes oficiais e insights automaticos para ajudar lojistas, profissionais de marketing, vendedores, consultores e interessados no setor.",
      "O painel ainda esta em evolucao e sera aprimorado com novas fontes, automacoes e analises."
    ]
  },
  dados: {
    title: "Fontes e dados",
    text: [
      "Os dados exibidos no painel sao organizados a partir de fontes publicas, oficiais e bases estatisticas do setor automotivo.",
      "As principais referencias sao Fenabrave, SENATRAN, FIPE, Banco Central, B3, ANFAVEA e IBGE.",
      "Algumas informacoes podem ser atualizadas diariamente; outras dependem da publicacao mensal ou periodica das fontes oficiais.",
      "Sempre que possivel, o painel indica a origem e a periodicidade dos dados para manter transparencia."
    ]
  },
  termos: {
    title: "Termos de uso",
    text: [
      "As informacoes deste site sao disponibilizadas para fins informativos, estatisticos e educacionais.",
      "O dashboard nao substitui consultas oficiais, relatorios institucionais ou orientacao profissional especializada.",
      "Antes de tomar decisoes comerciais, financeiras ou juridicas, consulte sempre a fonte oficial dos dados.",
      "Os numeros podem variar conforme atualizacoes, metodologia de coleta e disponibilidade das bases oficiais."
    ]
  },
  privacidade: {
    title: "Politica de privacidade",
    text: [
      "Este site nao solicita dados pessoais sensiveis para navegacao no dashboard.",
      "Podemos utilizar servicos como Firebase, Google Analytics ou ferramentas similares para hospedagem, seguranca e metricas de uso.",
      "As estatisticas exibidas no painel nao identificam usuarios individuais.",
      "O objetivo e melhorar a experiencia, acompanhar desempenho e manter o site seguro."
    ]
  }
};`;

app = app.replace(/const footerPages = \{[\s\S]*?\};\s*function toNumber/, footerPages + "\n\nfunction toNumber");

app = app.replace(
  /<p className="modal-eyebrow">[\s\S]*?<\/p>/,
  '<p className="modal-eyebrow">Informacao institucional</p>'
);

app = app.replace(/<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.sobre\)\}>[\s\S]*?<\/button>/, '<button type="button" onClick={() => setActiveModal(footerPages.sobre)}>Sobre nos</button>');
app = app.replace(/<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.dados\)\}>[\s\S]*?<\/button>/, '<button type="button" onClick={() => setActiveModal(footerPages.dados)}>Fontes e dados</button>');
app = app.replace(/<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.termos\)\}>[\s\S]*?<\/button>/, '<button type="button" onClick={() => setActiveModal(footerPages.termos)}>Termos de uso</button>');
app = app.replace(/<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.privacidade\)\}>[\s\S]*?<\/button>/, '<button type="button" onClick={() => setActiveModal(footerPages.privacidade)}>Privacidade</button>');

app = app.replace(/\s*<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.robots\)\}>[\s\S]*?<\/button>/g, "");
app = app.replace(/\s*<button type="button" onClick=\{\(\) => setActiveModal\(footerPages\.sitemap\)\}>[\s\S]*?<\/button>/g, "");

app = app.replace(/�/g, "");

fs.writeFileSync(path, app, "utf8");

console.log("OK - Popups corrigidos, sem acentos problemáticos, e Robots/Sitemap removidos.");
