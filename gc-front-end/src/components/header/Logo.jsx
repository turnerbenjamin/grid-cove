import { NavLink } from "react-router-dom";
import { GridContextProvider } from "../../hooks/contexts/gridContext";
import LogoGrid from "./LogoGrid";

export default function Logo() {
  return (
    <div className="md:col-start-2 flex flex-col md:justify-center items-center">
      <NavLink
        title="GRID|COVE"
        to="/"
        className="flex flex-col justify-center items-center"
      >
        <GridContextProvider size={6}>
          <LogoGrid />
        </GridContextProvider>

        <h1 className="text-lg opacity-90">GRID|COVE</h1>
      </NavLink>
    </div>
  );
}
