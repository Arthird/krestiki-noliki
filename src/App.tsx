import KrestikiNoliki from "./pages/krestikiNoliki/KrestikiNoliki";

export default function App() {
  return (
    <KrestikiNoliki
      acceptableCellValues={["X", "0",]}
      height={5}
      width={5}
      countToWin={4}
    />
  );
}
