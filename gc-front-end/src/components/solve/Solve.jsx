import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";

import AdminActions from "./AdminActions";
import Solver from "./Solver";
import LoadingSpinner from "../general/LoadingSpinner";
import ErrorPage from "../general/ErrorPage";

import { GridContextProvider } from "../../hooks/contexts/gridContext";
import { useAppContext } from "../../hooks/contexts/appContext";

export default function Solve() {
  const [puzzle, setPuzzle] = useState(false);
  const { getPuzzleById, puzzleServiceIsLoading, puzzleServiceErrors } =
    usePuzzleContext();
  const { activeUser } = useAppContext();
  const puzzleId = useParams().puzzleId;

  const handleGetPuzzle = async () => {
    const response = await getPuzzleById(puzzleId);
    setPuzzle(response);
  };

  useEffect(() => {
    handleGetPuzzle();
  }, []);

  if (puzzleServiceErrors) return <ErrorPage errors={puzzleServiceErrors} />;
  if (!puzzle || puzzleServiceIsLoading) return <LoadingSpinner />;
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
        {activeUser?.roles.includes("admin") && (
          <AdminActions className="mt-6 mb-2" />
        )}
      </GridContextProvider>
    </div>
  );
}
