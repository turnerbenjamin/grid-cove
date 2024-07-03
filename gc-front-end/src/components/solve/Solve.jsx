import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";

import { GridContextProvider } from "../../hooks/contexts/gridContext";
import { useAppContext } from "../../hooks/contexts/appContext";
import AdminActions from "./AdminActions";
import Solver from "./Solver";
import LoadingSpinner from "../general/LoadingSpinner";
import ErrorPage from "../general/ErrorPage";

export default function Solve() {
  const puzzleId = useParams().puzzleId;

  const { getPuzzleById, puzzleServiceIsLoading, puzzleServiceErrors } =
    usePuzzleContext();
  const { activeUser } = useAppContext();
  const [puzzle, setPuzzle] = useState(false);

  const handleGetPuzzle = async () => {
    const response = await getPuzzleById(puzzleId);
    setPuzzle(response);
  };

  useEffect(() => {
    handleGetPuzzle();
  }, [puzzleId]);

  const wrapperClasses = "flex flex-col items-center my-[5vh]";

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
