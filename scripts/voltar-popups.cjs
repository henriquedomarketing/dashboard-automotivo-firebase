const fs = require("fs");

const path = "src/App.tsx";
let app = fs.readFileSync(path, "utf8");

const modalPages = `
const modalPages = {
  sobre: {
    title: "Sobre nos",
    text: [
      "O Dashboard Automotivo Brasileiro e um projeto criado por Henrique Ferreira, conhecido como @henriquedomarketing.",
      "O projeto nasceu para organizar, visualizar e facilitar a leitura de dados do mercado automotivo brasileiro em uma unica pagina.",
      "A proposta e reunir emplacamentos, transferencias, rankings, FIPE, cidades, estados, fontes oficiais e insights automaticos para ajudar profissionais do setor.",
      "O painel esta em evolucao e sera aprimorado com novas fontes, automacoes e analises."
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
    title: "Privacidade",
    text: [
      "Este site nao solicita dados pessoais sensiveis para navegacao no dashboard.",
      "Podemos utilizar Firebase, Google Analytics ou ferramentas similares para hospedagem, seguranca e metricas de uso.",
      "As estatisticas exibidas no painel nao identificam usuarios individuais.",
      "O objetivo e melhorar a experiencia, acompanhar desempenho e manter o site seguro."
    ]
  }
};
`;

if (!app.includes("const modalPages")) {
  if (app.includes("function clean")) {
    app = app.replace("function clean", modalPages + "\nfunction clean");
  } else if (app.includes("function toNumber")) {
    app = app.replace("function toNumber", modalPages + "\nfunction toNumber");
  }
}

if (!app.includes("activeModal")) {
  app = app.replace(
    /const \[selectedRegionCategory, setSelectedRegionCategory\] = useState\([^;]+;/,
    (match) => match + '\n  const [activeModal, setActiveModal] = useState(null);'
  );
}

const newFooter = `<footer className="site-footer">
            <div className="footer-brand">
              <strong>Dashboard Automotivo Brasileiro</strong>
              <p>Projeto criado por @henriquedomarketing para leitura de dados do mercado automotivo.</p>
            </div>

            <nav className="footer-links">
              <button type="button" onClick={() => setActiveModal(modalPages.sobre)}>Sobre nos</button>
              <button type="button" onClick={() => setActiveModal(modalPages.dados)}>Fontes e dados</button>
              <button type="button" onClick={() => setActiveModal(modalPages.termos)}>Termos de uso</button>
              <button type="button" onClick={() => setActiveModal(modalPages.privacidade)}>Privacidade</button>
            </nav>
          </footer>`;

if (app.includes('<footer className="site-footer">')) {
  app = app.replace(/<footer className="site-footer">[\s\S]*?<\/footer>/, newFooter);
} else {
  app = app.replace("</main>", newFooter + "\n        </main>");
}

const modalBlock = `
          {activeModal && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="modal-card">
                <button className="modal-close" type="button" onClick={() => setActiveModal(null)}>
                  Fechar
                </button>

                <p className="modal-eyebrow">Informacao institucional</p>
                <h2>{activeModal.title}</h2>

                <div className="modal-content">
                  {activeModal.text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

`;

if (!app.includes("modal-overlay")) {
  app = app.replace("</main>", modalBlock + "        </main>");
}

fs.writeFileSync(path, app, "utf8");

console.log("OK - Popups voltaram no rodape.");
