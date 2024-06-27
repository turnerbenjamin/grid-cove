import { useGridContext } from "../../hooks/contexts/gridContext";
import Cell from "./Cell";
import GridDividingLines from "./GridDividingLines";

export default function Grid({ doCountInFives }) {
  const { gridRef, gridCells, gridSize } = useGridContext();
  if (!gridCells) return;

  const cellElements = gridCells.map((cellData) => {
    return <Cell key={cellData.key} cellData={cellData} />;
  });

  return (
    <div
      ref={gridRef}
      className="relative grid justify-center gap-[2px]"
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
