import { calculateDividendSignal, type StockMetricInput } from "@/lib/scoring/dividend-score";
import workbookStockRows from "./workbook-stocks.generated.json";

export type StockRecord = StockMetricInput & {
  currency: "USD" | "JPY" | "EUR";
  price: number;
};

export const sampleStocks = workbookStockRows as StockRecord[];

export const stockSignals = sampleStocks.map((stock) => ({
  ...stock,
  signal: calculateDividendSignal(stock)
}));

export type StockSignalRecord = (typeof stockSignals)[number];
