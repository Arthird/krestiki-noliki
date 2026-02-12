import { useEffect, useReducer, useRef, useState } from "react";
import type { CellValue } from "../../entities/cell/CellValue";
import { makeMove } from "../../widgets/field/api/makeMove";
import { type FieldMatrix } from "../../widgets/field";
import { createRectangularArray } from "../../shared/utils/createRectangleArray";
import SeriesFinderWorker from "../../widgets/field/api/SeriesFinderWorker?worker";

type UseKrestikiNolikiProps = {
  height: number;
  width: number;
  acceptableCellValues: CellValue[];
  countToWin: number;
};

export function useKrestikiNoliki({
  height,
  width,
  acceptableCellValues,
  countToWin,
}: UseKrestikiNolikiProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningSeries, setWinningSeries] = useState<[number, number][]>([]);
  const [movesCount, setMovesCount] = useState(0);

  const matrixRef = useRef<FieldMatrix>(
    createRectangularArray(width, height, ""),
  );

  const workerRef = useRef<Worker | null>(null);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    workerRef.current = new SeriesFinderWorker();

    workerRef.current.onmessage = (e) => {
      const { error, longestSeries, isWin, rowIndex, cellIndex } = e.data;

      if (error) {
        console.error("Worker error:", error);
        return;
      }

      if (isWin) {
        setWinningSeries(longestSeries);
        setWinner(matrixRef.current[rowIndex][cellIndex]);
      } else {
        setMovesCount((prev) => {
          const next = prev + 1;
          if (next === height * width) {
            setIsDraw(true);
          }
          return next;
        });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [height, width]);

  const currentTurn = movesCount % acceptableCellValues.length;

  const resetMatrix = () => {
    matrixRef.current = createRectangularArray(width, height, "");
    forceUpdate();
  };

  const resetGame = () => {
    setMovesCount(0);
    setWinner(null);
    setWinningSeries([]);
    setIsDraw(false);
    setErrorMessage("");
    resetMatrix();
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const value = acceptableCellValues[currentTurn];

    try {
      if (isDraw || !!winner) {
        throw Error("Нельзя делать ходы после окончания игры");
      }

      makeMove(matrixRef.current, rowIndex, cellIndex, value);
      setErrorMessage("");

      workerRef.current?.postMessage({
        matrix: matrixRef.current,
        rowIndex,
        cellIndex,
        countToWin,
      });

      forceUpdate();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return {
    matrix: matrixRef.current,
    errorMessage,
    winner,
    isDraw,
    winningSeries,
    handleCellClick,
    resetGame,
  };
}
