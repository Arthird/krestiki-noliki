import styles from "./KrestikiNoliki.module.css";
import type { CellValue } from "../../entities/cell/CellValue";
import ErrorMessage from "../../shared/error/Error";
import { ActionsContainer } from "../../shared/actionsContainer";
import { Field } from "../../widgets/field";
import { useKrestikiNoliki } from "./useKrestikiNoliki";
import WinnerPopup from "../../widgets/winnerPopup/WinnerPopup";
import DrawPopup from "../../widgets/drawPopup/DrawPopup";
import { useLoaderData, useNavigate } from "react-router-dom";

type KrestikiNolikiLoaderData = {
  height: number;
  width: number;
  names: CellValue[];
  countToWin: number;
};

export default function KrestikiNoliki() {
  const { height, width, names, countToWin } =
    useLoaderData() as KrestikiNolikiLoaderData;

  const {
    matrix,
    errorMessage,
    winner,
    isDraw,
    winningSeries,
    handleCellClick,
    resetGame,
  } = useKrestikiNoliki({ height, width, names, countToWin });
  const navigate = useNavigate();

  const newGame = () => {
    navigate("/");
  };

  return (
    <main>
      <h1>Игра</h1>
      <hr />
      <p className={styles.gameDescription}>
        В этой вариации игры правила такие:
        <br />
        {names.length} игроков (
        {names.map((name, i) => `${name}${i === names.length - 1 ? "" : ", "}`)}
        ) ходят по очереди, ставя свой знак в любую пустую клетку. Цель — первым
        собрать {countToWin} своих знака в ряд: по горизонтали, по вертикали,
        или по диагонали. Если все клетки заполнены и никто не собрал ряд из{" "}
        {countToWin} — ничья.
      </p>
      <div className={styles.gameContainer}>
        <Field
          matrix={matrix}
          onCellClick={handleCellClick}
          matrixClassName={styles.matrix}
          winningSeries={winningSeries}
        />
      </div>
      <ActionsContainer
        actions={[
          { label: "Начать игру заново", onClick: resetGame },
          { label: "Настроить новую игру", onClick: newGame },
        ]}
        hasError={!!errorMessage}
      />
      <ErrorMessage visible={!!errorMessage} className={styles.error}>
        {errorMessage}
      </ErrorMessage>
      <DrawPopup isDraw={isDraw} resetGame={resetGame} createGame={newGame} />
      <WinnerPopup winner={winner} resetGame={resetGame} createGame={newGame} />
    </main>
  );
}
