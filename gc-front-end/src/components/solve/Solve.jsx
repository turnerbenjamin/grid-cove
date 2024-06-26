import { useParams } from "react-router-dom";
import Grid from "../grid/Grid";
import AdminActions from "./AdminActions";
import Clues from "./Clues";
import Mode from "./Mode";

export default function Solve() {
  const puzzleId = useParams().puzzleId;
  console.log(puzzleId);
  const rowClues = [
    [1, 2],
    [1],
    [10],
    [1, 1, 1, 1, 2],
    [9],
    [5],
    [4, 3],
    [1, 1],
    [4, 1, 2],
    [6],
  ];
  const colClues = rowClues;

  return (
    <div
      className="flex flex-col items-center mt-[5vh]"
      data-testid={`puzzles/${puzzleId}`}
    >
      {/* <div className="grid md:grid-cols-[1fr_auto] items-center gap-2 md:gap-4">
        <div className="grid grid-cols-[auto_1fr] w-[95vw] max-w-lg gap-2">
          <div />
          <Clues clues={colClues} />
          <Clues clues={rowClues} isRow />
          <Grid doCountInFives />
        </div>
        <Mode />
      </div>
      <AdminActions className="mt-6 mb-2" /> */}
    </div>
  );
}
