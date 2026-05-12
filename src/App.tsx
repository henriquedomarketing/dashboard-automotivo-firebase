import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

const sourceLinks: Record<string, string> = {
  "Fenabrave": "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
  "SENATRAN": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/frota-de-veiculos-2026",
  "FIPE": "https://www.fipe.org.br/pt-br/indices/veiculos",
  "Banco Central": "https://www4.bcb.gov.br/pec/series/port/aviso.asp",
  "B3 / SNG": "https://www.b3.com.br/",
  "ANFAVEA + IBGE": "https://anfavea.com.br/"
};


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

function clean(value: any) {
  return String(value ?? "").replace(/�/g, "").trim();
}

function toNumber(value: string | number) {
  if (typeof value === "number") return value;
  return Number(String(value).replace(/\./g, "").replace(",", "."));
}

function Icon({ type }: { type: string }) {
  const icons: Record<string, any> = {
    car: (
      <>
        <path d="M5 17h14" />
        <path d="M6 17v-4l2-5h8l2 5v4" />
        <path d="M8 17v2" />
        <path d="M16 17v2" />
        <path d="M7 13h10" />
      </>
    ),
    bike: (
      <>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M6 17l4-8h4" />
        <path d="M10 9l4 8" />
        <path d="M14 17h4" />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20V8" />
      </>
    ),
    money: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M16 8h-5a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4H8" />
        <path d="M12 6v12" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    news: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type] || icons.chart}
    </svg>
  );
}

function StatCard({ title, value, subtitle, icon }: any) {
  return (
    <div className="card">
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{clean(title)}</p>
          <p className="stat-value">{clean(value)}</p>
        </div>
        <div className="stat-icon"><Icon type={icon} /></div>
      </div>
      <p className="stat-foot">{clean(subtitle)}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title, description, icon }: any) {
  return (
    <div className="section-title">
      <div className="icon-box"><Icon type={icon} /></div>
      <div>
        <p className="eyebrow">{clean(eyebrow)}</p>
        <h2>{clean(title)}</h2>
        <p className="muted">{clean(description)}</p>
      </div>
    </div>
  );
}

