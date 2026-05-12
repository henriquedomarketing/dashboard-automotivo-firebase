const fs = require("fs");

const path = "src/App.tsx";
let app = fs.readFileSync(path, "utf8");

const newsBlock = `const news = [
  {
    title: "Resumo do mes: carros seguem em recuperacao",
    tag: "Carros",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O mercado de carros manteve ritmo positivo no periodo, com avanco nos emplacamentos e boa procura nos modelos de maior giro.",
    content: [
      "O mes mostra um mercado de carros ainda aquecido, com destaque para modelos compactos, SUVs de entrada e picapes leves.",
      "A leitura do painel indica que marcas com maior volume continuam concentrando boa parte da demanda, principalmente em veiculos de uso urbano e modelos com maior facilidade de financiamento.",
      "Para lojistas, o principal ponto de atencao e acompanhar quais modelos giram mais rapido e ajustar estoque, comunicacao e campanhas conforme a procura regional."
    ]
  },
  {
    title: "Motos puxam volume e mantem procura forte",
    tag: "Motos",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    summary: "As motos seguem com desempenho forte, impulsionadas por economia, mobilidade e alta procura por modelos de baixa cilindrada.",
    content: [
      "O segmento de motos continua sendo um dos principais motores de crescimento do mercado automotivo brasileiro.",
      "Modelos de entrada, motos de trabalho e opcoes economicas aparecem com grande forca, especialmente em cidades medias e regioes com uso intenso para deslocamento e entrega.",
      "A leitura semanal ajuda a identificar mudancas na procura e oportunidades para campanhas especificas por categoria, marca e cidade."
    ]
  },
  {
    title: "Credito automotivo indica mercado mais ativo",
    tag: "Credito",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    summary: "O financiamento segue como fator importante para movimentar vendas, principalmente em faixas de preco intermediarias.",
    content: [
      "O credito automotivo continua sendo um indicador essencial para entender o ritmo de compra do consumidor.",
      "Quando o volume financiado avanca, geralmente o mercado mostra maior disposicao de compra, principalmente para usados, seminovos e veiculos de maior ticket.",
      "Para lojas, acompanhar esse indicador ajuda a planejar ofertas, chamadas comerciais e campanhas com foco em parcelas, entrada facilitada e aprovacao."
    ]
  },
  {
    title: "Estados em destaque mostram forca regional",
    tag: "Regioes",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
    summary: "A comparacao por estados ajuda a entender onde o mercado esta mais aquecido e quais regioes concentram maior volume.",
    content: [
      "A leitura regional mostra que alguns estados concentram maior volume de emplacamentos e transferencias.",
      "Esse comportamento pode indicar maior poder de consumo, maior oferta de veiculos, maior presenca de lojistas ou ciclos economicos locais mais fortes.",
      "No painel, clicar em um estado permite visualizar cidades em destaque e entender melhor onde estao as oportunidades comerciais."
    ]
  },
  {
    title: "FIPE ajuda a entender faixas de oportunidade",
    tag: "FIPE",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    summary: "Os rankings por faixa de preco ajudam a visualizar modelos acessiveis, intermediarios e premium com maior potencial comercial.",
    content: [
      "A leitura por faixa de preco facilita a identificacao de oportunidades para diferentes perfis de comprador.",
      "Veiculos ate 30, 60 e 90 mil tendem a atender o publico de entrada e troca de usado, enquanto faixas maiores ajudam a observar SUVs, picapes e modelos premium.",
      "Com atualizacao recorrente, essa area pode servir como apoio para campanhas, conteudos de oportunidade e comparativos de compra."
    ]
  },
  {
    title: "Pesados e transporte revelam demanda logistica",
    tag: "Pesados",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O segmento de pesados e medios transportes mostra sinais importantes sobre logistica, producao e atividade economica.",
    content: [
      "Caminhoes, comerciais leves e veiculos de transporte ajudam a entender a movimentacao economica do pais.",
      "Quando esse segmento cresce, pode haver reflexo de demanda logistica, distribuicao, agronegocio, industria e servicos.",
      "No dashboard, essa categoria ganha uma leitura propria para nao ficar escondida dentro dos dados gerais de automoveis."
    ]
  }
];`;

app = app.replace(/const news = \[[\s\S]*?\];/, newsBlock);

if (!app.includes("activeArticle")) {
  app = app.replace(
    /const \[selectedRegionCategory, setSelectedRegionCategory\] = useState\([^;]+;/,
    (match) => match + "\n  const [activeArticle, setActiveArticle] = useState(null);"
  );
}

const blogSection = `<section id="noticias">
            <SectionTitle eyebrow="Leitura automatica" title="Noticias e estatisticas do mercado" description="6 artigos semanais gerados a partir dos dados mais recentes do painel." icon="news" />

            <div className="news-blog-grid">
              {(news || []).map((item) => (
                <article className="news-card" key={item.title}>
                  <div className="news-cover">
                    <img src={item.image} alt={item.title} />
                    <span>{item.tag}</span>
                  </div>

                  <div className="news-body">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <button type="button" onClick={() => setActiveArticle(item)}>
                      Ler tudo
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {activeArticle && (
            <div className="article-modal-overlay">
              <div className="article-modal">
                <div className="article-modal-cover">
                  <img src={activeArticle.image} alt={activeArticle.title} />
                  <button type="button" onClick={() => setActiveArticle(null)}>
                    Fechar
                  </button>
                  <span>{activeArticle.tag}</span>
                  <h2>{activeArticle.title}</h2>
                </div>

                <div className="article-modal-content">
                  <strong>{activeArticle.summary}</strong>
                  {activeArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}`;

app = app.replace(/<section id="noticias">[\s\S]*?<\/section>/, blogSection);

fs.writeFileSync(path, app, "utf8");

console.log("OK - Noticias em estilo blog aplicadas.");
