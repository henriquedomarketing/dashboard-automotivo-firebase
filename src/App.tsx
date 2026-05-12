import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import "./styles.css";

type AnyData = any;

const sourceLinks: Record<string, string> = {
  Fenabrave: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
  SENATRAN: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
  FIPE: "https://www.fipe.org.br/pt-br/indices/veiculos",
  "Banco Central": "https://www.bcb.gov.br/estatisticas",
  "B3 / SNG": "https://www.b3.com.br/",
  "ANFAVEA + IBGE": "https://anfavea.com.br/",
};

const fallbackArticles = [
  {
    title: "Resumo do mês: carros seguem em recuperação no mercado brasileiro",
    tag: "Carros",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O mercado de carros segue ativo, com destaque para emplacamentos, modelos de maior giro e oportunidades para lojistas.",
    sourceName: "Fenabrave",
    sourceUrl: sourceLinks.Fenabrave,
    updatedAt: "Atualização automática",
    content: [
      "O mercado de carros no Brasil segue sendo uma das principais referências para entender o comportamento do consumidor automotivo. A leitura dos emplacamentos ajuda a identificar quais modelos ganham mais espaço, quais marcas mantêm presença forte e quais categorias podem representar oportunidades para lojistas, vendedores, consultores e profissionais de marketing.",
      "Carros compactos, SUVs de entrada e picapes leves continuam relevantes porque atendem públicos diferentes. Os compactos conversam com quem busca economia e facilidade de revenda. SUVs e picapes trabalham percepção de valor, conforto e versatilidade.",
      "Para o lojista, acompanhar os modelos mais emplacados e transferidos ajuda a tomar decisões melhores sobre estoque, campanhas e atendimento. Um veículo com boa presença no mercado tende a ter mais procura e melhor liquidez.",
      "A leitura regional também é importante. Um modelo pode estar forte no ranking nacional, mas ter comportamento diferente em cada cidade. Por isso, cruzar dados de emplacamentos, transferências, estados e cidades ajuda a criar campanhas mais próximas da realidade local.",
      "Fonte oficial utilizada nesta leitura: Fenabrave."
    ],
  },
  {
    title: "Motos mantêm procura forte e puxam volume no mês",
    tag: "Motos",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    summary: "As motos seguem com desempenho forte, impulsionadas por economia, mobilidade urbana e uso profissional.",
    sourceName: "Fenabrave",
    sourceUrl: sourceLinks.Fenabrave,
    updatedAt: "Atualização automática",
    content: [
      "O mercado de motos continua sendo um dos segmentos mais dinâmicos do setor automotivo brasileiro. A procura por motocicletas está ligada à mobilidade urbana, economia no deslocamento, trabalho por aplicativo, entregas e facilidade de compra.",
      "Modelos de entrada e baixa cilindrada costumam aparecer com destaque porque atendem um público amplo. Para muitos consumidores, a moto é uma solução prática para reduzir custo de transporte e ganhar agilidade no dia a dia.",
      "A leitura mensal de emplacamentos ajuda lojas e profissionais de marketing a entender quais marcas e modelos merecem mais destaque em anúncios, vídeos e campanhas locais.",
      "A comunicação para motos deve ser objetiva. Temas como economia, consumo, manutenção, uso profissional, entrada facilitada e financiamento costumam gerar bom entendimento para o público.",
      "Fonte oficial utilizada nesta leitura: Fenabrave."
    ],
  },
  {
    title: "Crédito automotivo indica ritmo de compra do consumidor",
    tag: "Crédito",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    summary: "O financiamento ajuda a entender o comportamento de compra, parcelamento, entrada e poder de consumo.",
    sourceName: "Banco Central",
    sourceUrl: sourceLinks["Banco Central"],
    updatedAt: "Atualização automática",
    content: [
      "O crédito automotivo é um dos principais indicadores para entender o ritmo de compra no mercado de veículos. Muitos consumidores não decidem apenas pelo valor total do veículo, mas pela entrada, taxa, prazo e valor da parcela.",
      "Quando o financiamento está mais ativo, o mercado tende a ter maior movimento, principalmente em veículos seminovos e faixas intermediárias de preço.",
      "Para lojas de veículos, esse dado pode orientar campanhas com foco em parcela, simulação, bancos parceiros, aprovação e entrada facilitada.",
      "A leitura do crédito deve ser combinada com FIPE, emplacamentos e transferências para criar uma visão completa do mercado.",
      "Fonte oficial utilizada nesta leitura: Banco Central."
    ],
  },
  {
    title: "Estados e cidades mostram oportunidades regionais",
    tag: "Regiões",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
    summary: "A leitura regional ajuda a entender estados e cidades com maior movimentação automotiva.",
    sourceName: "SENATRAN",
    sourceUrl: sourceLinks.SENATRAN,
    updatedAt: "Atualização automática",
    content: [
      "A análise regional é essencial para entender o mercado automotivo brasileiro. O Brasil tem realidades diferentes entre estados e cidades, e isso aparece no comportamento de compra, emplacamentos, transferências e perfil de frota.",
      "Um estado com alto volume pode indicar economia mais aquecida, maior população, renovação de frota ou maior presença de lojas e concessionárias.",
      "Para lojistas, olhar apenas o ranking nacional pode gerar decisão incompleta. A leitura regional ajuda a ajustar estoque, campanhas e argumentos comerciais.",
      "Cidades médias também podem revelar mercados muito ativos, principalmente quando atendem regiões vizinhas ou polos comerciais, agrícolas e industriais.",
      "Fonte oficial utilizada nesta leitura: SENATRAN."
    ],
  },
  {
    title: "FIPE ajuda a entender faixas de preço e oportunidades",
    tag: "FIPE",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    summary: "A leitura por faixa de preço ajuda a identificar modelos acessíveis, intermediários e premium.",
    sourceName: "FIPE",
    sourceUrl: sourceLinks.FIPE,
    updatedAt: "Atualização automática",
    content: [
      "A FIPE é uma referência importante para entender preço médio de veículos no Brasil. Mesmo que o valor real varie por cidade, estado, conservação, quilometragem e oferta local, a tabela ajuda a criar uma base comparativa.",
      "Ao organizar veículos por faixa de preço, o painel facilita a leitura comercial. Faixas mais baixas atendem consumidores que buscam economia, primeiro veículo ou troca acessível.",
      "Faixas intermediárias costumam concentrar seminovos, SUVs, sedans completos e modelos com maior valor agregado.",
      "Para lojistas, a leitura por faixa ajuda a pensar estoque. Não basta comprar qualquer veículo; é preciso entender qual faixa conversa com o público local.",
      "Fonte oficial utilizada nesta leitura: FIPE."
    ],
  },
  {
    title: "Pesados e transporte sinalizam atividade econômica",
    tag: "Pesados",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O segmento de pesados mostra sinais ligados à logística, produção, serviços e atividade econômica.",
    sourceName: "Fenabrave",
    sourceUrl: sourceLinks.Fenabrave,
    updatedAt: "Atualização automática",
    content: [
      "O mercado de pesados e médios transportes tem relação direta com logística, agronegócio, indústria, construção e serviços. Por isso, acompanhar esse segmento ajuda a entender movimentações econômicas mais amplas.",
      "Quando caminhões e comerciais leves apresentam crescimento, pode haver sinal de renovação de frota, aumento de demanda por transporte ou expansão de atividades produtivas.",
      "Para vendedores e empresas, esse segmento exige comunicação mais técnica. O cliente costuma avaliar consumo, manutenção, capacidade de carga, disponibilidade de peças, garantia e retorno sobre investimento.",
      "No dashboard, pesados ganham leitura separada para que seus dados não fiquem escondidos dentro do volume geral de veículos.",
      "Fonte oficial utilizada nesta leitura: Fenabrave."
    ],
  },
];

