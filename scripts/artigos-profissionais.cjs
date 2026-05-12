const fs = require("fs");

const path = "src/App.tsx";
let app = fs.readFileSync(path, "utf8");

const newsBlock = `const news = [
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
];`;

app = app.replace(/const news = \[[\s\S]*?\];/, newsBlock);

if (!app.includes("sourceName")) {
  console.log("Aviso: newsBlock inserido, mas verifique se os artigos foram substituidos corretamente.");
}

const sourceBox = `
                  <div className="article-source-box">
                    <div>
                      <span>Fonte oficial</span>
                      <strong>{activeArticle.sourceName}</strong>
                      <small>{activeArticle.updatedAt}</small>
                    </div>
                    <a href={activeArticle.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Abrir fonte oficial
                    </a>
                  </div>
`;

if (!app.includes("article-source-box")) {
  app = app.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*\)\}/,
    sourceBox + "\n                </div>\n              </div>\n            </div>\n          )}"
  );
}

fs.writeFileSync(path, app, "utf8");

console.log("OK - artigos profissionais com fonte oficial aplicados.");
