import styles from "./KrestikiNoliki.module.css";
import type { CellValue } from "../../entities/cell/CellValue";
import ErrorMessage from "../../shared/error/Error";
import { Field } from "../../widgets/field";
import { useKrestikiNoliki } from "./useKrestikiNoliki";

type KrestikiNolikiProps = {
  height: number;
  width: number;
  acceptableCellValues: CellValue[];
  countToWin: number;
};

export default function KrestikiNoliki(props: KrestikiNolikiProps) {
  const {
    matrix,
    errorMessage,
    winner,
    isDraw,
    winningSeries,
    handleCellClick,
    resetGame,
  } = useKrestikiNoliki(props);

  return (
    <main>
      <div className={styles.mainContainer}>
        <h1>Крестики нолики</h1>
        <hr />
        <p>
          Это игра где игроки играют и один из них выигрывает, но не всегда —
          иногда ничья. Лично я обычно выигрываю, но насчёт вас не знаю 😄
        </p>

        <div className={styles.gameContainer}>
          <Field
            matrix={matrix}
            onCellClick={handleCellClick}
            matrixClassName={styles.matrix}
            winningSeries={winningSeries}
          />
        </div>

        <button className={styles.resetBtn} onClick={resetGame}>
          Перезапустить игру
        </button>

        <div className={styles.error}>
          <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        </div>

        {!!winner && <h2>Победитель: {winner}</h2>}
        {isDraw && <h2>Ничья!</h2>}
      </div>
    </main>
  );
}
