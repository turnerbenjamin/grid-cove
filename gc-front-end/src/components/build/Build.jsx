import { GridContextProvider } from "../../hooks/contexts/gridContext";
import { PuzzleContextProvider } from "../../hooks/contexts/puzzleContext";
import GridColours from "../../utils/GridColours";
import Builder from "./Builder";

export default function Build() {
  return (
    <PuzzleContextProvider>
      <GridContextProvider defaultFillStyle={GridColours.BLACK}>
        <Builder />
      </GridContextProvider>
    </PuzzleContextProvider>
  );
}
