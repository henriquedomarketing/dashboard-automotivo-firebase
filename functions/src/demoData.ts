const top20CarBrands = ["Fiat","Volkswagen","Chevrolet","Hyundai","Toyota","Jeep","Renault","Honda","Nissan","BYD","Caoa Chery","Peugeot","Citroën","Ford","BMW","Mercedes-Benz","Audi","GWM","Mitsubishi","Kia"];
const top20CarModels = ["Fiat Strada","VW Polo","Chevrolet Onix","Hyundai HB20","Fiat Argo","Toyota Corolla","VW T-Cross","Fiat Mobi","Renault Kwid","Chevrolet Tracker","Hyundai Creta","Jeep Compass","Toyota Hilux","Jeep Renegade","Honda HR-V","Fiat Pulse","Nissan Kicks","VW Virtus","Honda City","Chevrolet S10"];
const top20MotoBrands = ["Honda","Yamaha","Shineray","Mottu","BMW","Haojue","Royal Enfield","Kawasaki","Suzuki","Dafra","Triumph","KTM","Ducati","Bajaj","Harley-Davidson","Avelloz","Bull","Voltz","Kymco","Watts"];
const top20MotoModels = ["Honda CG 160","Honda Biz","Honda Pop 110i","Yamaha Fazer","Honda Bros","Honda PCX","Yamaha Factor","Honda XRE 190","Yamaha Crosser","Honda CB 300F","Shineray SHI 175","Honda NXR 160","Yamaha Neo","BMW G 310","Honda Elite","Yamaha NMAX","Honda ADV","Haojue DK 160","Shineray Jet","Honda CG 125"];
const top20HeavyBrands = ["Mercedes-Benz","Volkswagen","Scania","Volvo","Iveco","DAF","MAN","Ford","Agrale","Hyundai","Foton","JAC","Fiat","Peugeot","Renault","Citroën","Mitsubishi","Kia","Maxus","Shacman"];
const top20HeavyModels = ["VW Delivery","Mercedes Accelo","Scania R","Volvo FH","Iveco Daily","Mercedes Atego","VW Constellation","Scania P","Volvo VM","Iveco Tector","Mercedes Actros","DAF XF","VW Meteor","Volvo FM","Scania G","Mercedes Sprinter","Iveco Stralis","MAN TGX","VW Worker","DAF CF"];

