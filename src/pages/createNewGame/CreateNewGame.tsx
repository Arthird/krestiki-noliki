import { useNavigate } from "react-router-dom";
import styles from "./CreateNewGame.module.css";

export default function CreateNewGame() {
  const navigate = useNavigate();

  const handleSubmit = (formData: FormData) => {
    const height = formData.get("height");
    const width = formData.get("width");
    const names = formData.get("names");
    const countToWin = formData.get("countToWin");

    const searchParams = new URLSearchParams({
      height: String(height),
      width: String(width),
      names: String(names),
      countToWin: String(countToWin),
    });

    navigate({
      pathname: "/game",
      search: searchParams.toString(),
    });
  };

  return (
    <main>
      <h1>Создание новой игры</h1> {/*//TODO добавить лого */}
      <hr />
      {/*
          // TODO другой механизм добавления игроков (значений)
        */}
      <div className={styles.formContainer}>
        <form action={handleSubmit}>
          <label htmlFor="height">
            Высота
          </label>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="Высота"
            defaultValue="3"
            min="1"
          />
          <label htmlFor="width">Ширина</label>
          <input
            type="number"
            id="width"
            name="width"
            placeholder="Ширина"
            defaultValue="3"
            min="1"
            max="10"
          />
          <label htmlFor="countToWin">Нужно для победы</label>
          <input
            type="number"
            id="countToWin"
            name="countToWin"
            placeholder="Нужно для победы"
            defaultValue="3"
            min="1"
          />
          <label htmlFor="names">Имена игроков через запятую</label>
          <input
            type="text"
            id="names"
            name="names"
            placeholder="X,O"
            defaultValue="X,O"
          />
          <button type="submit">Начать игру</button>
        </form>
      </div>
    </main>
  );
}
