import { Link } from "react-router-dom";

export default function HomeLink({ boxStyling, to, children }) {
  return (
    <Link
      to={to}
      className="grid grid-cols-[2rem_auto] gap-4 items-center cursor-pointer group hover:animate-pulse"
    >
      <div className={`aspect-square border ${boxStyling}`} />
      <div className="tracking-wider">{children}</div>
    </Link>
  );
}
