import { useReducer, useRef, useState } from "react";
import styles from "./KrestikiNoliki.module.css";
import clsx from "clsx";
import type { CellValue } from "../../entities/cell/CellValue";
import { makeMove } from "../../widgets/field/api/makeMove";
import ErrorMessage from "../../shared/error/Error";
import { getCellValue } from '../../widgets/field/api/getCellValue';
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
  const [winningSeries, setWinningSeries] = useState<[number, number][]>([]);
  const matrixRef = useRef<FieldMatrix>(initialRows.map((row) => [...row]));

  const [currentTurn, updateCurrentTurn] = useReducer(
    (index) => (index + 1) % acceptableCellValues.length,
    0,
  );

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleWin = (winningSeries: [number, number][]) => {
    setWinningSeries(winningSeries)
    setWinner(getCellValue(matrixRef.current, ...winningSeries[0]))
  }

  const toggleCellValue = (rowIndex: number, cellIndex: number) => {
    const value = acceptableCellValues[currentTurn];

    try {
      makeMove(matrixRef.current, rowIndex, cellIndex, value);
      const longestSeries = findLongestSeries(
        matrixRef.current,
        rowIndex,
        cellIndex,
      );

      if (longestSeries.length >= countToWin) {
        handleWin(longestSeries)
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

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    toggleCellValue(rowIndex, cellIndex);
  };

  const handleReset = () => {
    setWinner("");
    setWinningSeries([])
    matrixRef.current.forEach((row) => row.fill(""));
    forceUpdate();
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
            matrix={matrixRef.current}
            onCellClick={handleCellClick}
            matrixClassName={styles.matrix}
            winningSeries={winningSeries}
          />
          <button className={styles.resetBtn} onClick={handleReset}>
            Перезапустить игру
          </button>
        </div>
        <div className={styles.error}>
          <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        </div>
        {!!winner && <h2>Победил: {winner} </h2>}{" "}
        {/*//TODO Сделать попап  с предложением начать заново*/}
      </div>
    </main>
  );
}
