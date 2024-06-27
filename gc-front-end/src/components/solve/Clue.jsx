import classnames from "classnames";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";

export default function Clue({ clue, isRow, index }) {
  const { solveState } = usePuzzleContext();

  const isSolved = isRow
    ? solveState?.getRowSolveState(index)
    : solveState?.getColumnSolveState(index);

  const clueClasses = classnames(
    "flex w-fit h-fit text-xs sm:text-sm md:text-base gap-0 mt-auto select-none",
    {
      "flex-row m-auto mr-0": isRow,
      "flex-col m-auto mb-0 ": !isRow,
      "opacity-50": isSolved,
    }
  );

  const clueElements = clue.map((clueElement, i) => {
    const isLastElement = i === clue.length - 1;
    return (
      <div key={i} className="h-[1.5ch]">
        {clueElement}
        {!isLastElement && ","}
      </div>
    );
  });

  return <div className={clueClasses}>{clueElements}</div>;
}
