import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

export default function HomeIcon() {
  const location = useLocation();
  const { user } = useAuthContext();

  return (
    <NavLink
      to={location.pathname.includes("menu") ? "/" : user ? "/menu" : "/"}
    >
      <div className=" p-1 font-bold text-lg text-compl hover:text-opacity-60">
        Play Connect
      </div>
    </NavLink>
  );
}
