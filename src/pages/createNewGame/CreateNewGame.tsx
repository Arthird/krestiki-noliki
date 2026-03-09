import { useNavigate } from "react-router-dom";
import styles from "./CreateNewGame.module.css";
import { useState } from "react";

type FormData = {
  height: string;
  width: string;
  countToWin: string;
  names: string;
};

export default function CreateNewGame() {
  const [formData, setFormData] = useState<FormData>({
    height: "3",
    width: "3",
    countToWin: "3",
    names: "X,O",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({
      height: formData.height,
      width: formData.width,
      names: formData.names,
      countToWin: formData.countToWin,
    });

    navigate({
      pathname: "/game",
      search: searchParams.toString(),
    });
  };

  return (
    <main>
      <h1>Создание новой игры</h1>
      <hr />

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="height">Высота</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            min="1"
          />

          <label htmlFor="width">Ширина</label>
          <input
            type="number"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            min="1"
            max="10"
          />

          <label htmlFor="countToWin">Нужно для победы</label>
          <input
            type="number"
            id="countToWin"
            name="countToWin"
            value={formData.countToWin}
            onChange={handleChange}
            min="1"
          />

          <label htmlFor="names">Имена игроков через запятую</label>
          <input
            type="text"
            id="names"
            name="names"
            value={formData.names}
            onChange={handleChange}
          />

          <button type="submit">Начать игру</button>
        </form>
      </div>
    </main>
  );
}