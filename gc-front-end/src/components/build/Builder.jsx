import classNames from "classnames";

import { useGridContext } from "../../hooks/contexts/gridContext";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import BuildControls from "./BuildControls";
import Grid from "../grid/Grid";
import GridSizeSelector from "./GridSizeSelector";
import SaveControls from "./SaveControls";
import ResizeGridLink from "./ResizeGridLink";

export default function Builder() {
  const { gridCells } = useGridContext();
  const { puzzleServiceIsLoading } = usePuzzleContext();

  const classes = classNames("flex flex-col items-center my-[5vh]", {
    "pointer-events-none disabled opacity-80": puzzleServiceIsLoading,
  });

  return (
    <div className={classes} data-testid="build-wrapper">
      {!gridCells && <GridSizeSelector />}
      {gridCells && (
        <>
          <div className="w-full max-w-xl mb-2">
            <ResizeGridLink />
          </div>
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
