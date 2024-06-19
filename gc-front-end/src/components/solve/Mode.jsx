import ModeSelector from "./ModeSelector";

export default function Mode() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-2 select-none">MODE</h3>
      <div className="flex flex-row md:flex-col gap-2 items-center justify-center">
        <ModeSelector isFill />
        <ModeSelector isClear />
        <ModeSelector isEliminate />
      </div>
    </div>
  );
}
