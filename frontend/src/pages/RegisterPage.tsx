import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import RegisterForm from "../components/authentication/Register/RegisterForm";
import { useAuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/menu");
    }
  }, [user]);
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="h-full w-full flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};