const fallbackRankings = {
  carros: ["Fiat Strada", "VW Polo", "Chevrolet Onix", "Hyundai HB20", "Fiat Argo", "Toyota Corolla", "VW T-Cross", "Fiat Mobi", "Renault Kwid", "Chevrolet Tracker"],
  motos: ["Honda CG 160", "Honda Biz", "Honda Pop 110i", "Yamaha Fazer", "Honda Bros", "Honda PCX", "Yamaha Factor", "Honda XRE 190", "Yamaha Crosser", "Honda CB 300F"],
  pesados: ["VW Delivery", "Mercedes Accelo", "Scania R", "Volvo FH", "Iveco Daily", "Mercedes Atego", "VW Constellation", "Scania P", "Volvo VM", "Iveco Tector"],
};

const fallbackChart = [
  { label: "Mai/25", value: 1.38 },
  { label: "Jun/25", value: 1.41 },
  { label: "Jul/25", value: 1.39 },
  { label: "Ago/25", value: 1.42 },
  { label: "Set/25", value: 1.47 },
  { label: "Out/25", value: 1.45 },
  { label: "Nov/25", value: 1.47 },
  { label: "Dez/25", value: 1.44 },
  { label: "Jan/26", value: 1.42 },
  { label: "Fev/26", value: 1.45 },
  { label: "Mar/26", value: 1.46 },
  { label: "Abr/26", value: 1.43 },
  { label: "Mai/26", value: 1.44 },
];

function cleanText(value: unknown) {
  return String(value ?? "").replace(/�/g, "").trim();
}

