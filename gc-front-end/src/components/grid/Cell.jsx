import CrossOutDiv from "../general/CrossOutDiv";

export default function Cell({ cellData }) {
  return (
    <div
      className="relative w-full aspect-square text-[3vw] text-grid-red flex items-center justify-center  border border-grid-white cursor-pointer select-none"
      role="cell"
      data-key={cellData.key}
      data-row={cellData.row}
      data-col={cellData.col}
      title={`${cellData.col},${cellData.row}`}
      style={{ backgroundColor: cellData.colour?.rgb }}
    >
      {cellData.colour?.isEliminated && <CrossOutDiv />}
    </div>
  );
}
