import { useReducer, useRef, useState } from "react";
import styles from "./KrestikiNoliki.module.css";
import clsx from "clsx";
import type { CellValue } from "../../entities/cell/CellValue";
import { makeMove } from "../../widgets/field/api/makeMove";
import ErrorMessage from "../../shared/error/Error";
import {
  type FieldMatrix,
  Field,
  findLongestSeries,
} from "../../widgets/field";

type KrestikiNolikiProps = {
  initialRows: FieldMatrix;
  acceptableCellValues: CellValue[];
  countToWin: number;
};

export default function KrestikiNoliki({
  initialRows,
  acceptableCellValues,
  countToWin,
}: KrestikiNolikiProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [winner, setWinner] = useState<string>();
  const rowsRef = useRef<FieldMatrix>(initialRows.map((row) => [...row]));

  const [currentTurn, updateCurrentTurn] = useReducer(
    (index) => (index + 1) % acceptableCellValues.length,
    0,
  );

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const updateCell = (
    rowIndex: number,
    cellIndex: number,
    value: CellValue,
  ) => {
    try {
      makeMove(rowsRef.current, rowIndex, cellIndex, value);
      const longestSeries = findLongestSeries(
        rowsRef.current,
        rowIndex,
        cellIndex,
      );
      if (longestSeries.length >= countToWin) {
        setWinner(value);
      }
      updateCurrentTurn();
      setErrorMessage("");
      forceUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage: string = error.message;
        setErrorMessage(errorMessage);
      }
    }
  };

  const toggleCellValue = (rowIndex: number, cellIndex: number) => {
    const value = acceptableCellValues[currentTurn];
    updateCell(rowIndex, cellIndex, value);
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    toggleCellValue(rowIndex, cellIndex);
  };

  return (
    <main>
      <div className={styles.mainContainer}>
        <h1>Крестики нолики</h1>
        <hr />
        <p>
          Это игра где игроки играют и один из них выигрывает, но не всегда -
          иногда ничья. Лично я обычно выигрываю, но насчет вас не знаю lol ✌️
        </p>
        <div className={clsx(styles.gameContainer)}>
          <Field
            // eslint-disable-next-line react-hooks/refs
            rows={rowsRef.current}
            onCellClick={handleCellClick}
            matrixClassName={styles.matrix}
          />
        </div>

        <div className={styles.error}>
          <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        </div>
        {!!winner && <h2>Победил: {winner} </h2>}
      </div>
    </main>
  );
}
