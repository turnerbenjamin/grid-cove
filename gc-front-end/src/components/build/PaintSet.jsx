import GridColours from "../../utils/GridColours";
import PaintPot from "./PaintPot";

export default function PaintSet() {
  const colours = GridColours.getAllColours();

  const paintPots = colours.map((colour) => {
    return <PaintPot key={colour.colourCode} colour={colour} />;
  });

  return (
    <div className="w-full md-w-fit md-h-full max-w-sm">
      <h3 className="text-center mb-2 select-none">PAINT SET</h3>
      <div className="grid grid-cols-8 md:grid-cols-2 w-full h-fit gap-1">
        {paintPots}
      </div>
    </div>
  );
}
