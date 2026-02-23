import type { PopupAction } from "../../shared/popup/model/PopupAction";
import Popup from "../../shared/popup/ui/Popup";

type WinnerPopupProps = {
  isDraw: boolean;
  resetGame: () => void;
  createGame: () => void;
};

export default function DrawPopup({
  isDraw,
  resetGame,
  createGame,
}: WinnerPopupProps) {
  const winnerPopupActions: Array<PopupAction> = [
    { name: "Начать игру заново", fun: resetGame },
    {
      name: "Настроить новую игру",
      fun: createGame,
    },
  ];

  return (
    <Popup actions={winnerPopupActions} isOpen={isDraw}>
      <div>
        <h2>Ничья!</h2>
      </div>
    </Popup>
  );
}
