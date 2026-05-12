const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function hojeBrasil() {
  return new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function mesBrasil() {
  const parts = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).split("/");
  return `${parts[1]}-${parts[0]}`;
}

function diaBrasil() {
  return Number(new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
  }));
}

function criarArtigos(dataAtual) {
  return [
    {
      title: "Resumo do mes: carros seguem em recuperacao no mercado brasileiro",
      tag: "Carros",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      summary: "Analise mensal dos carros com foco em emplacamentos, marcas em destaque e oportunidades para lojistas.",
      content: [
        "O mercado de carros no Brasil segue apresentando sinais importantes para lojistas, vendedores e profissionais de marketing automotivo. A leitura dos emplacamentos ajuda a entender quais modelos ganharam mais espaco, quais marcas continuam fortes e quais categorias podem representar melhores oportunidades comerciais.",
        "Carros compactos, SUVs de entrada e picapes leves continuam sendo categorias importantes porque atendem diferentes perfis de compradores. Enquanto os compactos costumam atrair quem busca economia e facilidade de manutencao, SUVs e picapes entregam maior percepcao de valor, conforto e versatilidade.",
        "Para quem trabalha com venda de veiculos, acompanhar o ranking mensal ajuda a tomar decisoes melhores sobre estoque, campanhas e comunicacao. Um modelo com bom volume de mercado tende a ter mais procura, maior liquidez e melhor chance de giro.",
        "A leitura regional tambem e essencial. Um modelo que aparece forte no Brasil pode ter comportamento diferente em cada cidade. Por isso, cruzar dados de emplacamentos, transferencias e estados ajuda a criar campanhas mais proximas da realidade local.",
        "Fonte oficial utilizada: Fenabrave."
      ],
    },
    {
      title: "Motos mantem procura forte e puxam volume no mes",
      tag: "Motos",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      summary: "Resumo do mercado de motos com foco em mobilidade, economia e modelos de maior procura.",
      content: [
        "O segmento de motos continua sendo um dos mais relevantes do mercado automotivo brasileiro. A busca por economia, mobilidade urbana e uso profissional faz com que motocicletas de entrada e baixa cilindrada tenham grande importancia nos rankings.",
        "Motos sao usadas tanto para deslocamento diario quanto para trabalho. Isso cria uma demanda constante por modelos economicos, resistentes e com manutencao acessivel.",
        "Para lojas e profissionais de marketing, o conteudo sobre motos deve ser direto e pratico. Temas como consumo, custo de manutencao, financiamento, uso no trabalho e facilidade de revenda costumam conversar bem com o publico.",
        "Acompanhar marcas e modelos mais emplacados tambem ajuda a entender quais produtos merecem destaque em anuncios, videos curtos e campanhas locais.",
        "Fonte oficial utilizada: Fenabrave."
      ],
    },
    {
      title: "Credito automotivo indica ritmo de compra do consumidor",
      tag: "Credito",
      updatedAt: dataAtual,
      sourceName: "Banco Central",
      sourceUrl: "https://www.bcb.gov.br/estatisticas",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      summary: "Analise do financiamento automotivo e sua relacao com vendas, parcelas e poder de compra.",
      content: [
        "O credito automotivo e um dos indicadores mais importantes para entender o comportamento de compra. Muitos consumidores nao decidem apenas pelo valor total do veiculo, mas pela entrada, taxa, prazo e valor da parcela.",
        "Quando o financiamento esta mais ativo, o mercado tende a ter maior movimento, principalmente em veiculos seminovos e faixas intermediarias de preco.",
        "Para lojistas, esse dado ajuda a ajustar a comunicacao. Campanhas com foco em parcelas, simulacao, aprovacao e bancos parceiros podem fazer mais sentido quando o credito esta aquecido.",
        "A leitura do credito deve ser combinada com FIPE, emplacamentos e transferencias para criar uma visao mais completa do mercado.",
        "Fonte oficial utilizada: Banco Central."
      ],
    },
    {
      title: "Estados e cidades mostram oportunidades regionais",
      tag: "Regioes",
      updatedAt: dataAtual,
      sourceName: "SENATRAN",
      sourceUrl: "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      summary: "Leitura regional para entender estados e cidades com maior movimentacao automotiva.",
      content: [
        "A analise por estados e cidades ajuda a entender onde o mercado automotivo esta mais aquecido. O Brasil possui realidades muito diferentes entre regioes, e isso influencia diretamente emplacamentos, transferencias e comportamento de compra.",
        "Uma cidade pode ter forte mercado de motos, enquanto outra pode ter maior procura por carros ou pesados. Essa diferenca e importante para lojas, vendedores e campanhas de marketing.",
        "Ao olhar dados regionais, o profissional consegue criar comunicacoes mais especificas, destacar modelos com maior aderencia local e entender oportunidades que nao aparecem apenas no ranking nacional.",
        "Essa leitura tambem ajuda a identificar polos comerciais, cidades com maior giro e mercados proximos que podem ser explorados por lojas da regiao.",
        "Fonte oficial utilizada: SENATRAN."
      ],
    },
    {
      title: "FIPE ajuda a entender faixas de preco e oportunidades",
      tag: "FIPE",
      updatedAt: dataAtual,
      sourceName: "FIPE",
      sourceUrl: "https://www.fipe.org.br/pt-br/indices/veiculos",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      summary: "Analise por faixa de preco para apoiar estoque, campanhas e comparativos de compra.",
      content: [
        "A FIPE e uma referencia importante para entender preco medio de veiculos no Brasil. Mesmo que o valor real varie conforme cidade, estado, conservacao e quilometragem, a tabela ajuda a criar uma base de comparacao.",
        "Organizar veiculos por faixa de preco facilita a leitura comercial. Faixas mais baixas atendem consumidores que buscam economia e primeiro veiculo. Faixas intermediarias mostram oportunidades em seminovos, SUVs e modelos completos.",
        "Para lojistas, essa leitura ajuda a pensar estoque e comunicacao. Em vez de divulgar apenas preco, e possivel criar conteudos como melhores carros ate determinado valor, modelos economicos ou opcoes para familia.",
        "Acompanhar a FIPE tambem ajuda a observar mudancas de referencia e ajustar argumentos comerciais.",
        "Fonte oficial utilizada: FIPE."
      ],
    },
    {
      title: "Pesados e transporte sinalizam atividade economica",
      tag: "Pesados",
      updatedAt: dataAtual,
      sourceName: "Fenabrave",
      sourceUrl: "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
      summary: "Resumo sobre caminhoes, comerciais leves, logistica e sinais de atividade economica.",
      content: [
        "O mercado de pesados e medios transportes tem relacao direta com logistica, agronegocio, industria, construcao e servicos. Por isso, acompanhar esse segmento ajuda a entender movimentacoes economicas mais amplas.",
        "Quando caminhoes e comerciais leves apresentam crescimento, pode haver sinal de renovacao de frota, aumento de demanda por transporte ou expansao de atividades produtivas.",
        "Para empresas e vendedores, esse segmento exige comunicacao mais tecnica. O cliente costuma avaliar consumo, manutencao, capacidade, disponibilidade de pecas e retorno sobre investimento.",
        "No dashboard, pesados ganham leitura separada para que seus dados nao fiquem escondidos dentro do volume geral de veiculos.",
        "Fonte oficial utilizada: Fenabrave."
      ],
    },
  ];
}

