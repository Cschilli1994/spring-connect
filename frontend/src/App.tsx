import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <div className="p-4 min-h-screen w-screen flex flex-col">
      <h1>Security App</h1>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
