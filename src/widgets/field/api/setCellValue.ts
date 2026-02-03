import type { CellValue } from "../../../entities/cell/CellValue";
import type { FieldMatrix } from "../model";

export function setCellValue(
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
  value: CellValue,
): void {
  matrix[rowIndex][cellIndex] = value;
}

