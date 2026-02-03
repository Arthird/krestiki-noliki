import type { FieldMatrix, CheckingDirection } from "../model";
import { findSameCells } from "./findSameCells";

export function findLongestSeries(
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
): [number, number][] {
  let longestSeries: [number, number][] = [];

  for (const dir of [
    "left_right",
    "up_down",
    "upLeft_downRight",
    "downLeft_upRight",
  ] as CheckingDirection[]) {
    const sameCells = findSameCells(
      dir,
      matrix,
      rowIndex,
      cellIndex,
    );

    const cellsCount = sameCells.length + 1

    if (cellsCount > longestSeries?.length) {
      longestSeries = [[rowIndex, cellIndex] as [number, number], ...sameCells];
    }
  }


  return longestSeries;
}
