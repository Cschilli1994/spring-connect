import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import GamePage from "./pages/GamePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/game/:gameId",
    element: <GamePage />,
  },
]);
