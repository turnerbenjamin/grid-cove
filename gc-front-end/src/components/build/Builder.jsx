import BuildControls from "./BuildControls";
import Grid from "../grid/Grid";
import { useGridContext } from "../../hooks/contexts/gridContext";
import GridSizeSelector from "./GridSizeSelector";

export default function Builder() {
  const { gridCells } = useGridContext();

  return (
    <div className="flex flex-col items-center mt-[5vh]">
      {!gridCells && <GridSizeSelector />}
      {gridCells && (
        <div className="grid md:grid-cols-[1fr_auto] w-[95vw] max-w-xl gap-4">
          <div className="w-full">
            <Grid />
          </div>
          <BuildControls />
        </div>
      )}
    </div>
  );
}
