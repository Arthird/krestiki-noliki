# Krestiki-noliki React App

Сайт, реализующий классическую игру "Крестики-нолики" с использованием React и Vite.
<img width="1076" height="442" alt="image" src="https://github.com/user-attachments/assets/0a1123e6-b53c-45a9-81c1-3a26139c7a25" />
<img width="1275" height="996" alt="image" src="https://github.com/user-attachments/assets/d612dbe6-2f29-4c51-9ce6-b03ad5ea927d" />


## Технологии

- **React** – для построения интерфейса
- **Vite** – быстрый сборщик и dev-сервер
- **CSS** – для стилизации
- **React Router** - для маршрутизации
- **React Compiler** - для автоматической оптимизации компонентов там, где это возможно

## Функционал

- Игра для двух и более игроков на одном устройстве
- Поле изменяемого размера
- Изменяемая цель для победы в игре
- Простое и интуитивное управление
- Подсветка победителя при завершении игры
- Создание и сброс игры в любой момент

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Arthird/krestiki-noliki.git
cd krestiki-noliki
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите приложение в режиме разработки:

```bash
npm run dev
```

4. Откройте [http://localhost:5173](http://localhost:5173) в браузере.

5. Чтобы получить билд выполните:
```bash
npm run dev
```

## Публикация на gh pages

Просто выполните 
```bash
npm run predeploy
npm run deploy
```

## Особенности реализации
- **Оптимизация производительности**: использование React Compiler для автоматической мемоизации компонентов, использование ручной оптимизации там, где это надо
- **Web Worker**: поиск выигрышных комбинаций вынесен в отдельный поток для избежания блокировки интерфейса
- **Кастомные хуки**: логика игры вынесена в отдельный хук useKrestikiNoliki
- **CSS Modules**: стили изолированы на уровне компонентов
- **Поддержка тёмной темы**
- **Полностью адаптивный дизайн**

<img width="404" height="904" alt="image" src="https://github.com/user-attachments/assets/f9142866-2a99-45ab-bb0a-ccc0096fff40" />
<img width="405" height="902" alt="image" src="https://github.com/user-attachments/assets/c3446368-1c2b-42cc-b398-8fa4e4fb4edc" />


## Лицензия

MIT © [Терентьев Артём, Arthird](https://github.com/Arthird)
