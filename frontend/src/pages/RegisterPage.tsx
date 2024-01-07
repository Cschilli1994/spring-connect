import { Header } from "../components/Header";
import RegisterForm from "../components/authentication/Register/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="h-full w-full flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};
