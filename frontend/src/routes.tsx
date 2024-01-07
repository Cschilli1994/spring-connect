import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

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
]);
