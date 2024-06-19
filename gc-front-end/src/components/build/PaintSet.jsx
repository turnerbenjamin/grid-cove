import PaintPot from "./PaintPot";

export default function PaintSet() {
  const paintPots = Array.from({ length: 16 }).map((_, i) => {
    return <PaintPot key={i} />;
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
