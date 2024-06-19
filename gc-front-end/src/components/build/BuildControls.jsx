import Button from "../general/Button";
import PaintSet from "./PaintSet";

export default function BuildControls() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PaintSet />
      <Button>Save</Button>
    </div>
  );
}
