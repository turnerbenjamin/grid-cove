import { useGridContext } from "../../hooks/contexts/gridContext";
import Cell from "./Cell";
import GridDividingLines from "./GridDividingLines";

export default function Grid({ doCountInFives }) {
  const { gridCells, gridSize } = useGridContext();

  const cellElements = gridCells.map((cellData) => {
    return <Cell key={cellData.key} cellData={cellData} />;
  });

  return (
    <div
      className="relative grid justify-center gap-[1vw] sm:gap-[2px]"
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
