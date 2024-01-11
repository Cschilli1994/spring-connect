import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";
import { Header } from "../components/Header";
import CreateGame from "../components/StartingGame/CreateGame";

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
        <li className="">
          <CreateGame goal={3} />
        </li>
        <li className="">
          <CreateGame goal={4} />
        </li>
        <li className="">
          <CreateGame goal={5} />
        </li>
      </ul>
    </div>
  );
}
