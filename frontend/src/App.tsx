import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="p-4 min-h-screen w-screen flex flex-col">
      <AuthProvider>
        <Header />
        <RouterProvider router={routes} />
      </AuthProvider>
    </div>
  );
}

export default App;