async function carregarDashboardAtual() {
  const snap = await db.doc("dashboard/current").get();

  if (snap.exists) {
    return snap.data();
  }

  return {
    updatedAt: new Date().toISOString(),
    news: criarArtigos(hojeBrasil()),
    aviso: "Base inicial criada pela automacao.",
  };
}

async function main() {
  const dataAtual = hojeBrasil();
  const mesAtual = mesBrasil();
  const dia = diaBrasil();

  const current = await carregarDashboardAtual();

  current.updatedAt = new Date().toISOString();
  current.automation = {
    status: "atualizado",
    origem: "GitHub Actions",
    dataBrasil: dataAtual,
  };

  if (!Array.isArray(current.news) || dia === 1 || dia === 15) {
    current.news = criarArtigos(dataAtual);
  }

  await db.doc("dashboard/current").set(current, { merge: true });

  await db.doc(`history/${mesAtual}`).set(
    {
      mes: mesAtual,
      atualizadoEm: admin.firestore.FieldValue.serverTimestamp(),
      dados: current,
    },
    { merge: true }
  );

  await db.collection("updateLogs").add({
    tipo: "auto-dashboard",
    status: "ok",
    dataBrasil: dataAtual,
    artigosAtualizados: dia === 1 || dia === 15,
    criadoEm: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("OK - Dashboard atualizado, historico salvo e artigos verificados.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
