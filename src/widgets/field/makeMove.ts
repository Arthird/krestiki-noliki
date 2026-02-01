import type { CellValue } from "../../entities/cell/CellValue";
import type { FieldMatrix } from "./FieldMatrix";
import { getCellValue } from "./getCellValue";

function setCellValue(
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
  value: CellValue,
): void {
  matrix[rowIndex][cellIndex] = value;
}

export function makeMove(
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
  value: CellValue,
): void {
  if (rowIndex < 0 || cellIndex < 0) {
    throw Error("Обращение к неотрицательному индексу");
  }
  if (matrix.length === 0 || matrix?.[0].length === 0) {
    throw Error("Обращение к пустой матрице поля");
  }
  if (rowIndex > matrix.length || cellIndex > matrix?.[0].length) {
    throw Error("Обращение к индексу больше допустимого максимума");
  }
  if (getCellValue(matrix, rowIndex, cellIndex)) {
    throw Error("Нельзя изменять значения непустых полей")
  }
  setCellValue(matrix, rowIndex, cellIndex, value)
}
