import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <div className="p-4 min-h-screen w-screen">
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </div>
  );
}

export default App;
