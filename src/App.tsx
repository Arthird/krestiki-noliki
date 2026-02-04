import KrestikiNoliki from "./pages/krestikiNoliki/KrestikiNoliki";

export default function App() {
  return (
    <KrestikiNoliki
      acceptableCellValues={["X", "0",]}
      initialRows={[
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ]}
      countToWin={4}
    />
  );
}
