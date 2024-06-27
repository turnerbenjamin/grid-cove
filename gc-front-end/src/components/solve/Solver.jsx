import Clues from "./Clues";
import Grid from "../grid/Grid";
import Mode from "./Mode";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import { useEffect } from "react";
import { useGridContext } from "../../hooks/contexts/gridContext";

export default function Solver({ puzzle }) {
  const { updateSolveState, solveState } = usePuzzleContext();
  const { gridRef, getCurrentGridFillString, setDoRevealPixelArt } =
    useGridContext();

  const handleUpdateSolveState = () => {
    const gridCellString = getCurrentGridFillString();
    updateSolveState(gridCellString, puzzle);
  };

  useEffect(() => {
    if (solveState?.isSolved) setDoRevealPixelArt(true);
  }, [solveState]);

  useEffect(() => {
    if (!gridRef?.current) return;
    const handleGridChange = (e) => handleUpdateSolveState();
    gridRef?.current?.addEventListener("change", handleGridChange);
    return () =>
      gridRef?.current?.removeEventListener("change", handleGridChange);
  }, [getCurrentGridFillString]);

  return (
    <div className="grid md:grid-cols-[1fr_auto] items-center gap-2 md:gap-4">
      <div className="grid grid-cols-[auto_1fr] w-[95vw] max-w-lg gap-2">
        <div />
        <Clues clues={puzzle.clues.columnClues} />
        <Clues clues={puzzle.clues.rowClues} isRow />
        <Grid doCountInFives pixelArt={puzzle.pixelArt} />
      </div>
      <Mode />
    </div>
  );
}
