import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateNewGame from "./pages/createNewGame/CreateNewGame";
import KrestikiNoliki from "./pages/krestikiNoliki/KrestikiNoliki";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateNewGame />,
  },
  {
    path: "/game",
    element: <KrestikiNoliki />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const height = parseInt(url.searchParams.get("height") || "3");
      const width = parseInt(url.searchParams.get("width") || "3");
      const countToWin = parseInt(url.searchParams.get("countToWin") || "3");
      const names = url.searchParams
        .get("names")
        ?.split(",") || ["X", "O"];

      return { height, width, names, countToWin };
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
