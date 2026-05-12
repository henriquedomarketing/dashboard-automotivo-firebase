const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
}

const fipeBandsReal = `[
      {
        title: "Até 30 mil",
        items: [
          "Fiat Uno 1.0 2014",
          "Volkswagen Gol 1.0 2014",
          "Renault Sandero 1.0 2015",
          "Chevrolet Celta 1.0 2015",
          "Ford Ka 1.0 2015",
          "Fiat Palio 1.0 2014",
          "Nissan March 1.0 2014",
          "Peugeot 207 1.4 2013",
          "Citroën C3 1.4 2013",
          "Fiat Siena 1.0 2012",
          "Chevrolet Classic 1.0 2014",
          "Ford Fiesta 1.0 2013",
          "Volkswagen Fox 1.0 2012",
          "Renault Clio 1.0 2014",
          "Fiat Punto 1.4 2012",
          "Hyundai HB20 1.0 2013",
          "Toyota Etios 1.3 2013",
          "Chevrolet Agile 1.4 2012",
          "Volkswagen Voyage 1.0 2013",
          "Fiat Grand Siena 1.4 2013"
        ]
      },
      {
        title: "Até 60 mil",
        items: [
          "Hyundai HB20 1.0 2020",
          "Chevrolet Onix 1.0 2020",
          "Volkswagen Polo 1.0 2019",
          "Fiat Argo 1.0 2020",
          "Renault Kwid Zen 2022",
          "Ford Ka SE 2020",
          "Toyota Etios 1.3 2019",
          "Peugeot 208 Active 2021",
          "Citroën C3 Live 2022",
          "Nissan Versa 1.6 2019",
          "Volkswagen Gol 1.6 2021",
          "Chevrolet Prisma 1.4 2019",
          "Fiat Cronos 1.3 2020",
          "Renault Sandero 1.0 2021",
          "Honda Fit LX 2018",
          "Hyundai Creta Attitude 2018",
          "Jeep Renegade Sport 2017",
          "Toyota Corolla GLI 2016",
          "Volkswagen Virtus MSI 2019",
          "Nissan Kicks S 2018"
        ]
      },
      {
        title: "Até 90 mil",
        items: [
          "Chevrolet Tracker 2021",
          "Hyundai Creta 2020",
          "Volkswagen T-Cross 2020",
          "Honda HR-V 2019",
          "Jeep Renegade 2021",
          "Toyota Corolla 2018",
          "Nissan Kicks 2021",
          "Fiat Pulse 2022",
          "Volkswagen Virtus 2021",
          "Honda City 2021",
          "Chevrolet Onix Plus 2022",
          "Fiat Toro Freedom 2019",
          "Renault Duster Iconic 2021",
          "Peugeot 2008 Allure 2022",
          "Citroën C4 Cactus 2021",
          "Hyundai HB20S Platinum 2022",
          "Toyota Yaris Sedan 2022",
          "Volkswagen Nivus 2021",
          "Chevrolet Spin Premier 2021",
          "Jeep Compass Sport 2018"
        ]
      },
      {
        title: "Até 150 mil",
        items: [
          "Toyota Corolla Cross 2023",
          "Jeep Compass Longitude 2022",
          "Volkswagen Taos Comfortline 2022",
          "Honda HR-V Touring 2023",
          "Fiat Toro Volcano 2023",
          "Toyota Corolla XEi 2023",
          "Chevrolet Tracker Premier 2023",
          "Hyundai Creta Platinum 2023",
          "Nissan Kicks Exclusive 2023",
          "Renault Duster Iconic 2023",
          "Caoa Chery Tiggo 5X Pro 2023",
          "Mitsubishi Eclipse Cross 2021",
          "Peugeot 3008 Griffe 2020",
          "Jeep Renegade Trailhawk 2023",
          "Volkswagen Nivus Highline 2023",
          "Honda City Touring 2023",
          "Toyota Yaris XLS 2023",
          "Chevrolet Montana Premier 2023",
          "Ford Territory SEL 2021",
          "Fiat Fastback Limited 2023"
        ]
      },
      {
        title: "Até 250 mil",
        items: [
          "Toyota SW4 2021",
          "Jeep Commander 2023",
          "Ford Ranger XLT 2023",
          "Toyota Hilux SRX 2022",
          "Chevrolet S10 High Country 2023",
          "Mitsubishi L200 Triton 2023",
          "Volkswagen Amarok Highline 2022",
          "Caoa Chery Tiggo 8 Pro 2023",
          "GWM Haval H6 2023",
          "BYD Song Plus 2023",
          "Honda Civic Touring 2021",
          "Toyota Corolla Altis Hybrid 2023",
          "Jeep Compass Limited 2023",
          "Ford Territory Titanium 2023",
          "Kia Sportage EX 2022",
          "Hyundai Tucson GLS 2022",
          "Volvo XC40 T4 2020",
          "BMW X1 sDrive20i 2020",
          "Audi Q3 Prestige 2020",
          "Mercedes-Benz GLA 200 2020"
        ]
      },
      {
        title: "Até 500 mil",
        items: [
          "BMW X5 2021",
          "Porsche Macan 2020",
          "Mercedes-Benz GLE 2020",
          "Audi Q7 2021",
          "Volvo XC90 2021",
          "RAM 1500 2022",
          "Toyota SW4 Diamond 2023",
          "Ford Bronco Sport 2022",
          "Land Rover Discovery Sport 2021",
          "Jeep Grand Cherokee 2022",
          "BMW 330i M Sport 2023",
          "Mercedes-Benz C300 2022",
          "Audi A5 Sportback 2022",
          "Volvo XC60 Recharge 2022",
          "Porsche Cayenne 2019",
          "BMW X3 xDrive30e 2022",
          "Mercedes-Benz GLC 300 2022",
          "Audi Q5 Performance 2022",
          "Lexus NX 300h 2021",
          "BYD Tan EV 2023"
        ]
      }
    ]`;

