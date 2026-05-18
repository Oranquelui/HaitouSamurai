from __future__ import annotations

from dataclasses import dataclass
import posixpath
from pathlib import Path
import re
from typing import Iterable
import zipfile
import xml.etree.ElementTree as ET

SHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
OFFICE_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

NS = {
    "sheet": SHEET_NS,
    "rel": REL_NS,
}


@dataclass(frozen=True)
class WorkbookCell:
    ref: str
    value: str | int | float | None
    formula: str | None = None


def read_xlsx_cells(workbook_path: Path, *, sheet_name: str, cell_refs: Iterable[str]) -> dict[str, WorkbookCell]:
    wanted_refs = set(cell_refs)

    with zipfile.ZipFile(workbook_path) as archive:
        shared_strings = _read_shared_strings(archive)
        sheet_path = _find_sheet_path(archive, sheet_name)
        sheet_root = _read_xml(archive, sheet_path)
        cells: dict[str, WorkbookCell] = {}

        for cell in sheet_root.findall(".//sheet:c", NS):
            ref = cell.attrib.get("r")
            if ref not in wanted_refs:
                continue

            formula_node = cell.find("sheet:f", NS)
            cells[ref] = WorkbookCell(
                ref=ref,
                value=_cell_value(cell, shared_strings),
                formula=formula_node.text if formula_node is not None else None,
            )

    missing_refs = sorted(wanted_refs.difference(cells))
    if missing_refs:
        missing = ", ".join(missing_refs)
        raise ValueError(f"Missing expected workbook cells in sheet {sheet_name}: {missing}")

    return cells


def read_xlsx_table_records(workbook_path: Path, *, sheet_name: str, header_row: int = 1) -> list[dict[str, str | int | float | None]]:
    with zipfile.ZipFile(workbook_path) as archive:
        shared_strings = _read_shared_strings(archive)
        sheet_path = _find_sheet_path(archive, sheet_name)
        sheet_root = _read_xml(archive, sheet_path)
        rows: dict[int, dict[int, str | int | float | None]] = {}

        for cell in sheet_root.findall(".//sheet:c", NS):
            ref = cell.attrib.get("r")
            if not ref:
                continue

            row_index, column_index = _cell_coordinates(ref)
            rows.setdefault(row_index, {})[column_index] = _cell_value(cell, shared_strings)

    header_cells = rows.get(header_row)
    if not header_cells:
        raise ValueError(f"Header row {header_row} is empty in sheet {sheet_name}")

    headers = {
        column_index: str(value).strip()
        for column_index, value in sorted(header_cells.items())
        if value is not None and str(value).strip()
    }
    if not headers:
        raise ValueError(f"Header row {header_row} has no usable labels in sheet {sheet_name}")

    records: list[dict[str, str | int | float | None]] = []
    for row_index in sorted(row for row in rows if row > header_row):
        row_cells = rows[row_index]
        record = {header: row_cells.get(column_index) for column_index, header in headers.items()}
        if any(value not in (None, "") for value in record.values()):
            records.append(record)

    return records


def _read_xml(archive: zipfile.ZipFile, name: str) -> ET.Element:
    return ET.fromstring(archive.read(name))


def _find_sheet_path(archive: zipfile.ZipFile, sheet_name: str) -> str:
    workbook_root = _read_xml(archive, "xl/workbook.xml")
    rels_root = _read_xml(archive, "xl/_rels/workbook.xml.rels")

    rel_targets = {
        rel.attrib["Id"]: rel.attrib["Target"]
        for rel in rels_root.findall("rel:Relationship", NS)
    }

    for sheet in workbook_root.findall(".//sheet:sheet", NS):
        if sheet.attrib.get("name") != sheet_name:
            continue

        relationship_id = sheet.attrib.get(f"{{{OFFICE_REL_NS}}}id")
        if not relationship_id or relationship_id not in rel_targets:
            raise ValueError(f"Workbook sheet relationship is missing for {sheet_name}")

        target = rel_targets[relationship_id]
        if target.startswith("/"):
            return target.lstrip("/")
        return posixpath.normpath(posixpath.join("xl", target))

    raise ValueError(f"Workbook sheet not found: {sheet_name}")


def _read_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = _read_xml(archive, "xl/sharedStrings.xml")
    values: list[str] = []

    for item in root.findall("sheet:si", NS):
        text_parts = [node.text or "" for node in item.findall(".//sheet:t", NS)]
        values.append("".join(text_parts))

    return values


def _cell_value(cell: ET.Element, shared_strings: list[str]) -> str | int | float | None:
    cell_type = cell.attrib.get("t")

    if cell_type == "inlineStr":
        text_parts = [node.text or "" for node in cell.findall(".//sheet:t", NS)]
        return "".join(text_parts)

    value_node = cell.find("sheet:v", NS)
    if value_node is None or value_node.text is None:
        return None

    raw_value = value_node.text

    if cell_type == "s":
        return shared_strings[int(raw_value)]
    if cell_type in {"str", "b"}:
        return raw_value

    return _number_or_text(raw_value)


def _number_or_text(raw_value: str) -> str | int | float:
    try:
        number = float(raw_value)
    except ValueError:
        return raw_value

    if number.is_integer():
        return int(number)
    return number


def _cell_coordinates(cell_ref: str) -> tuple[int, int]:
    match = re.fullmatch(r"([A-Z]+)([0-9]+)", cell_ref)
    if not match:
        raise ValueError(f"Unsupported cell reference: {cell_ref}")

    column_label, row_label = match.groups()
    column_index = 0
    for char in column_label:
        column_index = (column_index * 26) + (ord(char) - ord("A") + 1)

    return int(row_label), column_index
