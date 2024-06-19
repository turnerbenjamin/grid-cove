import PuzzlesList from "./PuzzlesList";

export default function Puzzles() {
  const puzzles = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center py-[10vh]">
      <PuzzlesList puzzles={puzzles} />
    </div>
  );
}