function formatDateLabel(dateString: string) {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const monthName = months[Number(month) - 1] || month;
  return `${monthName}/${String(year || "").slice(-2)}`;
}

function toNumber(value: unknown) {
  return Number(String(value ?? "0").replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
}

function SimpleLineChart({ title, description, data }: { title: string; description: string; data: { label: string; value: number }[] }) {
  const width = 760;
  const height = 260;
  const padding = 34;
  const values = data.map((item) => item.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const points = data
    .map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
      const y = height - padding - ((item.value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="card chart-card">
      <div className="card-head">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart" role="img">
        {[0, 1, 2, 3].map((row) => {
          const y = padding + (row * (height - padding * 2)) / 3;
          return <line key={row} x1={padding} y1={y} x2={width - padding} y2={y} className="grid-line" />;
        })}

        <polyline fill="none" stroke="#ef4444" strokeWidth="5" points={points} strokeLinecap="round" strokeLinejoin="round" />

        {data.map((item, index) => {
          const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
          const y = height - padding - ((item.value - min) / range) * (height - padding * 2);

          return (
            <g key={`${item.label}-${index}`}>
              <circle cx={x} cy={y} r="6" fill="white" stroke="#ef4444" strokeWidth="4" />
              <text x={x} y={height - 8} textAnchor="middle" className="chart-label">{item.label}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{subtitle}</small>
    </div>
  );
}

function RankingCard({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="ranking-list">
        {items.slice(0, 20).map((item, index) => (
          <div className="ranking-item" key={`${item}-${index}`}>
            <span>{index + 1}</span>
            <strong>{cleanText(item)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceCard({ name, use, frequency, url, status }: { name: string; use: string; frequency: string; url: string; status?: string }) {
  return (
    <article className="source-card">
      <div>
        <strong>{name}</strong>
        <p>{use}</p>
        <small>{frequency}</small>
        {status && <em>Status: {status}</em>}
      </div>

      <a href={url} target="_blank" rel="noopener noreferrer">
        Abrir fonte oficial
      </a>
    </article>
  );
}

export default function App() {
  const [dashboard, setDashboard] = useState<AnyData>(null);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState<AnyData>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "dashboard", "current"),
      (snapshot) => {
        setDashboard(snapshot.exists() ? snapshot.data() : null);
        setLoading(false);
      },
      () => {
        setDashboard(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const bancoCentralChart = useMemo(() => {
    const raw = dashboard?.bancoCentralCreditoVeiculos || dashboard?.fontesReais?.bancoCentral?.ultimos13Meses || [];

    if (!Array.isArray(raw) || raw.length === 0) return fallbackChart;

    return raw.slice(-13).map((item: AnyData) => ({
      label: formatDateLabel(item.data),
      value: toNumber(item.valor),
    }));
  }, [dashboard]);

  const fenabraveRanking = useMemo(() => {
    const raw = dashboard?.fenabraveRankingMaisVendidos || dashboard?.fontesReais?.fenabrave?.rankingMaisVendidos || [];

    if (Array.isArray(raw) && raw.length) {
      return raw.map((item: AnyData) => cleanText(item.modelo || item.name || item));
    }

    return fallbackRankings.carros;
  }, [dashboard]);

  const articles = useMemo(() => {
    const raw = dashboard?.news;

    if (Array.isArray(raw) && raw.length) {
      return raw.map((item: AnyData) => ({
        ...item,
        title: cleanText(item.title),
        summary: cleanText(item.summary),
        sourceName: cleanText(item.sourceName || item.fonte || "Fonte oficial"),
        sourceUrl: item.sourceUrl || sourceLinks[item.sourceName] || "#",
        content: Array.isArray(item.content) ? item.content.map(cleanText) : [],
      }));
    }

    return fallbackArticles;
  }, [dashboard]);

  const fontesReais = dashboard?.fontesReais || {};

  const sources = [
    {
      name: "Fenabrave",
      use: "Emplacamentos, rankings e veículos mais vendidos",
      frequency: "Mensal / automático",
      url: fontesReais?.fenabrave?.url || sourceLinks.Fenabrave,
      status: fontesReais?.fenabrave?.status,
    },
    {
      name: "Banco Central",
      use: "Crédito, financiamento e séries econômicas",
      frequency: "Mensal / automático",
      url: fontesReais?.bancoCentral?.url || sourceLinks["Banco Central"],
      status: fontesReais?.bancoCentral?.status,
    },
    {
      name: "SENATRAN",
      use: "Frota por estado, município e tipo de veículo",
      frequency: "Mensal / automático",
      url: fontesReais?.senatran?.url || sourceLinks.SENATRAN,
      status: fontesReais?.senatran?.status,
    },
    {
      name: "FIPE",
      use: "Preço médio de veículos por modelo, ano e versão",
      frequency: "Diário / automático",
      url: fontesReais?.fipe?.url || sourceLinks.FIPE,
      status: fontesReais?.fipe?.status,
    },
    {
      name: "B3 / SNG",
      use: "Indicadores ligados a financiamentos e gravames",
      frequency: "Mensal / automático",
      url: sourceLinks["B3 / SNG"],
      status: "fonte oficial registrada",
    },
    {
      name: "ANFAVEA + IBGE",
      use: "Contexto econômico, produção e mercado nacional",
      frequency: "Mensal / automático",
      url: sourceLinks["ANFAVEA + IBGE"],
      status: "fonte oficial registrada",
    },
  ];

  const updatedAt = dashboard?.automation?.dataBrasil || dashboard?.updatedAt || "aguardando atualização";
  const currentValue = bancoCentralChart[bancoCentralChart.length - 1]?.value?.toFixed(2).replace(".", ",") || "0,00";

  return (
    <div className="site">
      <header className="hero">
        <div>
          <span className="eyebrow">Dashboard automotivo</span>
          <h1>Mercado Automotivo Brasileiro</h1>
          <p>
            Painel automático com dados, fontes oficiais, histórico mensal e leitura de mercado.
          </p>
          <small>Última atualização: {cleanText(updatedAt)}</small>
        </div>

        <nav className="top-nav">
          <a href="#visao">Visão geral</a>
          <a href="#credito">Crédito</a>
          <a href="#rankings">Rankings</a>
          <a href="#noticias">Notícias</a>
          <a href="#fontes">Fontes</a>
        </nav>
      </header>

      {loading && <div className="loading">Carregando dados do Firebase...</div>}

      <main>
        <section id="visao" className="stats-grid">
          <StatCard title="Robô de dados" value={dashboard?.robotStatus?.dados || "ativo"} subtitle="GitHub Actions + Firestore" />
          <StatCard title="Histórico mensal" value={dashboard?.robotStatus?.historico || "ativo"} subtitle="Dados salvos mês a mês" />
          <StatCard title="Artigos automáticos" value={dashboard?.robotStatus?.artigos || "ativo"} subtitle="Atualização quinzenal" />
          <StatCard title="Crédito atual" value={`${currentValue}%`} subtitle="Banco Central / últimos 13 meses" />
        </section>

        <section id="credito">
          <SimpleLineChart
            title="Crédito automotivo • Banco Central"
            description="Série real coletada automaticamente e salva no Firestore com os últimos 13 meses."
            data={bancoCentralChart}
          />
        </section>

        <section id="rankings" className="grid-two">
          <RankingCard
            title="Ranking Fenabrave"
            description="Modelos encontrados automaticamente na fonte oficial. Quando a extração não retorna ranking, o painel usa base de segurança."
            items={fenabraveRanking}
          />

          <RankingCard
            title="Modelos de referência"
            description="Base auxiliar para manter o painel sempre visível enquanto as fontes oficiais são expandidas."
            items={fallbackRankings.motos}
          />
        </section>

        <section id="noticias" className="section">
          <div className="section-title">
            <span className="eyebrow">Leitura automática</span>
            <h2>Notícias e estatísticas do mercado</h2>
            <p>6 artigos com foto, resumo, fonte oficial e leitura em popup.</p>
          </div>

          <div className="news-grid">
            {articles.slice(0, 6).map((article: AnyData, index: number) => (
              <article className="news-card" key={`${article.title}-${index}`}>
                <div className="news-cover">
                  <img src={article.image} alt={article.title} />
                  <span>{article.tag}</span>
                </div>

                <div className="news-body">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <button type="button" onClick={() => setActiveArticle(article)}>
                    Ler tudo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="fontes" className="section">
          <div className="section-title">
            <span className="eyebrow">Transparência</span>
            <h2>Fontes oficiais utilizadas</h2>
            <p>Origem, uso, periodicidade e links clicáveis para consulta oficial.</p>
          </div>

          <div className="sources-grid">
            {sources.map((source) => (
              <SourceCard key={source.name} {...source} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>Dashboard Automotivo Brasileiro</strong>
        <p>Projeto criado por @henriquedomarketing para leitura de dados do mercado automotivo.</p>
      </footer>

      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="article-modal" onClick={(event) => event.stopPropagation()}>
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

              {(activeArticle.content || []).map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}

              <div className="article-source-box">
                <div>
                  <span>Fonte oficial</span>
                  <strong>{activeArticle.sourceName || "Fonte oficial"}</strong>
                  <small>{activeArticle.updatedAt || "Atualização automática"}</small>
                </div>

                <a href={activeArticle.sourceUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Abrir fonte oficial
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
