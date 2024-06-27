import { useEffect } from "react";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";

import PuzzlesList from "./PuzzlesList";
import LoadingSpinner from "../general/LoadingSpinner";
import ErrorPage from "../general/ErrorPage";

export default function Puzzles() {
  const {
    puzzles,
    puzzleServiceIsLoading,
    getAllPuzzles,
    puzzleServiceErrors,
  } = usePuzzleContext();

  useEffect(() => {
    getAllPuzzles();
  }, []);

  if (puzzleServiceErrors) return <ErrorPage errors={puzzleServiceErrors} />;

  if (puzzles === null || puzzleServiceIsLoading) return <LoadingSpinner />;

  if (puzzles.length === 0) {
    return <p>No puzzles found...</p>;
  }

  const puzzleLists = puzzles.map((puzzleGroup) => {
    return (
      <div
        key={puzzleGroup.size}
        className="py-6 px-4 mb-8 flex flex-col justify-center"
      >
        <h3 className="text-center text-xl mb-2 text-secondary-100">{`${puzzleGroup.size} x ${puzzleGroup.size}`}</h3>
        <div className="w-full h-[1px] bg-primary-300 mb-6" />
        <PuzzlesList puzzles={puzzleGroup.puzzles} />
      </div>
    );
  });

  return <div className="flex flex-col items-center py-6">{puzzleLists}</div>;
}
