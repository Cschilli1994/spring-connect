import { createBrowserRouter } from "react-router-dom";
import { SecurityTest } from "./pages/SecurityTest";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/security",
    element: <SecurityTest />,
  },
]);
