import type { FieldMatrix } from "../model";

export function getCellValue(matrix: FieldMatrix, rowIndex: number, cellIndex: number) {
  return matrix.at(rowIndex)?.at(cellIndex)
}