import { Link } from "react-router-dom";

export default function PuzzleCard({ puzzleIndex, puzzleId }) {
  return (
    <Link
      to={`/puzzles/${puzzleId}`}
      className="flex justify-center items-center border border-grid-white cursor-pointer hover:border-grid-apple w-[3rem] hover:animate-pulse aspect-square"
      title="Click to solve"
    >
      {puzzleIndex}
    </Link>
  );
}
