import { calculateDividendSignal, type StockMetricInput } from "@/lib/scoring/dividend-score";

export type StockRecord = StockMetricInput & {
  currency: "USD" | "JPY" | "KRW" | "EUR";
  price: number;
};

export const sampleStocks: StockRecord[] = [
  { ticker: "2914.T", name: "Japan Tobacco", region: "JP", sector: "Consumer Staples", dividendYield: 4.7, payoutRatio: 72, roe: 14, roa: 6, operatingMargin: 24, epsGrowth5y: 4, currentRatio: 1.5, quickRatio: 0.9, debtToEquity: 0.58, marketCapUsdBn: 51, dividendGrowthYears: 8, currency: "JPY", price: 4200 },
  { ticker: "8593.T", name: "Mitsubishi HC Capital", region: "JP", sector: "Financials", dividendYield: 3.4, payoutRatio: 41, roe: 9, roa: 1.8, operatingMargin: 18, epsGrowth5y: 7, currentRatio: 1.3, quickRatio: 0.9, debtToEquity: 2.1, marketCapUsdBn: 10, dividendGrowthYears: 25, currency: "JPY", price: 1080 },
  { ticker: "8306.T", name: "Mitsubishi UFJ Financial", region: "JP", sector: "Financials", dividendYield: 3.1, payoutRatio: 34, roe: 8, roa: 0.5, operatingMargin: 28, epsGrowth5y: 9, currentRatio: 1.1, quickRatio: 0.8, debtToEquity: 1.8, marketCapUsdBn: 155, dividendGrowthYears: 6, currency: "JPY", price: 1820 },
  { ticker: "9432.T", name: "NTT", region: "JP", sector: "Telecom", dividendYield: 3.0, payoutRatio: 36, roe: 13, roa: 5, operatingMargin: 17, epsGrowth5y: 3, currentRatio: 1.0, quickRatio: 0.8, debtToEquity: 1.1, marketCapUsdBn: 90, dividendGrowthYears: 13, currency: "JPY", price: 165 },
  { ticker: "8058.T", name: "Mitsubishi Corp", region: "JP", sector: "Industrials", dividendYield: 3.6, payoutRatio: 39, roe: 12, roa: 5.5, operatingMargin: 9, epsGrowth5y: 6, currentRatio: 1.4, quickRatio: 1.0, debtToEquity: 0.75, marketCapUsdBn: 80, dividendGrowthYears: 9, currency: "JPY", price: 3200 },
  { ticker: "7203.T", name: "Toyota Motor", region: "JP", sector: "Consumer Discretionary", dividendYield: 2.6, payoutRatio: 28, roe: 13, roa: 5, operatingMargin: 11, epsGrowth5y: 8, currentRatio: 1.2, quickRatio: 0.9, debtToEquity: 1.0, marketCapUsdBn: 330, dividendGrowthYears: 4, currency: "JPY", price: 3100 },
  { ticker: "KO", name: "Coca-Cola", region: "US", sector: "Consumer Staples", dividendYield: 3.0, payoutRatio: 68, roe: 40, roa: 10, operatingMargin: 29, epsGrowth5y: 6, currentRatio: 1.1, quickRatio: 0.8, debtToEquity: 1.5, marketCapUsdBn: 270, dividendGrowthYears: 62, currency: "USD", price: 62 },
  { ticker: "JNJ", name: "Johnson & Johnson", region: "US", sector: "Healthcare", dividendYield: 3.1, payoutRatio: 49, roe: 19, roa: 8, operatingMargin: 23, epsGrowth5y: 4, currentRatio: 1.3, quickRatio: 1.0, debtToEquity: 0.55, marketCapUsdBn: 380, dividendGrowthYears: 61, currency: "USD", price: 158 },
  { ticker: "PG", name: "Procter & Gamble", region: "US", sector: "Consumer Staples", dividendYield: 2.5, payoutRatio: 61, roe: 31, roa: 12, operatingMargin: 25, epsGrowth5y: 7, currentRatio: 0.9, quickRatio: 0.6, debtToEquity: 0.7, marketCapUsdBn: 390, dividendGrowthYears: 67, currency: "USD", price: 166 },
  { ticker: "SCHD", name: "Schwab US Dividend Equity ETF", region: "US", sector: "ETF", dividendYield: 3.5, payoutRatio: 55, roe: 18, roa: 7, operatingMargin: 21, epsGrowth5y: 6, currentRatio: 1.4, quickRatio: 1.0, debtToEquity: 0.65, marketCapUsdBn: 60, dividendGrowthYears: 12, currency: "USD", price: 78 },
  { ticker: "T", name: "AT&T", region: "US", sector: "Telecom", dividendYield: 5.4, payoutRatio: 62, roe: 8, roa: 3, operatingMargin: 20, epsGrowth5y: -3, currentRatio: 0.8, quickRatio: 0.6, debtToEquity: 1.3, marketCapUsdBn: 125, dividendGrowthYears: 1, currency: "USD", price: 17 },
  { ticker: "VZ", name: "Verizon", region: "US", sector: "Telecom", dividendYield: 6.1, payoutRatio: 78, roe: 9, roa: 3.5, operatingMargin: 22, epsGrowth5y: -1, currentRatio: 0.7, quickRatio: 0.6, debtToEquity: 1.6, marketCapUsdBn: 165, dividendGrowthYears: 18, currency: "USD", price: 39 },
  { ticker: "MMM", name: "3M", region: "US", sector: "Industrials", dividendYield: 5.8, payoutRatio: 96, roe: 11, roa: 5, operatingMargin: 15, epsGrowth5y: -5, currentRatio: 1.1, quickRatio: 0.7, debtToEquity: 2.0, marketCapUsdBn: 58, dividendGrowthYears: 0, currency: "USD", price: 105 },
  { ticker: "O", name: "Realty Income", region: "US", sector: "REIT", dividendYield: 5.7, payoutRatio: 82, roe: 4, roa: 2.4, operatingMargin: 37, epsGrowth5y: 3, currentRatio: 1.6, quickRatio: 1.1, debtToEquity: 0.75, marketCapUsdBn: 48, dividendGrowthYears: 29, currency: "USD", price: 55 },
  { ticker: "BTI", name: "British American Tobacco", region: "EU", sector: "Consumer Staples", dividendYield: 8.9, payoutRatio: 70, roe: 9, roa: 3, operatingMargin: 41, epsGrowth5y: 1, currentRatio: 0.9, quickRatio: 0.5, debtToEquity: 0.9, marketCapUsdBn: 70, dividendGrowthYears: 5, currency: "USD", price: 31 },
  { ticker: "SHEL", name: "Shell", region: "EU", sector: "Energy", dividendYield: 4.0, payoutRatio: 38, roe: 13, roa: 6, operatingMargin: 12, epsGrowth5y: 9, currentRatio: 1.2, quickRatio: 0.9, debtToEquity: 0.45, marketCapUsdBn: 215, dividendGrowthYears: 3, currency: "USD", price: 68 },
  { ticker: "005930.KS", name: "Samsung Electronics", region: "KR", sector: "Technology", dividendYield: 2.1, payoutRatio: 43, roe: 10, roa: 7, operatingMargin: 16, epsGrowth5y: 5, currentRatio: 2.4, quickRatio: 1.8, debtToEquity: 0.12, marketCapUsdBn: 380, dividendGrowthYears: 8, currency: "KRW", price: 76000 },
  { ticker: "000660.KS", name: "SK Hynix", region: "KR", sector: "Technology", dividendYield: 1.3, payoutRatio: 28, roe: 14, roa: 8, operatingMargin: 22, epsGrowth5y: 10, currentRatio: 1.9, quickRatio: 1.2, debtToEquity: 0.35, marketCapUsdBn: 120, dividendGrowthYears: 2, currency: "KRW", price: 180000 },
  { ticker: "BHP", name: "BHP Group", region: "GLOBAL", sector: "Materials", dividendYield: 5.2, payoutRatio: 64, roe: 28, roa: 14, operatingMargin: 34, epsGrowth5y: 2, currentRatio: 1.6, quickRatio: 1.0, debtToEquity: 0.42, marketCapUsdBn: 150, dividendGrowthYears: 4, currency: "USD", price: 58 },
  { ticker: "ENB", name: "Enbridge", region: "GLOBAL", sector: "Energy Infrastructure", dividendYield: 7.3, payoutRatio: 118, roe: 7, roa: 2.6, operatingMargin: 19, epsGrowth5y: 1, currentRatio: 0.8, quickRatio: 0.6, debtToEquity: 1.4, marketCapUsdBn: 75, dividendGrowthYears: 29, currency: "USD", price: 36 },
  { ticker: "RIO", name: "Rio Tinto", region: "GLOBAL", sector: "Materials", dividendYield: 6.0, payoutRatio: 72, roe: 21, roa: 12, operatingMargin: 29, epsGrowth5y: -1, currentRatio: 1.7, quickRatio: 1.2, debtToEquity: 0.31, marketCapUsdBn: 110, dividendGrowthYears: 3, currency: "USD", price: 62 },
  { ticker: "MO", name: "Altria", region: "US", sector: "Consumer Staples", dividendYield: 9.1, payoutRatio: 77, roe: 0, roa: 9, operatingMargin: 58, epsGrowth5y: 3, currentRatio: 0.7, quickRatio: 0.3, debtToEquity: 3.2, marketCapUsdBn: 72, dividendGrowthYears: 54, currency: "USD", price: 42 },
  { ticker: "QYLD", name: "Global X Nasdaq 100 Covered Call ETF", region: "US", sector: "ETF", dividendYield: 11.4, payoutRatio: 104, roe: 5, roa: 4, operatingMargin: 8, epsGrowth5y: -2, currentRatio: 1.1, quickRatio: 1.1, debtToEquity: 0.05, marketCapUsdBn: 8, dividendGrowthYears: 0, currency: "USD", price: 18 },
  { ticker: "DEMO", name: "Mirage Yield Sample", region: "GLOBAL", sector: "Demo", dividendYield: 13.2, payoutRatio: 145, roe: 1, roa: 0.5, operatingMargin: 4, epsGrowth5y: -12, currentRatio: 0.6, quickRatio: 0.3, debtToEquity: 2.8, marketCapUsdBn: 2, dividendGrowthYears: 0, currency: "USD", price: 9 }
];

export const stockSignals = sampleStocks.map((stock) => ({
  ...stock,
  signal: calculateDividendSignal(stock)
}));

export type StockSignalRecord = (typeof stockSignals)[number];
