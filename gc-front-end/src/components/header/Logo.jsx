import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink
      title="GRID|COVE"
      to="/"
      className="md:col-start-2 flex md:justify-center items-center"
    >
      <h1 className="text-lg opacity-90">GRID|COVE</h1>
    </NavLink>
  );
}
