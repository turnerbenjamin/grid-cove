import PuzzleCard from "./PuzzleCard";

export default function PuzzlesList({ puzzles }) {
  const puzzleElements = puzzles.map((puzzleId, i) => {
    return (
      <PuzzleCard key={puzzleId} puzzleIndex={i + 1} puzzleId={puzzleId} />
    );
  });
  return (
    <div className="max-w-lg w-fit h-fit grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {puzzleElements}
    </div>
  );
}
