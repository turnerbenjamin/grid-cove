import Clue from "./Clue";

export default function Clues({ clues, isRow }) {
  const style = isRow
    ? { gridTemplateRows: `repeat(${clues.length},1fr)` }
    : { gridTemplateColumns: `repeat(${clues.length},1fr)` };

  const clueElements = clues.map((clue, i) => {
    if (clue.length === 0) clue.push(0);
    return <Clue key={i} clue={clue} isRow={isRow} index={i} />;
  });

  return (
    <div className="grid gap-[1vw] sm:gap-1 md:gap-2" style={style}>
      {clueElements}
    </div>
  );
}
