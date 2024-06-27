import { useGridContext } from "../../hooks/contexts/gridContext";
import Cell from "./Cell";
import GridDividingLines from "./GridDividingLines";

export default function Grid({ doCountInFives, pixelArt }) {
  const { gridRef, gridCells, gridSize } = useGridContext();
  if (!gridCells) return;

  const cellElements = gridCells.map((cellData, i) => {
    return (
      <Cell
        key={cellData.key}
        cellData={cellData}
        hiddenColour={pixelArt && pixelArt[i]}
      />
    );
  });

  return (
    <div
      ref={gridRef}
      className="relative grid justify-center gap-[3px]"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
      role="grid"
    >
      {cellElements}
      {doCountInFives && <GridDividingLines />}
    </div>
  );
}
