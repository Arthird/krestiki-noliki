import KrestikiNoliki from "./pages/krestikiNoliki/krestikiNoliki";

export default function App() {
  return (
    <KrestikiNoliki
      acceptableCellValues={["X", "0"]}
      initialRows={[
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]}
      countToWin={3}
    />
  );
}
