import { buildDashboardData } from "./demoData";

export async function collectMarketData() {
  const fallback = buildDashboardData();

  // Aqui entram os coletores reais:
  // Fenabrave -> rankings e emplacamentos
  // SENATRAN -> estados e cidades
  // FIPE -> preços por faixa
  //
  // Enquanto não conectamos cada fonte, o robô usa fallback seguro.
  return fallback;
}

