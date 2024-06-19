import Cell from "./Cell";
import GridDividingLines from "./GridDividingLines";

export default function Grid({ doCountInFives }) {
  const length = 10;
  const cellColours = Array.from({ length }, () =>
    Array.from({ length }, () => 0)
  );

  const cellElements = cellColours.map((row, i) => {
    return row.map((_, j) => {
      return <Cell key={`${i},${j}`} />;
    });
  });

  return (
    <div className="relative grid grid-cols-10 justify-center gap-[1vw] sm:gap-1 md:gap-2">
      {cellElements}
      {doCountInFives && <GridDividingLines />}
    </div>
  );
}
