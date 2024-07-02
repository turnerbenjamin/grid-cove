import { GridContextProvider } from "../../hooks/contexts/gridContext";
import { PuzzleContextProvider } from "../../hooks/contexts/puzzleContext";
import Builder from "./Builder";
import GridColours from "../../utils/GridColours";

export default function Build() {
  return (
    <PuzzleContextProvider>
      <GridContextProvider defaultFillStyle={GridColours.BLACK}>
        <Builder />
      </GridContextProvider>
    </PuzzleContextProvider>
  );
}
