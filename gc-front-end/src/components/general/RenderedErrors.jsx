export default function RenderedErrors({ errors }) {
  if (!errors || errors.length === 0) return;

  const errorItems = errors.map((error, i) => {
    return (
      <li key={i} className="text-grid-red">
        {error}
      </li>
    );
  });

  return (
    <div className="mt-4 p-2 pl-6 bg-grid-white bg-opacity-90">
      {errorItems}
    </div>
  );
}
