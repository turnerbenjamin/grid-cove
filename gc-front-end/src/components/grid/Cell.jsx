export default function Cell({ cellData }) {
  return (
    <div
      className="w-full aspect-square border border-grid-white cursor-pointer select-none"
      role="cell"
      data-key={cellData.key}
      data-row={cellData.x}
      data-col={cellData.y}
      style={{ backgroundColor: cellData.colour?.rgb }}
    />
  );
}
