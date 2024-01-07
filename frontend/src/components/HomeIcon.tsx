import { NavLink } from "react-router-dom";

export default function HomeIcon() {
  return (
    <NavLink to="/">
      <div className=" p-1 font-bold text-lg">Play Connect</div>
    </NavLink>
  );
}
