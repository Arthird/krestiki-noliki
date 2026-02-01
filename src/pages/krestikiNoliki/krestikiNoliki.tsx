import { useReducer, useRef, useState } from "react";
import Field from "../../widgets/field/Field";
import type { FieldMatrix } from "../../widgets/field/FieldMatrix";
import styles from "./KrestikiNoliki.module.css";
import clsx from "clsx";
import type { CellValue } from "../../entities/cell/CellValue";
import { makeMove } from "../../widgets/field/makeMove";
import ErrorMessage from "../../shared/error/Error";

type KrestikiNolikiProps = {
  initialRows: FieldMatrix;
  acceptableCellValues: CellValue[];
};

export default function KrestikiNoliki({
  initialRows,
  acceptableCellValues,
}: KrestikiNolikiProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
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
    updateCurrentTurn();
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

        <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
      </div>
    </main>
  );
}
