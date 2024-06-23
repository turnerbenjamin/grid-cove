export default function Cell({ cellData }) {
  return (
    <div
      className="w-full aspect-square border border-grid-white cursor-pointer select-none"
      role="cell"
      data-key={cellData.key}
      data-row={cellData.row}
      data-col={cellData.col}
      style={{ backgroundColor: cellData.colour?.rgb }}
    />
  );
}
