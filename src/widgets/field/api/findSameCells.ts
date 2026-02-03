import {
  getCellValue,
  type CheckingDirection,
  type Direction,
  type FieldMatrix,
} from "..";

export function findSameCells(
  dir: CheckingDirection,
  matrix: FieldMatrix,
  rowIndex: number,
  cellIndex: number,
): [number, number][] {
  const map = new Map<Direction, [number, number]>([
    ["right", [0, 1]],
    ["left", [0, -1]],
    ["down", [1, 0]],
    ["up", [-1, 0]],
    ["downLeft", [1, -1]],
    ["upLeft", [-1, -1]],
    ["upRight", [-1, 1]],
    ["downRight", [1, 1]],
    ["cur", [0, 0]],
  ]);

  const findingValue = getCellValue(matrix, rowIndex, cellIndex);

  const [start, finish] = dir.split("_") as [Direction, Direction];

  const from = map.get(start);
  const to = map.get(finish);

  if (!from || !to) {
    throw TypeError("Некорректная строка с направлением проверки: " + dir);
  }

  function findInDirection(
    direction: Direction,
    rowIndex: number,
    cellIndex: number,
  ): [number, number][] {
    const [relNextRowIndex, relNextColIndex] = map.get(direction)!;
    const result: [number, number][] = [];
    let nextRowIndex = rowIndex + relNextRowIndex;
    let nextCellIndex = cellIndex + relNextColIndex;

    while (true) {
      if (
        nextRowIndex < 0 ||
        nextRowIndex >= matrix.length ||
        nextCellIndex < 0 ||
        nextCellIndex >= matrix[0].length
      ) {
        break;
      }

      const cellValue = getCellValue(matrix, nextRowIndex, nextCellIndex);
      if (cellValue === findingValue) {
        result.push([nextRowIndex, nextCellIndex]);
        nextRowIndex += relNextRowIndex;
        nextCellIndex += relNextColIndex;
      } else {
        break;
      }
    }

    return result;
  }

  switch (start) {
    case "cur": {
      return findInDirection(finish, rowIndex, cellIndex);
    }

    default: {
      const startResults = findInDirection(start, rowIndex, cellIndex);
      const finishResults = findInDirection(finish, rowIndex, cellIndex);

      return [...startResults, ...finishResults];
    }
  }
}
