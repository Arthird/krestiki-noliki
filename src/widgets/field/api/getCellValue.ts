import type { CellValue } from "../../../entities/cell/CellValue";
import type { FieldMatrix } from "../model";

export function getCellValue(
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
): CellValue {
  return matrix?.at(rowIndex)?.at(cellIndex) ?? "";
}
