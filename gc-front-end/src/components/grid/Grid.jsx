import { useGridContext } from "../../hooks/contexts/gridContext";
import Cell from "./Cell";
import GridDividingLines from "./GridDividingLines";

export default function Grid({ doCountInFives }) {
  const { gridColours, gridSize } = useGridContext();

  const cellElements = gridColours.map((row, i) => {
    return row.map((_, j) => {
      return <Cell key={`${i},${j}`} />;
    });
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
