import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import Grid from "../grid/Grid";
import AdminActions from "./AdminActions";
import Clues from "./Clues";
import Mode from "./Mode";
import { GridContextProvider } from "../../hooks/contexts/gridContext";
import Solver from "./Solver";

export default function Solve() {
  const [puzzle, setPuzzle] = useState(false);
  const { getPuzzleById } = usePuzzleContext();
  const puzzleId = useParams().puzzleId;

  const handleGetPuzzle = async () => {
    const response = await getPuzzleById(puzzleId);
    setPuzzle(response);
  };

  useEffect(() => {
    handleGetPuzzle();
  }, []);

  if (!puzzle) return;

  return (
    <div
      className="flex flex-col items-center mt-[5vh]"
      data-testid={`puzzles/${puzzleId}`}
    >
      <GridContextProvider
        size={puzzle.size}
        doColourInsideTheLines
        doNotOverwriteFilledCellsOnDrag
      >
        <Solver puzzle={puzzle} />
        <AdminActions className="mt-6 mb-2" />
      </GridContextProvider>
    </div>
  );
}
