import { useNavigate } from "react-router-dom";
import styles from "./CreateNewGame.module.css";
import { useState } from "react";
import clsx from "clsx";

export default function CreateNewGame() {
  const [height, setHeight] = useState("3");
  const [width, setWidth] = useState("3");
  const [countToWin, setCountToWin] = useState("3");
  const [names, setNames] = useState(["X", "O", ""]);

  const navigate = useNavigate();

  const handleNameChange = (index: number, value: string) => {
    const namesCopy = [...names];
    namesCopy[index] = value;
    if (index === names.length - 1 && value.trim() !== "") {
      namesCopy.push("");
    } else if (index < names.length - 1 && value.trim() === "") {
      namesCopy.splice(index, 1);
    }
    setNames(namesCopy);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({
      height: height,
      width: width,
      names: names.slice(0, -1).join(","),
      countToWin: countToWin,
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
          <h2>Параметры поля</h2>
          <hr />
          <div className={styles.params}>
            <label htmlFor="height">Высота</label>
            <input
              type="number"
              id="height"
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
              max="10"
            />
            <label htmlFor="width">Ширина</label>
            <input
              type="number"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="1"
              max="10"
            />
            <label htmlFor="countToWin">Нужно для победы</label>
            <input
              type="number"
              id="countToWin"
              name="countToWin"
              value={countToWin}
              onChange={(e) => setCountToWin(e.target.value)}
              min="1"
              max="10"
            />
          </div>
          <h2>Игроки</h2>
          <hr />

          <div className={styles.namesInputs}>
            {names.map((name, i) => {
              return (
                <div
                  key={i}
                  className={clsx(
                    styles.nameInput,
                    i === names.length - 1 && styles.nameInputLast
                  )}
                >
                  <label htmlFor={`name${i}`}>Игрок {i + 1}</label>
                  <input
                    type="text"
                    id={`name${i}`}
                    name={`name${i}`}
                    value={name}
                    maxLength={3}
                    minLength={1}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder="Введите до 3 символов"
                    required={i === 0}
                  />
                </div>
              );
            })}
          </div>

          <button type="submit">Начать игру</button>
        </form>
      </div>
    </main>
  );
}
