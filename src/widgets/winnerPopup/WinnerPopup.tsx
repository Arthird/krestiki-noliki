import type { PopupAction } from "../../shared/popup/model/PopupAction";
import Popup from "../../shared/popup/ui/Popup";

type WinnerPopupProps = {
  winner?: string | null;
  resetGame: () => void;
  createGame: () => void;
};

export default function WinnerPopup({
  winner,
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
    <Popup actions={winnerPopupActions} isOpen={!!winner}>
      <div>
        <h2>У нас есть победитель!</h2>
        <hr />
        Победил: {winner}
      </div>
    </Popup>
  );
}
