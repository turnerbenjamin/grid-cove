import { Link } from "react-router-dom";

import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import Button from "../general/Button";

export default function PixelArtInfo({ puzzle, isSolved }) {
  const { getNextPuzzle } = usePuzzleContext();
  const nextPuzzle = getNextPuzzle(puzzle._id);

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      {isSolved && (
        <h2 className="text-2xl text-center text-primary-500 mb-2">SOLVED!!</h2>
      )}
      <p>{`${puzzle.title} by ${puzzle.artist?.username || "unknown"}`}</p>
      {isSolved && nextPuzzle && (
        <Link
          to={`/puzzles/${nextPuzzle}`}
          className="mt-4"
          title="Next puzzle"
        >
          <Button>Next puzzle</Button>
        </Link>
      )}
    </div>
  );
}
