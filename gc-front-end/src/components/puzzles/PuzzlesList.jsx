import PuzzleCard from "./PuzzleCard";

export default function PuzzlesList({ puzzles }) {
  const puzzleElements = puzzles.map((puzzle) => {
    return <PuzzleCard key={puzzle} puzzle={puzzle} />;
  });
  return (
    <div className="max-w-lg h-fit grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {puzzleElements}
    </div>
  );
}
