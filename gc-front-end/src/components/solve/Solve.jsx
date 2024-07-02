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
  }, [puzzleId]);

  const wrapperClasses = "flex flex-col items-center mt-[5vh]";

  if (puzzleServiceErrors)
    return (
      <div className={wrapperClasses}>
        <ErrorPage errors={puzzleServiceErrors} />
      </div>
    );
  if (!puzzle || puzzleServiceIsLoading)
    return (
      <div className={wrapperClasses}>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className={wrapperClasses}>
      <GridContextProvider
        size={puzzle.size}
        doColourInsideTheLines
        doNotOverwriteFilledCellsOnDrag
      >
        <Solver puzzle={puzzle} />
        {activeUser?.roles.includes("admin") && (
          <AdminActions className="mt-6 mb-2" puzzle={puzzle} />
        )}
      </GridContextProvider>
    </div>
  );
}
