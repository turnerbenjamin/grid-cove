export default function RenderedErrors({ errors }) {
  if (!errors || errors.length === 0) return;

  const errorItems = errors.map((error, i) => {
    return (
      <li key={i} className="text-danger-700">
        {error}
      </li>
    );
  });

  return (
    <div className="mt-4 p-2 pl-6 bg-grid-white bg-opacity-80">
      {errorItems}
    </div>
  );
}
