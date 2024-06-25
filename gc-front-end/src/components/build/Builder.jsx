import BuildControls from "./BuildControls";
import Grid from "../grid/Grid";
import { useGridContext } from "../../hooks/contexts/gridContext";
import GridSizeSelector from "./GridSizeSelector";
import classNames from "classnames";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import SaveControls from "./SaveControls";

export default function Builder() {
  const { gridCells } = useGridContext();
  const { puzzleServiceIsLoading } = usePuzzleContext();

  const classes = classNames("flex flex-col items-center mt-[5vh]", {
    "pointer-events-none disabled opacity-80": puzzleServiceIsLoading,
  });

  return (
    <div className={classes} data-testid="build-wrapper">
      {!gridCells && <GridSizeSelector />}
      {gridCells && (
        <>
          <div className="grid md:grid-cols-[1fr_auto] w-[95vw] max-w-xl gap-4">
            <div className="w-full">
              <Grid />
            </div>
            <BuildControls />
          </div>
          <SaveControls />
        </>
      )}
    </div>
  );
}
