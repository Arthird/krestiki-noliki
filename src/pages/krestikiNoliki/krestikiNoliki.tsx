import styles from "./KrestikiNoliki.module.css";
import type { CellValue } from "../../entities/cell/CellValue";
import ErrorMessage from "../../shared/error/Error";
import { Field } from "../../widgets/field";
import { useKrestikiNoliki } from "./useKrestikiNoliki";
import WinnerPopup from "../../widgets/winnerPopup/WinnerPopup";

type KrestikiNolikiProps = {
  height: number;
  width: number;
  acceptableCellValues: CellValue[];
  countToWin: number;
};

export default function KrestikiNoliki({
  height,
  width,
  acceptableCellValues,
  countToWin,
}: KrestikiNolikiProps) {
  const {
    matrix,
    errorMessage,
    winner,
    isDraw,
    winningSeries,
    handleCellClick,
    resetGame,
  } = useKrestikiNoliki({ height, width, acceptableCellValues, countToWin });

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
          Начать игру заново
        </button>

        <ErrorMessage visible={!!errorMessage} className={styles.error}>
          {errorMessage}
        </ErrorMessage>

        <WinnerPopup
          winner={winner}
          resetGame={resetGame}
          createGame={() => {
            console.error("TODO переход на экран создания игры"); //TODO переход на экран создания игры
          }}
        />
      </div>
    </main>
  );
}
