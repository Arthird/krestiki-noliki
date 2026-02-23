import { useNavigate } from "react-router-dom";

export default function CreateNewGame() {
  const navigate = useNavigate();

  const handleSubmit = (formData: FormData) => {
    const height = formData.get("height");
    const width = formData.get("width");
    const values = formData.get("values");
    const countToWin = formData.get("countToWin");

    const searchParams = new URLSearchParams({
      height: String(height),
      width: String(width),
      values: String(values),
      countToWin: String(countToWin),
    });

    navigate({
      pathname: "/game",
      search: searchParams.toString(),
    });
  };

  return (
    <div>
      <h1>Создание новой игры</h1>
      <form action={handleSubmit}>
        <input name="height" placeholder="Высота" defaultValue="3" />
        <input name="width" placeholder="Ширина" defaultValue="3" />
        <input
          name="values"
          placeholder="Значения (через запятую)"
          defaultValue="X,O"
        />
        <input
          name="countToWin"
          placeholder="Нужно для победы"
          defaultValue="3"
        />
        <button type="submit">Начать игру</button>
      </form>
    </div>
  );
}
