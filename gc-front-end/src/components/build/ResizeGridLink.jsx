import { useGridContext } from "../../hooks/contexts/gridContext";

export default function ResizeGridLink() {
  const { setGridSize } = useGridContext();
  return (
    <p
      className="hover:text-accent-500 cursor-pointer"
      onClick={() => setGridSize(null)}
    >
      Go back
    </p>
  );
}
