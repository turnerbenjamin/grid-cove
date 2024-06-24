import { useGridContext } from "../../hooks/contexts/gridContext";
import Button from "../general/Button";
import PaintSet from "./PaintSet";

export default function BuildControls() {
  const { getPuzzleString } = useGridContext();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PaintSet />
      <Button onClick={() => console.log(getPuzzleString())}>Save</Button>
    </div>
  );
}
