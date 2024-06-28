export default function SolvedScreen({ puzzle }) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl text-center text-primary-500 mb-2">SOLVED!!</h2>
      <p>{`${puzzle.title} by ${puzzle.artist.username}`}</p>
    </div>
  );
}
