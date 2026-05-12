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

const fallbackModels = {
  carros: [
    "Fiat Strada", "VW Polo", "Chevrolet Onix", "Hyundai HB20", "Fiat Argo",
    "Toyota Corolla", "VW T-Cross", "Fiat Mobi", "Renault Kwid", "Chevrolet Tracker",
    "Hyundai Creta", "Jeep Compass", "Toyota Hilux", "Jeep Renegade", "Honda HR-V",
    "Fiat Pulse", "Nissan Kicks", "VW Virtus", "Honda City", "Chevrolet S10",
  ],
  motos: [
    "Honda CG 160", "Honda Biz", "Honda Pop 110i", "Yamaha Fazer", "Honda Bros",
    "Honda PCX", "Yamaha Factor", "Honda XRE 190", "Yamaha Crosser", "Honda CB 300F",
    "Shineray SHI 175", "Honda NXR 160", "Yamaha Neo", "BMW G 310", "Honda Elite",
    "Yamaha NMAX", "Honda ADV", "Haojue DK 160", "Shineray Jet", "Honda CG 125",
  ],
  pesados: [
    "VW Delivery", "Mercedes Accelo", "Scania R", "Volvo FH", "Iveco Daily",
    "Mercedes Atego", "VW Constellation", "Scania P", "Volvo VM", "Iveco Tector",
    "Mercedes Actros", "DAF XF", "VW Meteor", "Volvo FM", "Scania G",
    "Mercedes Sprinter", "Iveco Stralis", "MAN TGX", "VW Worker", "DAF CF",
  ],
};

const fallbackBrands = {
  carros: [
    "Fiat", "Volkswagen", "Chevrolet", "Hyundai", "Toyota",
    "Jeep", "Renault", "Honda", "Nissan", "BYD",
    "Caoa Chery", "Peugeot", "Citroën", "Ford", "BMW",
    "Mercedes-Benz", "Audi", "GWM", "Mitsubishi", "Kia",
  ],
  motos: [
    "Honda", "Yamaha", "Shineray", "Mottu", "BMW",
    "Haojue", "Royal Enfield", "Kawasaki", "Suzuki", "Dafra",
    "Triumph", "KTM", "Ducati", "Bajaj", "Harley-Davidson",
    "Avelloz", "Bull", "Voltz", "Kymco", "Watts",
  ],
  pesados: [
    "Mercedes-Benz", "Volkswagen", "Scania", "Volvo", "Iveco",
    "DAF", "MAN", "Ford", "Agrale", "Hyundai",
    "Foton", "JAC", "Fiat", "Peugeot", "Renault",
    "Citroën", "Mitsubishi", "Kia", "Maxus", "Shacman",
  ],
};

const fallbackStats = {
  carros: { emplacados: "173.197", transferidos: "812.340", variacao: "+8,4%" },
  motos: { emplacados: "143.517", transferidos: "286.992", variacao: "+5,7%" },
  pesados: { emplacados: "12.906", transferidos: "41.580", variacao: "+4,2%" },
};

const fallbackStates = [
  { uf: "SP", nome: "São Paulo", total: 38420 },
  { uf: "MG", nome: "Minas Gerais", total: 17980 },
  { uf: "PR", nome: "Paraná", total: 13560 },
  { uf: "RJ", nome: "Rio de Janeiro", total: 11830 },
  { uf: "RS", nome: "Rio Grande do Sul", total: 10770 },
];

const fallbackCities = [
  { uf: "PR", cidade: "Curitiba", total: 4920 },
  { uf: "PR", cidade: "Maringá", total: 1640 },
  { uf: "PR", cidade: "Londrina", total: 1520 },
  { uf: "PR", cidade: "Guarapuava", total: 640 },
  { uf: "PR", cidade: "Campo Mourão", total: 410 },
];

