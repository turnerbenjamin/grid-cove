import { Link } from "react-router-dom";

export default function PuzzleCard({ puzzle }) {
  return (
    <Link
      to={`/puzzles/${puzzle}`}
      key={puzzle}
      className="flex justify-center items-center border border-grid-white cursor-pointer hover:border-grid-apple w-[3rem] hover:animate-pulse aspect-square"
    >
      {puzzle}
    </Link>
  );
}
