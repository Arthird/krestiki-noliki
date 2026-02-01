import type { FieldMatrix } from "./FieldMatrix";

export function getCellValue(matrix: FieldMatrix, rowIndex: number, cellIndex: number) {
  return matrix.at(rowIndex)?.at(cellIndex)
}