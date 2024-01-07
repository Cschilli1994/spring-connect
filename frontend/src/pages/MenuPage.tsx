import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";
import { Header } from "../components/Header";

export default function MenuPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full">
      <Header />
      MENU PAGE
      <ul>
        <li className="">Connect 3</li>
        <li className="">Connect 4</li>
        <li className="">Connect 5</li>
      </ul>
    </div>
  );
}
