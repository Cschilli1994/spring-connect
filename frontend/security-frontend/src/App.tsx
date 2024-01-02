import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { SecuredRequest } from "./components/SecuredRequest";

function App() {
  return (
    <div className="p-4 min-h-screen w-screen flex flex-col">
      <h1>Security App</h1>
      <LoginForm />
      <div className="my-3">
        <SecuredRequest />
      </div>
      <div className="my-3 border-2">
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
