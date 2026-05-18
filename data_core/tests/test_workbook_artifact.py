import json
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "data_core" / "scripts" / "export_workbook_artifact.py"
STOCK_SCRIPT = ROOT / "data_core" / "scripts" / "export_stock_records.py"

sys.path.insert(0, str(ROOT))


def write_minimal_workbook(path: Path, *, budget_header: str = "Legacy budget header", fx_value: str = "145.96") -> None:
    sheet_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row r="2">
      <c r="AF2" t="inlineStr"><is><t>{escape(budget_header)}</t></is></c>
    </row>
    <row r="3">
      <c r="AJ3"><f>_FV(AJ2,&quot;Price&quot;)</f><v>{escape(fx_value)}</v></c>
    </row>
  </sheetData>
</worksheet>
"""

    files = {
        "[Content_Types].xml": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
""",
        "_rels/.rels": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
""",
        "xl/workbook.xml": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Export Pivot from cust" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
""",
        "xl/_rels/workbook.xml.rels": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>
""",
        "xl/worksheets/sheet1.xml": sheet_xml,
    }

    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as workbook:
      for archive_name, content in files.items():
          workbook.writestr(archive_name, content)


def write_stock_universe_workbook(path: Path) -> None:
    sheet_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row r="1">
      <c r="A1" t="inlineStr"><is><t>Ticker</t></is></c>
      <c r="B1" t="inlineStr"><is><t>Company</t></is></c>
      <c r="C1" t="inlineStr"><is><t>Country</t></is></c>
      <c r="D1" t="inlineStr"><is><t>Sector</t></is></c>
      <c r="E1" t="inlineStr"><is><t>Dividend Yield</t></is></c>
      <c r="F1" t="inlineStr"><is><t>Payout Ratio</t></is></c>
      <c r="G1" t="inlineStr"><is><t>Return on Equity</t></is></c>
      <c r="H1" t="inlineStr"><is><t>Return on Assets</t></is></c>
      <c r="I1" t="inlineStr"><is><t>Return on Investment</t></is></c>
      <c r="J1" t="inlineStr"><is><t>Operating Margin</t></is></c>
      <c r="K1" t="inlineStr"><is><t>Profit Margin</t></is></c>
      <c r="L1" t="inlineStr"><is><t>EPS growth this year</t></is></c>
      <c r="M1" t="inlineStr"><is><t>EPS growth past 5 years</t></is></c>
      <c r="N1" t="inlineStr"><is><t>Performance (Year)</t></is></c>
      <c r="O1" t="inlineStr"><is><t>Current Ratio</t></is></c>
      <c r="P1" t="inlineStr"><is><t>Quick Ratio</t></is></c>
      <c r="Q1" t="inlineStr"><is><t>LT Debt/Equity</t></is></c>
      <c r="R1" t="inlineStr"><is><t>Total Debt/Equity</t></is></c>
      <c r="S1" t="inlineStr"><is><t>Market Cap</t></is></c>
      <c r="T1" t="inlineStr"><is><t>Price</t></is></c>
    </row>
    <row r="2">
      <c r="A2" t="inlineStr"><is><t>A</t></is></c>
      <c r="B2" t="inlineStr"><is><t>Agilent Technologies</t></is></c>
      <c r="C2" t="inlineStr"><is><t>USA</t></is></c>
      <c r="D2" t="inlineStr"><is><t>Healthcare</t></is></c>
      <c r="E2"><v>0.008</v></c>
      <c r="F2"><v>0.31</v></c>
      <c r="G2"><v>0.18</v></c>
      <c r="H2"><v>0.08</v></c>
      <c r="I2"><v>0.11</v></c>
      <c r="J2"><v>0.21</v></c>
      <c r="K2"><v>0.14</v></c>
      <c r="L2"><v>0.06</v></c>
      <c r="M2"><v>0.05</v></c>
      <c r="N2"><v>0.12</v></c>
      <c r="O2"><v>1.7</v></c>
      <c r="P2"><v>1.2</v></c>
      <c r="Q2"><v>0.33</v></c>
      <c r="R2"><v>0.47</v></c>
      <c r="S2"><v>38450</v></c>
      <c r="T2"><v>138.25</v></c>
    </row>
    <row r="3">
      <c r="A3" t="inlineStr"><is><t>AAON</t></is></c>
      <c r="B3" t="inlineStr"><is><t>AAON Inc.</t></is></c>
      <c r="C3" t="inlineStr"><is><t>USA</t></is></c>
      <c r="D3" t="inlineStr"><is><t>Industrials</t></is></c>
      <c r="E3"><v>0.004</v></c>
      <c r="F3"><v>0.24</v></c>
      <c r="G3"><v>0.22</v></c>
      <c r="H3"><v>0.14</v></c>
      <c r="I3"><v>0.18</v></c>
      <c r="J3"><v>0.19</v></c>
      <c r="K3"><v>0.12</v></c>
      <c r="L3"><v>0.09</v></c>
      <c r="M3"><v>0.11</v></c>
      <c r="N3"><v>0.22</v></c>
      <c r="O3"><v>2.1</v></c>
      <c r="P3"><v>1.5</v></c>
      <c r="Q3"><v>0.12</v></c>
      <c r="R3"><v>0.18</v></c>
      <c r="S3"><v>7200</v></c>
      <c r="T3"><v>88.1</v></c>
    </row>
  </sheetData>
</worksheet>
"""

    files = {
        "[Content_Types].xml": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
""",
        "_rels/.rels": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
""",
        "xl/workbook.xml": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="All sorce" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
""",
        "xl/_rels/workbook.xml.rels": """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>
""",
        "xl/worksheets/sheet1.xml": sheet_xml,
    }

    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as workbook:
        for archive_name, content in files.items():
            workbook.writestr(archive_name, content)


class WorkbookArtifactTests(unittest.TestCase):
    def test_workbook_artifact_uses_python_39_compatible_utc(self) -> None:
        source = (ROOT / "data_core" / "haitou_samurai" / "workbook_artifact.py").read_text()

        self.assertIn("timezone.utc", source)
        self.assertNotIn("from datetime import UTC", source)
        self.assertNotIn("datetime.now(UTC)", source)

    def test_exports_workbook_currency_assumptions_without_source_header_text(self) -> None:
        from data_core.haitou_samurai.workbook_artifact import export_workbook_artifact

        with tempfile.TemporaryDirectory() as tmp:
            workbook_path = Path(tmp) / "sample.xlsx"
            write_minimal_workbook(workbook_path)

            artifact = export_workbook_artifact(workbook_path)

        self.assertEqual(artifact["schemaVersion"], 1)
        self.assertEqual(artifact["sourceCurrency"], "USD")
        self.assertEqual(artifact["reportingCurrency"], "JPY")
        self.assertEqual(artifact["fx"]["cell"], "Export Pivot from cust!AJ3")
        self.assertEqual(artifact["fx"]["rate"], 145.96)
        self.assertEqual(artifact["tax"]["thresholdJpy"], 2_500_000)
        self.assertEqual(artifact["tax"]["rate"], 0.20315)
        self.assertEqual(artifact["tax"]["jurisdiction"], "JP")
        self.assertEqual(artifact["tax"]["sourceName"], "National Tax Agency No.1331")
        self.assertEqual(artifact["labelNormalizations"], [
            {
                "sheet": "Export Pivot from cust",
                "cell": "AF2",
                "canonicalLabel": "Budget JPY",
                "policy": "rewrite-to-jpy",
            }
        ])
        self.assertNotIn("observedLabel", json.dumps(artifact))

    def test_cli_writes_artifact_json(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workbook_path = Path(tmp) / "sample.xlsx"
            output_path = Path(tmp) / "artifact.json"
            write_minimal_workbook(workbook_path)

            result = subprocess.run(
                [sys.executable, str(SCRIPT), "--workbook", str(workbook_path), "--output", str(output_path)],
                check=True,
                capture_output=True,
                text=True,
            )

            artifact = json.loads(output_path.read_text())

        self.assertIn(str(output_path), result.stdout)
        self.assertEqual(artifact["fx"]["rate"], 145.96)
        self.assertEqual(artifact["workbookName"], "sample.xlsx")

    def test_reads_sheet_records_by_header_from_workbook(self) -> None:
        from data_core.haitou_samurai.workbook_xlsx import read_xlsx_table_records

        with tempfile.TemporaryDirectory() as tmp:
            workbook_path = Path(tmp) / "stocks.xlsx"
            write_stock_universe_workbook(workbook_path)

            records = read_xlsx_table_records(workbook_path, sheet_name="All sorce")

        self.assertEqual([record["Ticker"] for record in records], ["A", "AAON"])
        self.assertEqual(records[0]["Company"], "Agilent Technologies")
        self.assertEqual(records[1]["Dividend Yield"], 0.004)

    def test_stock_cli_exports_display_records_from_workbook_universe(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workbook_path = Path(tmp) / "stocks.xlsx"
            output_path = Path(tmp) / "stocks.json"
            write_stock_universe_workbook(workbook_path)

            result = subprocess.run(
                [sys.executable, str(STOCK_SCRIPT), "--workbook", str(workbook_path), "--output", str(output_path)],
                check=True,
                capture_output=True,
                text=True,
            )

            records = json.loads(output_path.read_text())

        self.assertIn(str(output_path), result.stdout)
        self.assertEqual([record["ticker"] for record in records], ["A", "AAON"])
        self.assertEqual(records[0]["region"], "US")
        self.assertEqual(records[0]["dividendYield"], 0.8)
        self.assertEqual(records[0]["payoutRatio"], 31.0)
        self.assertEqual(records[0]["marketCapUsdBn"], 38.45)


if __name__ == "__main__":
    unittest.main()