function Ranking({ title, description, items }: any) {
  return (
    <div className="card">
      <h3>{clean(title)}</h3>
      <p className="muted">{clean(description)}</p>
      <div className="ranking-list">
        {(items || []).map((item: string, index: number) => (
          <div className="rank-row" key={index}>
            <div className="rank-left">
              <span className="badge">{index + 1}</span>
              <strong>{clean(item)}</strong>
            </div>
            <span>{">"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBarChart({ title, description, items }: any) {
  const maxValue = Math.max(...items.map((item: any) => item.value), 1);

  return (
    <div className="card">
      <h3>{clean(title)}</h3>
      <p className="muted">{clean(description)}</p>
      <div className="bar-wrap">
        {items.map((item: any) => (
          <div key={item.label}>
            <div className="bar-head">
              <strong>{clean(item.label)}</strong>
              <span>{clean(item.display)}</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: `${(item.value / maxValue) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleLineChart({ title, description, values, labels }: any) {
  const width = 620;
  const height = 220;
  const padding = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((value: number, index: number) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="card">
      <h3>{clean(title)}</h3>
      <p className="muted">{clean(description)}</p>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%" }}>
        {[0, 1, 2, 3].map((row) => {
          const y = padding + (row * (height - padding * 2)) / 3;
          return <line key={row} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />;
        })}
        <polyline fill="none" stroke="#ef4444" strokeWidth="4" points={points} strokeLinecap="round" strokeLinejoin="round" />
        {values.map((value: number, index: number) => {
          const x = padding + (index * (width - padding * 2)) / (values.length - 1);
          const y = height - padding - ((value - min) / range) * (height - padding * 2);
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="5" fill="white" stroke="#ef4444" strokeWidth="3" />
              <text x={x} y={height - 6} textAnchor="middle" style={{ fontSize: 12, fill: "#64748b" }}>{clean(labels[index])}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const news = [
  {
    title: "Resumo do mes: carros seguem em recuperacao no mercado brasileiro",
    seoTitle: "Mercado de carros no Brasil: resumo do mes, emplacamentos e tendencias",
    metaDescription: "Analise mensal do mercado de carros no Brasil com leitura de emplacamentos, marcas em destaque, comportamento de compra e oportunidades para lojistas.",
    tag: "Carros",
    updatedAt: "Atualizado semanalmente",
    sourceName: "Fenabrave",
    sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O mercado de carros manteve ritmo positivo no periodo, com avanco nos emplacamentos e boa procura por modelos compactos, SUVs e picapes leves.",
    content: [
      "O mercado de carros no Brasil segue mostrando sinais importantes de recuperacao e reorganizacao. A leitura mensal dos emplacamentos ajuda a entender quais categorias estao ganhando espaco, quais marcas continuam fortes e quais modelos podem representar boas oportunidades para lojistas, vendedores, consultores e profissionais de marketing automotivo.",
      "Dentro do comportamento observado no painel, os carros compactos continuam tendo papel relevante por atenderem consumidores que buscam menor custo de manutencao, economia de combustivel e facilidade de revenda. Ao mesmo tempo, SUVs compactos e picapes leves seguem com forte apelo comercial, principalmente por entregarem percepcao de valor, versatilidade e maior ticket medio.",
      "Para o lojista, acompanhar os modelos mais emplacados e mais transferidos e essencial. Um carro muito emplacado tende a ter maior presenca nas ruas, mais procura em classificados e maior facilidade de giro no estoque. Ja as transferencias ajudam a entender o mercado de usados e seminovos, indicando quais modelos estao circulando com mais intensidade entre consumidores.",
      "Outro ponto importante e observar a diferenca entre procura nacional e comportamento regional. Um modelo pode estar muito forte no ranking geral, mas ter desempenho diferente em uma cidade especifica. Por isso, cruzar emplacamentos, transferencias, estados e cidades ajuda a criar campanhas mais inteligentes e mensagens comerciais mais proximas da realidade local.",
      "Na pratica, os dados do mes podem orientar decisoes simples: quais veiculos destacar nas redes sociais, quais modelos usar em campanhas de trafego pago, quais categorias merecem videos explicativos e quais ofertas devem receber maior investimento de comunicacao. Em vez de comunicar apenas preco, a loja pode trabalhar argumentos como economia, facilidade de financiamento, confiabilidade e liquidez.",
      "O resumo do mes tambem mostra que dados automotivos nao servem apenas para grandes montadoras. Pequenas e medias lojas podem usar esse tipo de leitura para melhorar estoque, melhorar atendimento e criar conteudos mais fortes. Quando a equipe entende quais modelos estao em alta, fica mais facil responder duvidas, contornar objecoes e conduzir o cliente para uma decisao de compra.",
      "Fonte oficial utilizada para esta leitura: Fenabrave, com relatorios de emplacamentos e veiculos mais vendidos."
    ]
  },
  {
    title: "Motos puxam volume e mantem procura forte no mes",
    seoTitle: "Mercado de motos no Brasil: crescimento, modelos mais procurados e leitura mensal",
    metaDescription: "Resumo mensal do mercado de motos no Brasil com analise de emplacamentos, procura por modelos economicos e oportunidades para comunicacao comercial.",
    tag: "Motos",
    updatedAt: "Atualizado semanalmente",
    sourceName: "Fenabrave",
    sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    summary: "As motos seguem com desempenho forte, impulsionadas por economia, mobilidade urbana, trabalho e alta procura por modelos de baixa cilindrada.",
    content: [
      "O mercado de motos continua sendo uma das areas mais dinamicas do setor automotivo brasileiro. A procura por motocicletas esta diretamente ligada a mobilidade urbana, economia no deslocamento, uso profissional e facilidade de compra em comparacao com outros veiculos.",
      "Modelos de entrada e baixa cilindrada seguem aparecendo com forca porque atendem um publico amplo. Para muitos consumidores, a moto e uma solucao pratica para deslocamento diario, trabalho por aplicativo, entregas, pequenos negocios e reducao de custos com transporte.",
      "A leitura mensal dos emplacamentos ajuda a entender quais marcas e modelos estao mais presentes no mercado. Quando um modelo aparece com frequencia nos rankings, isso pode indicar boa aceitacao, facilidade de revenda, manutencao conhecida e maior confianca por parte do consumidor.",
      "Para lojas e profissionais de marketing, o segmento de motos pede comunicacao direta. Conteudos que falam sobre economia, manutencao, consumo, uso no trabalho e facilidade de financiamento tendem a fazer sentido para o publico. Videos curtos, comparativos e chamadas com beneficios praticos podem performar bem.",
      "A analise por cidade tambem e importante. Em regioes onde o uso de motos e mais intenso, campanhas locais podem destacar agilidade, baixo custo e oportunidade de troca. Ja em cidades com forte atividade comercial, a comunicacao pode explorar o uso profissional da motocicleta.",
      "Outro ponto relevante e acompanhar as transferencias. Elas mostram o movimento do mercado de usadas e seminovas, ajudando lojistas a entender quais modelos continuam tendo giro mesmo apos o primeiro emplacamento.",
      "Fonte oficial utilizada para esta leitura: Fenabrave, com relatorios de emplacamentos e veiculos mais vendidos."
    ]
  },
  {
    title: "Credito automotivo indica mercado mais ativo",
    seoTitle: "Credito automotivo no Brasil: financiamento, demanda e comportamento de compra",
    metaDescription: "Analise do credito automotivo e sua relacao com vendas, financiamento, poder de compra e oportunidades para lojas de veiculos.",
    tag: "Credito",
    updatedAt: "Atualizado semanalmente",
    sourceName: "Banco Central",
    sourceUrl: "https://www.bcb.gov.br/estatisticas",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    summary: "O financiamento segue como fator importante para movimentar vendas, principalmente em faixas de preco intermediarias e veiculos seminovos.",
    content: [
      "O credito automotivo e um dos principais indicadores para entender o ritmo de compra no mercado de veiculos. Quando o financiamento cresce, normalmente ha maior disposicao do consumidor para trocar de carro, comprar uma moto ou assumir uma parcela dentro do orcamento mensal.",
      "Para o mercado automotivo, o credito funciona como ponte entre desejo e compra. Muitos clientes nao compram apenas pelo valor total do veiculo, mas pela entrada, taxa, prazo e parcela final. Por isso, acompanhar o comportamento do financiamento ajuda a entender o quanto o consumidor esta ativo.",
      "As lojas que trabalham bem a comunicacao de financiamento conseguem transformar dados em argumento comercial. Em vez de divulgar apenas preco, podem destacar simulacao, aprovacao, entrada facilitada, principais bancos parceiros e condicoes ajustadas ao perfil do cliente.",
      "O credito tambem influencia diretamente o estoque. Veiculos em faixas intermediarias podem ganhar mais procura quando as condicoes de financiamento estao favoraveis. Ja quando o credito fica mais restrito, modelos mais baratos e de menor custo operacional tendem a receber mais atencao.",
      "Para campanhas de marketing, esse indicador permite criar anuncios mais alinhados ao momento. Se o credito esta aquecido, chamadas sobre parcela e aprovacao podem funcionar melhor. Se o mercado esta mais cauteloso, conteudos educativos sobre planejamento e troca consciente podem gerar mais confianca.",
      "A leitura semanal do credito deve ser combinada com emplacamentos, transferencias e FIPE. Assim, o profissional consegue enxergar nao apenas o volume de vendas, mas tambem o contexto financeiro que sustenta a compra.",
      "Fonte oficial utilizada para esta leitura: Banco Central, com series economicas e estatisticas relacionadas ao credito."
    ]
  },
  {
    title: "Estados em destaque mostram forca regional",
    seoTitle: "Mercado automotivo por estado: cidades em destaque e oportunidades regionais",
    metaDescription: "Analise regional do mercado automotivo brasileiro com leitura por estados, cidades, frota, emplacamentos e transferencias.",
    tag: "Regioes",
    updatedAt: "Atualizado semanalmente",
    sourceName: "SENATRAN",
    sourceUrl: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
    summary: "A comparacao por estados ajuda a entender onde o mercado esta mais aquecido e quais cidades concentram maior volume.",
    content: [
      "A leitura regional e uma das partes mais importantes para entender o mercado automotivo brasileiro. O Brasil tem diferencas fortes entre estados e cidades, e essas diferencas aparecem no comportamento de compra, na frota circulante, nas transferencias e nos emplacamentos.",
      "Um estado com alto volume de emplacamentos pode indicar economia mais aquecida, maior populacao, frota em renovacao ou grande presenca de concessionarias e lojas independentes. Ja as transferencias ajudam a identificar onde o mercado de usados e seminovos esta mais ativo.",
      "Para lojistas, a analise regional evita decisoes baseadas apenas em dados nacionais. Um modelo que vende bem no Brasil pode nao ser o mais forte em uma cidade especifica. Da mesma forma, uma marca pode ter mais aceitacao em determinadas regioes por historico, assistencia tecnica, perfil economico ou cultura local.",
      "No marketing automotivo, esse tipo de informacao e muito valioso. Campanhas locais podem destacar modelos com maior procura na regiao, usar linguagem mais proxima do publico e criar ofertas baseadas no comportamento real da cidade.",
      "A visao por cidades tambem permite observar oportunidades menores, mas relevantes. Cidades medias podem ter mercados muito ativos, principalmente quando atendem regioes vizinhas, polos comerciais, agricolas ou industriais.",
      "Ao clicar em um estado no painel, a ideia e facilitar a leitura das cidades mais relevantes, permitindo que o usuario veja rapidamente onde estao os principais movimentos de carros, motos e pesados.",
      "Fonte oficial utilizada para esta leitura: SENATRAN, com dados relacionados a frota, estados e municipios."
    ]
  },
  {
    title: "FIPE ajuda a entender faixas de oportunidade",
    seoTitle: "FIPE por faixa de preco: oportunidades para compra, venda e estoque de veiculos",
    metaDescription: "Analise de veiculos por faixa de preco com base em referencia FIPE, oportunidades comerciais e leitura para lojistas.",
    tag: "FIPE",
    updatedAt: "Atualizado semanalmente",
    sourceName: "FIPE",
    sourceUrl: "https://www.fipe.org.br/pt-br/indices/veiculos",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    summary: "Os rankings por faixa de preco ajudam a visualizar modelos acessiveis, intermediarios e premium com maior potencial comercial.",
    content: [
      "A FIPE e uma referencia importante para entender preco medio de veiculos no Brasil. Embora o valor real de mercado possa variar por estado, cidade, conservacao, quilometragem e oferta local, a tabela ajuda a criar uma base de comparacao.",
      "Ao organizar os veiculos por faixa de preco, o painel facilita a leitura de oportunidades. Veiculos ate 30 mil podem atender clientes que buscam entrada no mercado, economia e menor investimento. Ja faixas ate 60 mil e 90 mil costumam concentrar usados e seminovos com boa procura.",
      "Nas faixas intermediarias, aparecem modelos com maior valor agregado, como SUVs, sedans completos e picapes. Esses veiculos exigem comunicacao diferente, com foco em conforto, tecnologia, seguranca, procedencia e condicoes de financiamento.",
      "Para lojistas, a leitura por faixa de preco ajuda a pensar estoque. Nao basta comprar qualquer veiculo; e preciso entender qual faixa conversa com o publico local, qual ticket medio tem mais giro e quais modelos oferecem melhor equilibrio entre procura e margem.",
      "Para o marketing, os rankings por faixa podem virar conteudos fortes: melhores carros ate 50 mil, SUVs ate 100 mil, opcoes economicas para primeiro carro ou modelos para familia. Esse tipo de conteudo ajuda no SEO e tambem nas redes sociais.",
      "A atualizacao recorrente da FIPE permite acompanhar mudancas de referencia e ajustar argumentos comerciais. Quando o preco de um modelo muda, a percepcao de oportunidade tambem pode mudar.",
      "Fonte oficial utilizada para esta leitura: FIPE, com indices de preco medio de veiculos."
    ]
  },
  {
    title: "Pesados e transporte revelam demanda logistica",
    seoTitle: "Mercado de pesados e transporte: caminhoes, comerciais leves e atividade economica",
    metaDescription: "Analise do segmento de pesados e medios transportes com foco em logistica, emplacamentos, frota e oportunidades de mercado.",
    tag: "Pesados",
    updatedAt: "Atualizado semanalmente",
    sourceName: "Fenabrave",
    sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    summary: "O segmento de pesados e medios transportes mostra sinais importantes sobre logistica, producao e atividade economica.",
    content: [
      "O mercado de pesados e medios transportes tem uma leitura diferente dos carros e motos. Caminhoes, comerciais leves e veiculos de transporte estao fortemente ligados a logistica, distribuicao, agronegocio, industria, construcao e servicos.",
      "Quando o segmento de pesados mostra crescimento, pode haver sinal de aumento na atividade economica. Empresas renovam frota quando enxergam demanda, precisam reduzir custo operacional ou buscam maior eficiencia no transporte.",
      "Os comerciais leves tambem merecem atencao especial. Eles aparecem em varios tipos de negocio, como entregas urbanas, pequenas empresas, servicos tecnicos, distribuicao regional e operacoes de apoio. Por isso, podem indicar movimentacao economica local.",
      "Para lojistas e concessionarias, comunicar pesados exige uma abordagem mais tecnica. O cliente geralmente avalia custo total de operacao, consumo, manutencao, capacidade de carga, disponibilidade de pecas, garantia e retorno sobre investimento.",
      "No marketing, esse publico responde melhor a conteudos objetivos, demonstracoes, comparativos, videos de aplicacao real e argumentos financeiros. O foco nao e apenas desejo, mas eficiencia, produtividade e confianca.",
      "Acompanhar marcas e modelos mais emplacados nesse segmento ajuda a entender quais fabricantes estao ganhando espaco e quais categorias estao com maior procura em determinado periodo.",
      "Fonte oficial utilizada para esta leitura: Fenabrave, com relatorios de emplacamentos e veiculos mais vendidos."
    ]
  }
];
export default function App() {
  const [payload, setPayload] = useState<any>(null);
  const [period, setPeriod] = useState("30 dias");
  const [selectedState, setSelectedState] = useState("PR");
  const [selectedRegionCategory, setSelectedRegionCategory] = useState("carros");
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dashboard", "current"), (snap) => {
      if (snap.exists()) setPayload(snap.data());
    });
    return () => unsub();
  }, []);

  if (!payload) {
    return <div className="page"><div className="container">Carregando dados do Firebase...</div></div>;
  }

  const periods = payload.periods || ["30 dias", "60 dias", "90 dias"];
  const data = payload.snapshots[period] || payload.snapshots["30 dias"];
  const labels = payload.chartLabels || [];
  const series = payload.chartSeries?.[period] || {};
  const selectedStateData = payload.states.find((state: any) => state.uf === selectedState) || payload.states[0];
  const selectedCities = payload.citiesByState[selectedState] || [];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const comparisonItems = [
    { label: "Carros", value: toNumber(data.carros.emplacados), display: data.carros.emplacados },
    { label: "Motos", value: toNumber(data.motos.emplacados), display: data.motos.emplacados },
    { label: "Pesados", value: toNumber(data.pesados.emplacados), display: data.pesados.emplacados }
  ];

  const transferItems = [
    { label: "Carros", value: toNumber(data.carros.transferidos), display: data.carros.transferidos },
    { label: "Motos", value: toNumber(data.motos.transferidos), display: data.motos.transferidos },
    { label: "Pesados", value: toNumber(data.pesados.transferidos), display: data.pesados.transferidos }
  ];

  const stateChartItems = payload.states.map((state: any) => ({
    label: state.uf,
    value: toNumber(state[selectedRegionCategory]),
    display: state[selectedRegionCategory]
  }));

  const selectedCityChartItems = selectedCities.map((city: any) => ({
    label: city.city,
    value: toNumber(city[selectedRegionCategory]),
    display: city[selectedRegionCategory]
  }));

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="topline">
            <div>
              <p className="eyebrow">Dashboard automotivo</p>
              <h1>Mercado Automotivo Brasileiro</h1>
              <p className="muted">Autoalimentado pelo Firebase. Ultima atualizacao: {new Date(payload.updatedAt).toLocaleString("pt-BR")}</p>
            </div>

            <div className="periods">
              {periods.map((item: string) => (
                <button className={`btn ${period === item ? "active" : ""}`} key={item} onClick={() => setPeriod(item)}>
                  {clean(item)}
                </button>
              ))}
            </div>
          </div>

          <nav className="nav">
            {[
              ["visao", "Visao geral", "chart"],
              ["carros", "Carros", "car"],
              ["motos", "Motos", "bike"],
              ["pesados", "Pesados", "truck"],
              ["fipe", "FIPE", "money"],
              ["regioes", "Cidades e estados", "pin"],
              ["noticias", "Noticias", "news"],
              ["fontes", "Fontes", "database"]
            ].map(([id, label, icon]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <Icon type={icon} />
                {label}
              </button>
            ))}
          </nav>
        </header>

        <main>
          <section id="visao">
            <div className="grid-4">
              <StatCard title="Carros emplacados" value={data.carros.emplacados} subtitle={`${data.carros.variacao} vs periodo anterior`} icon="car" />
              <StatCard title="Motos emplacadas" value={data.motos.emplacados} subtitle={`${data.motos.variacao} vs periodo anterior`} icon="bike" />
              <StatCard title="Pesados emplacados" value={data.pesados.emplacados} subtitle={`${data.pesados.variacao} vs periodo anterior`} icon="truck" />
              <StatCard title="Credito financiado" value={data.credito} subtitle="Monitoramento automatico" icon="money" />
            </div>

            <div className="grid-2">
              <SimpleLineChart title="Evolucao dos carros" description="Volume de carros nos ultimos meses." values={series.carros || []} labels={labels} />
              <SimpleLineChart title="Evolucao das motos" description="Volume de motos nos ultimos meses." values={series.motos || []} labels={labels} />
              <SimpleLineChart title="Evolucao dos pesados" description="Volume de pesados nos ultimos meses." values={series.pesados || []} labels={labels} />
              <SimpleLineChart title="Evolucao do credito" description="Credito automotivo nos ultimos meses." values={series.credito || []} labels={labels} />
            </div>

            <div className="grid-2">
              <HorizontalBarChart title="Comparativo por categoria" description="Emplacamentos por categoria." items={comparisonItems} />
              <HorizontalBarChart title="Transferencias por categoria" description="Transferencias por categoria." items={transferItems} />
            </div>
          </section>

          <section id="carros">
            <SectionTitle eyebrow="Categoria" title="Carros" description="Top 20 marcas e modelos de carros." icon="car" />
            <div className="grid-2">
              <Ranking title="Top 20 marcas" description="Marcas de carros em destaque." items={data.carros.marcas} />
              <Ranking title="Top 20 modelos" description="Modelos de carros em destaque." items={data.carros.modelos} />
            </div>
          </section>

          <section id="motos">
            <SectionTitle eyebrow="Categoria" title="Motos" description="Top 20 marcas e modelos de motos." icon="bike" />
            <div className="grid-2">
              <Ranking title="Top 20 marcas" description="Marcas de motos em destaque." items={data.motos.marcas} />
              <Ranking title="Top 20 modelos" description="Modelos de motos em destaque." items={data.motos.modelos} />
            </div>
          </section>

          <section id="pesados">
            <SectionTitle eyebrow="Categoria" title="Pesados e medios transportes" description="Top 20 marcas e modelos de pesados." icon="truck" />
            <div className="grid-2">
              <Ranking title="Top 20 marcas" description="Marcas de pesados em destaque." items={data.pesados.marcas} />
              <Ranking title="Top 20 modelos" description="Modelos de pesados em destaque." items={data.pesados.modelos} />
            </div>
          </section>

          <section id="fipe">
            <SectionTitle eyebrow="Precos" title="FIPE" description="Top 20 veiculos por faixa de preco." icon="money" />
            <div className="grid-3">
              {(payload.fipeBands || []).map((band: any) => (
                <Ranking key={band.title} title={`Top 20 - ${clean(band.title)}`} description={`20 veiculos dentro da faixa ${clean(band.title)}.`} items={band.items} />
              ))}
            </div>
          </section>

          <section id="regioes">
            <SectionTitle eyebrow="Regioes" title="Cidades e estados" description="Clique em um estado para ver as cidades em destaque." icon="pin" />

            <div className="category-menu">
              {[
                ["carros", "Carros", "car"],
                ["motos", "Motos", "bike"],
                ["pesados", "Pesados", "truck"]
              ].map(([id, label, icon]) => (
                <button key={id} onClick={() => setSelectedRegionCategory(id)} className={selectedRegionCategory === id ? "active" : ""}>
                  <Icon type={icon} />
                  {label}
                </button>
              ))}
            </div>

            <div className="grid-2">
              <HorizontalBarChart title="Comparativo dos estados" description="Estados com maior volume." items={stateChartItems} />
              <HorizontalBarChart title={`Top cidades de ${clean(selectedStateData.nome)}`} description="Cidades com maior volume no estado selecionado." items={selectedCityChartItems} />
            </div>

            <div className="grid-2">
              <div className="card">
                <h3>Estados em destaque</h3>
                <p className="muted">Clique em um estado para carregar as cidades.</p>
                <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                  {payload.states.map((state: any) => (
                    <button key={state.uf} onClick={() => setSelectedState(state.uf)} className={`state-row ${selectedState === state.uf ? "active" : ""}`}>
                      <strong>{clean(state.uf)}</strong>
                      <span>{clean(state[selectedRegionCategory])}</span>
                      <span>{clean(state.transferidos)} transf.</span>
                      <span>{clean(state.nome)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>{clean(selectedStateData.nome)} - cidades em destaque</h3>
                <p className="muted">Cidades com maior volume.</p>
                <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                  {selectedCities.map((city: any) => (
                    <div key={city.city} className="city-row">
                      <strong>{clean(city.city)}</strong>
                      <span>{clean(city[selectedRegionCategory])}</span>
                      <span>{clean(city.transferidos)} transferidos</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="noticias">
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

                  <div className="article-source-box">
                    <span>Fonte oficial: {activeArticle.sourceName}</span>
                    <a href={activeArticle.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Abrir fonte oficial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section id="fontes">
            <SectionTitle eyebrow="Transparencia" title="Fontes oficiais utilizadas" description="Origem, uso e periodicidade dos dados." icon="database" />
            <div className="card">
              <div style={{ display: "grid", gap: 8 }}>
                {(payload.sources || []).map((source: any) => (
                  <a
                    className="source-row source-link"
                    key={source.name}
                    href={sourceLinks[source.name] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{clean(source.name)}</strong>
                    <span>{clean(source.use)}</span>
                    <span>{clean(source.frequency)}</span>
                    <span className="external-pill">Abrir fonte</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <footer className="site-footer">
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
          </footer>
        
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

        </main>
      </div>
    </div>
  );
}



