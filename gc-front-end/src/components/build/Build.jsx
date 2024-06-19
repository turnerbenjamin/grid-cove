import Grid from "../grid/Grid";
import BuildControls from "./BuildControls";

export default function Build() {
  return (
    <div className="flex flex-col items-center mt-[5vh]">
      <div className="grid md:grid-cols-[1fr_auto] w-[95vw] max-w-lg gap-4">
        <div className="w-full">
          <Grid />
        </div>
        <BuildControls />
      </div>
    </div>
  );
}
