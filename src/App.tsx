import KrestikiNoliki from "./pages/krestikiNoliki/KrestikiNoliki";

export default function App() {
  return (
    <KrestikiNoliki
      acceptableCellValues={["O", "X"]}
      height={3}
      width={3}
      countToWin={3}
    />
  );
}