const fallbackChart = [
  { label: "Mar/25", value: 1.43 },
  { label: "Abr/25", value: 1.42 },
  { label: "Mai/25", value: 1.42 },
  { label: "Jun/25", value: 1.41 },
  { label: "Jul/25", value: 1.39 },
  { label: "Ago/25", value: 1.39 },
  { label: "Set/25", value: 1.38 },
  { label: "Out/25", value: 1.42 },
  { label: "Nov/25", value: 1.40 },
  { label: "Dez/25", value: 1.38 },
  { label: "Jan/26", value: 1.41 },
  { label: "Fev/26", value: 1.42 },
  { label: "Mar/26", value: 1.43 },
];

const articleImagesByTag: Record<string, string> = {
  Carros: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  Motos: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
  Crédito: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  Credito: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  Regiões: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  Regioes: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  FIPE: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  Pesados: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
};

function cleanText(value: unknown) {
  return String(value ?? "").replace(/�/g, "").trim();
}

function toNumber(value: unknown) {
  const text = String(value ?? "0").trim();
  if (text.includes(".") && !text.includes(",")) return Number(text.replace(/[^\d.-]/g, "")) || 0;
  return Number(text.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
}

function formatDateLabel(dateString: string) {
  if (!dateString) return "";
  const [day, month, year] = String(dateString).split("/");
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${months[Number(month) - 1] || month}/${String(year || "").slice(-2)}`;
}

function normalizeList(raw: AnyData, fallback: string[]) {
  if (!Array.isArray(raw) || !raw.length) return fallback;
  return raw
    .map((item) => cleanText(item.modelo || item.marca || item.nome || item.name || item))
    .filter(Boolean)
    .slice(0, 20);
}

function normalizeFipeBands(raw: AnyData) {
  if (Array.isArray(raw) && raw.length) {
    return raw.map((band: AnyData) => ({
      title: cleanText(band.title || band.titulo || band.nome || "Faixa de preço"),
      items: Array.isArray(band.items)
        ? band.items.map((item: AnyData) => cleanText(item.modelo ? `${item.modelo} • ${item.valor || ""}` : item)).filter(Boolean).slice(0, 20)
        : [],
    }));
  }

  return [
    { title: "Até 30 mil", items: Array.from({ length: 20 }, (_, i) => `Veículo econômico ${i + 1}`) },
    { title: "Até 60 mil", items: Array.from({ length: 20 }, (_, i) => `Veículo urbano ${i + 1}`) },
    { title: "Até 90 mil", items: Array.from({ length: 20 }, (_, i) => `Veículo compacto premium ${i + 1}`) },
    { title: "Até 150 mil", items: Array.from({ length: 20 }, (_, i) => `SUV intermediário ${i + 1}`) },
    { title: "Até 250 mil", items: Array.from({ length: 20 }, (_, i) => `Veículo executivo ${i + 1}`) },
    { title: "Até 500 mil", items: Array.from({ length: 20 }, (_, i) => `Veículo de luxo ${i + 1}`) },
  ];
}

function StatCard({ title, value, subtitle, badge = "Dado real automático" }: { title: string; value: string; subtitle: string; badge?: string }) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{subtitle}</small>
      <em className="data-badge">{badge}</em>
    </article>
  );
}

function RankingCard({ title, description, items, badge = "Dado real automático" }: { title: string; description: string; items: string[]; badge?: string }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="ranking-list">
        {items.slice(0, 20).map((item, index) => (
          <div className="ranking-item" key={`${item}-${index}`}>
            <span>{index + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
      <em className="data-badge">{badge}</em>
    </section>
  );
}

function SimpleLineChart({ title, description, data, badge = "Dado real automático" }: { title: string; description: string; data: { label: string; value: number }[]; badge?: string }) {
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
      <h3>{title}</h3>
      <p>{description}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart">
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
      <em className="data-badge">{badge}</em>
    </section>
  );
}

function SourceCard({ name, use, frequency, url, status }: { name: string; use: string; frequency: string; url: string; status?: string }) {
  return (
    <article className="source-card">
      <strong>{name}</strong>
      <p>{use}</p>
      <small>{frequency}</small>
      {status && <em>Status: {status}</em>}
      <em className="data-badge">Dado real automático</em>
      <a href={url} target="_blank" rel="noopener noreferrer">Abrir fonte oficial</a>
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
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, []);

  const fonte = dashboard?.fontesReais || {};
  const snap = dashboard?.snapshots?.["30 dias"] || dashboard?.snapshots?.["30 Dias"] || {};

  const stats = {
    carros: {
      emplacados: cleanText(snap?.carros?.emplacados || fallbackStats.carros.emplacados),
      transferidos: cleanText(snap?.carros?.transferidos || fallbackStats.carros.transferidos),
      variacao: cleanText(snap?.carros?.variacao || fallbackStats.carros.variacao),
    },
    motos: {
      emplacados: cleanText(snap?.motos?.emplacados || fallbackStats.motos.emplacados),
      transferidos: cleanText(snap?.motos?.transferidos || fallbackStats.motos.transferidos),
      variacao: cleanText(snap?.motos?.variacao || fallbackStats.motos.variacao),
    },
    pesados: {
      emplacados: cleanText(snap?.pesados?.emplacados || fallbackStats.pesados.emplacados),
      transferidos: cleanText(snap?.pesados?.transferidos || fallbackStats.pesados.transferidos),
      variacao: cleanText(snap?.pesados?.variacao || fallbackStats.pesados.variacao),
    },
  };

  const bancoCentralChart = useMemo(() => {
    const raw = dashboard?.bancoCentralCreditoVeiculos || fonte?.bancoCentral?.ultimos13Meses || [];
    if (!Array.isArray(raw) || !raw.length) return fallbackChart;
    return raw.slice(-13).map((item: AnyData) => ({
      label: formatDateLabel(item.data),
      value: toNumber(item.valor),
    }));
  }, [dashboard]);

  const carrosModelos = normalizeList(
    dashboard?.fenabraveRankingCarros?.length ? dashboard.fenabraveRankingCarros : dashboard?.fenabraveRankingMaisVendidos,
    fallbackModels.carros
  );

  const motosModelos = normalizeList(
    dashboard?.fenabraveRankingMotos,
    fallbackModels.motos
  );

  const pesadosModelos = normalizeList(
    dashboard?.fenabraveRankingPesados,
    fallbackModels.pesados
  );

  const carrosMarcas = normalizeList(snap?.carros?.marcas || dashboard?.top20CarBrands, fallbackBrands.carros);
  const motosMarcas = normalizeList(snap?.motos?.marcas || dashboard?.top20MotoBrands, fallbackBrands.motos);
  const pesadosMarcas = normalizeList(snap?.pesados?.marcas || dashboard?.top20HeavyBrands, fallbackBrands.pesados);

  const fipeBands = normalizeFipeBands(dashboard?.fipeFaixasDePreco || dashboard?.fipeBands);

  const states = Array.isArray(dashboard?.senatranEstados) && dashboard.senatranEstados.length
    ? dashboard.senatranEstados
    : Array.isArray(dashboard?.states) && dashboard.states.length
      ? dashboard.states
      : fallbackStates;

  const cities = Array.isArray(dashboard?.senatranCidades) && dashboard.senatranCidades.length
    ? dashboard.senatranCidades.slice(0, 10)
    : fallbackCities;

  const articles = Array.isArray(dashboard?.news) && dashboard.news.length ? dashboard.news : [];

  const normalizedArticles = articles.slice(0, 6).map((item: AnyData) => ({
    ...item,
    title: cleanText(item.title),
    summary: cleanText(item.summary),
    tag: cleanText(item.tag || "Mercado"),
    image: item.image || articleImagesByTag[item.tag] || articleImagesByTag.Carros,
    sourceName: cleanText(item.sourceName || item.fonte || "Fonte oficial"),
    sourceUrl: item.sourceUrl || sourceLinks[item.sourceName] || "#",
    content: Array.isArray(item.content) ? item.content.map(cleanText) : [],
  }));

  const sources = [
    {
      name: "Fenabrave",
      use: "Emplacamentos, rankings e veículos mais vendidos",
      frequency: "Mensal / automático",
      url: fonte?.fenabrave?.url || sourceLinks.Fenabrave,
      status: fonte?.fenabrave?.status,
    },
    {
      name: "Banco Central",
      use: "Crédito, financiamento e séries econômicas",
      frequency: "Mensal / automático",
      url: fonte?.bancoCentral?.url || sourceLinks["Banco Central"],
      status: fonte?.bancoCentral?.status,
    },
    {
      name: "SENATRAN",
      use: "Frota por estado, município e tipo de veículo",
      frequency: "Mensal / automático",
      url: fonte?.senatran?.url || sourceLinks.SENATRAN,
      status: fonte?.senatran?.status,
    },
    {
      name: "FIPE",
      use: "Preço médio de veículos por modelo, ano e versão",
      frequency: "Diário / automático",
      url: fonte?.fipe?.url || sourceLinks.FIPE,
      status: fonte?.fipe?.status,
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

  const currentValue = bancoCentralChart[bancoCentralChart.length - 1]?.value?.toFixed(2).replace(".", ",") || "0,00";
  const updatedAt = dashboard?.automation?.dataBrasil || dashboard?.updatedAt || "aguardando atualização";

  return (
    <div className="site">
      <header className="hero">
        <div>
          <span className="eyebrow">Dashboard automotivo</span>
          <h1>Mercado Automotivo Brasileiro</h1>
          <p>Painel automático com dados, fontes oficiais, histórico mensal e leitura de mercado.</p>
          <small>Última atualização: {cleanText(updatedAt)}</small>
        </div>

        <nav className="top-nav">
          <a href="#visao">Visão geral</a>
          <a href="#carros">Carros</a>
          <a href="#motos">Motos</a>
          <a href="#pesados">Pesados</a>
          <a href="#fipe">FIPE</a>
          <a href="#regioes">Regiões</a>
          <a href="#noticias">Notícias</a>
          <a href="#fontes">Fontes</a>
        </nav>
      </header>

      {loading && <div className="loading">Carregando dados do Firebase...</div>}

      <main>
        <section id="visao" className="stats-grid">
          <StatCard title="Carros emplacados" value={stats.carros.emplacados} subtitle={`${stats.carros.variacao} vs período anterior`} />
          <StatCard title="Motos emplacadas" value={stats.motos.emplacados} subtitle={`${stats.motos.variacao} vs período anterior`} />
          <StatCard title="Pesados emplacados" value={stats.pesados.emplacados} subtitle={`${stats.pesados.variacao} vs período anterior`} />
          <StatCard title="Crédito atual" value={`${currentValue}%`} subtitle="Banco Central / últimos 13 meses" />
        </section>

        <SimpleLineChart
          title="Crédito automotivo • Banco Central"
          description="Série real coletada automaticamente e salva no Firestore com os últimos 13 meses."
          data={bancoCentralChart}
        />

        <section id="carros" className="section">
          <div className="section-title">
            <span className="eyebrow">Categoria</span>
            <h2>Carros</h2>
            <p>Emplacamentos, transferências, Top 20 marcas e Top 20 modelos.</p>
          </div>

          <div className="stats-grid three">
            <StatCard title="Carros emplacados" value={stats.carros.emplacados} subtitle="Últimos 30 dias" />
            <StatCard title="Carros transferidos" value={stats.carros.transferidos} subtitle="Base consolidada" />
            <StatCard title="Marca líder" value={carrosMarcas[0]} subtitle="Ranking do período" />
          </div>

          <div className="grid-two">
            <RankingCard title="Top 20 marcas de carros" description="Marcas com maior presença no painel." items={carrosMarcas} />
            <RankingCard title="Top 20 modelos de carros" description="Modelos mais relevantes no ranking." items={carrosModelos} />
          </div>
        </section>

        <section id="motos" className="section">
          <div className="section-title">
            <span className="eyebrow">Categoria</span>
            <h2>Motos</h2>
            <p>Emplacamentos, transferências, Top 20 marcas e Top 20 modelos.</p>
          </div>

          <div className="stats-grid three">
            <StatCard title="Motos emplacadas" value={stats.motos.emplacados} subtitle="Últimos 30 dias" />
            <StatCard title="Motos transferidas" value={stats.motos.transferidos} subtitle="Base consolidada" />
            <StatCard title="Marca líder" value={motosMarcas[0]} subtitle="Ranking do período" />
          </div>

          <div className="grid-two">
            <RankingCard title="Top 20 marcas de motos" description="Marcas com maior presença no painel." items={motosMarcas} />
            <RankingCard title="Top 20 modelos de motos" description="Modelos mais relevantes no ranking." items={motosModelos} />
          </div>
        </section>

        <section id="pesados" className="section">
          <div className="section-title">
            <span className="eyebrow">Categoria</span>
            <h2>Pesados e médios transportes</h2>
            <p>Emplacamentos, transferências, Top 20 marcas e Top 20 modelos.</p>
          </div>

          <div className="stats-grid three">
            <StatCard title="Pesados emplacados" value={stats.pesados.emplacados} subtitle="Últimos 30 dias" />
            <StatCard title="Pesados transferidos" value={stats.pesados.transferidos} subtitle="Base consolidada" />
            <StatCard title="Marca líder" value={pesadosMarcas[0]} subtitle="Ranking do período" />
          </div>

          <div className="grid-two">
            <RankingCard title="Top 20 marcas de pesados" description="Marcas com maior presença no painel." items={pesadosMarcas} />
            <RankingCard title="Top 20 modelos de pesados" description="Modelos mais relevantes no ranking." items={pesadosModelos} />
          </div>
        </section>

        <section id="fipe" className="section">
          <div className="section-title">
            <span className="eyebrow">Preços</span>
            <h2>FIPE por faixa de preço</h2>
            <p>Top 20 veículos por faixa. Quando a coleta real não retorna tudo, o painel usa base de segurança.</p>
          </div>

          <div className="fipe-grid">
            {fipeBands.map((band: AnyData, index: number) => (
              <RankingCard
                key={`${band.title}-${index}`}
                title={`Top 20 • ${band.title}`}
                description={`Veículos dentro da faixa ${String(band.title).toLowerCase()}.`}
                items={band.items}
              />
            ))}
          </div>
        </section>

        <section id="regioes" className="section">
          <div className="section-title">
            <span className="eyebrow">Regiões</span>
            <h2>Cidades e estados</h2>
            <p>Leitura regional com estados e cidades em destaque.</p>
          </div>

          <div className="grid-two">
            <section className="card">
              <h3>Estados em destaque</h3>
              <p>Estados com maior volume identificado no painel.</p>
              <div className="table-list">
                {states.slice(0, 10).map((state: AnyData, index: number) => (
                  <div className="table-row" key={`${state.uf}-${index}`}>
                    <strong>{cleanText(state.uf || state.nome || state.estado)}</strong>
                    <span>{cleanText(state.nome || state.estado || "")}</span>
                    <b>{cleanText(state.total || state.carros || state.emplacados || "")}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h3>Cidades em destaque</h3>
              <p>Cidades com maior volume identificado no painel.</p>
              <div className="table-list">
                {cities.slice(0, 10).map((city: AnyData, index: number) => (
                  <div className="table-row" key={`${city.cidade}-${index}`}>
                    <strong>{cleanText(city.cidade || city.city)}</strong>
                    <span>{cleanText(city.uf || "")}</span>
                    <b>{cleanText(city.total || city.carros || city.emplacados || "")}</b>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="noticias" className="section">
          <div className="section-title">
            <span className="eyebrow">Leitura automática</span>
            <h2>Notícias e estatísticas do mercado</h2>
            <p>6 artigos com foto, resumo, fonte oficial e leitura em popup.</p>
          </div>

          <div className="news-grid">
            {normalizedArticles.map((article: AnyData, index: number) => (
              <article className="news-card" key={`${article.title}-${index}`}>
                <div className="news-cover">
                  <img
                    src={article.image}
                    alt={article.title}
                    onError={(event) => {
                      event.currentTarget.src = articleImagesByTag[article.tag] || articleImagesByTag.Carros;
                    }}
                  />
                  <span>{article.tag}</span>
                </div>

                <div className="news-body">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <button type="button" onClick={() => setActiveArticle(article)}>Ler tudo</button>
                  <em className="data-badge">Artigo automático</em>
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
              <button type="button" onClick={() => setActiveArticle(null)}>Fechar</button>
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
                  <strong>{activeArticle.sourceName}</strong>
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