export function buildDashboardData() {
  return {
    updatedAt: new Date().toISOString(),
    periods: ["30 dias", "60 dias", "90 dias"],
    snapshots: {
      "30 dias": {
        carros: { emplacados: "173.197", transferidos: "812.340", variacao: "+8,4%", marcas: top20CarBrands, modelos: top20CarModels },
        motos: { emplacados: "143.517", transferidos: "286.992", variacao: "+5,7%", marcas: top20MotoBrands, modelos: top20MotoModels },
        pesados: { emplacados: "12.906", transferidos: "41.580", variacao: "+4,2%", marcas: top20HeavyBrands, modelos: top20HeavyModels },
        credito: "R$ 62,34 bi"
      },
      "60 dias": {
        carros: { emplacados: "341.822", transferidos: "1.604.221", variacao: "+6,2%", marcas: top20CarBrands, modelos: top20CarModels },
        motos: { emplacados: "281.903", transferidos: "563.740", variacao: "+4,9%", marcas: top20MotoBrands, modelos: top20MotoModels },
        pesados: { emplacados: "25.104", transferidos: "81.233", variacao: "+3,6%", marcas: top20HeavyBrands, modelos: top20HeavyModels },
        credito: "R$ 121,18 bi"
      },
      "90 dias": {
        carros: { emplacados: "507.604", transferidos: "2.398.950", variacao: "+5,1%", marcas: top20CarBrands, modelos: top20CarModels },
        motos: { emplacados: "418.660", transferidos: "836.014", variacao: "+4,1%", marcas: top20MotoBrands, modelos: top20MotoModels },
        pesados: { emplacados: "37.580", transferidos: "120.406", variacao: "+3,1%", marcas: top20HeavyBrands, modelos: top20HeavyModels },
        credito: "R$ 181,92 bi"
      }
    },
    chartLabels: ["Mai/25", "Jun/25", "Jul/25", "Ago/25", "Set/25", "Out/25", "Nov/25", "Dez/25", "Jan/26", "Fev/26", "Mar/26", "Abr/26", "Mai/26"],
    chartSeries: {
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
  },
    fipeBands: [
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
    ],
    states: [
      { uf: "SP", nome: "São Paulo", carros: "38.420", motos: "27.116", pesados: "3.420", transferidos: "182.440" },
      { uf: "MG", nome: "Minas Gerais", carros: "17.980", motos: "16.820", pesados: "1.960", transferidos: "93.240" },
      { uf: "PR", nome: "Paraná", carros: "13.560", motos: "9.870", pesados: "1.420", transferidos: "71.210" },
      { uf: "RJ", nome: "Rio de Janeiro", carros: "11.830", motos: "8.020", pesados: "1.180", transferidos: "55.640" },
      { uf: "RS", nome: "Rio Grande do Sul", carros: "10.770", motos: "7.490", pesados: "1.090", transferidos: "49.980" }
    ],
    citiesByState: {
      PR: [
        { city: "Curitiba", carros: "4.920", motos: "3.180", pesados: "340", transferidos: "18.440" },
        { city: "Maringá", carros: "1.640", motos: "1.180", pesados: "120", transferidos: "5.930" },
        { city: "Londrina", carros: "1.520", motos: "1.090", pesados: "110", transferidos: "5.410" },
        { city: "Guarapuava", carros: "640", motos: "460", pesados: "55", transferidos: "2.160" },
        { city: "Campo Mourão", carros: "410", motos: "290", pesados: "38", transferidos: "1.360" }
      ],
      SP: [
        { city: "São Paulo", carros: "12.460", motos: "8.820", pesados: "980", transferidos: "61.220" },
        { city: "Campinas", carros: "3.140", motos: "2.180", pesados: "260", transferidos: "11.580" },
        { city: "Ribeirão Preto", carros: "2.060", motos: "1.420", pesados: "180", transferidos: "8.240" },
        { city: "São José dos Campos", carros: "1.780", motos: "1.210", pesados: "170", transferidos: "6.920" },
        { city: "Sorocaba", carros: "1.620", motos: "1.080", pesados: "150", transferidos: "6.410" }
      ],
      MG: [
        { city: "Belo Horizonte", carros: "4.380", motos: "3.020", pesados: "310", transferidos: "17.620" },
        { city: "Uberlândia", carros: "1.740", motos: "1.260", pesados: "150", transferidos: "6.580" },
        { city: "Contagem", carros: "1.120", motos: "780", pesados: "120", transferidos: "4.260" },
        { city: "Juiz de Fora", carros: "980", motos: "710", pesados: "90", transferidos: "3.880" },
        { city: "Montes Claros", carros: "760", motos: "590", pesados: "70", transferidos: "2.920" }
      ],
      RJ: [
        { city: "Rio de Janeiro", carros: "5.140", motos: "3.340", pesados: "290", transferidos: "23.700" },
        { city: "Niterói", carros: "1.080", motos: "760", pesados: "70", transferidos: "4.460" },
        { city: "Duque de Caxias", carros: "860", motos: "620", pesados: "90", transferidos: "3.980" },
        { city: "Nova Iguaçu", carros: "790", motos: "580", pesados: "60", transferidos: "3.420" },
        { city: "Campos dos Goytacazes", carros: "620", motos: "470", pesados: "50", transferidos: "2.680" }
      ],
      RS: [
        { city: "Porto Alegre", carros: "2.980", motos: "2.040", pesados: "240", transferidos: "12.440" },
        { city: "Caxias do Sul", carros: "1.220", motos: "840", pesados: "130", transferidos: "4.940" },
        { city: "Canoas", carros: "840", motos: "590", pesados: "70", transferidos: "3.260" },
        { city: "Pelotas", carros: "690", motos: "510", pesados: "55", transferidos: "2.860" },
        { city: "Santa Maria", carros: "610", motos: "450", pesados: "48", transferidos: "2.430" }
      ]
    },
    insights: [
      { title: "Carros em alta", text: "Carros avançaram no período e mantêm recuperação sobre o mês anterior." },
      { title: "Motos aquecidas", text: "Motos seguem crescendo acima do mercado e puxam o volume nacional." },
      { title: "Crédito em destaque", text: "Financiamentos indicam demanda ativa no setor." },
      { title: "Força regional", text: "SP lidera o mercado; PR aparece entre os estados de maior atividade." },
      { title: "FIPE monitorada", text: "Rankings por faixa de preço podem ser atualizados automaticamente." }
    ],
    news: [
      { title: "Motos mantêm ritmo forte e puxam crescimento do setor", tag: "Motos" },
      { title: "Financiamentos avançam e indicam mercado mais aquecido", tag: "Crédito" },
      { title: "Paraná aparece entre os estados mais ativos em transferências", tag: "Regiões" }
    ],
    sources: [
      { name: "Fenabrave", use: "Emplacamentos, rankings e veículos mais vendidos", frequency: "Mensal / automático" },
      { name: "SENATRAN", use: "Frota por estado, município e tipo de veículo", frequency: "Mensal / automático" },
      { name: "FIPE", use: "Preço médio de veículos por modelo, ano e versão", frequency: "Diário / automático" },
      { name: "Banco Central", use: "Crédito, financiamento e séries econômicas", frequency: "Mensal / automático" },
      { name: "B3 / SNG", use: "Indicadores ligados a financiamentos e gravames", frequency: "Mensal / automático" },
      { name: "ANFAVEA + IBGE", use: "Contexto econômico, produção e mercado nacional", frequency: "Mensal / automático" }
    ]
  };
}

