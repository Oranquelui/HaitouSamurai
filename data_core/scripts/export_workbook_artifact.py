from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from data_core.haitou_samurai.workbook_artifact import export_workbook_artifact


def main() -> int:
    parser = argparse.ArgumentParser(description="Export workbook assumptions as a public JSON artifact.")
    parser.add_argument("--workbook", required=True, type=Path, help="Path to the private source workbook.")
    parser.add_argument("--output", required=True, type=Path, help="Path for the generated JSON artifact.")
    args = parser.parse_args()

    artifact = export_workbook_artifact(args.workbook)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
