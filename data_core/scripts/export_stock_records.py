from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from data_core.haitou_samurai.workbook_xlsx import read_xlsx_table_records

DEFAULT_SHEET_NAME = "All sorce"

EU_COUNTRIES = {
    "Austria",
    "Belgium",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Ireland",
    "Italy",
    "Luxembourg",
    "Netherlands",
    "Norway",
    "Portugal",
    "Spain",
    "Sweden",
    "Switzerland",
    "United Kingdom",
}


def export_stock_records(workbook_path: Path, *, sheet_name: str = DEFAULT_SHEET_NAME) -> list[dict[str, Any]]:
    rows = read_xlsx_table_records(workbook_path, sheet_name=sheet_name)
    records: list[dict[str, Any]] = []

    for row in rows:
        ticker = _clean_text(row.get("Ticker")).upper()
        if not ticker:
            continue

        name = _clean_text(row.get("Company")) or ticker
        records.append(
            {
                "ticker": ticker,
                "name": name,
                "region": _region_for_country(_clean_text(row.get("Country"))),
                "sector": _clean_text(row.get("Sector")) or "Unclassified",
                "dividendYield": _percent(row.get("Dividend Yield")),
                "payoutRatio": _percent(row.get("Payout Ratio")),
                "roe": _percent(row.get("Return on Equity")),
                "roa": _percent(row.get("Return on Assets")),
                "returnOnInvestment": _percent(row.get("Return on Investment")),
                "operatingMargin": _percent(row.get("Operating Margin")),
                "netProfitMargin": _percent(row.get("Profit Margin")),
                "epsGrowthThisYear": _percent(row.get("EPS growth this year")),
                "epsGrowth5y": _percent(row.get("EPS growth past 5 years")),
                "performanceYear": _percent(row.get("Performance (Year)")),
                "currentRatio": _number(row.get("Current Ratio")),
                "quickRatio": _number(row.get("Quick Ratio")),
                "ltDebtToEquity": _number(row.get("LT Debt/Equity")),
                "totalDebtToEquity": _number(row.get("Total Debt/Equity")),
                "marketCapUsdBn": _market_cap_usd_bn(row.get("Market Cap")),
                "dividendGrowthYears": 0,
                "currency": "USD",
                "price": _number(row.get("Price")),
            }
        )

    return records


def _clean_text(value: Any) -> str:
    text = "" if value is None else str(value).strip()
    return "" if text in {"", "-"} else text


def _number(value: Any) -> float:
    if value is None:
        return 0.0
    if isinstance(value, bool):
        return 0.0
    if isinstance(value, (int, float)):
        return round(float(value), 4)

    text = str(value).replace(",", "").strip()
    if not text or text == "-":
        return 0.0
    if text.endswith("%"):
        text = text[:-1]

    try:
        return round(float(text), 4)
    except ValueError:
        return 0.0


def _percent(value: Any) -> float:
    return round(_number(value) * 100, 3)


def _market_cap_usd_bn(value: Any) -> float:
    number = _number(value)
    if abs(number) >= 1_000:
        number /= 1_000
    return round(number, 3)


def _region_for_country(country: str) -> str:
    if country in {"USA", "United States"}:
        return "US"
    if country == "Japan":
        return "JP"
    if country in EU_COUNTRIES:
        return "EU"
    return "GLOBAL"


def main() -> None:
    parser = argparse.ArgumentParser(description="Export public stock display records from the processed workbook.")
    parser.add_argument("--workbook", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--sheet", default=DEFAULT_SHEET_NAME)
    args = parser.parse_args()

    records = export_stock_records(args.workbook, sheet_name=args.sheet)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
    print(f"Wrote {len(records)} stock records to {args.output}")


if __name__ == "__main__":
    main()