const sourcesReal = `[
      { name: "Fenabrave", use: "Emplacamentos, rankings e veículos mais vendidos", frequency: "Mensal / automático" },
      { name: "SENATRAN", use: "Frota por estado, município e tipo de veículo", frequency: "Mensal / automático" },
      { name: "FIPE", use: "Preço médio de veículos por modelo, ano e versão", frequency: "Diário / automático" },
      { name: "Banco Central", use: "Crédito, financiamento e séries econômicas", frequency: "Mensal / automático" },
      { name: "B3 / SNG", use: "Indicadores ligados a financiamentos e gravames", frequency: "Mensal / automático" },
      { name: "ANFAVEA + IBGE", use: "Contexto econômico, produção e mercado nacional", frequency: "Mensal / automático" }
    ]`;

const sourceLinksBlock = `const sourceLinks: Record<string, string> = {
  "Fenabrave": "https://www.fenabrave.org.br/relatorios/rel_MaisVendidos.asp",
  "SENATRAN": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/frota-de-veiculos-2026",
  "FIPE": "https://www.fipe.org.br/pt-br/indices/veiculos",
  "Banco Central": "https://www4.bcb.gov.br/pec/series/port/aviso.asp",
  "B3 / SNG": "https://www.b3.com.br/",
  "ANFAVEA + IBGE": "https://anfavea.com.br/"
};`;

// Corrige banco / seed
let demo = read("functions/src/demoData.ts");

demo = demo.replace(/fipeBands:\s*\[[\s\S]*?\],\s*states:/, `fipeBands: ${fipeBandsReal},\n    states:`);
demo = demo.replace(/sources:\s*\[[\s\S]*?\]\s*};/, `sources: ${sourcesReal}\n  };`);

write("functions/src/demoData.ts", demo);

// Corrige front
let app = read("src/App.tsx");

if (app.includes("const sourceLinks")) {
  app = app.replace(/const sourceLinks:[\s\S]*?\};/, sourceLinksBlock);
} else {
  app = app.replace(/const footerPages/, `${sourceLinksBlock}\n\nconst footerPages`);
}

app = app.replace(/<span className="external-pill">Abrir fonte \?<\/span>/g, `<span className="external-pill">Abrir fonte</span>`);
app = app.replace(/<span className="external-pill">Abrir fonte ↗<\/span>/g, `<span className="external-pill">Abrir fonte</span>`);

write("src/App.tsx", app);

console.log("OK - FIPE com carros reais e fontes oficiais clicáveis corrigidas.");
