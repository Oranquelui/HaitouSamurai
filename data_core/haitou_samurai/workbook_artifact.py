from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from data_core.haitou_samurai.workbook_xlsx import read_xlsx_cells

EXPORT_SHEET = "Export Pivot from cust"
BUDGET_CELL = "AF2"
FX_CELL = "AJ3"
JAPAN_LISTED_SECURITIES_TAX_RATE = 0.20315


def export_workbook_artifact(workbook_path: Path) -> dict[str, Any]:
    cells = read_xlsx_cells(workbook_path, sheet_name=EXPORT_SHEET, cell_refs=[BUDGET_CELL, FX_CELL])
    fx_rate = _coerce_float(cells[FX_CELL].value, f"{EXPORT_SHEET}!{FX_CELL}")

    return {
        "schemaVersion": 1,
        "workbookName": workbook_path.name,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceCurrency": "USD",
        "reportingCurrency": "JPY",
        "fx": {
            "cell": f"{EXPORT_SHEET}!{FX_CELL}",
            "rate": fx_rate,
            "formula": cells[FX_CELL].formula,
            "description": "USD source amounts are converted into JPY reporting values.",
        },
        "tax": {
            "jurisdiction": "JP",
            "thresholdJpy": 2_500_000,
            "rate": JAPAN_LISTED_SECURITIES_TAX_RATE,
            "incomeAndReconstructionRate": 0.15315,
            "localTaxRate": 0.05,
            "sourceName": "National Tax Agency No.1331",
            "sourceUrl": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1331.htm",
            "rule": "Apply Japan listed-securities tax only to the JPY amount above the threshold.",
        },
        "labelNormalizations": [
            {
                "sheet": EXPORT_SHEET,
                "cell": BUDGET_CELL,
                "canonicalLabel": "Budget JPY",
                "policy": "rewrite-to-jpy",
            }
        ],
        "publicBoundary": {
            "positioning": "data processing and visualization",
            "notAdvice": True,
        },
    }


def _coerce_float(value: str | int | float | None, cell_ref: str) -> float:
    if value is None:
        raise ValueError(f"Cell {cell_ref} does not contain a cached numeric value")

    try:
        return float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"Cell {cell_ref} must contain a numeric value") from exc
